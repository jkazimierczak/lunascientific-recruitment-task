import { z } from "zod";

export const moduleParamsSchema = z.object({
	name: z.string(),
	description: z.string(),
	targetTemperature: z.coerce.number().min(0).max(40),
});
