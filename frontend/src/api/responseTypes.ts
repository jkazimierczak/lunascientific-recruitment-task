export type ModuleInfo = {
	id: string;
	name: string;
	description?: string;
	available: boolean;
	targetTemperature: number;
};

export type ModuleInfoPatch = Pick<ModuleInfo, "name" | "description" | "targetTemperature">;
