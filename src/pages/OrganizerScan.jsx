import { useEffect, useRef, useState } from 'react'
import { BrowserMultiFormatReader } from '@zxing/browser'
import Card from '../components/Card'
import Button from '../components/Button'
import toast from 'react-hot-toast'
import { validateTicket, checkInTicket } from '../api/tickets'

export default function OrganizerScan() {
  const videoRef = useRef(null)
  const codeReader = useRef(null)
  const [result, setResult] = useState(null)
  const [scanning, setScanning] = useState(false)

  useEffect(() => {
    codeReader.current = new BrowserMultiFormatReader()
    return () => { try { codeReader.current?.reset() } catch {} }
  }, [])

  const start = async () => {
    setResult(null)
    setScanning(true)
    try {
      const devices = await BrowserMultiFormatReader.listVideoInputDevices()
      const deviceId = devices?.[0]?.deviceId
      const r = await codeReader.current.decodeFromVideoDevice(deviceId, videoRef.current, (res, err) => {
        if (res) {
          setScanning(false)
          codeReader.current?.reset()
          handleResult(res.getText())
        }
      })
      return r
    } catch (e) {
      setScanning(false)
      toast.error('Camera init failed')
    }
  }

  const handleResult = async (text) => {
    try {
      const v = await validateTicket(text)
      if (!v.valid) {
        setResult({ ok:false, message: v.message || v.status })
        toast.error(v.message || v.status)
        return
      }
      setResult({ ok:true, ticketId: v.ticketId, eventId: v.eventId, status: v.status, raw:text })
    } catch {
      toast.error('Validate failed')
    }
  }

  const checkIn = async () => {
    try {
      const r = await checkInTicket(result.raw)
      if (r.success) {
        setResult({ ...result, status: r.status, checkedInAt: r.checkedInAt })
        toast.success('Checked in')
      } else {
        toast.error(r.message || r.status)
      }
    } catch {
      toast.error('Check-in failed')
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card>
        <h2 className="text-xl font-semibold text-indigo-300 mb-3">Scan QR</h2>
        <div className="aspect-video bg-black/30 rounded-lg overflow-hidden border border-gray-800">
          <video ref={videoRef} className="w-full h-full object-cover" />
        </div>
        <div className="flex gap-2 mt-3">
          <Button onClick={start} disabled={scanning}>{scanning? 'Scanning…':'Start Scanning'}</Button>
          <Button variant="secondary" onClick={()=>codeReader.current?.reset()}>Stop</Button>
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold text-indigo-300 mb-3">Result</h2>
        {!result ? (
          <div className="text-gray-400">No scan yet</div>
        ) : result.ok ? (
          <div className="space-y-2">
            <div>Ticket ID: <span className="text-indigo-300 font-medium">{result.ticketId}</span></div>
            <div>Event ID: <span className="text-indigo-300 font-medium">{result.eventId}</span></div>
            <div>Status: <span className="px-2 py-0.5 rounded border border-gray-700 bg-gray-800">{result.status}</span></div>
            <div className="flex gap-2 pt-2">
              <Button onClick={checkIn}>Check-in</Button>
            </div>
            {result.checkedInAt && (
              <div className="text-sm text-green-400">Checked at {new Date(result.checkedInAt).toLocaleString()}</div>
            )}
          </div>
        ) : (
          <div className="text-red-400">{result.message}</div>
        )}
      </Card>
    </div>
  )
}
