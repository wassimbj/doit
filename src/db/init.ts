import Dexie from 'dexie';
import {Todo, Project} from '../utils/types';

class Db extends Dexie {
   // tables
   public todos: Dexie.Table<Todo, number>; 
   public projects: Dexie.Table<Project, number>; 

   public constructor() {
      super("Db");
      this.version(2).stores({
          todos: "++id,desc,tags,color,project_id",
          projects: "++id,name",
      });
      this.todos = this.table("todos");
      this.projects = this.table("projects");
  }
}

export default Db;
