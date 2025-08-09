import {LoginResponse} from "../interfaces/auth-service.interface.ts";
import {tesloApi} from "../api/teslo.api.ts";
import {AxiosError} from "axios";


export class AuthService {

    static async login(email: string, password: string) : Promise<LoginResponse> {
        try {
            const { data } = await tesloApi.post<LoginResponse>('/auth/login', {email, password});
            return data;
        } catch (error) {
            if(error instanceof AxiosError) throw new Error(error.response?.data);
            throw new Error('unabled to login');
        }
    }
}