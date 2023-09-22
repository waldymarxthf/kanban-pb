import {
  $editingColumnIds,
  deleteColumnFx,
  toggleEditColumnTitle,
} from "~widgets/board";
import { ActionIcon, Menu, rem } from "@mantine/core";
import { IconDots, IconEdit, IconTrash } from "@tabler/icons-react";
import { useUnit } from "effector-react";

export function ColumnDropdownMenu({
  title,
  id,
}: {
  title: string;
  id: number;
}) {
  const editingColumn = useUnit($editingColumnIds);
  return (
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
          leftSection={<IconEdit style={{ width: rem(14), height: rem(14) }} />}
        >
          Edit
        </Menu.Item>
        <Menu.Item
          color="red"
          onClick={() => deleteColumnFx(id)}
          leftSection={
            <IconTrash style={{ width: rem(14), height: rem(14) }} />
          }
        >
          Delete column
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
