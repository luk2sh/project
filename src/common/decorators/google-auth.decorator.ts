import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { GoogleGuard } from '../guards';

export const GoogleAuth = () => {
	return applyDecorators(SetMetadata('isPublic', true), UseGuards(GoogleGuard));
};
