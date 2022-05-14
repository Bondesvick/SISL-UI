export interface SmileResponse {
    ResultText: string;
    FullName: string;
    FirstName: string;
    LastName: string;
    Gender: string;
    DateOfBirth: string;
    OtherName: string;
    PhoneNumber: string;
    Address: string;
    VerifyIdNumber: string;
    ReturnPersonalInfo: string;
}

export interface ApiResponse {
    responseCode: string;
    responseDescription: string;
    data: SmileResponse;
}