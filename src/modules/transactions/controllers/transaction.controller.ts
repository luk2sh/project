import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
	TransactionRequest,
	HttpUser,
	IJwtPayload,
	LoggerApi,
	TransactionResponse,
	FindAllTransactionRequest,
} from 'src/common';
import { TransactionService } from '../services/transaction.service';

@ApiTags('transactions')
@LoggerApi()
@ApiBearerAuth()
@Controller('transaction')
export class TransactionController {
	constructor(private readonly transactionService: TransactionService) {}

	@Post()
	@ApiResponse({ type: TransactionResponse })
	@ApiOperation({ summary: '[CreateTransaction]', description: 'Create transaction' })
	@HttpCode(HttpStatus.OK)
	async create(
		@Body() dto: TransactionRequest,
		@HttpUser() user: IJwtPayload
	): Promise<TransactionResponse> {
		return this.transactionService.create(dto, user.id);
	}

	@Get(':id')
	@ApiResponse({ type: TransactionResponse })
	@ApiOperation({
		summary: '[GetTransactionById]',
		description: 'Get transaction by Id',
	})
	@HttpCode(HttpStatus.OK)
	async getById(
		@Param('id') id: string,
		@HttpUser() user: IJwtPayload
	): Promise<TransactionResponse> {
		return this.transactionService
			.getById(id, user.id)
			.then(TransactionResponse.mapFrom);
	}

	@Get()
	@ApiResponse({ type: TransactionResponse, isArray: true })
	@ApiOperation({ summary: '[GetAllTransaction]', description: 'Get all transaction' })
	@HttpCode(HttpStatus.OK)
	async getAll(
		@HttpUser() user: IJwtPayload,
		@Query() dto: FindAllTransactionRequest
	): Promise<TransactionResponse[]> {
		return this.transactionService
			.getAll(user.id, dto)
			.then(TransactionResponse.mapFromMulti);
	}

	@Delete('id')
	@ApiOperation({
		summary: '[DeleteTransactionById]',
		description: 'Delete transaction by Id',
	})
	@HttpCode(HttpStatus.OK)
	async delete(@Param('id') id: string): Promise<void> {
		await this.transactionService.delete(id);
	}
}
