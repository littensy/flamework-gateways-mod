import { CanActivate, PipeTransform } from "./features";

export type GuardResolver = () => CanActivate;
export type PipeResolver = () => PipeTransform;
