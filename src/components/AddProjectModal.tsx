import React, { useState } from "react";
import { Modal, ModalBody, ModalTitle, ModalFooter } from "nice-react-modal";
import Db from '../db/init';

interface Props {
  onClose: () => void;
  onAddNewProject: () => void;
}

export default function AddProjectModal({ onClose, onAddNewProject }: Props) {

   const [name, setName] = useState('')

   const handleAddProject: (e: React.FormEvent<HTMLFormElement>) => void = (e) => {
     if(!name){
      return;
     }
    new Db().projects.add({ name });
    onClose();
    onAddNewProject()
    e.preventDefault()
   }

  return (
    <Modal onClose={onClose} darkMode>
      <ModalTitle> Add a new project </ModalTitle>
      <ModalBody>
        <form id="addProject" onSubmit={handleAddProject}>
         <input
            className="mt-5 p-2 border border-gray-600 focus:border-gray-500 rounded-lg bg-gray-700 w-full block focus:outline-none"
            onChange={(e) => setName(e.target.value)}
            name="tags"
            placeholder="project name..."
         />
        </form>
      </ModalBody>
      <ModalFooter>
        <span
          className="cursor-pointer bg-gray-600 rounded-full px-3 py-1 hover:bg-gray-700 transition"
          onClick={onClose}
        >
          Cancel
        </span>
        {
          !name ? (
            <span
              className="inline-block bg-blue-500 text-white rounded-full px-3 py-1 opacity-50 transition"
            >
              Create
            </span>
          ) : (
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-full px-3 py-1 hover:bg-blue-600 transition"
              form="addProject"
            >
              Create
            </button>
          )
        }
      </ModalFooter>
    </Modal>
  );
}
