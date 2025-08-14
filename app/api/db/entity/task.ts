import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name: string;

  @Column("date")
  date: Date;

  @Column({ length: 5 })
  startTime: string;

  @Column({ length: 5 })
  endTime: string;

  @Column("date", { nullable: true })
  doneDate: Date | null = null;

  //   @Column({ length: 500 })
  //   description: string;

  //   @ManyToOne(() => Priority, (priority) => priority.tasks)
  //   priority: Priority;

  //   @DeleteDateColumn()
  //   deleteAt: Date | null = null;

  constructor(
    name?: string,
    date?: Date,
    startTime?: string,
    endTime?: string
  ) {
    super();
    this.name = name ?? "";
    this.date = date ?? new Date();
    this.startTime = startTime ?? "";
    this.endTime = endTime ?? "";
  }
}
