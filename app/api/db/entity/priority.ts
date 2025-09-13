import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  // OneToMany,
  // DeleteDateColumn,
} from "typeorm";
import { Task } from "./task";
// import { Task } from "./task";

@Entity()
export class Priority extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ default: "#ffffff" })
  color!: string;

  @Column({ name: "order", type: "int", default: 0 })
  order!: number;

  @OneToMany(() => Task, (task) => task.priority)
  tasks!: Task[];

  constructor(name: string, order: number, color: string) {
    super();
    this.name = name;
    this.order = order;
    this.color = color;
  }
}
