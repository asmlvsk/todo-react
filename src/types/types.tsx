export interface ITodo {
  title: string;
  body: string;
  is_done: boolean;
}

export interface ITodos {
  id: number;
  attributes: ITodo;
}
