import { supabase, isSupabaseConfigured } from '../lib/supabase';

const DEFAULT_CONVERSATIONS = [
  {
    id: 'conv-101',
    propertyId: 'prop-101',
    propertyTitle: 'Contemporary 4-Bedroom Semi-Detached Duplex with BQ',
    counterpart: {
      id: 'agent-1',
      name: 'Bolanle Alade & Partners',
      role: 'Listing Agent',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
      phone: '+234 803 555 0192',
      isVerified: true
    },
    lastMessage: 'Good afternoon, your inspection for Thursday 11:00 AM is approved. The estate gate security code is INS-849201.',
    lastMessageTime: '10:45 AM',
    unreadCount: 1,
    messages: [
      {
        id: 'm-1',
        senderId: 'buyer-me',
        senderName: 'You',
        text: 'Hello Bolanle, does the ₦9,500,000 rent cover the estate security levy and industrial water charge?',
        time: 'Yesterday, 4:20 PM',
        isMe: true
      },
      {
        id: 'm-2',
        senderId: 'agent-1',
        senderName: 'Bolanle Alade & Partners',
        text: 'Hello! The annual service charge is ₦1,200,000 which covers 24/7 security gate patrol, central water purification, and estate lawn maintenance. Diesel for backup generator is metered per kilowatt.',
        time: 'Yesterday, 5:15 PM',
        isMe: false
      },
      {
        id: 'm-3',
        senderId: 'buyer-me',
        senderName: 'You',
        text: 'Understood. I have requested a physical inspection for Thursday at 11:00 AM.',
        time: 'Today, 9:30 AM',
        isMe: true
      },
      {
        id: 'm-4',
        senderId: 'agent-1',
        senderName: 'Bolanle Alade & Partners',
        text: 'Good afternoon, your inspection for Thursday 11:00 AM is approved. The estate gate security code is INS-849201.',
        time: 'Today, 10:45 AM',
        isMe: false
      }
    ]
  },
  {
    id: 'conv-102',
    propertyId: 'prop-102',
    propertyTitle: 'Luxury 3-Bedroom Serviced Tech Haven in Sabo Yaba',
    counterpart: {
      id: 'agent-2',
      name: 'Heritage Realty Consult',
      role: 'Property Manager',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      phone: '+234 802 888 7722',
      isVerified: true
    },
    lastMessage: 'The dedicated optical fiber connection is ready for activation on move-in day.',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    messages: [
      {
        id: 'm-201',
        senderId: 'buyer-me',
        senderName: 'You',
        text: 'Hi, is parking space guaranteed for 2 vehicles in this building?',
        time: 'Nov 10, 2:10 PM',
        isMe: true
      },
      {
        id: 'm-202',
        senderId: 'agent-2',
        senderName: 'Heritage Realty Consult',
        text: 'Yes! Every 3-bedroom unit has 2 designated basement parking spots plus visitor slots. The dedicated optical fiber connection is ready for activation on move-in day.',
        time: 'Nov 10, 3:45 PM',
        isMe: false
      }
    ]
  }
];

// 1. Fetch Conversations for User
export async function fetchConversations(userId) {
  const localConversations = JSON.parse(
    localStorage.getItem('vettedhomes_conversations') || 
    localStorage.getItem('estatelens_conversations') || 
    'null'
  );
  if (localConversations) {
    return localConversations;
  }

  // Initialize with realistic Nigerian real estate threads
  localStorage.setItem('vettedhomes_conversations', JSON.stringify(DEFAULT_CONVERSATIONS));
  return DEFAULT_CONVERSATIONS;
}

// 2. Send Message in Conversation
export async function sendChatMessage({
  conversationId,
  senderId = 'buyer-me',
  senderName = 'You',
  text
}) {
  if (!text || !text.trim()) return { success: false };

  const allConversations = await fetchConversations(senderId);
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const newMessage = {
    id: `m-${Date.now()}`,
    senderId,
    senderName,
    text: text.trim(),
    time: timeStr,
    isMe: true
  };

  const updated = allConversations.map(conv => {
    if (conv.id === conversationId) {
      return {
        ...conv,
        lastMessage: text.trim(),
        lastMessageTime: timeStr,
        unreadCount: 0,
        messages: [...(conv.messages || []), newMessage]
      };
    }
    return conv;
  });

  localStorage.setItem('vettedhomes_conversations', JSON.stringify(updated));

  // If Supabase is configured, record in enquiries table
  if (isSupabaseConfigured && senderId && senderId.length > 20) {
    try {
      const activeConv = allConversations.find(c => c.id === conversationId);
      await supabase.from('enquiries').insert({
        property_id: activeConv?.propertyId?.startsWith('prop-') ? null : activeConv?.propertyId,
        sender_id: senderId,
        recipient_id: activeConv?.counterpart?.id?.length > 20 ? activeConv?.counterpart?.id : null,
        sender_name: senderName,
        sender_contact: 'Portal Message',
        message: text.trim(),
        status: 'sent'
      });
    } catch (err) {
      console.warn('Could not record message in Supabase:', err);
    }
  }

  // Simulate realistic automated partner response after 1.5s for demo delight
  setTimeout(() => {
    const current = JSON.parse(
      localStorage.getItem('vettedhomes_conversations') || 
      localStorage.getItem('estatelens_conversations') || 
      '[]'
    );
    const conv = current.find(c => c.id === conversationId);
    if (!conv) return;

    const replies = [
      "Thank you for the message. I will verify with the estate security desk and update you immediately.",
      "Noted with thanks! The landlord confirmed this is fine. Looking forward to our scheduled walkthrough.",
      "Understood. Let me send you the updated tenancy terms so you can review before the weekend."
    ];
    const replyText = replies[Math.floor(Math.random() * replies.length)];
    const replyTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const autoReply = {
      id: `m-rep-${Date.now()}`,
      senderId: conv.counterpart.id,
      senderName: conv.counterpart.name,
      text: replyText,
      time: replyTime,
      isMe: false
    };

    const finalConversations = current.map(c => {
      if (c.id === conversationId) {
        return {
          ...c,
          lastMessage: replyText,
          lastMessageTime: replyTime,
          messages: [...(c.messages || []), autoReply]
        };
      }
      return c;
    });

    localStorage.setItem('vettedhomes_conversations', JSON.stringify(finalConversations));
  }, 1600);

  return { success: true, message: newMessage };
}

// 3. Start or Open Conversation for a Property
export async function startPropertyConversation({
  propertyId,
  propertyTitle,
  agentName,
  agentAvatar,
  agentPhone,
  initialMessage,
  user
}) {
  const allConversations = await fetchConversations(user?.id);
  const existing = allConversations.find(c => c.propertyId === propertyId);

  if (existing) {
    if (initialMessage) {
      await sendChatMessage({
        conversationId: existing.id,
        senderId: user?.id || 'buyer-me',
        senderName: user?.name || 'You',
        text: initialMessage
      });
    }
    return { success: true, conversationId: existing.id };
  }

  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const newConv = {
    id: `conv-${Date.now()}`,
    propertyId,
    propertyTitle,
    counterpart: {
      id: `agent-${Date.now()}`,
      name: agentName || 'Listing Agent',
      role: 'Verified Partner',
      avatar: agentAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      phone: agentPhone || '+234 800 000 0000',
      isVerified: true
    },
    lastMessage: initialMessage || 'Enquiry initiated',
    lastMessageTime: timeStr,
    unreadCount: 0,
    messages: initialMessage ? [
      {
        id: `m-${Date.now()}`,
        senderId: user?.id || 'buyer-me',
        senderName: user?.name || 'You',
        text: initialMessage,
        time: timeStr,
        isMe: true
      }
    ] : []
  };

  const updated = [newConv, ...allConversations];
  localStorage.setItem('vettedhomes_conversations', JSON.stringify(updated));

  return { success: true, conversationId: newConv.id };
}

