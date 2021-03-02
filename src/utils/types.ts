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
   color: Colors,
   desc: string,
   tags: Array<string>
}

export interface Todo {
   id?: number,
   desc: string,
   tags?: Array<string>,
   color: string,
   project_id: number
}

export interface Project {
   id?: number,
   name: string,
}
