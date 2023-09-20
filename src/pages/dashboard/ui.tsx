import "@mantine/dates/styles.css";
import { AppShell, Button, Group, Space, Text } from "@mantine/core";
import { getSessionFx, loginGoogleFx } from "~shared/lib/supabase/model";
import AccountMenu from "~features/account-menu";
import AddBoardBtn from "~features/add-board";
import AddColumnModal from "~widgets/board/ui/add-column-modal";
import { Board } from "~widgets/board";
import { IconCirclePlus } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";

export function Dashboard() {
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    getSessionFx();
  }, []);

  return (
    <AppShell
      layout="alt"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group align="center" justify="space-between">
          <Text fw={700} fz={32} ml={10}>
            My own project
          </Text>
          <Group mr={20} mt={10}>
            <Button variant="default" color="white" size="xs">
              Filter
            </Button>
            <Button onClick={open} variant="filled" size="xs">
              Add column
            </Button>
            <Button
              onClick={loginGoogleFx}
              variant="default"
              color="white"
              size="xs"
            >
              Log in
            </Button>
          </Group>
        </Group>
      </AppShell.Header>
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
      <AppShell.Main maw="auto">
        <Board />
        <AddColumnModal opened={opened} close={close} />
      </AppShell.Main>
    </AppShell>
  );
}
