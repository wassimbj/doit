import React, { useEffect, useState } from "react";
import { Plus } from "react-feather";
import AddTodoModal from "./components/AddTodoModal";
import Navbar from "./components/Navbar";
import TodoCard from "./components/TodoCard";
import Db from "./db/init";
import { Todo } from "./utils/types";

function App() {
  const recentActiveProject = window.localStorage.getItem("activeProject") || 0;
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<number | undefined>(
    (recentActiveProject as unknown) as number | undefined
  );
  const [addedNewTodo, setAddedNewTodo] = useState<boolean>(false);

  useEffect(() => {
    new Db().todos
      .where("project_id")
      .equals(selectedProject as number)
      .toArray()
      .then((todo) => {
        setTodos(todo);
      });

    return () => setAddedNewTodo(false);
  }, [addedNewTodo, selectedProject]);
  console.log(selectedProject);
  return (
    <div className="overflow-y-auto bg-gray-900 fixed w-full h-full">
      <Navbar
        onSelectProject={(id) => setSelectedProject(id)}
        selectedProject={selectedProject}
      />
      {!selectedProject ? (
        <p className="text-gray-400 font-semibold text-center py-10 px-2">
          Select a project first
        </p>
      ) : (
        <p>
          <span
            className="cursor-pointer text-center block text-gray-500 bg-gray-800 hover:border-gray-700 border border-gray-500 rounded-md p-5 mx-5 mb-10"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus className="mx-auto mb-1" />
            Add a Todo
          </span>
          {isAddModalOpen && (
            <AddTodoModal
              onClose={() => setIsAddModalOpen(false)}
              onAddedNewTodo={() => setAddedNewTodo(true)}
              projectId={selectedProject}
            />
          )}
          <div className="p-5">
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {todos.map((todo) => (
                <TodoCard
                  color={todo.color}
                  desc={todo.desc}
                  tags={todo.tags}
                />
              ))}
            </div>
          </div>
        </p>
      )}
    </div>
  );
}

export default App;
