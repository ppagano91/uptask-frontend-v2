import api from "@/lib/axios";
import { Project, ProjectFormData, dashboardProjectSchema, editProjectSchema, projectSchema } from "@/types/index";
import { isAxiosError } from "axios";

export async function createProject(formData: ProjectFormData){
    try {
        const { data } = await api.post("/projects", formData);
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
        } else{
            return [];
        }
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

export async function getProjectById(id: Project["_id"]){
    try {
        const { data } = await api.get(`/projects/${id}`);
        const response = editProjectSchema.safeParse(data.project)
        if (response.success){
            return response.data;
        }
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

export async function getFullProject(id: Project["_id"]){
    try {
        const { data } = await api.get(`/projects/${id}`);
        const response = projectSchema.safeParse(data.project)
        if (response.success){
            return response.data;
        }
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

type UpdateProjectType = {
    formData: ProjectFormData,
    projectId: Project["_id"]
}

export async function updateProject({formData, projectId} : UpdateProjectType){
    try {
        const { data } = await api.put(`/projects/${projectId}`, formData);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

export async function deleteProject(id: Project["_id"]){
    try {
        const { data } = await api.delete(`/projects/${id}`);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}