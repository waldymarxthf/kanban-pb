import {
  ActionIcon,
  Avatar,
  Badge,
  Breadcrumbs,
  Group,
  Paper,
  Text,
} from "@mantine/core";
import { IconMessageCircle } from "@tabler/icons-react";
import { PRIORITIES_COLORS } from "./constants";
import type { Task } from "~widgets/board/model/model";

export function CardTask({ task }: { task: Task }) {
  const priorityColor = PRIORITIES_COLORS[task.priority] || "gray";

  return (
    <Paper w={310} shadow="sm" radius="md" p="xs" withBorder>
      <Badge size="xs" variant="light" color={priorityColor}>
        {task.priority}
      </Badge>
      <Text size="sm" lineClamp={3}>
        {task.title}
      </Text>
      <Group justify="space-between">
        <ActionIcon
          variant="transparent"
          color="gray"
          aria-label="Settings"
          size="md"
        >
          <IconMessageCircle />
          {"3"}
        </ActionIcon>
        <Avatar.Group spacing="sm">
          <Avatar size="sm" src="image.png" radius="xl" />
          <Avatar size="sm" src="image.png" radius="xl" />
          <Avatar size="sm" src="image.png" radius="xl" />
          <Avatar size="sm" radius="xl">
            +5
          </Avatar>
        </Avatar.Group>
      </Group>
      <Breadcrumbs
        styles={{ root: { marginLeft: "none" } }}
        fz={14}
        separator="→"
      >
        {["Jun 11", "Aug 12"]}
      </Breadcrumbs>
    </Paper>
  );
}
