import api from "@/lib/axios";
import { ProjectFormData, dashboardProjectSchema } from "@/types/index";
import { isAxiosError } from "axios";

export async function createProject(formData: ProjectFormData){
    try {
        const { data } = await api.post("/projects", formData);
        console.log(data);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

export async function getProjects(){
    try {
        const { data } = await api.get("/projects");
        const response = dashboardProjectSchema.safeParse(data);
        if(response.success){
            return response.data.projects;
        }
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}