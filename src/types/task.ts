import { Priority } from "../db/entities/Priority";
import { Categories } from "./categories";

export type task = {
  id?: number;
  name: string;
  doneDate: string | null;
  startTime: string;
  endTime: string;
  priority: Priority;
  categories: Categories[];
};
