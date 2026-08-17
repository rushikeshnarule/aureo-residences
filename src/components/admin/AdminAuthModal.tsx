import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, KeyRound, X, Sparkles, ArrowRight, Eye, EyeOff } from 'lucide-react';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [username, setUsername] = useState('admin');
  const [passcode, setPasscode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  if (!isOpen) return null;

  const validKeys = ['aureo2026', '2026', 'admin', 'aureo', 'studio', 'password', '123456', 'demo', 'aureo2025'];

  const executeSuccess = () => {
    if (rememberMe) {
      localStorage.setItem('aureo_admin_auth', 'true');
    }
    onSuccess();
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setError(false);

    const cleanInput = passcode.trim().toLowerCase();
    
    setTimeout(() => {
      if (validKeys.includes(cleanInput) || cleanInput === '') {
        setIsVerifying(false);
        executeSuccess();
      } else {
        setIsVerifying(false);
        setError(true);
      }
    }, 150);
  };

  const handleQuickUnlock = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      executeSuccess();
    }, 100);
  };

  const handleQuickFill = (val: string) => {
    setPasscode(val);
    setError(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-md w-full bg-white text-stone-900 rounded-3xl overflow-hidden shadow-2xl border border-stone-200"
        >
          {/* Luminous Warm Alabaster Header */}
          <div className="p-8 text-center relative border-b border-stone-200 bg-[#f5f0e6]">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-stone-200/80 hover:bg-stone-300 text-stone-700 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="w-16 h-16 rounded-full bg-white border border-stone-300 shadow-sm flex items-center justify-center mx-auto mb-4 text-aureo-gold-700">
              <Lock size={24} />
            </div>

            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-aureo-gold-800 block mb-1 font-mono">
              Atelier Management Portal
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
              Studio CMS Login
            </h3>
            <p className="text-xs text-stone-600 mt-2 font-light">
              Enter your passcode or use the 1-Click Studio Pass for instant access.
            </p>
          </div>

          {/* Form */}
          <div className="p-8 bg-white">
            
            {/* Quick 1-Click Instant Enter Banner */}
            <button
              type="button"
              onClick={handleQuickUnlock}
              className="w-full mb-6 py-3.5 px-4 rounded-2xl bg-aureo-gold-600 hover:bg-aureo-gold-500 text-white font-bold text-xs uppercase tracking-widest transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 border border-aureo-gold-400/50 cursor-pointer"
            >
              <Sparkles size={15} />
              <span>1-Click Instant Access</span>
              <ArrowRight size={14} />
            </button>

            <div className="relative flex py-2 items-center mb-5">
              <div className="flex-grow border-t border-stone-200" />
              <span className="flex-shrink mx-4 text-[10px] text-stone-400 uppercase tracking-widest font-mono">
                or sign in with key
              </span>
              <div className="flex-grow border-t border-stone-200" />
            </div>

            <form onSubmit={handleVerify} className="space-y-4">
              
              {/* Username field */}
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  User / Role
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-aureo-gold-500/30 focus:border-aureo-gold-600"
                />
              </div>

              {/* Passcode input */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-stone-700">
                    Partner Access Key
                  </label>
                  
                  {/* Quick-fill Pills */}
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleQuickFill('aureo2026')}
                      className="px-2 py-0.5 rounded bg-stone-100 hover:bg-stone-200 text-[10px] text-aureo-gold-800 font-mono transition-colors cursor-pointer font-bold border border-stone-200"
                    >
                      aureo2026
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickFill('admin')}
                      className="px-2 py-0.5 rounded bg-stone-100 hover:bg-stone-200 text-[10px] text-stone-700 font-mono transition-colors cursor-pointer border border-stone-200"
                    >
                      admin
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    autoFocus
                    placeholder="Enter aureo2026 or admin..."
                    value={passcode}
                    onChange={(e) => {
                      setPasscode(e.target.value);
                      setError(false);
                    }}
                    className={`w-full px-4 py-3 rounded-xl bg-stone-50 border text-sm text-stone-900 placeholder-stone-400 focus:outline-none transition-all pr-10 ${
                      error
                        ? 'border-red-500 focus:ring-2 focus:ring-red-500/30'
                        : 'border-stone-300 focus:border-aureo-gold-600 focus:ring-2 focus:ring-aureo-gold-500/20'
                    }`}
                  />
                  
                  {/* Show/Hide password toggle */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-red-600 mt-1.5 font-medium flex items-center gap-1.5"
                  >
                    <span>Key not recognized. Click "1-Click Instant Access" above or use</span>
                    <button
                      type="button"
                      onClick={() => handleQuickFill('aureo2026')}
                      className="font-mono text-stone-900 font-bold underline cursor-pointer"
                    >
                      aureo2026
                    </button>
                  </motion.p>
                )}
              </div>

              {/* Remember Me Option */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 text-xs text-stone-600 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-stone-300 text-aureo-gold-600 focus:ring-0 focus:ring-offset-0"
                  />
                  <span>Keep me logged in on this browser</span>
                </label>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isVerifying}
                className="w-full py-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold uppercase tracking-widest transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {isVerifying ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <KeyRound size={14} className="text-aureo-gold-400" />
                    <span>Sign In With Passcode</span>
                  </>
                )}
              </button>

            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
