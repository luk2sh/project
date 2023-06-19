import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthStrategyEnum } from 'src/common';
import { getAuthConfig } from 'src/config';
import { Request } from 'express';

export class IntermediateStrategy extends PassportStrategy(
	Strategy,
	AuthStrategyEnum.JWT_INTERMEDIATE
) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: getAuthConfig().intermediateSecret,
			passReqToCallback: true,
		});
	}

	async validate(req: Request, payload: any) {
		const intermediateToken = req.get('authorization').replace('Bearer', '').trim();
		const code = req.params?.code;
		return { ...payload, code, intermediateToken };
	}
}
