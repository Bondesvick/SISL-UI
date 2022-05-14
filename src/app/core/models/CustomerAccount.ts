export interface CustomerAccount{
    Id: number; 
    CustAid: string;
    SessionId: string;
    
    AccountType: string;
    Title: string;
    SureName: string;
    FirstName: string;
    OtherNames: string;
    DateOfBirth: string;
    Sex: string;
    MaritalStatus: string;
    MothersMaidenName: string;
    PermanentAddress: string;
    City: string
    State: string
    Country: string
    LGA: string;
    EmailAddress : string
    Telephone: string;
    HomePhone: string
    Occupation: string
    CompName: string;
    EmploymentType: string

    BankAcctName: string
    BankAccNumber: string
    BVN: string
    IdType: string;
    IdNumber: string;
    MeansOfIDIssueDate: string
    MeansOfIDExpirationDate: string
    PoliticallyExposed: string
    PEPWho: string;
    PoliticallyExposedPerson: string;
    PositionHeld: string;
    DateOfOffice: string;
    
    NextOfKin: string
    NextOfKinSurname: string;
    NextOfKinOtherNames: string;
    Relationship: string
    ContactAddress: string
    NextOfKinPhone: string
    NextOfKinEmail: string
    NOKNationality: string
    NextOfKinGender: string
    NOKDateOfBirth: string

    AverageAnnualIncome: string
    SourceofInvestment: string
    PurposeofInvestment: string

    OfficeEmail: string
    OfficePhoneNumber: string
    //CompName: string
    OfficialAddress: string
    
    Status: string
    IsNewRequest: boolean;
    LastUpdatedBy: string;
    SolId: string;
    InitiatedBy: string;
    InitiatedDate: string;
    InitiatorIp: string;
    ApprovedBy : string;
    ApprovedDate: string;
    ApproverIp: string;

    ReasonForRework: string;

    InitiatorEmail: string;
    Documents: Document [];

    Nationality: string;
    BankCode: string
    BranchCode: string
}

export interface Document
        {
            Title: string;
            Name: string;
            Base64Content: string;
        }

export interface GetCustomerAccount{
    id: number; 
    sessionId: string;
    custAid: string;
    risk: string;

    accountType: string;
    title: string;
    sureName: string;
    firstName: string;
    otherNames: string;
    dateOfBirth: string;
    sex: string;
    maritalStatus: string;
    mothersMaidenName: string;
    permanentAddress: string;
    city: string
    state: string
    country: string
    lga: string;
    emailAddress : string
    telephone: string;
    homePhone: string
    occupation: string
    compName: string;
    employmentType: string

    bankAcctName: string
    bankAccNumber: string
    bvn: string
    idType: string;
    idNumber: string;
    meansOfIDIssueDate: string
    meansOfIDExpirationDate: string
    politicallyExposed: string
    pepWho: string;
    politicallyExposedPerson: string;
    positionHeld: string;
    dateOfOffice: string;
    
    nextOfKin: string
    nextOfKinSurname: string;
    nextOfKinOtherNames: string;
    relationship: string
    contactAddress: string
    nextOfKinPhone: string
    nextOfKinEmail: string
    nokNationality: string
    nextOfKinGender: string
    nokDateOfBirth: string

    averageAnnualIncome: string
    sourceofInvestment: string
    purposeofInvestment: string

    officeEmail: string
    officePhoneNumber: string
    //CompName: string
    officialAddress: string
    
    status: string
    isNewRequest: boolean;
    lastUpdatedBy: string;
    solId: string;
    initiatedBy: string;
    initiatedDate: string;
    initiatorIp: string;
    approvedBy : string;
    approvedDate: string;
    approverIp: string;

    reasonForRework: string;

    sislHistories: SislHistory[];
    sislDocuments: GetdDocument[];
}

export interface GetdDocument {
    fileName: string;
    title: string;
    contentOrPath: string;
    contentType: string;
}

export interface SislStatus {
    id: number;
    status: string;
    sislHistoryId: number;
}

export interface SislHistory {
    id: number;
    customerAccountId: number;
    requestId: string;
    comment: string;
    commentDate: Date;
    commentBy: string;
    lastUpdatedBy: string;
    sislStatus: SislStatus;
}
