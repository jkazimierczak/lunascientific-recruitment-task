export const baseApiUrl = new URL("http://localhost:3001");

// GET	/ping
//		Pong!
export const apiPongUrl = new URL("/ping", baseApiUrl);

// GET	/modules
//		Get all modules data.
// POST	/modules
//		Create new module.
export const apiModulesUrl = new URL("/modules", baseApiUrl);

// GET	/modules/:id
//		Get particular module data.
// PATCH /modules/:id
//		 Update parameters of particular module.
export const getApiModuleUrl = (id: string) =>
	new URL(apiModulesUrl.pathname + `/${id}`, baseApiUrl);
