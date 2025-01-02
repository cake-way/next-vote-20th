export interface LoginRequestDto {
    username: string;
    password: string;
}

export interface LoginResponseDto {
    username: string;
    token: string;
}