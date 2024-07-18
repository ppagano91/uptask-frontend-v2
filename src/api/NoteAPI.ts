import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { NoteFormData, Project, Task } from "../types";

type NoteAPIType = {
    formData: NoteFormData,
    projectId: Project["_id"],
    taskId: Task["_id"]
}

export async function createNote({projectId, taskId, formData} : Pick<NoteAPIType, "projectId" | "taskId" | "formData">){
    try {
        const url = `/projects/${projectId}/task/${taskId}/note`
        const {data} = await api.post(url, formData);
        console.log(data);
        return data;

        // if(response.success){
        //     return response.data;
        // }

    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.message);
        }
    }
}