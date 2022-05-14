import { CustomerAccount } from "./CustomerAccount";
import { SmileResponse } from "./SmileIdResponse";

export interface ValidationDialog{
    userData: CustomerAccount,
    resData: SmileResponse,
}