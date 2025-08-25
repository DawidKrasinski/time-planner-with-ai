import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { Priority } from "./priority";

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
  priority: Priority;

  //   @DeleteDateColumn()
  //   deleteAt: Date | null = null;

  constructor(
    name?: string,
    startTime?: Date,
    endTime?: Date,
    priority?: Priority
  ) {
    super();
    this.name = name ?? "";
    this.startTime = startTime ?? new Date();
    this.endTime = endTime ?? new Date();
    this.priority = priority ?? new Priority();
  }
}
