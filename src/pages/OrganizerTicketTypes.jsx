import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { addTicketType } from '../api/organizer'
import Button from '../components/Button'
import Card from '../components/Card'
import { Input } from '../components/Input'
import toast from 'react-hot-toast'

export default function OrganizerTicketTypes() {
  const { id } = useParams()
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '', priceCents: 0, currency: 'LKR',
      totalQuantity: 0, perOrderLimit: 2,
      salesStart: '', salesEnd: ''
    }
  })

  const onSubmit = async (v) => {
    try {
      const payload = {
        name: v.name,
        priceCents: Number(v.priceCents),
        currency: v.currency,
        totalQuantity: Number(v.totalQuantity),
        perOrderLimit: v.perOrderLimit ? Number(v.perOrderLimit) : null,
        salesStart: v.salesStart,
        salesEnd: v.salesEnd,
      }
      await addTicketType(id, payload)
      toast.success('Ticket type created')
      reset()
    } catch { toast.error('Failed to create ticket type') }
  }

  return (
    <div className="max-w-2xl">
      <Card>
        <h2 className="text-xl font-semibold text-indigo-300 mb-4">Add Ticket Type (Event #{id})</h2>
        <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid sm:grid-cols-2 gap-3">
            <Input label="Name" {...register('name', { required:true })} />
            <Input label="Price (cents)" type="number" {...register('priceCents', { required:true, min:1 })} />
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <Input label="Currency" {...register('currency', { required:true })} />
            <Input label="Total Quantity" type="number" {...register('totalQuantity', { required:true, min:1 })} />
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <Input label="Per Order Limit" type="number" {...register('perOrderLimit')} />
            <div className="grid sm:grid-cols-2 gap-3">
              <Input label="Sales Start (UTC)" type="datetime-local" {...register('salesStart', { required:true })} />
              <Input label="Sales End (UTC)" type="datetime-local" {...register('salesEnd', { required:true })} />
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit">Create</Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
