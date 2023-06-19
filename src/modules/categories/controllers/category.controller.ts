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
import { CategoryService } from '../services/category.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
	CategoryResponse,
	HttpUser,
	IJwtPayload,
	LoggerApi,
	CategoryDto,
	UpdateCategoryRequest,
} from 'src/common';

@ApiBearerAuth()
@ApiTags('category')
@Controller('category')
@LoggerApi()
export class CategoryController {
	constructor(private categoryService: CategoryService) {}

	@Post()
	@ApiOperation({ summary: '[CreateCategory]', description: 'Create category' })
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ type: CategoryResponse })
	async create(
		@HttpUser() user: IJwtPayload,
		@Body() dto: CategoryDto
	): Promise<CategoryResponse> {
		return this.categoryService.create({ ...dto, userId: user.id });
	}

	@Get()
	@ApiOperation({ summary: '[GetAllCategories]', description: 'Get all categories' })
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ type: CategoryResponse, isArray: true })
	async getAllCategory(@HttpUser() user: IJwtPayload): Promise<CategoryResponse[]> {
		return this.categoryService.getAllCategory(user.id);
	}

	@Get(':id')
	@ApiOperation({ summary: '[GetCategoryById]', description: 'Get category by id' })
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ type: CategoryResponse })
	async getCategoryById(
		@HttpUser() user: IJwtPayload,
		@Param('id') id: string
	): Promise<CategoryResponse> {
		return this.categoryService.getCategoryById(user.id, id);
	}

	@Patch(':id')
	@ApiOperation({ summary: 'UpdateSubcategory}', description: 'Update subcategory' })
	@ApiResponse({ type: CategoryResponse })
	@HttpCode(HttpStatus.OK)
	async updateSubcategory(
		@Param('id') id: string,
		@Body() dto: UpdateCategoryRequest,
		@HttpUser() user: IJwtPayload
	): Promise<CategoryResponse> {
		return this.categoryService.updateCategory(user.id, dto, id);
	}

	@ApiOperation({
		summary: '[DeleteCategoryByName]',
		description: 'Delete category by name',
	})
	@Delete(':id')
	@HttpCode(HttpStatus.OK)
	async deleteCategoryById(
		@HttpUser() user: IJwtPayload,
		@Param('id') id: string
	): Promise<void> {
		await this.categoryService.deleteCategoryById(user.id, id);
	}
}
