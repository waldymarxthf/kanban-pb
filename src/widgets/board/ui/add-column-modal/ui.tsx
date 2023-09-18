import { Button, Group, Modal, Space, Textarea } from "@mantine/core";
import { changedColumnTitle, createColumn } from "~widgets/board/model/model";

export function AddColumnModal({
  opened,
  close,
}: {
  opened: boolean;
  close: () => void;
}) {
  return (
    <Modal opened={opened} onClose={close} title="Create column" centered>
      <Textarea
        variant="filled"
        label="Enter column title"
        withAsterisk
        required
        placeholder="Column title..."
        autosize
        onChange={(event) => changedColumnTitle(event.currentTarget.value)}
      />
      <Space h="xs" />
      <Group justify="flex-end">
        <Button
          onClick={() => {
            close();
            createColumn();
          }}
          variant="filled"
          size="xs"
        >
          Create
        </Button>
      </Group>
    </Modal>
  );
}
