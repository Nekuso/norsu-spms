import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  department: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
  requestedBy: z.string(),
  noItems: z.number(),
  kind: z.string(),
  mode: z.string(),
});

export type Task = z.infer<typeof taskSchema>;
