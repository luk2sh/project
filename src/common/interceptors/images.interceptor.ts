import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { imageFilter } from '../filters/image.filter';

export const ImagesInterceptor = () =>
	FileFieldsInterceptor([{ name: 'avatar', maxCount: 5 }], {
		fileFilter: imageFilter,
	});
