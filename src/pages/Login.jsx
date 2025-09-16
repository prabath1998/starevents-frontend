import { useForm } from 'react-hook-form'
import { login } from '../api/auth'
import Button from '../components/Button'
import Card from '../components/Card'
import { Input } from '../components/Input'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const { register, handleSubmit } = useForm()
  const nav = useNavigate()

  const onSubmit = async (v) => {
    try {
      await login(v.email, v.password)
      toast.success('Welcome back!')
      nav('/')
      location.reload()
    } catch {
      toast.error('Invalid credentials')
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <h2 className="text-xl font-semibold text-indigo-300 mb-4">Login</h2>
        <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Input label="Email" type="email" {...register('email', { required:true })} />
          <Input label="Password" type="password" {...register('password', { required:true })} />
          <Button type="submit" className="mt-2">Login</Button>
        </form>
      </Card>
    </div>
  )
}
