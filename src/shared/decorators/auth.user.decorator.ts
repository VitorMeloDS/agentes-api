import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthUser = createParamDecorator((data: keyof any, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest();

	return request.user;
});
