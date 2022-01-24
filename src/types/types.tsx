export interface ITodos {
  id: number;
  attributes: {
    title: string;
    body: string;
    is_done: boolean;
  };
}
