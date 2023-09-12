import { Badge, Button, Stack } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import React from "react";

export function Column({
  children,
  open,
}: {
  children: React.ReactNode;
  open: () => void;
}) {
  return (
    <Stack align="flex-start">
      <Badge fullWidth={false} variant="dot" color="yellow">
        Planning {"2"}
      </Badge>
      {children}
      <Button
        radius="xl"
        leftSection={<IconPlus size={14} />}
        variant="default"
        fullWidth
        onClick={open}
      >
        New
      </Button>
    </Stack>
  );
}
