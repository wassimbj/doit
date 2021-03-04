import React, { useState } from "react";
import Db from "../db/init";
import { Project } from "../utils/types";
import RenameProjectModal from "./RenameProjectModal";

interface Props {
  onRenameProject: () => void;
  project: Project;
}

export default function ProjectDropdown({ onRenameProject, project }: Props) {
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);

  const deleteProject = () => {
    new Db().projects.delete(project.id as number);
    onRenameProject()
  }

  return (
    <>
      <div className="absolute top-full left-0 w-full z-50">
        <div className="bg-gray-700 shadow-md text-gray-100 p-1 rounded-lg text-sm">
          <span onClick={deleteProject} className="block text-center px-2 py-1 hover:bg-gray-600 rounded-lg">
            Delete
          </span>
          <span onClick={() => setIsRenameModalOpen(true)} className="block text-center px-2 py-1 hover:bg-gray-600 rounded-lg">
            Rename
          </span>
        </div>
      </div>

      {isRenameModalOpen && (
        <RenameProjectModal
          onClose={() => setIsRenameModalOpen(false)}
          onRenameProject={onRenameProject}
          project={project}
        />
      )}
    </>
  );
}
