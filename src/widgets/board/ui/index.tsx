import { $column, getColumnsFx, handleDragEnd } from "../model/model";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { $user } from "~shared/lib/supabase/model";
import Column from "./column";
import { ScrollArea } from "@mantine/core";
import { useEffect } from "react";
import { useUnit } from "effector-react";

export function Board() {
  const [user, column] = useUnit([$user, $column]);

  //TODO: перенести логику на эффектор

  useEffect(() => {
    user && getColumnsFx(user.id);
  }, [user]);

  return (
    <ScrollArea style={{ height: "calc(100vh - 95px)" }} type="always">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="all-columns" direction="horizontal" type="COLUMN">
          {(provided) => (
            <div style={{ display: "flex" }} {...provided.droppableProps} ref={provided.innerRef}>
              {column.map((item, index) => (
                <Column key={item.id} title={item.title} id={item.id} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </ScrollArea>
  );
}
