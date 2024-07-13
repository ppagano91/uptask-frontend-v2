import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { ConfirmToken, ForgotPasswordForm, NewPasswordForm, RequestConfirmationCodeForm, UserLoginForm, UserObject, UserRegistrationForm, userSchema } from "../types";

export async function createAccount(formData: UserRegistrationForm){
    try {
        const url = "/auth/create-account";
        const { data } = await api.post(url, formData);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

export async function confirmAccount(formData: ConfirmToken){
    try {
        const url = "/auth/confirm-account";
        const { data } = await api.post(url, formData);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.message);
            // throw { message: error.response.data.message, status: error.response.status };
        }
    }
}

export async function requestConfirmationCode(formData: RequestConfirmationCodeForm){
    try {
        const url = "/auth/request-code";
        const { data } = await api.post(url, formData);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response){
            console.log(error)
            throw new Error(error.response.data.message);
            // throw { message: error.response.data.message, status: error.response.status };
        }
    }
}

export async function authenticateUser(formData: UserLoginForm){
    try {
        const url = "/auth/login";
        const { data } = await api.post(url, formData);
        console.log(data)
        localStorage.setItem("AUTH_TOKEN", data.token);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response){
            console.log(error)
            throw new Error(error.response.data.message);
            // throw { message: error.response.data.message, status: error.response.status };
        }
    }
}


export async function forgotPassword(formData: ForgotPasswordForm){
    try {
        const url = "/auth/forgot-password";
        const { data } = await api.post(url, formData);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response){
            console.log(error)
            throw new Error(error.response.data.message);
            // throw { message: error.response.data.message, status: error.response.status };
        }
    }
}


export async function validateToken(formData: ConfirmToken){
    try {
        const url = "/auth/validate-token";
        const { data } = await api.post(url, formData);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response){
            console.log(error)
            throw new Error(error.response.data.message);
            // throw { message: error.response.data.message, status: error.response.status };
        }
    }
}

export async function updatePasswordWithToken({formData, token}: {formData: NewPasswordForm, token: ConfirmToken["token"]}){
    try {
        const url = `/auth/update-password/${token}`;
        const { data } = await api.post(url, formData);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.message);
            // throw { message: error.response.data.message, status: error.response.status };
        }
    }
}

export async function getUser(){
    try {
        const { data } = await api<UserObject>("/auth/user");
        const response = userSchema.safeParse(data.user);
        if(response.success){
            return response.data;
        }
        return null

    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.message);
        }
    }
}