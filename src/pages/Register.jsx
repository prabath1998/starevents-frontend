import { useForm } from 'react-hook-form'
import { register as apiRegister } from '../api/auth'
import Button from '../components/Button'
import Card from '../components/Card'
import { Input, Select } from '../components/Input'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const { register, handleSubmit } = useForm()
  const nav = useNavigate()

  const onSubmit = async (v) => {
    try {
      await apiRegister({
        email: v.email,
        password: v.password,
        firstName: v.firstName,
        lastName: v.lastName,
        role: v.role || undefined
      })
      toast.success('Account created')
      nav('/')
      location.reload()
    } catch {
      toast.error('Could not register')
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <h2 className="text-xl font-semibold text-indigo-300 mb-4">Create Account</h2>
        <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-3">
            <Input label="First name" {...register('firstName')} />
            <Input label="Last name" {...register('lastName')} />
          </div>
          <Input label="Email" type="email" {...register('email', { required:true })} />
          <Input label="Password" type="password" {...register('password', { required:true })} />
          <Select label="Role" {...register('role')}>
            <option value="">Customer</option>
            <option value="Organizer">Organizer</option>
          </Select>
          <Button type="submit" className="mt-2">Sign up</Button>
        </form>
      </Card>
    </div>
  )
}
