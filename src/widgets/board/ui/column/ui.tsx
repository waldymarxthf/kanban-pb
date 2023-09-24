import { $tasks, getTasksFx } from "~widgets/board/model/model";
import { ColumnTitle } from "~features/board/column-title";
import { Draggable } from "@hello-pangea/dnd";
import { Stack } from "@mantine/core";
import TasksCardList from "../card";
import { useEffect } from "react";
import { useUnit } from "effector-react";

export function Column({ title, id, index }: { title: string; id: number; index: number }) {
  const tasks = useUnit($tasks);

  useEffect(() => {
    getTasksFx();
  }, []);

  const filteredTasks = tasks.filter((task) => task.column_id === id);

  return (
    <Draggable key={id} index={index} draggableId={String(id)}>
      {(provided) => (
        <div {...provided.draggableProps} ref={provided.innerRef}>
          <Stack align="flex-start" w={310} gap={5} mr={5}>
            <div {...provided.dragHandleProps}>
              <ColumnTitle title={title} id={id} quantity={filteredTasks.length} />
            </div>
            <TasksCardList columnId={id} />
          </Stack>
        </div>
      )}
    </Draggable>
  );
}
