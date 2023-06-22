export interface TaskType {
    id: string,
    created: string,
    name: string,
    description: string,
    category: string,
    term: string,
    state: string,
    note: string
}

export type FormValues = {
    nazov: string
    popis: string
    kategoria: string
    poznamka: string
    termin: string
  }