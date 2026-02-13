import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { ArrowLeft, Shield } from 'lucide-react';

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Privacy Policy | Nex.AI';
    
    // Cleanup on unmount
    return () => {
      document.title = 'Nex.AI';
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFCF8]">
      {/* Header */}
      <header className="border-b border-[#EAE7DC] bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className="text-[#6D6F7C] hover:text-[#E07A5F] hover:bg-[#E07A5F]/10 rounded-xl"
            aria-label="Back to app"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#E07A5F] to-[#81B29A] flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-[#3D405B] font-['Manrope']">Privacy Policy</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          {/* Introduction */}
          <section className="rounded-2xl border border-[#EAE7DC] bg-white p-6 md:p-8 shadow-sm">
            <p className="text-[#6D6F7C] leading-relaxed mb-4">
              <strong className="text-[#3D405B]">Effective Date:</strong> February 11, 2026
            </p>
            <p className="text-[#6D6F7C] leading-relaxed">
              Welcome to Nex.AI. This Privacy Policy explains how we collect, use, store, and protect your personal information when you use our AI chatbot application. By using Nex.AI, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="rounded-2xl border border-[#EAE7DC] bg-white p-6 md:p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-[#3D405B] font-['Manrope'] mb-4">1. Information We Collect</h2>
            <div className="space-y-4 text-[#6D6F7C] leading-relaxed">
              <p>We collect the following types of information when you use Nex.AI:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong className="text-[#3D405B]">Account Information:</strong> Name (if provided via Google login), email address</li>
                <li><strong className="text-[#3D405B]">Authentication Data:</strong> Firebase authentication tokens and credentials</li>
                <li><strong className="text-[#3D405B]">Chat Messages:</strong> All conversation messages you send and receive from our AI chatbot</li>
                <li><strong className="text-[#3D405B]">Conversation History:</strong> Records of your chat sessions and conversations</li>
                <li><strong className="text-[#3D405B]">User Preferences and Memory:</strong> Information you share with the AI that helps personalize your experience, including interests, goals, language preferences, and communication style</li>
              </ul>
            </div>
          </section>

          {/* How We Use Information */}
          <section className="rounded-2xl border border-[#EAE7DC] bg-white p-6 md:p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-[#3D405B] font-['Manrope'] mb-4">2. How We Use Your Information</h2>
            <div className="space-y-4 text-[#6D6F7C] leading-relaxed">
              <p>We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide and maintain our AI chatbot services</li>
                <li>Personalize your experience and improve AI responses based on your preferences</li>
                <li>Maintain account security and authenticate users</li>
                <li>Analyze usage patterns to improve our services</li>
                <li>Respond to your support requests and inquiries</li>
              </ul>
            </div>
          </section>

          {/* Authentication Information */}
          <section className="rounded-2xl border border-[#EAE7DC] bg-white p-6 md:p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-[#3D405B] font-['Manrope'] mb-4">3. Authentication Information</h2>
            <div className="space-y-4 text-[#6D6F7C] leading-relaxed">
              <p>Nex.AI uses Firebase Authentication to manage user accounts. We support the following authentication methods:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong className="text-[#3D405B]">Google Sign-In:</strong> When you sign in with Google, we receive your name, email address, and profile picture from Google</li>
                <li><strong className="text-[#3D405B]">Email & Password:</strong> When you create an account with email and password, we store your email and encrypted password through Firebase Authentication</li>
              </ul>
              <p className="mt-4">
                Firebase Authentication handles all password encryption and security. We do not have access to your plain-text passwords.
              </p>
            </div>
          </section>

          {/* Data Storage */}
          <section className="rounded-2xl border border-[#EAE7DC] bg-white p-6 md:p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-[#3D405B] font-['Manrope'] mb-4">4. Data Storage</h2>
            <div className="space-y-4 text-[#6D6F7C] leading-relaxed">
              <p>
                All user data is securely stored in <strong className="text-[#3D405B]">Firebase Firestore</strong>, a cloud-based NoSQL database provided by Google. Firebase implements industry-standard security measures including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Encryption in transit and at rest</li>
                <li>Secure access controls</li>
                <li>Regular security audits</li>
                <li>Compliance with international data protection standards</li>
              </ul>
            </div>
          </section>

          {/* Data Sharing */}
          <section className="rounded-2xl border border-[#EAE7DC] bg-white p-6 md:p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-[#3D405B] font-['Manrope'] mb-4">5. Data Sharing and Disclosure</h2>
            <div className="space-y-4 text-[#6D6F7C] leading-relaxed">
              <p className="font-medium text-[#3D405B]">
                We do NOT sell, rent, or share your personal information with third parties for marketing purposes.
              </p>
              <p>We may share your information only in the following limited circumstances:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong className="text-[#3D405B]">Service Providers:</strong> With Firebase/Google Cloud for hosting and authentication services</li>
                <li><strong className="text-[#3D405B]">Legal Requirements:</strong> If required by law, court order, or government regulation</li>
                <li><strong className="text-[#3D405B]">Safety and Security:</strong> To protect the rights, property, or safety of Nex.AI, our users, or others</li>
              </ul>
            </div>
          </section>

          {/* Data Retention */}
          <section className="rounded-2xl border border-[#EAE7DC] bg-white p-6 md:p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-[#3D405B] font-['Manrope'] mb-4">6. Data Retention</h2>
            <div className="space-y-4 text-[#6D6F7C] leading-relaxed">
              <p>
                We retain your personal information for as long as your account is active or as needed to provide you services. You can delete your account at any time from the Settings page.
              </p>
            </div>
          </section>

          {/* Data Deletion */}
          <section className="rounded-2xl border border-[#EAE7DC] bg-white p-6 md:p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-[#3D405B] font-['Manrope'] mb-4">7. Your Right to Delete Your Data</h2>
            <div className="space-y-4 text-[#6D6F7C] leading-relaxed">
              <p>
                You have the right to delete your account and all associated data at any time. To delete your account:
              </p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>Go to <strong className="text-[#3D405B]">Settings</strong> in the Nex.AI app</li>
                <li>Click on <strong className="text-[#3D405B]">"Delete Account"</strong></li>
                <li>Confirm your decision</li>
              </ol>
              <p className="mt-4">
                Account deletion is <strong className="text-[#3D405B]">permanent and irreversible</strong>. When you delete your account, we permanently remove:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Your profile information (name, email)</li>
                <li>All chat conversations and message history</li>
                <li>All stored user memory and preferences</li>
                <li>Your Firebase authentication record</li>
              </ul>
              <p className="mt-4">
                This process typically completes immediately. Some backup copies may persist in our systems for up to 30 days for disaster recovery purposes, after which they are permanently deleted.
              </p>
            </div>
          </section>

          {/* Security Measures */}
          <section className="rounded-2xl border border-[#EAE7DC] bg-white p-6 md:p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-[#3D405B] font-['Manrope'] mb-4">8. Security Measures</h2>
            <div className="space-y-4 text-[#6D6F7C] leading-relaxed">
              <p>
                We implement appropriate technical and organizational security measures to protect your personal information, including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Secure HTTPS connections for all data transmission</li>
                <li>Firebase Authentication with industry-standard encryption</li>
                <li>Access controls and authentication requirements</li>
                <li>Regular security monitoring and updates</li>
              </ul>
              <p className="mt-4">
                However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
              </p>
            </div>
          </section>

          {/* Children's Privacy */}
          <section className="rounded-2xl border border-[#EAE7DC] bg-white p-6 md:p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-[#3D405B] font-['Manrope'] mb-4">9. Children's Privacy</h2>
            <div className="space-y-4 text-[#6D6F7C] leading-relaxed">
              <p>
                Nex.AI is not intended for use by children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us at <a href="mailto:nexai8099@gmail.com" className="text-[#E07A5F] hover:text-[#D06950] underline">nexai8099@gmail.com</a>, and we will delete such information from our systems.
              </p>
            </div>
          </section>

          {/* Changes to This Policy */}
          <section className="rounded-2xl border border-[#EAE7DC] bg-white p-6 md:p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-[#3D405B] font-['Manrope'] mb-4">10. Changes to This Privacy Policy</h2>
            <div className="space-y-4 text-[#6D6F7C] leading-relaxed">
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Effective Date" at the top.
              </p>
              <p>
                You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section className="rounded-2xl border border-[#EAE7DC] bg-white p-6 md:p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-[#3D405B] font-['Manrope'] mb-4">11. Contact Us</h2>
            <div className="space-y-4 text-[#6D6F7C] leading-relaxed">
              <p>
                If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
              </p>
              <div className="bg-[#F4F1DE]/50 rounded-xl p-4 mt-4">
                <p className="font-medium text-[#3D405B]">Email:</p>
                <a 
                  href="mailto:nexai8099@gmail.com" 
                  className="text-[#E07A5F] hover:text-[#D06950] underline text-lg"
                >
                  nexai8099@gmail.com
                </a>
              </div>
            </div>
          </section>

          {/* Back to App Button */}
          <div className="flex justify-center pt-4">
            <Button
              onClick={() => navigate('/')}
              className="px-8 py-6 rounded-full bg-[#E07A5F] hover:bg-[#D06950] text-white font-medium text-lg transition-transform active:scale-[0.98] shadow-[0_4px_20px_-4px_rgba(224,122,95,0.4)]"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to App
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
