import {LoginResponse} from "../interfaces/auth-service.interface.ts";
import {tesloApi} from "../api/teslo.api.ts";
import {AxiosError} from "axios";


export class AuthService {
    private static formatError(error: unknown): never {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data ?? 'An unexpected error occurred');
        }
        throw new Error('Unable to login');
    }

    static async login(email: string, password: string) : Promise<LoginResponse> {
        try {
            const { data } = await tesloApi.post<LoginResponse>('/auth/login', {email, password});
            return data;
        } catch (error) {
            this.formatError(error);
        }
    }
    static async checkStatus():Promise<LoginResponse> {
        try {
            const {data} = await tesloApi.get<LoginResponse>('/auth/check-status');
            return data

        } catch (error) {
            this.formatError(error);
        }
    }
}