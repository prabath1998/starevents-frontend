import { useEffect, useState } from 'react';
import { getMe, changePassword } from '../api/auth';
import toast from 'react-hot-toast';
import Card from '../components/Card';
import Button from '../components/Button';
import { UserCircleIcon, KeyIcon } from '@heroicons/react/24/outline';

export default function Profile() {
  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await getMe();
        setMe(data);
      } catch (e) {
        console.error(e);
        toast.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.newPassword.length < 8) {
      return toast.error('New password must be at least 8 characters');
    }
    if (form.newPassword !== form.confirmNewPassword) {
      return toast.error('New password and confirmation do not match');
    }
    setSubmitting(true);
    try {
      await changePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
        confirmNewPassword: form.confirmNewPassword,
      });
      toast.success('Password updated');
      setForm({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    } catch (e) {
      console.error(e);
      const msg = e.response?.data?.message || e.response?.data || 'Update failed';
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950/70 text-neutral-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto space-y-8">
      
        <div className="flex items-center space-x-4">
          <UserCircleIcon className="w-12 h-12 text-indigo-400" />
          <h1 className="text-3xl font-bold tracking-tight text-white">My Profile</h1>
        </div>

       
        <Card className="bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-800">
          {loading ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-t-indigo-500 border-neutral-700"></div>
            </div>
          ) : me ? (
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-neutral-400 w-28">Email</span>
                <span className="flex-1 font-semibold text-neutral-200 truncate">{me.email}</span>
              </div>
              {(me.firstName || me.lastName) && (
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-neutral-400 w-28">Name</span>
                  <span className="flex-1 font-semibold text-neutral-200">
                    {[me.firstName, me.lastName].filter(Boolean).join(' ')}
                  </span>
                </div>
              )}
            </div>
          ) : (
            <p className="text-rose-400 text-center py-4">Could not load profile. Please try again later.</p>
          )}
        </Card>

        {/* Change Password Card */}
        <Card className="bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-800">
          <div className="flex items-center space-x-3 mb-5">
            <KeyIcon className="w-6 h-6 text-indigo-400" />
            <h2 className="text-xl font-semibold text-white">Change Password</h2>
          </div>
          <form className="space-y-5" onSubmit={onSubmit}>
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">Current password</label>
              <input
                type="password"
                name="currentPassword"
                value={form.currentPassword}
                onChange={onChange}
                className="w-full rounded-lg bg-gray-900 border border-gray-800 px-4 py-2.5 text-sm text-neutral-200 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">New password</label>
              <input
                type="password"
                name="newPassword"
                value={form.newPassword}
                onChange={onChange}
                className="w-full rounded-lg bg-gray-900 border border-gray-800 px-4 py-2.5 text-sm text-neutral-200 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                minLength={8}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">Confirm new password</label>
              <input
                type="password"
                name="confirmNewPassword"
                value={form.confirmNewPassword}
                onChange={onChange}
                className="w-full rounded-lg bg-gray-900 border border-gray-800 px-4 py-2.5 text-sm text-neutral-200 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                minLength={8}
                required
              />
            </div>
            <div className="pt-3">
              <Button type="submit" disabled={submitting} className="w-full sm:w-auto px-6 py-2.5 font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors duration-200 rounded-lg shadow-md">
                {submitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-t-white border-white/20"></div>
                    <span>Updating…</span>
                  </div>
                ) : (
                  'Update Password'
                )}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}