import { useForm } from 'react-hook-form';
import { ErrorLabel, Label } from '../../../components';
import { SignInForm as ISignInForm } from '../interfaces';
import { toast } from 'react-toastify';
import { signIn } from '../services';
import { useNavigate } from 'react-router-dom';

export const SignInForm = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ISignInForm>();

  const onSubmit = async (formData: ISignInForm) => {
    const isValid = await signIn(formData);

    if (isValid) {
      toast.success('Inicio de sesión exitoso');
      navigate('/dashboard');
    } else {
      toast.error('Credenciales inválidas');
    }
  };

  return (
    <div className="flex items-center min-h-screen bg-white dark:bg-neutral-900">
      <div className="container mx-auto">
        <div className="max-w-md mx-auto my-10">
          <div className="text-center">
            <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">
              Iniciar sesión
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Inicia sesión para acceder a tu cuenta
            </p>
          </div>
          <div className="m-7">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <div className="form-group">
                <Label required htmlFor="username">
                  Nombre de usuario
                </Label>
                <input
                  {...register('username', {
                    required: {
                      value: true,
                      message: 'El nombre de usuario es requerido',
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9]+$/,
                      message: 'El nombre de usuario solo puede contener letras y números',
                    },
                  })}
                  id="username"
                  type="text"
                  placeholder="Nombre de usuario"
                  className="input-styles"
                />
                <ErrorLabel show={!!errors?.username} message={errors?.username?.message} />
              </div>
              <div className="form-group">
                <Label required htmlFor="password">
                  Contraseña
                </Label>
                <input
                  {...register('password', { required: 'La contraseña es requerida' })}
                  type="password"
                  id="password"
                  placeholder="Contraseña"
                  className="input-styles"
                />
                <ErrorLabel show={!!errors?.password} message={errors?.password?.message} />
              </div>
              <button type="submit" className="button-styles w-full mt-3 px-3 py-4">
                Continuar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
