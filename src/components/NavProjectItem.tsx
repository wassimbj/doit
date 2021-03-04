import React, { useState } from 'react'
import { MoreHorizontal } from 'react-feather'
import { Project } from '../utils/types'
import ProjectDropdown from './ProjectDropdown'

interface Props {
   onSelectProject: (id: number | undefined) => void
   onRenameProject: () => void
   project: Project
   selectedProject: number | undefined
}

export default function NavProjectItem({ onSelectProject, onRenameProject, project, selectedProject }: Props) {

   const [isDropdownOpen, setIsDropdownOpen] = useState(false)

   return (
      <div
         onClick={() => {
            window.localStorage.setItem('activeProject', project.id as unknown as string)
            onSelectProject(project.id)
         }}
         className={`cursor-pointer whitespace-nowrap relative flex items-center text-gray-300 px-4 py-3 border-r border-gray-600 ${selectedProject === project.id ? 'bg-gray-900 text-white' : 'hover:bg-gray-600 bg-gray-700'}`}
      >
         {project.name}

         <MoreHorizontal
            className="text-gray-500 p-1 rounded-md hover:bg-gray-800 cursor-pointer ml-3"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
         />

         { isDropdownOpen && <ProjectDropdown project={project} onRenameProject={onRenameProject} /> }
      </div>
   )
}

