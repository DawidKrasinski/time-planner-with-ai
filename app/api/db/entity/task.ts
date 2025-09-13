import "reflect-metadata";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  // ManyToOne,
  // DeleteDateColumn,
} from "typeorm";
import { Priority } from "./priority";
// import { Priority } from "./priority";

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name: string;

  @Column("datetime")
  startTime: Date;

  @Column("datetime")
  endTime: Date;

  @Column("date", { nullable: true })
  doneDate: string | null = null;

  //   @Column({ length: 500 })
  //   description: string;

  @ManyToOne(() => Priority, (priority) => priority.tasks)
  priority: number;

  // @DeleteDateColumn()
  // deleteAt: Date | null = null;

  constructor(
    name?: string,
    priority?: number,
    startTime?: Date,
    endTime?: Date
  ) {
    super();
    this.name = name ?? "";
    this.startTime = startTime ?? new Date();
    this.endTime = endTime ?? new Date();
    this.priority = priority ?? 0;
  }
}
