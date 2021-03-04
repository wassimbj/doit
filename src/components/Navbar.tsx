import React, { useEffect, useState } from "react";
import { MoreHorizontal, Plus } from "react-feather";
import Db from "../db/init";
import { Project } from "../utils/types";
import AddProjectModal from "./AddProjectModal";
import NavProjectItem from "./NavProjectItem";

interface Props {
  onSelectProject: (id: number | undefined) => void;
  selectedProject: number | undefined
}

export default function Navbar({ onSelectProject, selectedProject }: Props) {
  const [projects, setProjects] = useState<Array<Project>>([]);
  const [newProjectAdded, setNewProjectAdded] = useState(false)
  const [isSomethingUpdated, setSomethingUpdated] = useState<boolean>(false)

  useEffect(() => {
    (async function() {
      const projects: Array<Project> = await new Db().projects.toArray(); 
      setProjects(projects);

      if(projects.length === 0){
        window.localStorage.removeItem('activeProject');
      }
    }())
    return () => setNewProjectAdded(false);
  }, [newProjectAdded]);
  return (
    <>
    <div className="bg-gray-800 mb-5 sticky top-0">
      <div className="flex flex-wrap z-50">
        {
          projects.map((obj) => (
            <NavProjectItem
              onSelectProject={onSelectProject}
              project={obj}
              selectedProject={selectedProject}
              onRenameProject={() => setNewProjectAdded(true)}
            />
          ))
        }
        <span
          onClick={() => setSomethingUpdated(true)}
          className="px-4 py-3 border-r border-gray-600 bg-blue-500 hover:bg-blue-600 transition cursor-pointer text-gray-300 inline-block">
          <Plus />
        </span>
      </div>
    </div>
    { isSomethingUpdated && 
      <AddProjectModal
        onClose={() => setSomethingUpdated(false)}
        onAddNewProject={() => setNewProjectAdded(true)}
      />
    }
    </>
  );
}
