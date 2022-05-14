export interface ColumnDef {
        0: string;
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
        6: string;
        7: string;
        8: string;
        9: string;
        10: string;
        11: string;
        12: string;
        13: string;
        14: string;
        15: string;
        16: string;
        17: string;
        18: string;
        19: string;
        20: string;
        21: string;
        22: string;
        23: string;
    }

    export interface Row {
        0: string;
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
        6: string;
        7: string;
        8: string;
        9: string;
        10: string;
        11: string;
        12: string;
        13: string;
        14: string;
        15: string;
        16: string;
        17: string;
        18: string;
        19: string;
        20: string;
        21: string;
        22: string;
        23: string;
    }

    export interface DataTable {
        ColumnDef: ColumnDef;
        Rows: Row[];
    }

    export interface Data {
        DataTable: DataTable;
        StatusID: number;
        StatusMessage: string;
        OutValue: string;
    }

    export interface FetchCustomerResponse {
        data: Data;
        responseCode: string;
        responseDescription: string;
    }

