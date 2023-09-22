import { calculateNextTaskPosition, sortByPosition } from "../lib";
import {
  combine,
  createEffect,
  createEvent,
  createStore,
  restore,
  sample,
} from "effector";
import { every, reset } from "patronum";
import { isEqual } from "~shared/lib/utils/isEqual";
import { isLong } from "~shared/lib/utils/isLong";
import { supabase } from "~shared/lib/supabase/supabase";

export interface Task {
  column_id: number | null;
  id?: number;
  position: number;
  priority: string;
  title: string | null;
}

export interface Column {
  id: number;
  position: number;
  title: string;
  user_id: string;
}

export const updateNewColumnTitle = createEvent<string>();
export const resetColumnTitleUpdate = createEvent();
export const toggleEditColumnTitle = createEvent<{
  id: number;
  title: string;
}>();

export const $column = createStore<Column[]>([]);
export const $newColumnTitle = restore(updateNewColumnTitle, "");
export const $oldColumnTitle = createStore("");
export const $editingColumnIds = createStore<number>(0);
export const $errorColumnTitle = createStore<null | "long" | "equal">(null);

$editingColumnIds.on(toggleEditColumnTitle, (_, { id }) => id);
$newColumnTitle.on(toggleEditColumnTitle, (_, { title }) => title);
$oldColumnTitle.on(toggleEditColumnTitle, (_, { title }) => title);

export const getColumnsFx = createEffect<string, Column[] | null, Error>(
  async (user_id: string) => {
    const { data } = await supabase
      .from("columns")
      .select("*")
      .eq("user_id", user_id);
    return data;
  },
);

export const updateColumnTitleFx = createEffect<
  { title: string; id: number },
  Column[] | null,
  Error
>(async ({ title, id }) => {
  const { data } = await supabase
    .from("columns")
    .update({ title: title })
    .eq("id", id)
    .select();
  return data;
});

export const deleteColumnFx = createEffect(async (id: number) => {
  return await supabase.from("columns").delete().eq("id", id);
});

//TODO: добавить вариант с ошибкой

sample({
  clock: getColumnsFx.done,
  source: $column,
  fn: (
    state: Column[],
    { result }: { params: string; result: Column[] | null },
  ) => {
    return result !== null ? result.sort(sortByPosition) : state;
  },
  target: $column,
});

sample({
  clock: deleteColumnFx.done,
  source: $column,
  fn: (currentColumn, { params: deleteColumnId }) => {
    return currentColumn.filter((column) => column.id !== deleteColumnId);
  },
  target: $column,
});

sample({
  clock: updateNewColumnTitle,
  source: [$newColumnTitle, $oldColumnTitle],
  fn: ([newTitle, oldTitle]) => {
    if (isLong(newTitle)) return "long";
    if (isEqual(newTitle, oldTitle)) return "equal";
    return null;
  },
  target: $errorColumnTitle,
});

export const $isTitleCorrect = every({
  stores: [$errorColumnTitle],
  predicate: null,
});

sample({
  clock: updateColumnTitleFx.done,
  source: $column,
  fn: (currentColumn, { params: { title, id } }) => {
    return currentColumn.map((column) => {
      return column.id === id ? { ...column, title } : column;
    });
  },
  target: $column,
});

reset({
  clock: updateColumnTitleFx.done,
  target: $editingColumnIds,
});

reset({
  clock: resetColumnTitleUpdate,
  target: $editingColumnIds,
});

export const createTask = createEvent();
export const taskPriorityChanged = createEvent<string>();
export const taskTitleChanged = createEvent<string>();
export const taskCommentChanged = createEvent<string>();
export const taskDeadlineChanged = createEvent<Date | null>();
export const openModalCreateTask = createEvent<number>();

export const $tasks = createStore<Task[]>([]);
export const $taskColumnId = restore(openModalCreateTask, 1);
export const $taskPriority = restore(taskPriorityChanged, "");
export const $taskTitle = restore(taskTitleChanged, "");
export const $taskComment = restore(taskCommentChanged, "");
export const $taskDeadline = restore(taskDeadlineChanged, null);

export const getTasksFx = createEffect<void, Task[] | null, Error>(async () => {
  const { data: tasks } = await supabase.from("tasks").select("*");
  return tasks;
});

export const createTaskFx = createEffect(async (data: Task) => {
  return await supabase.from("tasks").insert([data]).select();
});

sample({
  clock: getTasksFx.done,
  source: $tasks,
  fn: (state, { result }: { params: void; result: Task[] | null }) => {
    return result !== null ? result.sort(sortByPosition) : state;
  },
  target: $tasks,
});

export const $taskPosition = combine(
  $tasks,
  $taskColumnId,
  (tasks, currentColumnId) => {
    return calculateNextTaskPosition(tasks, currentColumnId);
  },
);

sample({
  clock: createTask,
  source: {
    title: $taskTitle,
    priority: $taskPriority,
    column_id: $taskColumnId,
    position: $taskPosition,
  },
  target: createTaskFx,
});

sample({
  clock: createTaskFx.done,
  source: $tasks,
  fn: (currentTasks, { result }) => {
    const { data: taskData } = result;
    return taskData ? [...currentTasks, ...taskData] : currentTasks;
  },
  target: $tasks,
});
