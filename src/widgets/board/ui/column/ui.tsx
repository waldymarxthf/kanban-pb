import {
  $tasks,
  getTasksFx,
  openModalCreateTask,
} from "~widgets/board/model/model";
import { Badge, Button, Stack } from "@mantine/core";
import AddTaskCardModal from "../add-card-modal";
import CardTask from "../card";
import { IconPlus } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";
import { useUnit } from "effector-react";

export function Column({ title, id }: { title: string; id: number }) {
  const tasks = useUnit($tasks);
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    getTasksFx();
  }, []);

  const filteredTasks = tasks.filter((task) => task.column_id === id);

  return (
    <>
      <Stack align="flex-start" w={310}>
        <Badge variant="dot" color="yellow">
          {title}
        </Badge>
        {filteredTasks.map((item) => (
          <CardTask key={item.id} task={item} />
        ))}
        <Button
          radius="xl"
          leftSection={<IconPlus size={14} />}
          variant="default"
          fullWidth
          onClick={() => {
            open();
            openModalCreateTask(id);
          }}
        >
          New
        </Button>
        <AddTaskCardModal opened={opened} close={close} />
      </Stack>
    </>
  );
}
