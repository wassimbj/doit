import React, { useState } from "react";
import { Modal, ModalBody, Title, ModalFooter } from "nice-react-modal";
import {colorsAvailabe} from '../utils/palette';
import Db from '../db/init';
import { Colors } from "../utils/types";

interface Props {
  onClose: () => void;
  onAddedNewTodo: () => void;
  projectId: number | undefined
}

export default function AddTodoModal({ projectId, onClose, onAddedNewTodo }: Props) {

   const [desc, setDesc] = useState<string>('')
   const [tags, setTags] = useState<string>('')
   const [color, setColor] = useState<Colors>('blue')

   const handleAddTodo: (e: React.FormEvent<HTMLFormElement>) => void = (e) => {
     if(!desc){
       return;
     }
      const tagsh = tags.split(',');
      new Db().todos.add({
        color,
        desc,
        tags: tagsh,
        project_id: projectId,
      });
      onClose();
      onAddedNewTodo();
      e.preventDefault();
   }

  return (
    <Modal onClose={onClose}>
      <Title> Add a Todo </Title>
      <ModalBody>
        <form id="addTodo" onSubmit={handleAddTodo}>
          <textarea
            rows={7}
            onChange={(e) => setDesc(e.target.value)}
            name="desc"
            className="p-2 border border-gray-600 focus:border-gray-500 rounded-lg bg-gray-700 w-full block focus:outline-none"
            placeholder="write what todo..."
         />
         <input
            className="mt-5 p-2 border border-gray-600 focus:border-gray-500 rounded-lg bg-gray-700 w-full block focus:outline-none"
            onChange={(e) => setTags(e.target.value)}
            name="tags"
            placeholder="tags, e.g: user, add, fix..."
         />
         <select
            className="mt-5 p-2 border border-gray-600 focus:border-gray-500 rounded-lg bg-gray-700 w-full block focus:outline-none cursor-pointer"
            name="color"
            onChange={(e) => setColor(e.target.value as Colors)}
         >
            <option value="" disabled selected className="text-gray-600">select note color</option>
            {colorsAvailabe.map(color => (
               <option value={color}>{color}</option>
            ))}
         </select>
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
          !desc ? (
            <span
              className="inline-block bg-blue-500 text-white rounded-full px-3 py-1 opacity-50 transition"
            >
              Create
            </span>
          ) : (
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-full px-3 py-1 hover:bg-blue-600 transition"
              form="addTodo"
            >
              Create
            </button>
          )
        }
      </ModalFooter>
    </Modal>
  );
}
