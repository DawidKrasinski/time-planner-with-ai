import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  DeleteDateColumn,
} from "typeorm";
import { Task } from "./task";

@Entity()
export class Priority extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  color!: string;

  @Column("int")
  order!: number;

  @OneToMany(() => Task, (task) => task.priority)
  tasks!: Task[];

  constructor(order?: number, color?: string) {
    super();
    this.order = order ?? 0;
    this.color = color ?? "";
  }
}
