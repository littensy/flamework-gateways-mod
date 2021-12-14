import { t } from "@rbxts/t";

export const isArray = t.array(t.any);
export const isEmpty = (arr: unknown) => isArray(arr) && arr.size() === 0;
