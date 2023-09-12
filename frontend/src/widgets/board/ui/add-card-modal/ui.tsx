import { Chip, Group, Modal, Space, Text, Textarea } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";

export function AddTaskCardModal({
  opened,
  close,
}: {
  opened: boolean;
  close: () => void;
}) {
  return (
    <Modal opened={opened} onClose={close} title="Create Task" centered>
      <Text fw={500} fz={14}>
        Pick a priority:
      </Text>
      <Chip.Group>
        <Group justify="flex-start">
          <Chip value="1" color="lime" variant="light">
            Low
          </Chip>
          <Chip value="2" color="yellow" variant="light">
            Medium
          </Chip>
          <Chip value="3" color="red" variant="light">
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
      />
      <Textarea
        variant="filled"
        label="Comments"
        placeholder="Add comments..."
      />
      <Space h="xs" />
      <Text fw={500} fz={14}>
        Pick a deadline
      </Text>
      <DatePickerInput
        valueFormat="MMM DD"
        type="range"
        allowSingleDateInRange
        placeholder="Pick dates range"
        radius="md"
      />
    </Modal>
  );
}
