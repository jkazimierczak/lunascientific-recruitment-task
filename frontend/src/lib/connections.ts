export function getStatesFromConnections(isSocketConnected: boolean, isServerConnected: boolean) {
	const isConnected = isServerConnected && isSocketConnected;
	const isOnlyServerConnected = isServerConnected && !isSocketConnected;
	const isOnlySocketConnected = !isServerConnected && isSocketConnected;
	const isDisconnected = !isServerConnected && !isSocketConnected;

	return {
		isSocketConnected,
		isServerConnected,
		isConnected,
		isDisconnected,
		isOnlySocketConnected,
		isOnlyServerConnected,
	};
}
