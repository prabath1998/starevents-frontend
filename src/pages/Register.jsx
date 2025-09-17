import { useForm } from 'react-hook-form';
import { register as apiRegister } from '../api/auth';
import Button from '../components/Button';
import Card from '../components/Card';
import { Input, Select } from '../components/Input';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (v) => {
    try {
      await apiRegister({
        email: v.email,
        password: v.password,
        firstName: v.firstName,
        lastName: v.lastName,
        role: v.role || undefined
      });
      toast.success('Account created successfully!');
      navigate('/');
      location.reload();
    } catch {
      toast.error('Could not register. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-gray-800 border border-gray-700 rounded-xl shadow-2xl p-8 transition-transform transform hover:scale-[1.01]">
        <h2 className="text-3xl font-extrabold text-white mb-6 text-center">Create Your Account</h2>
        <p className="text-gray-400 text-center mb-6">
          Fill out the form below to get started.
        </p>
        <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="First Name"
              type="text"
              {...register('firstName', { required: true })}
              placeholder="e.g., Jane"
            />
            <Input
              label="Last Name"
              type="text"
              {...register('lastName', { required: true })}
              placeholder="e.g., Doe"
            />
          </div>
          <Input
            label="Email"
            type="email"
            {...register('email', { required: true })}
            placeholder="e.g., jane.doe@example.com"
          />
          <Input
            label="Password"
            type="password"
            {...register('password', { required: true })}
            placeholder="••••••••"
          />
          <Select label="Account Type" {...register('role')}>
            <option value="">Customer</option>
            <option value="Organizer">Organizer</option>
          </Select>
          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg mt-4 transition-colors disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing Up...' : 'Sign Up'}
          </Button>
        </form>
      </Card>
    </div>
  );
}