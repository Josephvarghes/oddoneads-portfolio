"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles, User, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { CHAT_BOT_QA } from "@/data/mockData";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
}

export default function AiConcierge() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: CHAT_BOT_QA.welcomeMessage,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  if (pathname?.startsWith("/admin")) return null;

  const handleSendMessage = (text: string, isFromInput = false) => {
    if (!text.trim()) return;

    // Add user message
    const userMsgId = `user-${Date.now()}`;
    setMessages((prev) => [...prev, { id: userMsgId, sender: "user", text }]);
    if (isFromInput) {
      setInputValue("");
    }

    // Trigger typing simulator
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let reply = "Thank you for reaching out! To check specific availability or customized rates, please drop details in our Contact form or reach us directly on WhatsApp at +91 9497381830. A representative from Odd One Ads will get back to you shortly.";
      
      // Match if it is one of the predefined questions
      const matchedQA = CHAT_BOT_QA.predefinedQuestions.find(
        (qa) => qa.question.toLowerCase() === text.toLowerCase()
      );
      if (matchedQA) {
        reply = matchedQA.answer;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: reply,
        },
      ]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-brand-gradient hover:opacity-95 text-charcoal-950 rounded-full flex items-center justify-center shadow-lg shadow-brand-purple/20 cursor-pointer border border-white/10"
        aria-label="Open AI Concierge"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>

      {/* Chat Box Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="absolute bottom-20 right-0 w-[90vw] sm:w-[400px] h-[550px] glass-premium rounded-2xl flex flex-col overflow-hidden shadow-2xl shadow-black/40 border border-brand-purple/25"
          >
            {/* Header */}
            <div className="bg-charcoal-900 border-b border-white/[0.06] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-purple/10 border border-brand-purple/30 flex items-center justify-center text-brand-purple">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold tracking-wider text-white">
                    ODD ONE ADS CONCIERGE
                  </h4>
                  <span className="text-[10px] text-brand-teal tracking-widest font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    ONLINE ASSISTANT
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-charcoal-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${
                    msg.sender === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] ${
                      msg.sender === "user"
                        ? "bg-charcoal-700 text-white"
                        : "bg-brand-teal/10 text-brand-teal border border-brand-teal/20"
                    }`}
                  >
                    {msg.sender === "user" ? <User size={12} /> : <Sparkles size={12} />}
                  </div>
                  <div
                    className={`max-w-[75%] rounded-2xl p-3 text-xs leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-brand-gradient text-charcoal-950 font-semibold"
                        : "bg-white/[0.04] text-charcoal-100 border border-white/[0.06]"
                    }`}
                  >
                    {msg.text.split("\n").map((para, i) => (
                      <p key={i} className={i > 0 ? "mt-2" : ""}>
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-brand-teal/10 text-brand-teal border border-brand-teal/20 flex items-center justify-center">
                    <Sparkles size={12} />
                  </div>
                  <div className="bg-white/[0.04] text-charcoal-100 border border-white/[0.06] rounded-2xl px-4 py-3 text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-charcoal-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-charcoal-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-charcoal-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Quick Actions Panel */}
            <div className="px-4 py-2 border-t border-white/[0.03] bg-charcoal-900/40">
              <span className="text-[10px] text-charcoal-500 uppercase tracking-widest font-semibold flex items-center gap-1.5 mb-2">
                <HelpCircle size={10} className="text-brand-purple" /> Suggested Questions
              </span>
              <div className="flex flex-wrap gap-2">
                {CHAT_BOT_QA.predefinedQuestions.map((qa) => (
                  <button
                    key={qa.id}
                    onClick={() => handleSendMessage(qa.question)}
                    className="text-[10px] text-charcoal-200 hover:text-white bg-white/[0.03] hover:bg-brand-purple/10 border border-white/[0.06] hover:border-brand-purple/35 rounded-full px-3 py-1.5 transition-all text-left duration-250 cursor-pointer"
                  >
                    {qa.question}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Footer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue, true);
              }}
              className="p-4 bg-charcoal-900 border-t border-white/[0.06] flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask about your big day..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-grow bg-white/[0.03] border border-white/[0.08] focus:border-brand-purple/50 rounded-xl px-4 py-2.5 text-xs text-white placeholder-charcoal-500 focus:outline-none transition-all"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="w-9 h-9 bg-brand-gradient hover:opacity-95 disabled:opacity-40 text-charcoal-950 rounded-xl flex items-center justify-center transition-all cursor-pointer flex-shrink-0"
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
