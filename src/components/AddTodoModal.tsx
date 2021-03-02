import React, { useState } from "react";
import { Modal, ModalBody, Title, ModalFooter } from "nice-react-modal";
import {colorsAvailabe} from '../utils/palette';
import Db from '../db/init';

interface Props {
  onClose: () => void;
}

export default function AddTodoModal({ onClose }: Props) {

   const [desc, setDesc] = useState('')
   const [tags, setTags] = useState('')
   const [color, setColor] = useState('')

   const handleAddTodo: (e: React.FormEvent<HTMLFormElement>) => void = (e) => {
      // console.log(desc, tags, color);
      e.preventDefault()
   }

  return (
    <Modal onClose={onClose}>
      <Title> Add a Todo </Title>
      <ModalBody>
        <form id="reportForm" onSubmit={handleAddTodo}>
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
            onChange={(e) => setColor(e.target.value)}
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
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-full px-3 py-1 hover:bg-blue-600 transition"
          form="reportForm"
        >
          Create
        </button>
      </ModalFooter>
    </Modal>
  );
}
