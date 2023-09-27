import { useEffect, useState } from "react";
import { socket } from "@/api/modules/socket";
import { type ModuleSocketInfo, type ModuleTemperatureReading } from "@/api/types";

export function useSocketData() {
	const [isConnected, setIsConnected] = useState(socket.connected);
	const [temperatureReading, setTemperatureReading] = useState<ModuleTemperatureReading>();

	useEffect(() => {
		function onConnect() {
			setIsConnected(true);
		}

		function onDisconnect() {
			setIsConnected(false);
		}

		function onEvent(value: ModuleSocketInfo[]) {
			const data: Map<string, number> = new Map();
			value.forEach((module) => data.set(module.id, module.temperature));

			setTemperatureReading(data);
		}

		socket.on("connect", onConnect);
		socket.on("disconnect", onDisconnect);
		socket.on("moduleUpdate", onEvent);

		return () => {
			socket.off("connect", onConnect);
			socket.off("disconnect", onDisconnect);
			socket.off("moduleUpdate", onEvent);
		};
	}, []);

	function getModuleReadingById(id: string) {
		if (!temperatureReading) return null;

		return temperatureReading.get(id) ?? null;
	}

	return { isConnected, temperatureReading, getModuleReadingById };
}
