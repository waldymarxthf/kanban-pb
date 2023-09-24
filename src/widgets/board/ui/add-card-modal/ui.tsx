import {
  $taskTitle,
  createTask,
  openModalCreateTask,
  taskCommentChanged,
  taskDeadlineChanged,
  taskPriorityChanged,
  taskTitleChanged,
} from "~widgets/board/model/model";
import { Button, Chip, Group, Modal, Space, Text, Textarea } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IconPlus } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useUnit } from "effector-react";

export function AddTaskCardModal({ id }: { id: number }) {
  const taskTitle = useUnit($taskTitle);
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
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

      <Modal opened={opened} onClose={close} title="Create Task" centered>
        <Text fw={500} fz={14}>
          Pick a priority:
        </Text>
        <Chip.Group onChange={taskPriorityChanged}>
          <Group justify="flex-start">
            <Chip value="low" color="lime" variant="light">
              Low
            </Chip>
            <Chip value="medium" color="yellow" variant="light">
              Medium
            </Chip>
            <Chip value="high" color="red" variant="light">
              High
            </Chip>
          </Group>
        </Chip.Group>
        <Space h="xs" />
        <Textarea
          variant="filled"
          label="Enter task title"
          withAsterisk
          required
          placeholder="Task title..."
          value={taskTitle}
          onChange={(event) => taskTitleChanged(event.currentTarget.value)}
        />
        <Textarea
          variant="filled"
          label="Comments"
          placeholder="Add comments..."
          autosize
          onChange={(event) => taskCommentChanged(event.currentTarget.value)}
        />
        <Space h="xs" />
        <Text fw={500} fz={14}>
          Pick a deadline
        </Text>
        <DateInput
          valueFormat="MMM DD"
          placeholder="Pick dates range"
          radius="md"
          onChange={taskDeadlineChanged}
        />
        <Space h="xs" />
        <Group justify="flex-end">
          <Button
            onClick={() => {
              createTask();
              close();
            }}
            variant="filled"
            size="xs"
          >
            Create
          </Button>
        </Group>
      </Modal>
    </>
  );
}
