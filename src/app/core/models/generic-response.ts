import { CustomerAccount, GetCustomerAccount } from "./CustomerAccount";

export interface GenericApiResponse {
    responseCode: string;
    responseDescription: string;
    data: any;
}

export interface GenericAccountApiResponse {
    responseCode: string;
    responseDescription: string;
    data: GetCustomerAccount;
}