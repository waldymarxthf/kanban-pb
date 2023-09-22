import { $tasks, getTasksFx } from "~widgets/board/model/model";
import AddTaskCardModal from "../add-card-modal";
import { ColumnTitle } from "~features/board/column-title";
import { Stack } from "@mantine/core";
import TasksCardList from "../card";
import { useEffect } from "react";
import { useUnit } from "effector-react";

export function Column({ title, id }: { title: string; id: number }) {
  const tasks = useUnit($tasks);

  useEffect(() => {
    getTasksFx();
  }, []);

  const filteredTasks = tasks.filter((task) => task.column_id === id);

  return (
    <Stack align="flex-start" w={310}>
      <ColumnTitle title={title} id={id} quantity={filteredTasks.length} />
      <TasksCardList columnId={id} />
      <AddTaskCardModal id={id} />
    </Stack>
  );
}
