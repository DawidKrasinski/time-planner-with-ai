import "reflect-metadata";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { Priority } from "./priority";
import { Categories } from "../../../../types/categories";

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name: string;

  @Column("datetime")
  startTime: string;

  @Column("datetime")
  endTime: string;

  @Column("simple-array")
  categories: Categories[];

  @Column("date", { nullable: true })
  doneDate: string | null = null;

  @ManyToOne(() => Priority, (priority) => priority.tasks)
  priority: number;

  constructor(
    name?: string,
    priority?: number,
    startTime?: string,
    endTime?: string,
    categories?: Categories[]
  ) {
    super();
    this.name = name ?? "";
    this.startTime = startTime ?? "";
    this.endTime = endTime ?? "";
    this.priority = priority ?? 0;
    this.categories = categories ?? [Categories.Microtask];
  }
}
