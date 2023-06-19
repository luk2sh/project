import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/models';

export const HttpUser = createParamDecorator(
	(data: unknown, ctx: ExecutionContext): User => {
		const request = ctx.switchToHttp().getRequest();
		return request.user;
	}
);
