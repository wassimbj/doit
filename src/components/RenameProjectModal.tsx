import React, { useState } from "react";
import { Modal, ModalBody, ModalTitle, ModalFooter } from "nice-react-modal";
import Db from '../db/init';
import { Project } from "../utils/types";

interface Props {
  onClose: () => void
  onRenameProject: () => void
  project: Project
}

export default function RenameProjectModal({ onClose, onRenameProject, project }: Props) {

   const [name, setName] = useState(project.name)

   const handleAddProject: (e: React.FormEvent<HTMLFormElement>) => void = (e) => {
     if(!name){
      return;
     }
    new Db().projects.update(project.id as number, { name });
    onClose();
    onRenameProject()
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
            value={name}
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
              Save changes
            </button>
          )
        }
      </ModalFooter>
    </Modal>
  );
}
