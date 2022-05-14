
export interface Bank{
    
 name : string;
 code: string;
 nipCode: string;
}

// for UAT
// export let Banks : Bank[] = 
//     [
//         {
//             name:"Access (Diamond) Bank",
//             code:"ACCESS(DIAMOND)",
//             nipCode:"999063"
//         },
//         {
//             name:"Access Bank Plc",
//             code : "ACCESS",
//             nipCode:"999044"
//         },
//         {
//             name:"Citibank Nigeria Limited",
//             code:"CITIBANK",
//             nipCode:"999023"
//         },
//         {   
//             name:"Coronation Merchant Bank",
//             code:"CORONATIONMB",
//             nipCode:""
//         },
//         {   name:"Credit Lyonnais Nig. Ltd.",
//             code:"CEDITLYONNAIS",
//             nipCode:""
//         },
//         {   name:"Ecobank Nigeria Plc",
//             code:"ECOBANK",
//             nipCode:"999050"
//         },
//         {   name:"FBNQuest Merchant Bank",
//             code:"FBNQUESTMB",
//             nipCode:""
//         },
//         {   name:"Fidelity Bank Plc",
//             code:"FIDELITY",
//             nipCode:"999070"
//         },
//         {   
//             name:"First Bank of Nigeria Limited",
//             code:"FBNH",
//             nipCode:"999011"
//         },
//         {   name:"First City Monument Bank Limited",
//             code:"FCMB",
//             nipCode:"999214"
//         },
//         {   name:"FSDH Merchant Bank",
//             code:"FSDHMB",
//             nipCode:""
//         },
//         {   
//             name:"Globus Bank Limited",
//             code:"GLOBUSBNK",
//             nipCode:""
//         },
//         {   name:"Guaranty Trust Bank Plc",
//             code:"GTB",
//             nipCode:"999058"
//         },
//         {
//             name:"Heritage Banking Company Limited",
//             code:"HERITAGE",
//             nipCode:""
//         },
//         {   
//             name:"Jaiz Bank Plc",
//             code:"JAIZBNK",
//             nipCode:""
//         },
//         {   
//             name:"Keystone Bank Limited",
//             code:"KEYSTONE",
//             nipCode:"999082"
//         },
//         {   
//             name:"Nova Merchant Bank",
//             code:"NOVAMB",
//             nipCode:""
//         },
//         {   
//             name:"Polaris Bank Limited",
//             code:"POLARIS",
//             nipCode:""
//         },
//         {
//             name:"Providus Bank Limited",
//             code:"PROVIDUS",
//             nipCode:""
//         },
//         {   
//             name:"Rand Merchant Bank",
//             code:"RANDMB",
//             nipCode:""
//         },
//         {
//             name:"Stanbic IBTC Bank Plc",
//             code:"STANBIC",
//             nipCode:"999221"
//         },
//         {
//             name:"Standard Chartered",
//             code:"STANDARDCHART",
//             nipCode:"999068"
//         },
//         {
//             name:"Sterling Bank Plc",
//             code:"STERLING",
//             nipCode:"999232"
//         },
//         {
//             name:"SunTrust Bank Nigeria Limited",
//             code:"SUNTRUSTBNK",
//             nipCode:""
//         },
//         {   
//             name:"TAJBank Limited",
//             code:"TAJBANK",
//             nipCode:""
//         },
//         {
//             name:"Titan Trust Bank Limited",
//             code:"TITANTRUST",
//             nipCode:""
//         },
//         {   
//             name:"Union Bank of Nigeria Plc",
//             code:"UBN",
//             nipCode:"999032"
//         },
//         {
//             name:"United Bank for Africa Plc",
//             code:"UBA",
//             nipCode:"999033"
//         },
//         {
//             name:"Unity Bank Plc",
//             code:"UNITYBNK",
//             nipCode:"999215"
//         },
//         {
//             name:"Wema Bank Plc",
//             code:"WEMA",
//             nipCode:"999035"
//         },
//         {
//             name:"Zenith Bank Plc",
//             code:"ZENITHBNK",
//             nipCode:"999057"
//         }                      
//     ];

    // For production
    export let Banks : Bank[] = 
    [
        {
            name:"Access (Diamond) Bank",
            code:"ACCESS(DIAMOND)",
            nipCode:"000005"
        },
        {
            name:"Access Bank Plc",
            code : "ACCESS",
            nipCode:"000014"
        },
        {
            name:"Citibank Nigeria Limited",
            code:"CITIBANK",
            nipCode:"000009"
        },
        {   
            name:"Coronation Merchant Bank",
            code:"CORONATIONMB",
            nipCode:"060001"
        },
        {   name:"Credit Lyonnais Nig. Ltd.",
            code:"CEDITLYONNAIS",
            nipCode:""
        },
        {   name:"Ecobank Nigeria Plc",
            code:"ECOBANK",
            nipCode:"000010"
        },
        {   name:"FBNQuest Merchant Bank",
            code:"FBNQUESTMB",
            nipCode:"060002"
        },
        {   name:"Fidelity Bank Plc",
            code:"FIDELITY",
            nipCode:"000007"
        },
        {   
            name:"First Bank of Nigeria Limited",
            code:"FBNH",
            nipCode:"000016"
        },
        {   name:"First City Monument Bank Limited",
            code:"FCMB",
            nipCode:"000003"
        },
        {   name:"FSDH Merchant Bank",
            code:"FSDHMB",
            nipCode:"400001"
        },
        {   
            name:"Globus Bank Limited",
            code:"GLOBUSBNK",
            nipCode:"000027"
        },
        {   name:"Guaranty Trust Bank Plc",
            code:"GTB",
            nipCode:"000013"
        },
        {
            name:"Heritage Banking Company Limited",
            code:"HERITAGE",
            nipCode:"000020"
        },
        {   
            name:"Jaiz Bank Plc",
            code:"JAIZBNK",
            nipCode:"000006"
        },
        {   
            name:"Keystone Bank Limited",
            code:"KEYSTONE",
            nipCode:"000002"
        },
        {   
            name:"Nova Merchant Bank",
            code:"NOVAMB",
            nipCode:"060003"
        },
        {   
            name:"Polaris Bank Limited",
            code:"POLARIS",
            nipCode:"000008"
        },
        {
            name:"Providus Bank Limited",
            code:"PROVIDUS",
            nipCode:"090109"
        },
        {   
            name:"Rand Merchant Bank",
            code:"RANDMB",
            nipCode:"000024"
        },
        {
            name:"Stanbic IBTC Bank Plc",
            code:"STANBIC",
            nipCode:"000012"
        },
        {
            name:"Standard Chartered",
            code:"STANDARDCHART",
            nipCode:"000021"
        },
        {
            name:"Sterling Bank Plc",
            code:"STERLING",
            nipCode:"000001"
        },
        {
            name:"SunTrust Bank Nigeria Limited",
            code:"SUNTRUSTBNK",
            nipCode:"000022"
        },
        {   
            name:"TAJBank Limited",
            code:"TAJBANK",
            nipCode:"000026"
        },
        {
            name:"Titan Trust Bank Limited",
            code:"TITANTRUST",
            nipCode:"000025"
        },
        {   
            name:"Union Bank of Nigeria Plc",
            code:"UBN",
            nipCode:"000018"
        },
        {
            name:"United Bank for Africa Plc",
            code:"UBA",
            nipCode:"000004"
        },
        {
            name:"Unity Bank Plc",
            code:"UNITYBNK",
            nipCode:"000011"
        },
        {
            name:"Wema Bank Plc",
            code:"WEMA",
            nipCode:"000017"
        },
        {
            name:"Zenith Bank Plc",
            code:"ZENITHBNK",
            nipCode:"000015"
        }
                        
    ];