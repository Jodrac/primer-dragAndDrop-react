import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useState } from "react";

const initialTodos = [
  {
    id: 1,
    text: "Aprender React",
  },
  {
    id: 2,
    text: "Aprender JS",
  },
  {
    id: 3,
    text: "Aprender Angular",
  },
];

const App = () => {
  const [todos, setTodos] = useState(initialTodos);
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const startIndex = result.source.index;
    const endIndex = result.destination.index;

    const copyArray = [...todos];
    const [reorderItem] = copyArray.splice(startIndex, 1);
    copyArray.splice(endIndex, 0, reorderItem);

    setTodos(copyArray);
  };
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <h1>Todo app drag and drop</h1>
      <Droppable droppableId="todos">
        {(droppableProvider) => (
          <ul
            ref={droppableProvider.innerRef}
            {...droppableProvider.droppableProps}
          >
            {todos.map((todo, index) => (
              <Draggable index={index} draggableId={`${todo.id}`} key={todo.id}>
                {(draggableProvider) => (
                  <li
                    ref={draggableProvider.innerRef}
                    {...draggableProvider.draggableProps}
                    {...draggableProvider.dragHandleProps}
                  >
                    {todo.text}
                  </li>
                )}
              </Draggable>
            ))}
            {droppableProvider.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};
export default App;
