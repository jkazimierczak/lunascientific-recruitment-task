import { z } from "zod";

export const moduleEditSchema = z.object({
	name: z.string().min(1, "Module must have name"),
	description: z.string().min(1, "Module must have description"),
	targetTemperature: z.coerce
		.number({ required_error: "Module must have target temperature specified" })
		.min(0)
		.max(40),
});

export type ModuleEditSchema = z.infer<typeof moduleEditSchema>;

export const defaultModuleEditValues: ModuleEditSchema = {
	name: "",
	description: "",
	targetTemperature: 0,
};
