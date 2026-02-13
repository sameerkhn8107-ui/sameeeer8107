import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../lib/firebase';
import { Button } from '../components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../components/ui/alert-dialog';
import { Settings as SettingsIcon, Trash2, Loader2, ArrowLeft, User } from 'lucide-react';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

/**
 * Calls the backend DELETE /api/delete-account with the Firebase ID token.
 * Backend verifies the token, deletes Firestore data and Firebase Auth user.
 */
async function deleteAccountApi(idToken) {
  const res = await fetch(`${BACKEND_URL}/api/delete-account`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${idToken}`,
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data.detail != null
      ? (Array.isArray(data.detail) ? data.detail[0] : data.detail)
      : data.message || `Request failed (${res.status})`;
    throw new Error(typeof msg === 'string' ? msg : 'Request failed');
  }
  return data;
}

export default function Settings() {
  const navigate = useNavigate();
  const { user, loading: authLoading, logout, isAuthenticated } = useAuth();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [authLoading, isAuthenticated, navigate]);

  const handleDeleteClick = () => setConfirmOpen(true);

  const handleConfirmDelete = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      toast.error('You are not signed in. Please sign in again.');
      setConfirmOpen(false);
      return;
    }

    setDeleting(true);
    try {
      // Get a fresh Firebase ID token for the backend to verify
      const idToken = await currentUser.getIdToken(true);
      await deleteAccountApi(idToken);
      toast.success('Account deleted. You have been signed out.');
      setConfirmOpen(false);
      await logout();
      navigate('/login', { replace: true });
    } catch (err) {
      console.error('Delete account error:', err);
      const message = err.message || 'Failed to delete account. Please try again.';
      toast.error(message);
    } finally {
      setDeleting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#FDFCF8] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#E07A5F] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  const displayName = user?.name || user?.email?.split('@')[0] || 'User';

  return (
    <div className="min-h-screen bg-[#FDFCF8]">
      {/* Header with back to Chat */}
      <header className="border-b border-[#EAE7DC] bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/chat')}
            className="text-[#6D6F7C] hover:text-[#E07A5F] hover:bg-[#E07A5F]/10 rounded-xl"
            aria-label="Back to chat"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#E07A5F] to-[#81B29A] flex items-center justify-center">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <span className="text-xl font-semibold text-[#3D405B] font-['Manrope']">Settings</span>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          {/* Account info (read-only) */}
          <section className="rounded-2xl border border-[#EAE7DC] bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <SettingsIcon className="w-5 h-5 text-[#81B29A]" />
              <h2 className="text-lg font-semibold text-[#3D405B] font-['Manrope']">Account</h2>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-[#F4F1DE]/50">
              <div className="w-12 h-12 rounded-full bg-[#E07A5F]/10 flex items-center justify-center">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="" className="w-12 h-12 rounded-full object-cover" />
                ) : (
                  <User className="w-6 h-6 text-[#E07A5F]" />
                )}
              </div>
              <div className="min-w-0">
                <p className="font-medium text-[#3D405B] truncate">{displayName}</p>
                <p className="text-sm text-[#6D6F7C] truncate">{user?.email}</p>
              </div>
            </div>
          </section>

          {/* Account Settings — Delete */}
          <section className="rounded-2xl border border-[#EAE7DC] bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <SettingsIcon className="w-5 h-5 text-[#3D405B]" />
              <h2 className="text-lg font-semibold text-[#3D405B] font-['Manrope']">Account Settings</h2>
            </div>
            <p className="text-sm text-[#6D6F7C] mb-6">
              Permanently delete your account and all associated data (chats, memory, profile). This cannot be undone.
            </p>
            <Button
              variant="destructive"
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white rounded-xl"
              onClick={handleDeleteClick}
              disabled={deleting}
              data-testid="delete-account-btn"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Account
            </Button>
          </section>

          {/* Privacy & Legal */}
          <section className="rounded-2xl border border-[#EAE7DC] bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <SettingsIcon className="w-5 h-5 text-[#81B29A]" />
              <h2 className="text-lg font-semibold text-[#3D405B] font-['Manrope']">Privacy & Legal</h2>
            </div>
            <div className="space-y-3">
              <a
                href="/privacy-policy"
                className="block p-4 rounded-xl hover:bg-[#F4F1DE]/50 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[#3D405B] font-medium group-hover:text-[#E07A5F] transition-colors">
                    Privacy Policy
                  </span>
                  <ArrowLeft className="w-4 h-4 text-[#9CA3AF] rotate-180 group-hover:text-[#E07A5F] group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-sm text-[#6D6F7C] mt-1">
                  Learn how we protect your data
                </p>
              </a>
            </div>
          </section>
        </motion.div>
      </main>

      {/* Confirmation modal */}
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent className="max-w-md rounded-2xl border-[#EAE7DC]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#3D405B] font-['Manrope']">
              Delete account?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[#6D6F7C]">
              Are you sure you want to permanently delete your account? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:gap-0">
            <AlertDialogCancel disabled={deleting} className="rounded-xl">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleConfirmDelete();
              }}
              disabled={deleting}
              className="bg-red-600 hover:bg-red-700 text-white rounded-xl"
            >
              {deleting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deleting…
                </>
              ) : (
                'Yes, delete my account'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
