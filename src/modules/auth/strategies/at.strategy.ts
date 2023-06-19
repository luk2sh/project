import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthStrategyEnum, JwtPayload } from 'src/common';
import { PassportStrategy } from '@nestjs/passport';
import { getAuthConfig } from 'src/config';

export class AtStrategy extends PassportStrategy(Strategy, AuthStrategyEnum.JWT) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: getAuthConfig().atSecret,
		});
	}

	async validate(payload: JwtPayload) {
		return payload;
	}
}
