import { Op } from 'sequelize';

export const rangeStartAndEndDateUtils = (startDate: Date, endDate: Date): unknown => {
	const range = {};
	if (startDate) {
		range[Op.gte] = startDate;
	}

	if (endDate) {
		range[Op.lt] = endDate;
	}

	return range;
};
