import AddNoteForm from './AddNoteForm'
import { Task } from '@/types/index'
import NoteDetail from './NoteDetail'

type NotesPanelProps = {
  notes: Task["notes"]
}
const NotesPanel = ({notes} : NotesPanelProps) => {
  return (
    <>
      <AddNoteForm />
      <div className='divide-y divide-gray-100 mt-10'>
        {notes.length
        ? (
            <>
              <p className="font-bold text-2xl text-slate-600">Notas:</p>
              <div className='max-h-40 overflow-y-auto'>
                {notes.map(note => <NoteDetail key={note._id} note={note}/>)}
              </div>
            </>
          )
        : <p className="text-gray-500 text-center pt-3">No hay notas</p>
        }

      </div>
    </>
  )
}

export default NotesPanel