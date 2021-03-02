import React, { useEffect, useState } from 'react';
import { Plus } from 'react-feather';
import AddTodoModal from './components/AddTodoModal';
import Navbar from './components/Navbar';
import TodoCard from './components/TodoCard';
import Db from './db/init';

function App() {
  
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  return (
    <div className="overflow-y-auto bg-gray-900 fixed w-full h-full">
      <Navbar />
      <span 
        className="cursor-pointer text-center block text-gray-500 bg-gray-800 hover:border-gray-700 border border-gray-500 rounded-md p-5 mx-5 mb-10"
        onClick={() => setIsAddModalOpen(true)}
      >
        <Plus className="mx-auto mb-1" />
        Add a Todo
      </span>
      {isAddModalOpen && <AddTodoModal onClose={() => setIsAddModalOpen(false)} />}
      <div className="p-5">
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(99)].map(() => (
            <TodoCard
              color="violet"
              desc="Id et et. Dolores molestiae omnis autem aut. Eum et enim sit quo tempore et et natus. Sed optio sint sequi. Doloribus dolorem qui sit molestiae totam enim commodi fugit."
              tags={['user', 'profile']}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
