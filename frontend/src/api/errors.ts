type ErrorOptions = {
	cause?: unknown;
};

class ApplicationError extends Error {
	constructor(message: string, options?: ErrorOptions) {
		super(message, options);
		this.name = this.constructor.name;
		Object.setPrototypeOf(this, new.target.prototype);
	}
}

export class ApiError extends ApplicationError {
	constructor(message: string, options?: ErrorOptions) {
		super(message, options);
	}
}
