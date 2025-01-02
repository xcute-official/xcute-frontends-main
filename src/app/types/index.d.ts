export interface SrvrActionRspnsIntrfc {
    status: number;
    message: string;
    data?: T;
    redirected?: string;
    isAuthenticated?: boolean;
}

export interface UserSessionIntrfc {
    username: string;
    id: string;
    email: string;
}
export type UserSessionTyp = UserSessionIntrfc | null;

export interface PageParams {
    params: Promise<{[key: string]: string | undefined;}>;
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
  }