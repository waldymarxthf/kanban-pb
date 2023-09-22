import { AppShell, Button, Group, Text } from "@mantine/core";
import AddColumn from "./add-column";
import { loginGoogleFx } from "~shared/lib/supabase/model";

export function Header() {
  return (
    <AppShell.Header>
      <Group align="center" justify="space-between">
        <Text fw={700} fz={32} ml={10}>
          My own project
        </Text>
        <Group mr={20} mt={10}>
          <Button variant="default" color="white" size="xs">
            Filter
          </Button>
          <AddColumn />
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
  );
}
