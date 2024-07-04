import ProjectForm from './ProjectForm'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ProjectFormData } from '@/types/index'

type EditProjectFormProps = {
    data: ProjectFormData
}

const EditProjectForm = ({data} : EditProjectFormProps) => {
    const initialValues: ProjectFormData = {
        projectName: data.projectName,
        clientName: data.clientName,
        description: data.description,
    }

    const {register, handleSubmit, formState:{errors}} = useForm({defaultValues: initialValues});

    const handleForm = (formData: ProjectFormData) => {
        console.log(formData)
    }

    return (
        <>
            <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-black">Editar Proyecto</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">Completa el siguiente formulario para ediat el proyecto</p>
            <nav className="my-5">
                <Link
                className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                to="/"
                >Volver a Proyectos</Link>
    
            </nav>
            <form
                className="mt-10 bg-white shadow-lg p-10 rounded-lg"
                onSubmit={handleSubmit(handleForm)}
                noValidate
                >
                    <ProjectForm
                        register={register}
                        errors={errors}
                    />
                    <input type="submit" value={"Guardar Cambios"}
                        className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
                        />
                </form>
            </div>
        </>
      )
}

export default EditProjectForm