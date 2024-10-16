export interface Folder {
  id: string;
  title: string;
  flashcards: any[];
  createdAt: string;
}

export type Flashcard = {
  id: string;
  term: string;
  definition: string;
  count?: number;
};

export type HandleInputChange = (
  id: string,
  field: keyof Flashcard,
  value: string
) => void;
