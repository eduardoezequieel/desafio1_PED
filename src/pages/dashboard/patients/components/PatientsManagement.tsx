import { CirclePlus } from 'lucide-react';
import { usePatientStore } from '../store';
import { usePatientsManagement } from '../hooks';
import { toast } from 'react-toastify';
import { PatientService } from '../services';

export const PatientsManagement = () => {
  const { openModal } = usePatientStore();
  const { patients, refreshPatients } = usePatientsManagement();

  const handleDelete = async (id: string) => {
    const isConfirmed = confirm('¿Estás seguro de eliminar este paciente?');

    if (isConfirmed) {
      const success = await PatientService.deletePatient(id);

      if (success) {
        toast.success('Paciente eliminado correctamente');
        refreshPatients();
      } else {
        toast.error('Ocurrió un error al eliminar el paciente');
      }
    }
  };

  return (
    <div className="flex gap-5 flex-col">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl text-indigo-700 dark:text-indigo-300 ">Pacientes</h1>
        <button
          onClick={() => {
            openModal({
              modalTitle: 'Agregar paciente',
            });
          }}
          type="button"
          className="button-styles flex gap-2 items-center px-4 py-2 "
        >
          <CirclePlus size={15} />
          Agregar paciente
        </button>
      </div>
      <table className="border-collapse w-full">
        <thead>
          <tr>
            <th className="p-3 font-bold uppercase bg-indigo-100 dark:bg-indigo-700 text-gray-600 dark:text-white border border-gray-300 dark:border-gray-500 hidden lg:table-cell">
              Paciente
            </th>
            <th className="p-3 font-bold uppercase bg-indigo-100 dark:bg-indigo-700 text-gray-600 dark:text-white border border-gray-300 dark:border-gray-500 hidden lg:table-cell">
              Edad
            </th>
            <th className="p-3 font-bold uppercase bg-indigo-100 dark:bg-indigo-700 text-gray-600 dark:text-white border border-gray-300 dark:border-gray-500 hidden lg:table-cell">
              Género
            </th>
            <th className="p-3 font-bold uppercase bg-indigo-100 dark:bg-indigo-700 text-gray-600 dark:text-white border border-gray-300 dark:border-gray-500 hidden lg:table-cell">
              Tipo de sangre
            </th>
            <th className="p-3 font-bold uppercase bg-indigo-100 dark:bg-indigo-700 text-gray-600 dark:text-white border border-gray-300 dark:border-gray-500 hidden lg:table-cell">
              Nivel de presión
            </th>
            <th className="p-3 font-bold uppercase bg-indigo-100 dark:bg-indigo-700 text-gray-600 dark:text-white border border-gray-300 dark:border-gray-500 hidden lg:table-cell">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr
              key={patient.id}
              className="bg-white dark:bg-neutral-900 dark:lg:hover:bg-neutral-800 lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
            >
              <td className="w-full dark:border-gray-500 lg:w-auto p-3 text-gray-800 dark:text-white text-center border border-b block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  Paciente
                </span>
                {patient.firstName} {patient.lastName}
              </td>
              <td className="w-full dark:border-gray-500 lg:w-auto p-3 text-gray-800 dark:text-white text-center border border-b block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  Edad
                </span>
                {patient.age}
              </td>
              <td className="w-full dark:border-gray-500 lg:w-auto p-3 text-gray-800 dark:text-white text-center border border-b block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  Género
                </span>
                <span
                  className={`rounded py-1 px-3 text-xs font-bold ${patient.genderId === '1' ? 'bg-red-400' : 'bg-blue-400'}`}
                >
                  {patient.gender?.name}
                </span>
              </td>
              <td className="w-full dark:border-gray-500 lg:w-auto p-3 text-gray-800 dark:text-white text-center border border-b block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  Tipo de sangre
                </span>
                {patient.bloodType?.name}
              </td>
              <td className="w-full dark:border-gray-500 lg:w-auto p-3 text-gray-800 dark:text-white text-center border border-b block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  Nivel de presión
                </span>
                {patient.bloodPressure?.name}
              </td>
              <td className="w-full dark:border-gray-500 lg:w-auto p-3 text-gray-800 dark:text-white text-center border border-b block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  Acciones
                </span>
                <a
                  onClick={() => {
                    openModal({
                      modalTitle: 'Editar paciente',
                      selectedPatient: patient,
                    });
                  }}
                  className="text-blue-400 hover:text-blue-600 underline"
                >
                  Editar
                </a>
                <a
                  onClick={() => {
                    handleDelete(patient.id);
                  }}
                  className="text-red-400 hover:text-red-600 underline pl-6"
                >
                  Eliminar
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
