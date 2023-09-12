import AddTaskCardModal from "./add-card-modal";
import CardTask from "./card";
import Column from "./column";
import { Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export function Board() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Flex gap={10}>
        <Column open={open}>
          <CardTask />
        </Column>
        <Column open={open}>
          <CardTask />
          <CardTask />
          <CardTask />
          <CardTask />
        </Column>
        <Column open={open}>
          <CardTask />
        </Column>
      </Flex>
      <AddTaskCardModal opened={opened} close={close} />
    </>
  );
}
