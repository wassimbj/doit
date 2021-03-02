import React from "react";
import { TodoCardProps } from "../utils/types";
import colorPalette from "../utils/palette";
import { Trash2 } from "react-feather";
import Db from "../db/init";

export default function TodoCard({
  id,
  color,
  desc,
  tags,
  onDeleteTodo,
}: TodoCardProps) {
  const theme: { bg: string; color: string } = colorPalette[color];

  const deleteTodo = () => {
    new Db().todos.delete(id as number);
    onDeleteTodo();
  };

  return (
    <div
      className="relative shadow-md px-3 pt-5 pb-2 rounded-lg break-words"
      style={{
        color: theme.color,
        background: theme.bg,
      }}
    >
      <span
        onClick={deleteTodo}
        className="absolute right-0 top-0 p-1 rounded-lg bg-gray-200 text-black hover:bg-gray-300 transition cursor-pointer"
      >
        <Trash2 size={17} />
      </span>
      <p>{desc}</p>
      <br />
      {tags !== undefined ? (
        <div className="flex items-center flex-wrap mt-5">
          {tags.map((tag) => (
            <span className="bg-white opacity-30 text-black inline-block px-3 rounded-full mr-1 mb-1">
              {tag}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
