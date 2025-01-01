export interface SrvrActionRspnsIntrfc {
    status: number;
    message: string;
    data?: unknown;
    redirected?: string;
    isAuthenticated?: boolean;
}

