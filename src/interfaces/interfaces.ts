export interface IKeyValue {
  id: number;
}

export interface ITodo {
  title: string;
  body: string;
  is_done: boolean;
}

export interface ITodos extends IKeyValue {
  attributes: ITodo;
  relationships: {
    categories: {
      data: IKeyValue[];
    };
  };
}

export interface IUserBody {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface IUserLoginBody {
  email: string;
  password: string;
}

export interface IUserName {
  name: string;
}

export interface ICategory extends IKeyValue {
  attributes: ICategoryBody;
}

export interface ICategoryBody {
  title: string;
}
