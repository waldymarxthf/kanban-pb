import { Button, Group, Modal, Space, Textarea } from "@mantine/core";
import { changedColumnTitle, createColumn } from "./model";
import { useDisclosure } from "@mantine/hooks";

export function AddColumn() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Button onClick={open} variant="filled" size="xs">
        Add column
      </Button>

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
    </>
  );
}
