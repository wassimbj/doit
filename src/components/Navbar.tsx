import React, { useEffect, useState } from "react";
import { MoreHorizontal, Plus } from "react-feather";
import Db from "../db/init";
import { Project } from "../utils/types";
import AddProjectModal from "./AddProjectModal";

export default function Navbar() {
  const [projects, setProjects] = useState<Array<Project>>([]);
  const [newProjectAdded, setNewProjectAdded] = useState(false)
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState<boolean>(false)
  useEffect(() => {
    new Db().projects.toArray().then(projects => {
      setProjects(projects);
    })

    return () => setNewProjectAdded(false);
  }, [newProjectAdded]);
  return (
    <>
    <div className="bg-gray-800 mb-5 sticky top-0 flex z-50">
      {
        projects.map((obj) => (
          <div className="flex items-center text-gray-300 px-4 py-3 border-r border-gray-600 bg-gray-700 inline-block">
            {obj.name}
            <MoreHorizontal className="text-gray-500 p-1 rounded-md hover:bg-gray-800 cursor-pointer ml-3" />
          </div>
        ))
      }
      <span
        onClick={() => setIsAddProjectModalOpen(true)}
        className="px-4 py-3 border-r border-gray-600 bg-blue-500 hover:bg-blue-600 transition cursor-pointer text-gray-300 inline-block">
        <Plus />
      </span>
    </div>
    { isAddProjectModalOpen && 
      <AddProjectModal
        onClose={() => setIsAddProjectModalOpen(false)}
        onAddNewProject={() => setNewProjectAdded(true)}
      />
    }
    </>
  );
}
