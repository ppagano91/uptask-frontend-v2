import { isAxiosError } from "axios";
import api from "@/lib/axios";
import { Project, Task, TaskFormData } from "../types";


type TaskAPI = {
    formData: TaskFormData,
    projectId: Project["_id"],
    taskId: Task["_id"]
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

export async function getTaskByID({projectId, taskId } : Pick<TaskAPI, "projectId" | "taskId">) {
    try {
        const url = `/projects/${projectId}/task/${taskId}`;
        const { data } = await api.get(url);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response){
            console.log(error);
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateTask({projectId, taskId, formData } : Pick<TaskAPI, "projectId" | "taskId" | "formData">) {
    try {
        const url = `/projects/${projectId}/task/${taskId}`;
        const { data } = await api.post(url, formData);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response){
            console.log(error);
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteTask({projectId, taskId } : Pick<TaskAPI, "projectId" | "taskId">) {
    try {
        const url = `/projects/${projectId}/task/${taskId}`;
        const { data } = await api.delete(url);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response){
            console.log(error);
            throw new Error(error.response.data.error)
        }
    }
}