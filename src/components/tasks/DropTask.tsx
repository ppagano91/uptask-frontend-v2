import { useDroppable } from "@dnd-kit/core"
type DropTaskProps = {
    status: string
}

const DropTask = ({status}: DropTaskProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id: status
  });

  const style = {
    opacity: isOver ? 0.25 : undefined
  }

  return (
    <div
        style = {style}
        ref={setNodeRef}
        className="text-xs font-semibold upperacase p-2 border border-dashed border-slate-500 mt-5 grid place-content-center text-slate-500"
    >
        Soltar tareas aquí
    </div>
  )
}

export default DropTask