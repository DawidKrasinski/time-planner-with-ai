import { Priority } from "../entities/Priority";
import { getDataSource } from "../data-source";

const priorities: Partial<Priority>[] = [
  { name: "low", color: "green", order: 1 },
  { name: "medium", color: "yellow", order: 2 },
  { name: "hard", color: "red", order: 3 },
];

async function seedPriorities() {
  const dataSource = await getDataSource();

  await dataSource.initialize(); //?

  for (const p of priorities) {
    const existing = await dataSource
      .getRepository(Priority)
      .findOneBy({ name: p.name });
    if (!existing) {
      await dataSource.getRepository(Priority).save(p);
    }
  }

  console.log("Priorities seeded successfully!");
  await dataSource.destroy();
}

seedPriorities().catch((err) => console.error(err));
