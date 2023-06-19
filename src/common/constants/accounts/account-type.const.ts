import { AccountTypeEnum } from 'src/common';

export const accountWithTypeCardWithUsers = (
	type: AccountTypeEnum,
	usersLength: number
) => AccountTypeEnum.Card === type && usersLength > 1;

export const accountWithTypeCash = (type: AccountTypeEnum) =>
	AccountTypeEnum.Cash === type;

export const accountWithTypeCardAndWithoutUser = (
	type: AccountTypeEnum,
	usersLength: number
) => AccountTypeEnum.Card === type && usersLength === 1;
