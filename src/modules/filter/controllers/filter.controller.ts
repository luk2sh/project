import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoggerApi } from 'src/common';

@ApiBearerAuth()
@ApiTags('filter')
@Controller('filter')
@LoggerApi()
export class FilterController {}
