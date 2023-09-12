import { forwardRef } from "react";
import { IconChevronDown, IconExternalLink } from "@tabler/icons-react";
import { Group, Avatar, Text, Menu, UnstyledButton, rem } from "@mantine/core";

interface UserButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  image?: string;
  name: string;
}

const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ image, name, ...others }: UserButtonProps, ref) => (
    <UnstyledButton
      ref={ref}
      style={{
        color: "var(--mantine-color-text)",
        borderRadius: "var(--mantine-radius-sm)",
      }}
      {...others}
    >
      <Group>
        <Avatar src={image} radius="xl" size={30} />

        <Text size="sm" fw={500}>
          {name}
        </Text>

        {<IconChevronDown size="1rem" />}
      </Group>
    </UnstyledButton>
  ),
);

export function AccountMenu() {
  return (
    <Menu withArrow>
      <Menu.Target>
        <UserButton name="waldymarxthf" />
      </Menu.Target>
      <Menu.Dropdown w={280}>
        <Menu.Item component="a" href="https://mantine.dev">
          Mantine website
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconExternalLink style={{ width: rem(14), height: rem(14) }} />
          }
          component="a"
          href="https://mantine.dev"
          target="_blank"
        >
          External link
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
