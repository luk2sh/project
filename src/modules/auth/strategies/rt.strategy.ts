import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthStrategyEnum } from 'src/common';
import { getAuthConfig } from 'src/config';
import { Request } from 'express';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, AuthStrategyEnum.JWT_REFRESH) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: getAuthConfig().rtSecret,
			passReqToCallback: true,
		});
	}

	async validate(req: Request, payload: any) {
		const refreshToken = req.get('authorization').replace('Bearer', '').trim();
		return { ...payload, refreshToken };
	}
}
