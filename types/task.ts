export type task = {
  id?: number;
  name: string;
  doneDate: string | null;
  startTime: Date;
  endTime: Date;
  priority: number;
};
