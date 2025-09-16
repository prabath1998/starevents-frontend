import { useForm } from 'react-hook-form'
import { createEvent } from '../api/organizer'
import Button from '../components/Button'
import Card from '../components/Card'
import { Input, Textarea } from '../components/Input'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function OrganizerEventCreate() {
  const { register, handleSubmit } = useForm()
  const nav = useNavigate()

  const onSubmit = async (v) => {
    try {
      const payload = {
        title: v.title, venueName: v.venueName,
        description: v.description || null,
        locationCity: v.locationCity || null,
        locationAddress: v.locationAddress || null,
        startTime: v.startTime, endTime: v.endTime,
        categoryIds: (v.categoryIds || '').split(',').map(s=>s.trim()).filter(Boolean).map(Number)
      }
      const res = await createEvent(payload)
      toast.success('Event created')
      nav(`/organizer/${res.id}/ticket-types`)
    } catch { toast.error('Failed to create event') }
  }

  return (
    <div className="max-w-2xl">
      <Card>
        <h2 className="text-xl font-semibold text-indigo-300 mb-4">Create Event</h2>
        <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid sm:grid-cols-2 gap-3">
            <Input label="Title" {...register('title', { required:true })} />
            <Input label="Venue" {...register('venueName', { required:true })} />
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <Input label="City" {...register('locationCity')} />
            <Input label="Address" {...register('locationAddress')} />
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <Input label="Start (UTC)" type="datetime-local" {...register('startTime', { required:true })} />
            <Input label="End (UTC)" type="datetime-local" {...register('endTime', { required:true })} />
          </div>
          <Input label="Category IDs (comma-separated)" {...register('categoryIds')} />
          <Textarea label="Description" rows={5} {...register('description')} />
          <div className="flex justify-end">
            <Button type="submit">Create</Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
