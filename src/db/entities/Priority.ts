import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  Index,
} from "typeorm";
import { Task } from "./Task";

@Entity()
export class Priority extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @Column({ default: "#ffffff" })
  color!: string;

  @Column({ name: "order", type: "int", default: 0 })
  @Index()
  order!: number;

  @OneToMany(() => Task, (task) => task.priority, { lazy: true })
  tasks?: Promise<Task[]>;

  constructor(name?: string, order?: number, color?: string) {
    super();
    this.name = name || "";
    this.order = order || 0;
    this.color = color || "#ffffff";
  }
}
