export interface SignupRequest{
    username: string,
    password: string,
    email: string
    name: string,
    part: string,
    team: string
}

export interface SignupResponse{
    message: string;
}
