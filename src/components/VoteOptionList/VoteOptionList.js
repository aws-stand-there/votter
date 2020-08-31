import React from "react";
import { Input, Button } from "antd";
import { PlusOutlined, MenuOutlined } from "@ant-design/icons";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function VoteOptionList({ value, onCreate, onChange, onDragEnd }) {
  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {value.map((option, index) => (
                <Draggable
                  key={option.id}
                  draggableId={option.id}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div>
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          marginBottom: 8,
                          ...provided.draggableProps.style,
                        }}
                      >
                        <Input
                          addonBefore={
                            <MenuOutlined style={{ cursor: "grab" }} />
                          }
                          value={option.text}
                          onChange={(e) => onChange(index, e.target.value)}
                          onPressEnter={onCreate}
                          size="large"
                          allowClear
                        />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Button
        icon={<PlusOutlined />}
        type="dashed"
        size="large"
        style={{ width: "100%", padding: 8, marginBottom: 8 }}
        onClick={onCreate}
      >
        새 항목 추가
      </Button>
    </div>
  );
}

export default VoteOptionList;
