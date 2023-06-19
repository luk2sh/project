import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoggerApi, Public } from 'src/common';
import { ContactUsRequest } from 'src/common';
import { MailService } from '../services/mail.service';

@ApiBearerAuth()
@Controller('mail')
@ApiTags('mail')
@LoggerApi()
export class MailController {
	constructor(private mailService: MailService) {}

	@Public()
	@Post('contact-us')
	@ApiOperation({ summary: '[ContactUs]', description: 'Contact Us' })
	@HttpCode(HttpStatus.OK)
	async contactUs(@Body() request: ContactUsRequest) {
		await this.mailService.sendContactUs(request);
	}
}
