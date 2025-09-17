import { useForm } from 'react-hook-form';
import { login } from '../api/auth';
import Button from '../components/Button';
import Card from '../components/Card';
import { Input } from '../components/Input';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (v) => {
    try {
      await login(v.email, v.password);
      toast.success('Welcome back!');
      navigate('/');
      location.reload();
    } catch {
      toast.error('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-sm bg-gray-800 border border-gray-700 rounded-xl shadow-2xl p-8 transition-transform transform hover:scale-[1.01]">
        <h2 className="text-3xl font-extrabold text-white mb-6 text-center">Welcome Back</h2>
        <p className="text-gray-400 text-center mb-6">
          Sign in to your account to continue.
        </p>
        <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Email"
            type="email"
            {...register('email', { required: true })}
            placeholder="your@email.com"
          />
          <Input
            label="Password"
            type="password"
            {...register('password', { required: true })}
            placeholder="••••••••"
          />
          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg mt-4 transition-colors disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging In...' : 'Login'}
          </Button>
        </form>
      </Card>
    </div>
  );
}