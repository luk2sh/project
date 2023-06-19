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
import {
	LoggerApi,
	SubcategoryDto,
	SubcategoryResponse,
	UpdateSubcategoryRequest,
} from 'src/common';
import { SubcategoriesService } from '../services/subcategories.service';

@ApiBearerAuth()
@ApiTags('subcategory')
@Controller('subcategory')
@LoggerApi()
export class SubcategoriesController {
	constructor(private readonly subcategoriesService: SubcategoriesService) {}

	@Post()
	@ApiOperation({ summary: '[CreateSubcategory]', description: 'Create Subcategory' })
	@ApiResponse({ type: SubcategoryResponse })
	@HttpCode(HttpStatus.OK)
	async createSubcategory(@Body() dto: SubcategoryDto): Promise<SubcategoryResponse> {
		return this.subcategoriesService
			.createSubcategory(dto)
			.then(SubcategoryResponse.mapFrom);
	}

	@Get(':id')
	@ApiOperation({
		summary: 'GetSubcategoryById}',
		description: 'Get subcategory by id',
	})
	@ApiResponse({ type: SubcategoryResponse })
	@HttpCode(HttpStatus.OK)
	async getSubcategoryById(@Param('id') id: string): Promise<SubcategoryResponse> {
		return this.subcategoriesService
			.getSubcategoryById(id)
			.then(SubcategoryResponse.mapFrom);
	}

	@Patch(':id')
	@ApiOperation({ summary: 'UpdateSubcategory}', description: 'Update subcategory' })
	@ApiResponse({ type: SubcategoryResponse })
	@HttpCode(HttpStatus.OK)
	async updateSubcategory(
		@Body() dto: UpdateSubcategoryRequest,
		@Param('id') id: string
	): Promise<SubcategoryResponse> {
		return this.subcategoriesService
			.updateSubcategory(dto, id)
			.then(SubcategoryResponse.mapFrom);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'DeleteSubcategory}', description: 'Delete subcategory' })
	@HttpCode(HttpStatus.OK)
	async deleteSubcategory(@Param('id') id: string): Promise<void> {
		await this.subcategoriesService.deleteSubcategory(id);
	}
}
