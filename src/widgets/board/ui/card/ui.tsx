import { ActionIcon, Avatar, Badge, Breadcrumbs, Group, Paper, Text } from "@mantine/core";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { $tasks } from "~widgets/board/model/model";
import AddTaskCardModal from "../add-card-modal";
import { IconMessageCircle } from "@tabler/icons-react";
import { PRIORITIES_COLORS } from "./constants";
import classes from "./ui.module.scss";
import cx from "clsx";
import { sortByPosition } from "~widgets/board/lib";
import { useUnit } from "effector-react";

export function TasksCardList({ columnId }: { columnId: number }) {
  const tasks = useUnit($tasks);

  const filteredTasks = tasks.filter((task) => task.column_id === columnId).sort(sortByPosition);

  return (
    <>
      <Droppable droppableId={String(columnId)} direction="vertical" type="TASK">
        {(provided) => (
          <div style={{ width: "100%" }} {...provided.droppableProps} ref={provided.innerRef}>
            {filteredTasks.map((item, index) => (
              <Draggable key={item.id} index={index} draggableId={String(item.id)}>
                {(provided) => (
                  <div
                    className={cx(classes.item)}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    <Paper key={item.id} w={310} shadow="sm" radius="md" p="xs" withBorder>
                      <Badge size="xs" variant="light" color={PRIORITIES_COLORS[item.priority]}>
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
                      <Breadcrumbs styles={{ root: { marginLeft: "none" } }} fz={14} separator="→">
                        {["Jun 11", "Aug 12"]}
                      </Breadcrumbs>
                    </Paper>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            <AddTaskCardModal id={columnId} />
          </div>
        )}
      </Droppable>
    </>
  );
}
