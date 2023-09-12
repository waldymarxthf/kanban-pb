import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import classes from "./ui.module.scss";

export function AddBoardBtn() {
  return (
    <Button
      classNames={{ root: classes.root }}
      leftSection={<IconPlus size={14} />}
      variant="default"
    >
      Project
    </Button>
  );
}
