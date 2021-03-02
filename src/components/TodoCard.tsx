import React from 'react';
import { TodoCardProps } from '../utils/types'; 
import colorPalette from '../utils/palette';

export default function TodoCard({ color, desc, tags }: TodoCardProps) {
  const theme: {bg: string, color: string} = colorPalette[color];
   return (
      <div
         className="shadow-md px-3 pt-5 pb-2 rounded-lg"
         style={{
            color: theme.color,
            background: theme.bg
         }}
      >
         {desc}
         <br />
         <div className="flex items-center flex-wrap mt-5">
            {tags.map(tag => (
               <span className="bg-white opacity-30 text-black inline-block px-3 rounded-full mx-1">
                  {tag}
               </span>
            ))}
         </div>
      </div>
   )
}
