export interface requestToken {
    status_message: string
    request_token: string,
    success: boolean,
    status_code: number
}

export interface accessToken {
    status_message: string,
    access_token: string,
    sucess: boolean,
    status_code: number,
    account_id: string
}

export interface V4ToV3Request {
    success: boolean
    session_id: string
}