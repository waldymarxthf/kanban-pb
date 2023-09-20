import {
  $editingColumnIds,
  $errorColumnTitle,
  $isTitleCorrect,
  $newColumnTitle,
  $tasks,
  deleteColumn,
  getTasksFx,
  openModalCreateTask,
  resetColumnTitleUpdate,
  toggleEditColumnTitle,
  updateColumnTitleFx,
  updateNewColumnTitle,
} from "~widgets/board/model/model";
import {
  ActionIcon,
  Badge,
  Button,
  Group,
  Menu,
  Stack,
  TextInput,
  rem,
} from "@mantine/core";
import {
  IconCheck,
  IconDots,
  IconEdit,
  IconPlus,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import AddTaskCardModal from "../add-card-modal";
import CardTask from "../card";
import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";
import { useUnit } from "effector-react";

const titleErrorText = {
  long: "Title too long. 10 characters max.",
  equal: "Title already exist.",
};

export function Column({ title, id }: { title: string; id: number }) {
  const [tasks, editingColumn, newColumnTitle, titleError, isTitleCorrect] =
    useUnit([
      $tasks,
      $editingColumnIds,
      $newColumnTitle,
      $errorColumnTitle,
      $isTitleCorrect,
    ]);
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    getTasksFx();
  }, []);

  const filteredTasks = tasks.filter((task) => task.column_id === id);
  const isEditing = editingColumn === id;

  return (
    <>
      <Stack align="flex-start" w={310}>
        <Group justify="space-between" w={310} gap="xs">
          {isEditing ? (
            <Group gap="xs" align="flex-start">
              <TextInput
                aria-label="edit column title"
                placeholder="edit column"
                radius="md"
                value={newColumnTitle}
                onChange={(event) =>
                  updateNewColumnTitle(event.currentTarget.value)
                }
                fw={500}
                w={270}
                error={titleError ? titleErrorText[titleError] : null}
                rightSection={
                  <ActionIcon
                    component="button"
                    variant="light"
                    color="green"
                    aria-label="column-edit-icon"
                    onClick={() =>
                      updateColumnTitleFx({ title: newColumnTitle, id })
                    }
                    disabled={!isTitleCorrect}
                  >
                    <IconCheck style={{ width: rem(14), height: rem(14) }} />
                  </ActionIcon>
                }
              />
              <ActionIcon
                variant="light"
                color="red"
                aria-label="column-edit-icon"
                onClick={() => resetColumnTitleUpdate()}
                mt={5}
              >
                <IconX style={{ width: rem(14), height: rem(14) }} />
              </ActionIcon>
            </Group>
          ) : (
            <Badge variant="dot" color="yellow">
              {title} {filteredTasks.length}
            </Badge>
          )}
          {!isEditing && (
            <Menu shadow="md" width={200} radius="md">
              <Menu.Target>
                <ActionIcon
                  variant="transparent"
                  color="gray"
                  aria-label="column-menu"
                  disabled={!!editingColumn}
                >
                  <IconDots size="1rem" />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  onClick={() => toggleEditColumnTitle({ id, title })}
                  leftSection={
                    <IconEdit style={{ width: rem(14), height: rem(14) }} />
                  }
                >
                  Edit
                </Menu.Item>
                <Menu.Item
                  color="red"
                  onClick={() => deleteColumn(id)}
                  leftSection={
                    <IconTrash style={{ width: rem(14), height: rem(14) }} />
                  }
                >
                  Delete column
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          )}
        </Group>
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
