"use client";

import { useChat } from "@ai-sdk/react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, User, SendHorizontal, Loader2, AlertTriangle, Leaf, Globe } from "lucide-react";
import type { UIMessage } from "ai";

function getMessageText(message: UIMessage | Record<string, unknown>): string {
  const parts = (message as UIMessage).parts;
  if (Array.isArray(parts)) {
    return parts
      .filter((part) => part.type === "text")
      .map((part) => part.text)
      .join("");
  }

  const content = (message as { content?: unknown }).content;
  return typeof content === "string" ? content : "";
}

export function NewChatbot({
  initialMessages = [],
}: {
  initialMessages?: UIMessage[];
}) {
  const { messages, status, sendMessage, error, clearError } = useChat({
    messages: initialMessages,
    onError: (err) => {
      console.error("OpenAI Chat Error:", err);
    },
  });

  const [input, setInput] = useState("");
  const isLoading = status === "submitted" || status === "streaming";
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (error) clearError?.();
  };

  const submitText = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    if (error) clearError?.();
    await sendMessage({ text: trimmed });
    setInput("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void submitText(input);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, error]);

  return (
    <div className="flex flex-col h-[min(650px,calc(100dvh-10rem))] sm:h-[650px] bg-gradient-to-br from-[#0A0D14] to-[#121826] rounded-3xl overflow-hidden shadow-2xl relative border border-white/10">
      
      {/* Decorative Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#2ED47A]/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#4FA9FF]/10 blur-[100px] rounded-full" />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-white/5 bg-white/5 backdrop-blur-md z-10">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-[#2ED47A] to-[#4FA9FF] shadow-[0_0_20px_rgba(46,212,122,0.3)]">
              <Sparkles size={22} className="text-white" />
            </div>
            <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-[#121826]" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
              Nexus AI
            </h2>
            <p className="text-xs font-medium text-[#2ED47A] flex items-center gap-1">
              {isLoading ? (
                <span className="text-[#FFB547] flex items-center gap-1">
                  <Loader2 size={10} className="animate-spin" /> Processing
                </span>
              ) : error ? (
                <span className="text-[#FF6B6B]">Connection Error</span>
              ) : (
                "Powered by OpenAI"
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 z-10 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center h-full text-center space-y-6"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 shadow-xl">
              <Globe size={40} className="text-[#4FA9FF] opacity-80" />
            </div>
            <div className="max-w-md">
              <h3 className="font-bold text-white text-2xl mb-3">Welcome to Nexus AI</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                I am your premium sustainability advisor, powered by advanced OpenAI intelligence. Ask me about carbon strategies, eco-living, or environmental impact.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 justify-center mt-6 max-w-lg">
              {[
                "Calculate my daily commute impact",
                "What are scope 3 emissions?",
                "How do I transition to renewable energy?",
              ].map((suggestion, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => void submitText(suggestion)}
                  disabled={isLoading}
                  className="group relative px-4 py-2.5 rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
                >
                  <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-[#2ED47A]/20 to-[#4FA9FF]/20" />
                  <span className="relative text-xs sm:text-sm font-medium text-white/90 group-hover:text-white flex items-center gap-2">
                    <Leaf size={14} className="text-[#2ED47A]" />
                    {suggestion}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        <AnimatePresence initial={false}>
          {messages.map((message) => {
            const text = getMessageText(message);
            const isUser = message.role === "user";

            return (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex gap-4 ${isUser ? "flex-row-reverse" : ""}`}
              >
                <motion.div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full mt-auto shadow-lg ${
                    isUser
                      ? "bg-gradient-to-tr from-[#1E293B] to-[#334155] border border-white/10"
                      : "bg-gradient-to-tr from-[#2ED47A] to-[#4FA9FF]"
                  }`}
                  animate={!isUser && isLoading && message.id === messages[messages.length - 1]?.id ? {
                    boxShadow: ["0 0 0px rgba(46,212,122,0)", "0 0 15px rgba(46,212,122,0.6)", "0 0 0px rgba(46,212,122,0)"]
                  } : {}}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  {isUser ? (
                    <User size={18} className="text-white/80" />
                  ) : (
                    <motion.div
                      animate={isLoading && message.id === messages[messages.length - 1]?.id ? { rotate: [0, 15, -15, 0] } : {}}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    >
                      <Sparkles size={18} className="text-white" />
                    </motion.div>
                  )}
                </motion.div>

                <div
                  className={`max-w-[85%] sm:max-w-[75%] px-5 py-4 text-[15px] shadow-sm leading-relaxed ${
                    isUser
                      ? "bg-gradient-to-bl from-[#2ED47A]/20 to-[#2ED47A]/5 text-white border border-[#2ED47A]/20 rounded-2xl rounded-br-sm"
                      : "bg-white/5 text-gray-200 border border-white/10 rounded-2xl rounded-bl-sm backdrop-blur-sm"
                  }`}
                >
                  <motion.div
                    initial={isUser ? { opacity: 0, x: 10 } : { opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="prose prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/10"
                    dangerouslySetInnerHTML={{
                      __html: text
                        .replace(/\*\*(.*?)\*\*/g, "<strong class='text-white'>$1</strong>")
                        .replace(/`(.*?)`/g, "<code class='bg-black/30 px-1.5 py-0.5 rounded text-[#4FA9FF] text-sm'>$1</code>")
                        .replace(/- (.*)/g, "<li class='ml-4 list-disc marker:text-[#2ED47A]'>$1</li>"),
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {isLoading && messages[messages.length - 1]?.role === "user" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full mt-auto shadow-lg bg-gradient-to-tr from-[#2ED47A] to-[#4FA9FF]">
              <Sparkles size={18} className="text-white" />
            </div>
            <div className="flex items-center gap-2 px-5 py-4 bg-white/5 border border-white/10 rounded-2xl rounded-bl-sm backdrop-blur-sm">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="h-2 w-2 rounded-full bg-[#4FA9FF]"
                  animate={{ y: ["0%", "-50%", "0%"], opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3 rounded-2xl px-5 py-4 text-sm bg-red-500/10 border border-red-500/20 text-red-200 backdrop-blur-sm"
          >
            <AlertTriangle size={20} className="shrink-0 text-red-400 mt-0.5" />
            <div>
              <p className="font-semibold text-red-300">Connection Interrupted</p>
              <p className="mt-1 text-sm opacity-80">
                {error.message || "Failed to communicate with OpenAI. Please try again."}
              </p>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 sm:p-5 z-10 bg-gradient-to-t from-[#0A0D14] to-transparent">
        <form onSubmit={handleSubmit} className="relative flex items-center group">
          <div className="absolute inset-0 bg-gradient-to-r from-[#2ED47A] to-[#4FA9FF] rounded-full blur-md opacity-20 group-focus-within:opacity-40 transition-opacity" />
          <div className="relative flex items-center w-full bg-[#1A2235] border border-white/10 rounded-full pr-2 pl-6 shadow-xl transition-all focus-within:border-[#4FA9FF]/50">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Ask Nexus AI anything..."
              className="flex-1 min-w-0 bg-transparent text-[15px] text-white placeholder-gray-500 outline-none py-4"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] active:scale-95 disabled:opacity-30 disabled:hover:scale-100 disabled:hover:shadow-none ml-2"
              aria-label="Send message"
            >
              {isLoading ? (
                <Loader2 size={18} className="animate-spin text-black" />
              ) : (
                <SendHorizontal size={18} className="text-black ml-0.5" />
              )}
            </button>
          </div>
        </form>
        <p className="text-center text-[10px] text-gray-500 mt-3 font-medium">
          Nexus AI powered by OpenAI • Responses may occasionally be inaccurate.
        </p>
      </div>
    </div>
  );
}
