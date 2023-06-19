import { UserDeviceEnum } from 'src/common/enums';

export const devicesWithoutIntermediateTokens = (type: UserDeviceEnum) =>
	type === UserDeviceEnum.Desktop || type === UserDeviceEnum.Unknown;

export const devicesWithIntermediateTokens = (type: UserDeviceEnum) =>
	type === UserDeviceEnum.Mobile || type === UserDeviceEnum.Tablet;
