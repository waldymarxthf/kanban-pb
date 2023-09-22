import { AppShell, Group, Space, Text } from "@mantine/core";
import AccountMenu from "~features/account-menu";
import AddBoardBtn from "~features/add-board";
import { IconCirclePlus } from "@tabler/icons-react";

export function Navbar() {
  return (
    <AppShell.Navbar p="md">
      <AccountMenu />
      <Space h="md" />
      <Group w={340} grow align="center">
        <Text fw={500} style={{ color: "var(--mantine-color-gray-9)" }}>
          Projects
        </Text>
        <IconCirclePlus
          size={16}
          style={{
            cursor: "pointer",
            color: "var(--mantine-color-gray-9)",
            marginTop: "1px",
            maxWidth: "160px",
          }}
        />
      </Group>
      <Space h="xs" />
      <AddBoardBtn />
    </AppShell.Navbar>
  );
}
