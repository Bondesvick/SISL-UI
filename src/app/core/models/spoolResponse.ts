import { GetCustomerAccount } from "./CustomerAccount";

export interface Spoolresponse {
    responseCode: string;
    responseDescription: string;
    data: GetCustomerAccount[];
  }
  
