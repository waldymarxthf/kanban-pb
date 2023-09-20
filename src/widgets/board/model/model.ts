import { createEffect, createEvent, createStore, sample } from "effector";
import { every, reset } from "patronum";
import { $user } from "~shared/lib/supabase/model";
import { isEqual } from "~shared/lib/utils/isEqual";
import { isLong } from "~shared/lib/utils/isLong";
import { supabase } from "~shared/lib/supabase/supabase";

export const $tasks = createStore<Task[]>([]);

export const $column = createStore<Column[]>([]);

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

export const openModalCreateTask = createEvent<number>();

export const createTask = createEvent();
export const taskPriorityChanged = createEvent<string>();
export const taskTitleChanged = createEvent<string>();
export const taskCommentChanged = createEvent<string>();
export const taskDeadlineChanged = createEvent<Date | null>();

export const $taskColumnId = createStore<number>(1);
export const $taskPriority = createStore("");
export const $taskTitle = createStore("");
export const $taskComment = createStore("");
export const $taskDeadline = createStore<Date | null>(null);
export let $taskPosition = createStore<number>(1);

export const getColumnsFx = createEffect<string, Column[] | null, Error>(
  async (user_id: string) => {
    const { data } = await supabase
      .from("columns")
      .select("*")
      .eq("user_id", user_id);
    return data;
  },
);

export const getTasksFx = createEffect<void, Task[] | null, Error>(async () => {
  const { data: tasks } = await supabase.from("tasks").select("*");
  return tasks;
});

export const createTaskFx = createEffect(async (data: Task) => {
  return await supabase.from("tasks").insert([data]).select();
});

export const createColumnFx = createEffect(
  async (data: { title: string; position: number; user_id: string }) => {
    return await supabase.from("columns").insert([data]).select();
  },
);

export const deleteColumnFx = createEffect(async (id: number) => {
  return await supabase.from("columns").delete().eq("id", id);
});

$column.on(
  getColumnsFx.done,
  (state, { result }: { params: string; result: Column[] | null }) => {
    if (result !== null) {
      return result;
    }
    return state;
  },
);

$tasks.on(
  getTasksFx.done,
  (state, { result }: { params: void; result: Task[] | null }) => {
    if (result !== null) {
      return result;
    }
    return state;
  },
);

$taskTitle.on(taskTitleChanged, (_, title) => title);
$taskPriority.on(taskPriorityChanged, (_, priority) => priority);
$taskDeadline.on(taskDeadlineChanged, (_, deadline) => deadline);
$taskColumnId.on(openModalCreateTask, (_, column) => column);
$taskComment.on(taskCommentChanged, (_, comment) => comment);

function calculateNextPosition(taskList: Task[] | Column[]): number {
  return taskList.length === 0
    ? 1
    : Math.max(...taskList.map((task) => task.position)) + 1;
}

$taskPosition = $tasks.map((tasks) => calculateNextPosition(tasks));

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

/**
 * Combines the current tasks with the task data and returns the result.
 *
 * @param {Array} currentTasks - The array of current tasks.
 * @param {Object} result - The result object containing the task data.
 * @returns {Array} The combined array of current tasks and task data.
 */

sample({
  clock: createTaskFx.done,
  source: $tasks,
  fn: (currentTasks, { result }) => {
    const { data: taskData } = result;
    if (taskData) {
      return [...currentTasks, ...taskData];
    }
    return currentTasks;
  },
  target: $tasks,
});

export const $columnTitle = createStore("");
export let $columnPosition = createStore<number>(1);

export const createColumn = createEvent<void | {
  title: string;
  position: number;
  user_id: string;
}>();
export const changedColumnTitle = createEvent<string>();

$columnPosition = $column.map((column) => calculateNextPosition(column));
$columnTitle.on(changedColumnTitle, (_, title) => title);

//TODO: сделать обработку ошибок

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

export const deleteColumn = createEvent<number>();

sample({
  clock: deleteColumn,
  target: deleteColumnFx,
});

sample({
  clock: deleteColumnFx.done,
  source: $column,
  fn: (currentColumn, { params: deleteColumnId }) => {
    return currentColumn.filter((column) => column.id !== deleteColumnId);
  },
  target: $column,
});

export const toggleEditColumnTitle = createEvent<{
  id: number;
  title: string;
}>();

export const $editingColumnIds = createStore<number>(0);

$editingColumnIds.on(toggleEditColumnTitle, (_, { id }) => id);

export const $newColumnTitle = createStore<string>("");
export const $errorColumnTitle = createStore<null | "long" | "equal">(null);

export const updateNewColumnTitle = createEvent<string>();

$newColumnTitle.on(toggleEditColumnTitle, (_, { title }) => title);
$newColumnTitle.on(updateNewColumnTitle, (_, currentTitle) => currentTitle);

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

export const $oldColumnTitle = createStore("");
$oldColumnTitle.on(toggleEditColumnTitle, (_, { title }) => title);

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
      if (column.id === id) {
        return { ...column, title };
      }
      return column;
    });
  },
  target: $column,
});

reset({
  clock: updateColumnTitleFx.done,
  target: $editingColumnIds,
});

export const resetColumnTitleUpdate = createEvent();

reset({
  clock: resetColumnTitleUpdate,
  target: $editingColumnIds,
});
