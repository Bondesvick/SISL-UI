import { ITokenModulePages } from './token-module-pages';

export interface ITokenModule {
  name: string;
  description: string;
  operations: string;
  modulePages: Array<ITokenModulePages>;
}
