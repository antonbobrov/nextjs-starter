export interface APIResponse<Data> {
    success: boolean;
    code: number;
    message: string;
    data: Data;
}
