import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Send, 
  ShieldCheck, 
  Building2, 
  Phone, 
  Calendar, 
  Check, 
  Clock, 
  Loader2 
} from 'lucide-react';
import { sendChatMessage } from '../../services/messageService';
import { useAuth } from '../../context/AuthContext';

export function ConversationChatDrawer({
  isOpen,
  onClose,
  conversation,
  onInspectionClick
}) {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (conversation) {
      setMessages(conversation.messages || []);
    }
  }, [conversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen || !conversation) return null;

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const textToSend = inputText.trim();
    setInputText('');
    setSending(true);

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Optimistic UI update
    const optimisticMsg = {
      id: `m-${Date.now()}`,
      senderId: user?.id || 'me',
      senderName: user?.name || 'You',
      text: textToSend,
      time: timeStr,
      isMe: true
    };
    setMessages(prev => [...prev, optimisticMsg]);

    await sendChatMessage({
      conversationId: conversation.id,
      senderId: user?.id || 'buyer-me',
      senderName: user?.name || 'You',
      text: textToSend
    });

    setSending(false);

    // Check for simulated partner response after 1.8s
    setTimeout(() => {
      const stored = JSON.parse(localStorage.getItem('vettedhomes_conversations') || localStorage.getItem('estatelens_conversations') || '[]');
      const updatedConv = stored.find(c => c.id === conversation.id);
      if (updatedConv && updatedConv.messages) {
        setMessages(updatedConv.messages);
      }
    }, 1900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-navy/40 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col border-l border-estate-200 animate-slideInRight">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 bg-navy text-white flex items-center justify-between border-b border-estate-800">
          <div className="flex items-center gap-3">
            <img
              src={conversation.counterpart?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
              alt={conversation.counterpart?.name}
              className="w-10 h-10 rounded-2xl object-cover ring-2 ring-emerald-400"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold font-display text-white">{conversation.counterpart?.name}</h3>
                {conversation.counterpart?.isVerified && (
                  <ShieldCheck className="w-4 h-4 text-emerald" title="Verified Lister" />
                )}
              </div>
              <p className="text-[11px] text-estate-300">
                {conversation.counterpart?.role} • {conversation.counterpart?.phone}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-estate-800 rounded-xl text-estate-300 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Property Reference Bar */}
        <div className="px-4 py-2.5 bg-sand-50 border-b border-sand-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 truncate pr-2">
            <Building2 className="w-4 h-4 text-emerald shrink-0" />
            <span className="font-semibold text-estate-800 truncate">{conversation.propertyTitle}</span>
          </div>

          {onInspectionClick && (
            <button
              type="button"
              onClick={() => onInspectionClick(conversation.propertyId)}
              className="shrink-0 px-2.5 py-1 bg-emerald text-white text-[10px] font-bold rounded-lg hover:bg-emerald-dark transition flex items-center gap-1"
            >
              <Calendar className="w-3 h-3" />
              <span>Book Tour</span>
            </button>
          )}
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 bg-sand-50/40">
          {messages.length === 0 ? (
            <div className="py-12 text-center text-xs text-estate-400">
              No previous messages in this conversation. Send a message below to connect!
            </div>
          ) : (
            messages.map((msg, index) => {
              const isMine = msg.isMe || msg.senderId === user?.id || msg.senderId === 'buyer-me';
              return (
                <div
                  key={msg.id || index}
                  className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed shadow-xs ${
                      isMine
                        ? 'bg-navy text-white rounded-br-xs'
                        : 'bg-white text-estate-800 border border-estate-200 rounded-bl-xs'
                    }`}
                  >
                    {!isMine && (
                      <span className="font-bold text-emerald-800 block text-[10px] mb-0.5">
                        {msg.senderName}
                      </span>
                    )}
                    <p className="whitespace-pre-line">{msg.text}</p>
                  </div>
                  <span className="text-[10px] text-estate-400 mt-1 px-1">
                    {msg.time}
                  </span>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-3 sm:p-4 bg-white border-t border-estate-200 flex items-center gap-2">
          <input
            type="text"
            placeholder="Type your question or request..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 px-4 py-2.5 border border-estate-200 rounded-2xl text-xs focus:ring-2 focus:ring-emerald outline-none bg-sand-50/50"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || sending}
            className="p-2.5 bg-emerald text-white rounded-2xl hover:bg-emerald-dark transition disabled:opacity-50 shadow-xs"
          >
            {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </form>

      </div>
    </div>
  );
}

