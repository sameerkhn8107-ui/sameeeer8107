import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Trash2, LogIn, ChevronRight } from 'lucide-react';

/**
 * Public "Data Deletion Information" page at /delete-account.
 * Used for app store compliance (e.g. Google Play Console). No login required.
 */
export default function DataDeletion() {
  useEffect(() => {
    document.title = 'Data Deletion Information | Nex.AI';
    return () => { document.title = 'Nex.AI'; };
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFCF8]">
      <header className="border-b border-[#EAE7DC] bg-white/80 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto px-4 py-5 flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-3 text-[#3D405B] hover:opacity-80 transition-opacity"
            aria-label="App home"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#E07A5F] to-[#81B29A] flex items-center justify-center">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <span className="text-xl font-semibold font-['Manrope']">Nex.AI</span>
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-10 sm:py-14">
        <motion.article
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="space-y-8"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#E07A5F]/10 flex items-center justify-center">
              <Trash2 className="w-6 h-6 text-[#E07A5F]" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-[#3D405B] font-['Manrope'] tracking-tight">
                Data Deletion Information
              </h1>
              <p className="text-[#6D6F7C] text-sm mt-0.5">
                How to delete your account and associated data
              </p>
            </div>
          </div>

          <section className="rounded-2xl border border-[#EAE7DC] bg-white p-6 sm:p-8 shadow-sm space-y-6">
            <h2 className="text-lg font-semibold text-[#3D405B] font-['Manrope']">
              How to delete your account
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-[#3D405B] text-[15px] leading-relaxed">
              <li>Open the app and <strong>sign in</strong> to your account.</li>
              <li>Go to <strong>Settings</strong> (settings icon in the sidebar or navigation).</li>
              <li>Under <strong>Account Settings</strong>, tap <strong>Delete Account</strong>.</li>
              <li>Confirm in the dialog. Your account and all associated data will be <strong>permanently deleted</strong>.</li>
            </ol>
            <p className="text-[#6D6F7C] text-sm">
              After deletion, you will be signed out and can no longer access the account. This action cannot be undone.
            </p>
          </section>

          <section className="rounded-2xl border border-[#EAE7DC] bg-white p-6 sm:p-8 shadow-sm space-y-4">
            <h2 className="text-lg font-semibold text-[#3D405B] font-['Manrope']">
              What we delete
            </h2>
            <p className="text-[#3D405B] text-[15px] leading-relaxed">
              When you delete your account, we permanently remove:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-[#6D6F7C] text-[15px]">
              <li>Your profile and account information</li>
              <li>All chat history and conversations</li>
              <li>Stored preferences and memory (e.g. interests, goals)</li>
              <li>Your authentication identity (you will need to sign up again to use the app)</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-[#EAE7DC] bg-white p-6 sm:p-8 shadow-sm">
            <h2 className="text-lg font-semibold text-[#3D405B] font-['Manrope'] mb-3">
              Need help?
            </h2>
            <p className="text-[#6D6F7C] text-[15px] leading-relaxed mb-5">
              If you are already signed in, you can go to Settings and delete your account from there. If you are not signed in, sign in first to access Settings.
            </p>
            <Button
              asChild
              className="w-full sm:w-auto rounded-xl bg-[#E07A5F] hover:bg-[#E07A5F]/90 text-white"
            >
              <Link to="/login" className="inline-flex items-center gap-2">
                <LogIn className="w-4 h-4" />
                Sign in to delete my account
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
          </section>
        </motion.article>
      </main>

      <footer className="border-t border-[#EAE7DC] mt-12">
        <div className="max-w-2xl mx-auto px-4 py-6 text-center text-sm text-[#9CA3AF]">
          <Link to="/" className="hover:text-[#6D6F7C] transition-colors">Back to app</Link>
        </div>
      </footer>
    </div>
  );
}
