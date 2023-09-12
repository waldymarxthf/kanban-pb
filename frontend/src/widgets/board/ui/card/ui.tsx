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

export function CardTask() {
  return (
    <Paper w={310} shadow="sm" radius="md" p="xs" withBorder>
      <Badge size="xs" variant="light" color="lime">
        Low
      </Badge>
      <Text size="sm" lineClamp={3}>
        Use it to create cards, dropdowns, modals and other components that
        require background with shadow
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
