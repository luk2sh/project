import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category, User } from 'src/models';
import { SignInDto, userNotExist } from 'src/common';

@Injectable()
export class UsersRepository {
	constructor(
		@InjectModel(User)
		private userModel: typeof User
	) {}

	async getAllUsers(): Promise<User[]> {
		return this.userModel.findAll({ include: [Category] });
	}

	async getUsersById(id: string): Promise<User> {
		const user = await this.userModel.findByPk(id, { include: Category });

		if (!user) {
			throw new NotFoundException(userNotExist);
		}

		return user;
	}

	async findOneByEmail(email: string): Promise<User> {
		return this.userModel.findOne({ where: { email } });
	}

	async remove(id: string): Promise<void> {
		await this.userModel.destroy({ where: { id } });
	}

	async create(dto: SignInDto): Promise<User> {
		try {
			return this.userModel.create({ ...dto });
		} catch (error) {
			throw new Error(error);
		}
	}

	async update(id: string, data: Partial<User>): Promise<User> {
		const [, [updatedUser]] = await this.userModel.update(data, {
			where: { id },
			returning: true,
		});

		if (!updatedUser) {
			throw new NotFoundException(userNotExist);
		}

		return updatedUser;
	}
}
