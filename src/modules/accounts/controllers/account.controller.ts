import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Patch,
	Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccountService } from '../services/account.service';
import {
	HttpUser,
	IJwtPayload,
	CreateAccountRequest,
	LoggerApi,
	AccountDto,
} from 'src/common';
import { AccountResponse } from 'src/common';

@Controller('accounts')
@ApiTags('accounts')
@ApiBearerAuth()
@LoggerApi()
export class AccountController {
	constructor(private readonly accountService: AccountService) {}

	@Post()
	@ApiOperation({ summary: '[AddAccount]', description: 'Add account for user' })
	@ApiResponse({ type: AccountResponse })
	@HttpCode(HttpStatus.OK)
	async addAccount(
		@HttpUser() user: IJwtPayload,
		@Body() account: CreateAccountRequest
	): Promise<AccountResponse> {
		return this.accountService
			.addAccount(user.id, account)
			.then(AccountResponse.mapFrom);
	}

	@Get()
	@ApiOperation({ summary: '[getUserAccounts]', description: 'get user accounts' })
	@ApiResponse({ type: AccountResponse, isArray: true })
	@HttpCode(HttpStatus.OK)
	async getUserAccounts(@HttpUser() user: IJwtPayload): Promise<AccountResponse[]> {
		return this.accountService.getUserAccounts(user.id);
	}

	@Get(':id')
	@ApiOperation({ summary: '[getById]', description: 'Get account by id' })
	@ApiResponse({ type: AccountResponse })
	@HttpCode(HttpStatus.OK)
	async getById(
		@Param('id') id: string,
		@HttpUser() user: IJwtPayload
	): Promise<AccountResponse> {
		return this.accountService.getById(id, user.id);
	}

	@Patch(':id')
	@ApiOperation({ summary: '[UpdateAccount]', description: 'Update account' })
	@ApiResponse({ type: AccountResponse })
	@HttpCode(HttpStatus.OK)
	async update(
		@Body() data: AccountDto,
		@Param('id') id: string
	): Promise<AccountResponse> {
		return this.accountService.update(data, id).then(AccountResponse.mapFrom);
	}

	@Delete(':id')
	@ApiOperation({
		summary: '[DeleteAccountForUser]',
		description: 'Delete account for user',
	})
	@HttpCode(HttpStatus.OK)
	async removeAccountForUser(@HttpUser() user: IJwtPayload, @Param('id') id: string) {
		await this.accountService.removeAccountForUser(user.id, id);
	}
}
