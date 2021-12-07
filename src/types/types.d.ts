export interface FormResponseData {
    success?: boolean;
    errors?: FormErrorData[];
    data?: any;
}

export interface FormErrorData {
    name: string;
    message?: string;
}

export interface Coords2D {
    x: number;
    y: number;
}
