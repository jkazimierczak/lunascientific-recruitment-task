export type ModuleInfo = {
	id: string;
	name: string;
	description?: string;
	available: boolean;
	targetTemperature: number;
};

export type ModuleSocketInfo = {
	id: string;
	temperature: number;
};

export type ModuleTemperatureReading = Map<ModuleSocketInfo["id"], ModuleSocketInfo["temperature"]>;
