import { Navigate, useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTaskByID } from "@/api/TaskAPI";
import EditTaskModal from "./EditTaskModal";

const EditTaskData = () => {
    const params = useParams();
    const projectId = params.projectId!;

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const taskId = queryParams.get("editTaskId")!;

    const { data, isError } = useQuery({
        queryKey: ["task", taskId],
        queryFn: () => getTaskByID({projectId, taskId}),
        enabled: !!taskId
    });

    console.log(data);

    if (isError) return <Navigate to={"/404"}/>
    if (data) return (
        <EditTaskModal data={data.task}/>
    )
    }

export default EditTaskData