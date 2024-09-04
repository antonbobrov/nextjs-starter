import { isBoolean, isNumber } from '@anton.bobrov/react-hooks';

function clamp(value: number) {
  return Math.max(value, 1);
}

export function getSwrTime(value?: boolean | number) {
  const envSwrTime = process.env.SWR_TIME
    ? parseInt(process.env.SWR_TIME, 10)
    : 1;

  if (isBoolean(value)) {
    return clamp(value ? envSwrTime : 1);
  }

  if (isNumber(value)) {
    return clamp(value);
  }

  return clamp(envSwrTime);
}
