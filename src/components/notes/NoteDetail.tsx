import { useAuth } from '@/hooks/useAuth'
import { Note } from '@/types/index'
import { formatDate } from '@/utils/utils'
import Spinner from '../Spinner'
import { useMemo } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteNote } from '@/api/NoteAPI'
import { toast } from 'react-toastify'
import { useLocation, useParams } from 'react-router-dom'

type NoteDetailProps = {
    note: Note
}

const NoteDetail = ({note} : NoteDetailProps) => {

  const {data, isLoading} = useAuth();
  const canDelete = useMemo(() => data?._id === note.createdBy._id, [data]);
  const params = useParams();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const projectId = params.projectId!;
  const taskId = queryParams.get("viewTaskId")!;

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onError: (error) => {
        toast.error(error.message);
    },
    onSuccess: (data) => {
        toast.success(data.msg);
        queryClient.invalidateQueries({queryKey: ["task", taskId]});
    }
  })

  if(isLoading) return <Spinner />

  if (data) return (

    <div className='p-2 flex justify-between items-center'>
        <div>
            <p>{note.content}  por: <span className='font-bold'>{note.createdBy.name}</span></p>
            <p className='text-xs text-slate-500'>
                {formatDate(note.createdAt)}
            </p>
        </div>

        {canDelete && (
            <button
                type="button"
                className='bg-red-400 hover:bg-red-500 p-2 text-white font-bold cursor-pointer transition-colors rounded-lg'
                onClick={() => mutate({projectId, taskId, noteId: note._id})}
            >
                Eliminar
            </button>
        )}
    </div>
  )
}

export default NoteDetail