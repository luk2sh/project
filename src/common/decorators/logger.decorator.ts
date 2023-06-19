import { applyDecorators, UseGuards } from '@nestjs/common';
import { LoggerGuard } from 'src/common';

export const LoggerApi = (): ((...arg: any[]) => void) => {
	return applyDecorators(UseGuards(LoggerGuard));
};
