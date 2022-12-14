import { atom } from "recoil";
import { addDays } from "date-fns";

export const infoState = atom({
  key: "information",
  default: {
    name: "수나롭다",
    member: "김상민, 안영훈, 이예린, 이진형",
  },
});
export interface ICategory {
  id: number;
  categoryIndex: number;
  part: string;
  topic: string;
  contents: string;
  commentCounts: number;
}

export interface ICategoryState {
  [key: string]: ICategory[];
}

export const categoryState = atom<ICategoryState>({
  key: "category",
  default: {
    plan: [],
    design: [],
    frontend: [],
    backend: [],
  },
});

// interface ITodo {
//   id: number;
//   text: string;
// }

export interface IToDo {
  id: number;
  categoryIndex: number;
  part: string;
  topic: string;
  contents: string;
  commentCounts: number;
}
export interface IToDoState {
  [key: string]: IToDo[];
}

export const toDoState = atom<IToDoState>({
  key: "boards",
  default: {
    todo: [],
    doing: [],
    review: [],
    done: [],
  },
});

export const newCardState = atom<string | null>({
  key: "new",
  default: null,
});

export const activeState = atom({
  key: "active",
  default: "0",
});

export interface IDate {
  startDate?: Date;
  endDate?: Date;
  key?: string;
}

export const dateState = atom<IDate[]>({
  key: "date",
  default: [
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ],
});
