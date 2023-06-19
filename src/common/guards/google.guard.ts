import { AuthGuard } from '@nestjs/passport';
import { AuthStrategyEnum } from '../enums';
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { getGoogleAudience } from 'src/config';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class GoogleGuard extends AuthGuard(AuthStrategyEnum.GOOGLE) {
	private googleAudience: string;
	private client: OAuth2Client;

	constructor() {
		super();
		this.googleAudience = getGoogleAudience();
		this.client = new OAuth2Client();
	}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const accessToken = request.headers.authorization?.split(' ')[1];

		if (!accessToken) {
			throw new UnauthorizedException('Invalid auth headers');
		}

		try {
			const ticket = await this.client.verifyIdToken({
				idToken: accessToken,
				audience: this.googleAudience,
			});
			const payload = ticket.getPayload();

			const audCorrespondsGoogleAudience = payload.aud === this.googleAudience;

			if (!audCorrespondsGoogleAudience) {
				throw new Error('Invalid token');
			}

			request.user = payload;
			return true;
		} catch (err) {
			console.error(err);
			return false;
		}
	}
}
