import { isAxiosError } from "axios";
import api from "@/lib/axios";
import { Project, Task, TaskFormData, taskSchema } from "../types";


type TaskAPI = {
    formData: TaskFormData,
    projectId: Project["_id"],
    taskId: Task["_id"],
    status: Task["status"]
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
        const response = taskSchema.safeParse(data.task);
        console.log(response)
        if(response.success){
            return response.data;
        }
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.errors[0]?.msg)
        }
    }
}

export async function updateTask({projectId, taskId, formData } : Pick<TaskAPI, "projectId" | "taskId" | "formData">) {
    try {
        const url = `/projects/${projectId}/task/${taskId}`;
        const { data } = await api.put(url, formData);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.msg)
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
            throw new Error(error.response.data.msg)
        }
    }
}

export async function updateStatus({projectId, taskId, status } : Pick<TaskAPI, "projectId" | "taskId" | "status">) {
    try {
        const url = `/projects/${projectId}/task/${taskId}/status`;
        const { data } = await api.post(url, {status});
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}