import { NextResponse } from "next/server";
import { getDataSource } from "../db/data-source";
import { Task } from "../db/entity/task";

export async function GET() {
  try {
    getDataSource();
    const tasks = await Task.createQueryBuilder("task")
      //.leftJoinAndSelect("task.priority", "priority")
      // .orderBy("task.doneDate", "ASC")
      //.addOrderBy("task.priority", "DESC")
      .addOrderBy("task.startTime", "ASC")
      .getMany();

    return NextResponse.json(tasks);
  } catch (error) {
    console.log("cant use get method", error);
    return NextResponse.json({ error: "cant use get method" }, { status: 500 });
  }
}
