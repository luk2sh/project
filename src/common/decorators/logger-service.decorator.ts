import { ExecutionContext, Logger } from '@nestjs/common';

export const LoggerServiceDecorator = (): MethodDecorator => {
	return (
		target: unknown,
		propertyKey: string | symbol,
		descriptor: PropertyDescriptor
	) => {
		const originalMethod = descriptor.value;
		descriptor.value = async function (...args: any[]) {
			const context: ExecutionContext[] = [...args];
			const serviceInstance = await this.logger?.context;
			const logger = new Logger();
			logger.log(
				`Service: [${serviceInstance}] Method: {${propertyKey.toString()}} Arguments: [${context}]`
			);

			return originalMethod.apply(this, args);
		};
		return descriptor;
	};
};
