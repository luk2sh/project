import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { getMailer } from 'src/config';
import { ContactUsRequest, SignInDto, LoggerServiceDecorator } from 'src/common';
import { User } from 'src/models';
import * as path from 'path';

@Injectable()
export class MailService {
	private readonly logger = new Logger(MailService.name);
	private readonly email: string;
	private readonly pathToTemplates: string;
	constructor(private readonly mailerService: MailerService) {
		const { getEmail } = getMailer();
		this.email = getEmail;
		this.pathToTemplates = 'dist/modules/mail/templates/';
	}

	@LoggerServiceDecorator()
	async sendContactUs(request: ContactUsRequest) {
		await this.mailerService.sendMail({
			to: this.email,
			from: `${request.email}`,
			template: path.resolve(this.pathToTemplates, 'contact-us'),
			subject: 'Contact with me',
			context: {
				request,
			},
		});
	}

	@LoggerServiceDecorator()
	async sendForgotPassword(user: User, link: string) {
		await this.mailerService.sendMail({
			to: user.email,
			from: this.email,
			template: path.resolve(this.pathToTemplates, 'forgot-password'),
			subject: 'Forgot password',
			context: {
				user,
				link,
			},
		});
	}

	async sendGoogleSignUp(request: SignInDto) {
		await this.mailerService.sendMail({
			to: request.email,
			from: this.email,
			template: path.resolve(this.pathToTemplates, 'google-sing-up'),
			subject: 'Google Sign Up',
			context: {
				request,
			},
		});
	}
}
