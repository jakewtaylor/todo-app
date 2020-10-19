export type Board = {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
};

export type Column = {
  id: number;
  created_at: string;
  updated_at: string;
  board_id: number;
  name: string;
};

export type Card = {
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  body: string;
  column_id: number;
};

export type FullColumn = Column & {
  cards: Card[];
};

export type FullBoard = Board & {
  columns: FullColumn[];
};
