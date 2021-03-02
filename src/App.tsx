import React, { useEffect, useState } from "react";
import { Plus } from "react-feather";
import AddTodoModal from "./components/AddTodoModal";
import Navbar from "./components/Navbar";
import TodoCard from "./components/TodoCard";
import Db from "./db/init";
import { Todo } from "./utils/types";

function App() {
  const recentActiveProject: number = Number(window.localStorage.getItem("activeProject")) || 0;
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<number | undefined>(recentActiveProject);
  const [somethingUpdated, setSomethingUpdated] = useState<boolean>(false);
    
  useEffect(() => {
    (async function() {
      const data: Array<Todo> = await new Db().todos
      .where("project_id")
      .equals((selectedProject as unknown) as number)
      .toArray();

      setTodos(data);
    }());
    
    return () => {
      setSomethingUpdated(false)
    };
  }, [somethingUpdated, selectedProject]);

  return (
    <div className="overflow-y-auto overflow-x-hidden bg-gray-900 fixed w-full h-full">
      <Navbar
        onSelectProject={(id) => setSelectedProject(id)}
        selectedProject={selectedProject}
      />
      {!selectedProject? (
        <div className="max-w-md border border-gray-400 mx-auto rounded-lg p-5">
          <p className="text-gray-400 text-center py-10 px-2">
              Select a project first
              <br />
              or create a new one by clicking the blue button above
          </p>
        </div>
      ) : (
        <p>
          <span
            className="cursor-pointer max-w-sm mx-auto text-center block text-gray-500 bg-gray-800 hover:border-gray-700 border border-gray-500 rounded-md p-5 mx-5 mb-10"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus className="mx-auto mb-1" />
            New thing todo...
          </span>
          {isAddModalOpen && (
            <AddTodoModal
              onClose={() => setIsAddModalOpen(false)}
              onAddedNewTodo={() => setSomethingUpdated(true)}
              projectId={selectedProject}
            />
          )}
          <div className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {todos.map((todo) => (
                <TodoCard 
                  onDeleteTodo={() => setSomethingUpdated(true)}
                  id={todo.id}
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
