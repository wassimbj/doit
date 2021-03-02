export type Colors =
| "yellow"
| "green"
| "teal"
| "blue"
| "purple"
| "violet"
| "red"
| "orange";


export interface PaletteInfo {
   bg: string,
   color: string
}

export type Palette = Record<Colors, PaletteInfo>

export interface TodoCardProps {
   id: number | undefined,
   color: Colors,
   desc: string,
   tags?: Array<string>,
   onDeleteTodo: () => void
}

export interface Todo {
   id?: number,
   desc: string,
   tags?: Array<string>,
   color: Colors,
   project_id: number | undefined
}

export interface Project {
   id?: number,
   name: string,
}
