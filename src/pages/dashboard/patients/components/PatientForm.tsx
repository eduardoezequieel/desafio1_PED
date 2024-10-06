import Modal from 'react-minimal-modal';
import { usePatientStore } from '../store';
import { ErrorLabel, Label } from '../../../../components';
import { usePatientForm, usePatientsManagement } from '../hooks';
import { useForm } from 'react-hook-form';
import { PatientForm as IPatientForm } from '../interfaces';
import { createPatient, updatePatient } from '../services';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { GenericType } from '../../../../interfaces';

const initialFormState: IPatientForm = {
  firstName: '',
  lastName: '',
  age: '',
  genderId: '',
  bloodTypeId: '',
  bloodPressureId: '',
};

export const PatientForm = () => {
  const [selectedBloodType, setSelectedBloodType] = useState<GenericType | null>(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
    getValues,
  } = useForm<IPatientForm>({
    defaultValues: { ...initialFormState },
  });
  const { isModalOpen, modalMode, closeModal, modalTitle, selectedPatient } = usePatientStore();
  const {
    patientFields: { bloodPressures, bloodTypes, genders },
  } = usePatientForm();

  useEffect(() => {
    const subscription = watch((_, { name }) => {
      if (name === 'bloodTypeId') {
        const { bloodTypeId } = getValues();
        const selected = bloodTypes.find((item) => item.id === bloodTypeId);

        setSelectedBloodType(selected || null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, bloodTypes, getValues]);

  useEffect(() => {
    if (!isModalOpen) {
      setTimeout(() => {
        reset({ ...initialFormState });
        setSelectedBloodType(null);
      }, 500);
    }

    if (modalMode === 'edit' && selectedPatient && isModalOpen) {
      reset({
        firstName: selectedPatient.firstName,
        lastName: selectedPatient.lastName,
        age: selectedPatient.age.toString(),
        genderId: selectedPatient.genderId.toString(),
        bloodTypeId: selectedPatient.bloodTypeId.toString(),
        bloodPressureId: selectedPatient.bloodPressureId.toString(),
      });

      setSelectedBloodType(
        bloodTypes.find((item) => item.id === selectedPatient.bloodTypeId) || null
      );
    }
  }, [bloodTypes, isModalOpen, modalMode, reset, selectedPatient]);

  const onSubmit = async (formData: IPatientForm) => {
    if (modalMode === 'create') {
      const success = await createPatient(formData);

      if (!success) {
        toast.error('Ocurrió un error al crear el paciente');
        return;
      }

      toast.success('Paciente creado con éxito');
      closeModal();
    } else if (modalMode === 'edit' && selectedPatient) {
      const success = await updatePatient({
        formData,
        patientId: selectedPatient.id,
      });

      if (!success) {
        toast.error('Ocurrió un error al actualizar el paciente');
        return;
      }

      toast.success('Paciente actualizado con éxito');
      closeModal();
    }
  };

  return (
    <Modal
      animation="slide"
      hideIcon
      title={modalTitle}
      className="dark:bg-neutral-900 border-none"
      position="center"
      open={isModalOpen}
      onClose={closeModal}
      width={700}
    >
      <div className="flex gap-3">
        <div className="flex w-[30%] flex-col gap-2">
          {!selectedBloodType ? (
            <p className="text-black dark:text-white text-sm antialiased mt-9">
              Para obtener información relacionada al paciente, por favor escoja un tipo de sangre.
            </p>
          ) : (
            <>
              <div className="flex gap-2 mt-9">
                <h3 className="text-sm text-center w-full rounded-md bg-indigo-500 px-3 py-2 text-white">
                  Tipo de sangre
                </h3>
                <h3 className="text-sm w-fit font-semibold rounded-md bg-blue-400 px-3 py-2 text-white">
                  {selectedBloodType?.name}
                </h3>
              </div>
              <p className="dark:text-white text-black antialiased text-sm text-end">
                {selectedBloodType?.description}
              </p>
            </>
          )}
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid w-[70%] grid-cols-2 gap-4 px-1 mt-2"
        >
          <div className="form-group">
            <Label required htmlFor="firstName">
              Nombres del paciente
            </Label>
            <input
              {...register('firstName', {
                required: {
                  value: true,
                  message: 'El nombre del paciente es requerido',
                },
                pattern: {
                  value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                  message: 'El nombre del paciente solo puede contener letras y espacios',
                },
              })}
              maxLength={50}
              id="firstName"
              type="text"
              placeholder="Nombres del paciente"
              className="input-styles"
            />
            <ErrorLabel show={!!errors?.firstName} message={errors?.firstName?.message} />
          </div>
          <div className="form-group">
            <Label required htmlFor="lastName">
              Apellidos del paciente
            </Label>
            <input
              {...register('lastName', {
                required: {
                  value: true,
                  message: 'El apellido del paciente es requerido',
                },
                pattern: {
                  value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                  message: 'El apellido del paciente solo puede contener letras',
                },
              })}
              id="lastName"
              maxLength={50}
              type="text"
              placeholder="Apellidos del paciente"
              className="input-styles"
            />
            <ErrorLabel show={!!errors?.lastName} message={errors?.lastName?.message} />
          </div>
          <div className="form-group">
            <Label required htmlFor="age">
              Edad
            </Label>
            <input
              {...register('age', {
                required: {
                  value: true,
                  message: 'La edad del paciente es requerida',
                },
                min: {
                  value: 1,
                  message: 'La edad del paciente no puede ser negativa',
                },
                max: {
                  value: 150,
                  message: 'La edad del paciente no puede ser mayor a 150 años',
                },
              })}
              id="age"
              type="number"
              placeholder="Edad"
              className="input-styles"
            />
            <ErrorLabel show={!!errors?.age} message={errors?.age?.message} />
          </div>
          <div className="form-group">
            <Label required htmlFor="gender">
              Género
            </Label>
            <select
              {...register('genderId', {
                required: {
                  value: true,
                  message: 'El género del paciente es requerido',
                },
              })}
              className="select-styles"
              id="gender"
            >
              <option value="" disabled>
                Seleccionar
              </option>
              {genders.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <ErrorLabel show={!!errors?.genderId} message={errors?.genderId?.message} />
          </div>
          <div className="form-group">
            <Label required htmlFor="bloodTypeId">
              Tipo de sangre
            </Label>
            <select
              {...register('bloodTypeId', {
                required: {
                  value: true,
                  message: 'El tipo de sangre del paciente es requerido',
                },
              })}
              className="select-styles"
              id="bloodTypeId"
            >
              <option value="" disabled>
                Seleccionar
              </option>
              {bloodTypes.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <ErrorLabel show={!!errors?.bloodTypeId} message={errors?.bloodTypeId?.message} />
          </div>
          <div className="form-group">
            <Label required htmlFor="bloodPressureId">
              Presión
            </Label>
            <select
              {...register('bloodPressureId', {
                required: {
                  value: true,
                  message: 'La presión del paciente es requerida',
                },
              })}
              className="select-styles"
              id="bloodPressureId"
            >
              <option value="" disabled>
                Seleccionar
              </option>
              {bloodPressures.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <ErrorLabel
              show={!!errors?.bloodPressureId}
              message={errors?.bloodPressureId?.message}
            />
          </div>
          <div className="w-full gap-2 flex justify-end mt-2" style={{ gridColumn: '1/-1' }}>
            <button
              onClick={closeModal}
              type="button"
              className="button-outlined-styles flex gap-2 items-center px-4 py-2 "
            >
              Cerrar
            </button>
            <button type="submit" className="button-styles flex gap-2 items-center px-4 py-2 ">
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
