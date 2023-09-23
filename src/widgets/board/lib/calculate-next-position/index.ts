import type { Column, Task } from "~widgets/board";

export function calculateNextColumnPosition(columns: Column[]): number {
  if (columns.length === 0) return 1;

  const maxPosition = Math.max(...columns.map((column) => column.position));
  const nextPosition = maxPosition + 1;

  return nextPosition;
}

export function calculateNextTaskPosition(
  taskList: Task[],
  columnId: number,
): number {
  const tasksInColumn = taskList.filter((task) => task.column_id === columnId);

  if (tasksInColumn.length === 0) return 0;

  const maxPosition = Math.max(...tasksInColumn.map((task) => task.position));
  const nextPosition = maxPosition + 1;

  return nextPosition;
}
