import { LoginResponseDto } from "../api/auth/login/dto";

export interface ApiResponse {
    success: boolean;
    data: LoginResponseDto;  
    error?: string;
}