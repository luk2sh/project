export const userAlreadyExist = data => {
	return {
		text: `User with ${data} already exist`,
		localize: 'user_exist',
	};
};

export const userNotExist = {
	text: `User not exist`,
	localize: 'user_not_exist',
};

export const userNotCreatedThroughCategories = {
	text: `There were problems with creating categories, the user was not created`,
	localize: 'user_not_created_through_categories ',
};
