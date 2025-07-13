export declare const baseUrl: string | undefined;
export declare const token: string | undefined;
type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
interface SendRequestParams<T> {
    endpoint: string;
    method: RequestMethod;
    data?: T;
    queryParams?: Record<string, string | number>;
    file?: any;
    files?: any[];
    multiFile?: {
        [key: string]: any;
    };
    fileKey?: string;
}
export declare const sendRequest: <T>({ endpoint, method, data, queryParams, file, files, multiFile, fileKey, }: SendRequestParams<T>) => Promise<T | null>;
export {};
//# sourceMappingURL=sendRequest.d.ts.map