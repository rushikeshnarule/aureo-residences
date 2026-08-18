import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Sparkles,
  Send,
  Compass,
  ArrowRight,
  Bot,
  User,
  ShieldCheck,
  RotateCcw,
  Copy,
  Check
} from 'lucide-react';
import { chatWithAureoAI, ChatMessage } from '../../services/geminiService';

interface AureoAIConciergeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenInquiry: (location?: string) => void;
}

const STARTER_PROMPTS = [
  {
    icon: '🏔️',
    title: 'Alpine Sanctuary',
    prompt: 'Suggest a secluded alpine estate for private winter retreats with ski-in access and geothermal heating.'
  },
  {
    icon: '🌊',
    title: 'Coastal Anchorage',
    prompt: 'Show me coastal estates with private yacht anchorage and Mediterranean cliffside architecture.'
  },
  {
    icon: '🏛️',
    title: 'Cantilever Engineering',
    prompt: 'Explain the structural engineering behind post-tensioned cantilevers in your Lake Zurich residences.'
  },
  {
    icon: '💼',
    title: 'Private Commission',
    prompt: 'What are the requirements and timelines for commissioning a $50M+ bespoke monograph compound?'
  }
];

export const AureoAIConciergeModal: React.FC<AureoAIConciergeModalProps> = ({
  isOpen,
  onClose,
  onOpenInquiry
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: 'Welcome to AUREO Intelligence. I am your Private Architectural Advisor. How may I assist your acquisition inquiry, spatial philosophy inquiries, or bespoke commissions today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSend = async (userText?: string) => {
    const textToSend = userText || input;
    if (!textToSend.trim() || isLoading) return;

    const newMessages: ChatMessage[] = [...messages, { role: 'user', text: textToSend }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const aiReply = await chatWithAureoAI(newMessages, textToSend);
      setMessages([...newMessages, { role: 'model', text: aiReply }]);
    } catch (err: any) {
      setMessages([
        ...newMessages,
        {
          role: 'model',
          text: 'I apologize for the momentary interruption. Our Zurich Advisory Desk is ready to assist you directly via confidential channel.'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyMessage = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleResetChat = () => {
    setMessages([
      {
        role: 'model',
        text: 'Welcome to AUREO Intelligence. I am your Private Architectural Advisor. How may I assist your acquisition inquiry, spatial philosophy inquiries, or bespoke commissions today?'
      }
    ]);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 25 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 25 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-3xl w-full bg-[#fbf9f5] rounded-3xl overflow-hidden shadow-2xl border border-stone-200 flex flex-col h-[88vh] max-h-[850px]"
        >
          {/* Header */}
          <div className="bg-[#f5f0e6] p-5 sm:p-6 border-b border-stone-200 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-aureo-gold-600/15 border border-aureo-gold-500/30 flex items-center justify-center text-aureo-gold-700 shadow-sm">
                <Sparkles size={20} className="animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-aureo-gold-800 font-mono">
                    AUREO Intelligence · Gemini AI
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-900">
                  Private Architectural Concierge
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleResetChat}
                className="w-9 h-9 rounded-full bg-stone-200/80 hover:bg-stone-300 text-stone-700 flex items-center justify-center transition-colors cursor-pointer"
                title="Reset Conversation"
              >
                <RotateCcw size={15} />
              </button>

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-stone-200/80 hover:bg-stone-300 text-stone-700 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close AI Concierge"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
            {messages.map((msg, index) => {
              const isAi = msg.role === 'model' || msg.role === 'assistant';
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-3 ${isAi ? 'justify-start' : 'justify-end'}`}
                >
                  {isAi && (
                    <div className="w-8 h-8 rounded-full bg-stone-900 text-aureo-gold-400 flex items-center justify-center shrink-0 mt-1 shadow-sm">
                      <Bot size={15} />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] sm:max-w-[78%] p-4 sm:p-5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      isAi
                        ? 'bg-white text-stone-800 shadow-sm border border-stone-200/90 rounded-tl-sm'
                        : 'bg-stone-900 text-white rounded-tr-sm shadow-md'
                    }`}
                  >
                    <div className="whitespace-pre-line font-light">
                      {msg.text}
                    </div>

                    {isAi && (
                      <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
                        <span className="flex items-center gap-1">
                          <ShieldCheck size={12} className="text-aureo-gold-600" />
                          <span>Confidential Advisory</span>
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleCopyMessage(msg.text, index)}
                            className="hover:text-stone-700 transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            {copiedIndex === index ? (
                              <>
                                <Check size={11} className="text-emerald-600" />
                                <span className="text-emerald-600 font-semibold">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy size={11} />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {!isAi && (
                    <div className="w-8 h-8 rounded-full bg-aureo-gold-600 text-white flex items-center justify-center shrink-0 mt-1 shadow-sm">
                      <User size={15} />
                    </div>
                  )}
                </motion.div>
              );
            })}

            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3 justify-start"
              >
                <div className="w-8 h-8 rounded-full bg-stone-900 text-aureo-gold-400 flex items-center justify-center shrink-0 mt-1">
                  <Bot size={15} />
                </div>
                <div className="p-4 rounded-2xl bg-white border border-stone-200 rounded-tl-sm shadow-sm flex items-center gap-2 text-stone-500 text-xs font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-aureo-gold-600 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-aureo-gold-600 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-aureo-gold-600 animate-bounce [animation-delay:0.4s]" />
                  <span className="ml-1 text-[11px]">Analyzing architectural parameters...</span>
                </div>
              </motion.div>
            )}

            <div ref={chatBottomRef} />
          </div>

          {/* Quick Prompts Strip (shown when conversation is fresh) */}
          {messages.length <= 2 && (
            <div className="px-4 sm:px-6 py-2 bg-stone-100/70 border-t border-stone-200/80 overflow-x-auto scrollbar-none shrink-0">
              <div className="flex gap-2 min-w-max pb-1">
                {STARTER_PROMPTS.map((sp) => (
                  <button
                    key={sp.title}
                    onClick={() => handleSend(sp.prompt)}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white hover:bg-stone-50 text-stone-700 text-xs border border-stone-200/80 hover:border-aureo-gold-500 transition-all cursor-pointer shadow-xs disabled:opacity-50"
                  >
                    <span>{sp.icon}</span>
                    <span className="font-semibold">{sp.title}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Bar & Actions */}
          <div className="p-4 sm:p-5 bg-white border-t border-stone-200 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about architectural estates, custom lot acquisitions, or cantilevers..."
                disabled={isLoading}
                className="flex-1 px-4 py-3 rounded-full bg-stone-50 border border-stone-200 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-aureo-gold-500/30 focus:border-aureo-gold-600"
              />

              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-11 h-11 rounded-full bg-aureo-gold-600 hover:bg-aureo-gold-500 text-white flex items-center justify-center transition-all shadow-md active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0"
              >
                <Send size={16} />
              </button>
            </form>

            <div className="mt-3 flex items-center justify-between text-[11px] text-stone-500">
              <span className="flex items-center gap-1.5">
                <Compass size={12} className="text-aureo-gold-700" />
                <span>Powered by Gemini 2.5 Flash</span>
              </span>

              <button
                onClick={() => {
                  onClose();
                  onOpenInquiry();
                }}
                className="text-stone-900 hover:text-aureo-gold-700 font-bold underline flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>Direct Partner Briefing</span>
                <ArrowRight size={12} />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
