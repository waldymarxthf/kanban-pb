import { Badge, Group } from "@mantine/core";
import { $editingColumnIds } from "~widgets/board";
import ColumnDropdownMenu from "./column-dropdown-menu";
import EditColumnTitle from "./edit-column-title";
import { useUnit } from "effector-react";

export function ColumnTitle({
  title,
  quantity,
  id,
}: {
  title: string;
  quantity: number;
  id: number;
}) {
  const editingColumn = useUnit($editingColumnIds);

  const isEditing = editingColumn === id;
  return (
    <>
      <Group justify="space-between" w={310} gap="xs">
        {isEditing ? (
          <EditColumnTitle id={id} />
        ) : (
          <Badge variant="dot" color="yellow">
            {title} {quantity}
          </Badge>
        )}
        {!isEditing && <ColumnDropdownMenu title={title} id={id} />}
      </Group>
    </>
  );
}
