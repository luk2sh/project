import { AuthGuard } from '@nestjs/passport';
import { AuthStrategyEnum } from '../enums';

export class IntermediateGuard extends AuthGuard(AuthStrategyEnum.JWT_INTERMEDIATE) {
	constructor() {
		super();
	}
}
