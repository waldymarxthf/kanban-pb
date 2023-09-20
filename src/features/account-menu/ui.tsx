import {
  Avatar,
  Group,
  Menu,
  Skeleton,
  Text,
  UnstyledButton,
  rem,
} from "@mantine/core";
import { IconChevronDown, IconExternalLink } from "@tabler/icons-react";
import { $user } from "~shared/lib/supabase/model";
import { forwardRef } from "react";
import { useUnit } from "effector-react";

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
  const user = useUnit($user);

  if (!user) return <Skeleton w={200} h={50} />;

  return (
    <Menu withArrow>
      <Menu.Target>
        <UserButton
          name={user.user_metadata.name}
          image={user.user_metadata.avatar_url}
        />
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
