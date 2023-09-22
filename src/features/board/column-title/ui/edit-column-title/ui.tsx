import {
  $errorColumnTitle,
  $isTitleCorrect,
  $newColumnTitle,
  resetColumnTitleUpdate,
  updateColumnTitleFx,
  updateNewColumnTitle,
} from "~widgets/board";
import { ActionIcon, Group, TextInput, rem } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useUnit } from "effector-react";

const titleErrorText = {
  long: "Title too long. 10 characters max.",
  equal: "Title already exist.",
};

export function EditColumnTitle({ id }: { id: number }) {
  const [newColumnTitle, titleError, isTitleCorrect] = useUnit([
    $newColumnTitle,
    $errorColumnTitle,
    $isTitleCorrect,
  ]);
  return (
    <Group gap="xs" align="flex-start">
      <TextInput
        aria-label="edit column title"
        placeholder="edit column"
        radius="md"
        value={newColumnTitle}
        onChange={(event) => updateNewColumnTitle(event.currentTarget.value)}
        fw={500}
        w={270}
        error={titleError ? titleErrorText[titleError] : null}
        rightSection={
          <ActionIcon
            component="button"
            variant="light"
            color="green"
            aria-label="column-edit-icon"
            onClick={() => updateColumnTitleFx({ title: newColumnTitle, id })}
            disabled={!isTitleCorrect}
          >
            <IconCheck style={{ width: rem(14), height: rem(14) }} />
          </ActionIcon>
        }
      />
      <ActionIcon
        variant="light"
        color="red"
        aria-label="column-edit-icon"
        onClick={() => resetColumnTitleUpdate()}
        mt={5}
      >
        <IconX style={{ width: rem(14), height: rem(14) }} />
      </ActionIcon>
    </Group>
  );
}
