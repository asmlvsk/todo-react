export interface ITodo {
  title: string;
  body: string;
  is_done: boolean;
}

export interface ITodos {
  id: number;
  attributes: ITodo;
}

export interface IUser {
  id: number;
  attributes: IUserBody;
}

export interface IUserBody {
  name: string;
  email: string;
  password: string;
}
