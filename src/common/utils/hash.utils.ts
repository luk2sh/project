import { hash } from 'bcryptjs';
export const hashData = async (password): Promise<string> => {
	return hash(password, 10);
};
