import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  Send, 
  X, 
  Shield, 
  Clock, 
  HelpCircle, 
  CheckCheck,
  AlertTriangle
} from 'lucide-react';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
  source?: string;
}

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load chat history from localStorage or set initial welcoming message
  useEffect(() => {
    try {
      const saved = localStorage.getItem('antirisk_chat_history');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
          return;
        }
      }
    } catch (e) {
      console.warn("Could not load local chat history:", e);
    }

    // Set default initial welcoming message
    const initialMsg: ChatMessage = {
      id: 'init-welcome',
      text: "Good day, Sir/Ma. You are highly welcome to the Anti-Risk Security Command Center. I am Officer Grace, your dispatch assistant. How may we secure your personnel or logistics operations today?",
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      source: 'Officer Grace | Dispatch'
    };
    setMessages([initialMsg]);
    setUnreadCount(1); // Unread notification to draw user attention
  }, []);

  // Save messages to localStorage and auto-scroll
  useEffect(() => {
    if (messages.length > 0) {
      try {
        localStorage.setItem('antirisk_chat_history', JSON.stringify(messages));
      } catch (e) {
        console.warn("Could not persist chat history:", e);
      }
    }
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnreadCount(0);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsgText = inputValue.trim();
    setInputValue('');

    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      text: userMsgText,
      sender: 'user',
      timestamp: timeString
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMsgText,
          history: messages.slice(-10).map(m => ({ text: m.text, sender: m.sender }))
        })
      });

      if (!response.ok) {
        throw new Error('Support link down.');
      }

      const data = await response.json();
      const botMessage: ChatMessage = {
        id: `msg-${Date.now()}-bot`,
        text: data.response || "Copy that. We are dispatching intelligence updates to your query shortly.",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: data.source || 'Officer Grace | Dispatch'
      };

      setMessages(prev => [...prev, botMessage]);
      if (!isOpen) {
        setUnreadCount(prev => prev + 1);
      }
    } catch (err) {
      console.error(err);
      const errorMessage: ChatMessage = {
        id: `msg-${Date.now()}-err`,
        text: "The secure uplink to Officer Grace was interrupted. Please confirm your internet connection or use our main Contact Form to initiate high-priority support.",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'Officer Grace | Support'
      };
      setMessages(prev => [...prev, errorMessage]);
      if (!isOpen) {
        setUnreadCount(prev => prev + 1);
      }
    } finally {
      setIsTyping(false);
    }
  };

  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear your inquiry conversation history with Officer Grace?")) {
      const initialMsg: ChatMessage = {
        id: 'init-welcome-reset',
        text: "System Reset. Good day. Support dispatch is online and monitoring. How can we protect you?",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'Officer Grace | Dispatch'
      };
      setMessages([initialMsg]);
      localStorage.removeItem('antirisk_chat_history');
    }
  };

  return (
    <div id="live-chat-support-wrapper" className="fixed bottom-6 right-6 z-50 font-sans">
      {/* 1. COLLAPSED FLOATING LAUNCH BUTTON */}
      {!isOpen && (
        <button
          id="live-chat-toggle-button"
          onClick={handleOpenToggle}
          className="flex items-center justify-center w-14 h-14 bg-brand-navy hover:bg-brand-lime text-brand-lime hover:text-brand-navy rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group relative border border-slate-800"
          title="Open Security Support Desk"
          aria-label="Toggle Live Chat"
        >
          {/* Pulsing Outer Ring */}
          <span className="absolute -inset-0.5 rounded-full bg-brand-lime/30 animate-ping opacity-60 pointer-events-none group-hover:bg-brand-navy/30" />
          
          <MessageSquare className="w-6 h-6 transition-transform group-hover:rotate-12" />

          {/* Unread Message Badge */}
          {unreadCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white font-mono text-[10px] font-extrabold w-5.5 h-5.5 rounded-full border-2 border-white flex items-center justify-center animate-bounce">
              {unreadCount}
            </span>
          )}
        </button>
      )}

      {/* 2. CHAT WIDGET POPUP PANEL */}
      {isOpen && (
        <div 
          id="live-chat-panel"
          className="w-80 sm:w-96 h-[500px] bg-slate-950 border border-slate-800 rounded-sm shadow-2xl flex flex-col overflow-hidden animate-slide-up"
        >
          {/* Header Panel */}
          <div id="live-chat-header" className="bg-brand-navy border-b border-slate-800 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded bg-brand-lime/10 text-brand-lime border border-brand-lime/20 flex items-center justify-center relative">
                <Shield className="w-5 h-5" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-brand-navy animate-pulse" />
              </div>
              <div className="text-left">
                <h4 className="font-display font-extrabold text-[13px] text-white tracking-wide uppercase leading-tight">
                  Officer Grace
                </h4>
                <p className="text-[10px] font-mono text-brand-lime font-medium tracking-widest flex items-center gap-1 uppercase">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-lime animate-pulse" />
                  SUPPORT ACTIVE
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                id="live-chat-clear-button"
                onClick={handleClearHistory}
                className="text-slate-500 hover:text-white p-1 text-[10px] font-mono hover:bg-slate-900 rounded transition-colors"
                title="Clear Chat Logs"
              >
                Reset
              </button>
              <button
                id="live-chat-close-button"
                onClick={handleOpenToggle}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-900 rounded transition-colors cursor-pointer"
                aria-label="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Body Container */}
          <div 
            id="live-chat-messages"
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/95 scrollbar-none"
          >
            {messages.map((msg) => {
              const isBot = msg.sender === 'bot';
              const isError = msg.id.includes('-err');
              return (
                <div 
                  key={msg.id}
                  className={`flex flex-col ${isBot ? 'items-start' : 'items-end'} animate-fade-in`}
                >
                  {/* Message Bubble */}
                  <div
                    className={`max-w-[85%] rounded-sm px-3.5 py-2.5 text-xs font-sans leading-relaxed ${
                      isBot
                        ? isError
                          ? 'bg-red-950/20 text-red-300 border border-red-900/40'
                          : 'bg-slate-900/80 text-slate-200 border border-slate-900'
                        : 'bg-brand-lime text-slate-950 font-semibold'
                    }`}
                  >
                    {isError && (
                      <div className="flex items-center gap-1.5 mb-1.5 text-[10px] font-mono font-bold text-red-400">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        CONNECTION INTERRUPTED
                      </div>
                    )}
                    <p className="whitespace-pre-line">{msg.text}</p>
                  </div>

                  {/* Metadata line under bubble */}
                  <div className="flex items-center gap-2 mt-1 px-1">
                    {isBot && msg.source && (
                      <span className="text-[9px] font-mono font-semibold text-brand-lime uppercase tracking-wider">
                        {msg.source}
                      </span>
                    )}
                    <span className="text-[9px] font-mono text-slate-500 flex items-center gap-0.5">
                      <Clock className="w-2.5 h-2.5" />
                      {msg.timestamp}
                    </span>
                    {!isBot && (
                      <CheckCheck className="w-3 h-3 text-brand-lime" />
                    )}
                  </div>
                </div>
              );
            })}

            {/* Typing Indicator Bubble */}
            {isTyping && (
              <div className="flex flex-col items-start animate-pulse">
                <div className="bg-slate-900 text-slate-400 rounded-sm px-4 py-2.5 text-xs font-mono flex items-center gap-2 border border-slate-900">
                  <span className="flex h-1.5 w-1.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-lime opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-lime"></span>
                  </span>
                  <span>Officer Grace is typing reply...</span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Query Helper Suggestion Pills */}
          <div id="live-chat-suggestions" className="px-3 py-2 bg-slate-900/30 border-t border-slate-900/60 flex items-center gap-1.5 overflow-x-auto scrollbar-none select-none">
            {[
              "Hire Guard Force",
              "VIP Armed Escort",
              "Install CCTV Networks",
              "K-9 Scent Squad"
            ].map((suggest) => (
              <button
                key={suggest}
                onClick={() => {
                  setInputValue(suggest);
                }}
                className="px-2.5 py-1 text-[10px] font-mono bg-slate-900 border border-slate-800 text-slate-400 hover:text-brand-lime hover:border-brand-lime/40 rounded-full whitespace-nowrap transition-all cursor-pointer"
              >
                {suggest}
              </button>
            ))}
          </div>

          {/* Text Input Footer Form */}
          <form 
            id="live-chat-form"
            onSubmit={handleSendMessage}
            className="p-3 bg-brand-navy border-t border-slate-800 flex items-center gap-2"
          >
            <input
              id="live-chat-text-input"
              type="text"
              placeholder="Query our security dispatch desk..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isTyping}
              className="flex-1 bg-slate-900 border border-slate-800 text-white placeholder-slate-500 rounded-sm px-3 py-2 text-xs focus:outline-none focus:border-brand-lime transition-colors disabled:opacity-50 font-sans"
              autoComplete="off"
            />
            <button
              id="live-chat-submit-button"
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="p-2 bg-brand-lime text-slate-950 rounded-sm hover:bg-white transition-all disabled:opacity-50 disabled:bg-slate-800 disabled:text-slate-600 cursor-pointer flex items-center justify-center flex-shrink-0"
              aria-label="Send Message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
