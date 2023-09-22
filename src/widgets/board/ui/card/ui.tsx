import {
  ActionIcon,
  Avatar,
  Badge,
  Breadcrumbs,
  Group,
  Paper,
  Text,
} from "@mantine/core";
import { $tasks } from "~widgets/board/model/model";
import { IconMessageCircle } from "@tabler/icons-react";
import { PRIORITIES_COLORS } from "./constants";
import { useUnit } from "effector-react";

export function TasksCardList({ columnId }: { columnId: number }) {
  const tasks = useUnit($tasks);

  const filteredTasks = tasks.filter((task) => task.column_id === columnId);
  return (
    <>
      {filteredTasks.map((item) => (
        <Paper key={item.id} w={310} shadow="sm" radius="md" p="xs" withBorder>
          <Badge
            size="xs"
            variant="light"
            color={PRIORITIES_COLORS[item.priority]}
          >
            {item.priority}
          </Badge>
          <Text size="sm" lineClamp={3}>
            {item.title}
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
      ))}
    </>
  );
}
