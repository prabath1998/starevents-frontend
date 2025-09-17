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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Create Ticket Type
          </h1>
          <p className="text-slate-300 text-lg">Event #{id}</p>
        </div>
        
        <Card className="backdrop-blur-sm bg-white/5 border border-white/10 shadow-2xl">
          <div className="p-6 sm:p-8 lg:p-10">
            <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
              {/* Basic Information Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white border-b border-white/20 pb-2">
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Input 
                      label="Ticket Name" 
                      placeholder="e.g., Early Bird, VIP, General Admission"
                      className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-purple-400 focus:ring-purple-400/20"
                      {...register('name', { required:true })} 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Input 
                        label="Price (cents)" 
                        type="number" 
                        placeholder="2500"
                        className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-purple-400 focus:ring-purple-400/20"
                        {...register('priceCents', { required:true, min:1 })} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Input 
                        label="Currency" 
                        placeholder="LKR"
                        className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-purple-400 focus:ring-purple-400/20"
                        {...register('currency', { required:true })} 
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Quantity & Limits Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white border-b border-white/20 pb-2">
                  Quantity & Limits
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Input 
                      label="Total Quantity" 
                      type="number" 
                      placeholder="100"
                      className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-purple-400 focus:ring-purple-400/20"
                      {...register('totalQuantity', { required:true, min:1 })} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Input 
                      label="Per Order Limit" 
                      type="number" 
                      placeholder="2"
                      className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-purple-400 focus:ring-purple-400/20"
                      {...register('perOrderLimit')} 
                    />
                  </div>
                </div>
              </div>

              {/* Sales Period Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white border-b border-white/20 pb-2">
                  Sales Period
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Input 
                      label="Sales Start (UTC)" 
                      type="datetime-local" 
                      className="bg-white/10 border-white/20 text-white focus:border-purple-400 focus:ring-purple-400/20"
                      {...register('salesStart', { required:true })} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Input 
                      label="Sales End (UTC)" 
                      type="datetime-local" 
                      className="bg-white/10 border-white/20 text-white focus:border-purple-400 focus:ring-purple-400/20"
                      {...register('salesEnd', { required:true })} 
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row gap-4 justify-end pt-6 border-t border-white/20">
                <Button 
                  type="button"
                  onClick={() => reset()}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg transition-all duration-200 font-medium"
                >
                  Reset Form
                </Button>
                <Button 
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 font-medium"
                >
                  Create Ticket Type
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  )
}