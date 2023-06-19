import { compare } from 'bcryptjs';
export const isMatch = async (password, hash) => {
	return await compare(password, hash);
};
