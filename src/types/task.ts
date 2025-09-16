import { Categories } from "./categories";

export type task = {
  id?: number;
  name: string;
  doneDate: string | null;
  startTime: string;
  endTime: string;
  priority: number;
  categories: Categories[];
};
