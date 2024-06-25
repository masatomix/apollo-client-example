
export type UserInput = {
    userId: string
    firstName?: string
    lastName?: string
    email?: string
    age?: number
    companyCode?: string
}

export interface UpdateUserVariables {
    user: UserInput
}

export interface SuccessResponse {
    success: boolean;
}

export interface FailResponse {
    success: boolean;
    message: string;
    error: string;
}

export type Response = SuccessResponse | FailResponse;