import { isAxiosError } from "axios";
import api from "@/lib/axios";
import { Project, TaskFormData } from "../types";


type TaskAPI = {
    formData: TaskFormData,
    projectId: Project["_id"]
}
export async function createTask({formData, projectId} : Pick<TaskAPI, "formData" | "projectId">) {
    try {
        const url = `/projects/${projectId}/task`;
        const { data } = await api.post(url, formData);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response){
            console.log(error);
            throw new Error(error.response.data.error)
        }
    }
    
}