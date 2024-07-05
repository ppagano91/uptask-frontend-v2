import { Fragment } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Task } from '@/types/index';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { deleteTask } from '@/api/TaskAPI';
import { toast } from 'react-toastify';

type TaskCardProps = {
    task: Task
};

const TaskCard = ({ task }: TaskCardProps) => {
    const navigate = useNavigate();
    const params = useParams();
    const projectId = params.projectId!;

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: deleteTask,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ["detailProject", projectId]})
            toast.success(data.msg);
        }
    });

    return (
        <li className="p-5 bg-white border border-slate-300 h-full">
            <div className="flex justify-between items-center">
                <button type="button" className="font-bold text-slate-600 text-left flex-grow">
                    {task.name}
                </button>
                <Menu as="div" className="relative flex-none text-right">
                    <MenuButton className="-m-2.5 block text-gray-500 hover:text-gray-900">
                        <span className="sr-only">opciones</span>
                        <EllipsisVerticalIcon className="h-6 w-6" aria-hidden="true" />
                    </MenuButton>
                    <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                        <MenuItems
                            className="absolute right-0 z-20 mt-2 w-52 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                            <MenuItem>
                                <button type='button' className='block px-3 py-1 text-sm leading-6 text-gray-900'>
                                    Ver Tarea
                                </button>
                            </MenuItem>
                            <MenuItem>
                                <button
                                    type='button'
                                    className='block px-3 py-1 text-sm leading-6 text-gray-900'
                                    onClick={() => navigate(location.pathname + `?editTaskId=${task._id}`)}
                                >
                                    Editar Tarea
                                </button>
                            </MenuItem>
                            <MenuItem>
                                <button
                                    type='button'
                                    className='block px-3 py-1 text-sm leading-6 text-red-500'
                                    onClick={() => {
                                        if (confirm(`¿Desea eliminar la tarea "${task.name}"?`)) {
                                            mutate({ projectId, taskId: task._id });
                                        }
                                    }}
                                >
                                    Eliminar Tarea
                                </button>
                            </MenuItem>
                        </MenuItems>
                    </Transition>
                </Menu>
            </div>
            <p className="text-slate-500 text-justify text-ellipsis overflow-hidden mt-2">{task.description}</p>
        </li>
    );
}

export default TaskCard;
