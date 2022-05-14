import { ITokenDetail } from './token-detail';
import { ITokenModule } from './token-modules';

export interface ITokenBody {
  detail: ITokenDetail;
  modules: Array<ITokenModule>;
}
