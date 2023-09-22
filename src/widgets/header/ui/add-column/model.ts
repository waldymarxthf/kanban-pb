import { createEffect, createEvent, createStore, sample } from "effector";
import { $column } from "~widgets/board";
import { $user } from "~shared/lib/supabase/model";
import { calculateNextColumnPosition } from "~widgets/board/lib";
import { supabase } from "~shared/lib/supabase/supabase";

export let $columnPosition = createStore<number>(-1);
export const $columnTitle = createStore("");

export const changedColumnTitle = createEvent<string>();
export const createColumn = createEvent<void | {
  title: string;
  position: number;
  user_id: string;
}>();

export const createColumnFx = createEffect(
  async (data: { title: string; position: number; user_id: string }) => {
    return await supabase.from("columns").insert([data]).select();
  },
);

$columnPosition = $column.map((column) => calculateNextColumnPosition(column));
$columnTitle.on(changedColumnTitle, (_, title) => title);

sample({
  clock: createColumn,
  source: {
    title: $columnTitle,
    position: $columnPosition,
    user_id: $user.map((user) => (user ? user.id : "")),
  },
  target: createColumnFx,
});

sample({
  clock: createColumnFx.done,
  source: $column,
  fn: (currentColumn, { result }) => {
    const { data: columnData } = result;
    if (columnData) {
      return [...currentColumn, ...columnData];
    }
    return currentColumn;
  },
  target: $column,
});
