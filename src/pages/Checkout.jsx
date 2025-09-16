import { useSearchParams } from 'react-router-dom'
import { initiatePayment } from '../api/orders'
import Card from '../components/Card'
import Button from '../components/Button'
import toast from 'react-hot-toast'

export default function Checkout() {
  const [params] = useSearchParams()
  const orderId = params.get('orderId')

  const pay = async () => {
    try {
      const res = await initiatePayment(orderId)
      toast.success('Payment initiated')
      if (res.redirectUrl) location.href = res.redirectUrl
    } catch { toast.error('Payment init failed') }
  }

  return (
    <div className="max-w-lg mx-auto">
      <Card>
        <h2 className="text-xl font-semibold text-indigo-300 mb-3">Checkout</h2>
        <p className="text-gray-300 mb-4">Order #{orderId}</p>
        <Button onClick={pay}>Pay now</Button>
      </Card>
    </div>
  )
}
