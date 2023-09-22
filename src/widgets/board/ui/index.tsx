import { $column, getColumnsFx } from "../model/model";
import { Flex, ScrollArea } from "@mantine/core";
import { $user } from "~shared/lib/supabase/model";
import Column from "./column";
import { useEffect } from "react";
import { useUnit } from "effector-react";

export function Board() {
  const [user, column] = useUnit([$user, $column]);

  //TODO: перенести логику на эффектор

  useEffect(() => {
    user && getColumnsFx(user.id);
  }, [user]);

  return (
    <ScrollArea h={830} type="scroll" offsetScrollbars>
      <Flex gap={10}>
        {column.map((item) => (
          <Column key={item.id} title={item.title} id={item.id} />
        ))}
      </Flex>
    </ScrollArea>
  );
}
