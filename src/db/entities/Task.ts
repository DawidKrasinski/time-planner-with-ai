import "reflect-metadata";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  Index,
} from "typeorm";
import { Priority } from "./Priority";
import { Categories } from "../../types/categories";

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @Index()
  name: string;

  @Column("datetime")
  @Index()
  startTime: string;

  @Column("datetime")
  @Index()
  endTime: string;

  @Column("simple-array")
  categories: Categories[];

  @Column("date", { nullable: true })
  @Index()
  doneDate: string | null = null;

  @ManyToOne(() => Priority, (priority) => priority.tasks, { eager: false })
  priority: Priority | null;

  constructor(
    name?: string,
    priority?: Priority,
    startTime?: string,
    endTime?: string,
    categories?: Categories[]
  ) {
    super();
    this.name = name ?? "";
    this.priority = priority ?? null;
    this.startTime = startTime ?? "";
    this.endTime = endTime ?? "";
    this.categories = categories ?? [Categories.Microtask];
  }
}
