export type User = {
    id: string
    firstName?: String
    lastName?: String
    email?: String
    age: number
    companyCode: String
    company: Company
}

export type Company = {
    code: string
    name?: String
}


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