import { NoteFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { createNote } from "@/api/NoteAPI";
import { toast } from "react-toastify";
import { useLocation, useParams } from "react-router-dom";

const AddNoteForm = () => {

  const params = useParams();
  const location = useLocation();

  const projectId = params.projectId!;

  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("viewTaskId")!;


  const initialValues: NoteFormData = {
    content: ""
  };

  const { register, handleSubmit, reset, formState: {errors} }= useForm({defaultValues: initialValues});

  const { mutate } = useMutation({
    mutationFn: createNote,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data.msg);
      reset();
    }
  })

  const handleAddNote = (formData: NoteFormData) => {
    mutate({projectId, taskId, formData});
  }
  return (
    <form
        onSubmit={handleSubmit(handleAddNote)}
        className="space-y-3"
        noValidate
    >
        <div className="flex flex-col gap-2">
            <label htmlFor="content" className="font-bold">Crea Nota</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300"
              id="content"
              placeholder="Contenido de la Nota"
              {...register("content", {
                required: "El contenido de la nota es obligatorio"
              })}
            />
            {errors.content && (
              <ErrorMessage>{errors.content.message}</ErrorMessage>
            )}
        </div>
        <input
          type="submit"
          value="Crear Nota"
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-40 p-2 text-white font-bold cursor-pointer rounded-lg"/>
    </form>
  )
}
export default AddNoteForm