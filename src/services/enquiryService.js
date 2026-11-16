import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { DEMO_USER } from '../data/demoData';

// 1. Send Property Enquiry
export async function sendPropertyEnquiry({
  propertyId,
  recipientId,
  senderId,
  senderName,
  senderContact,
  message
}) {
  const newEnquiry = {
    id: `enq-${Date.now()}`,
    propertyId,
    recipientId,
    senderId,
    senderName,
    senderContact,
    message,
    status: 'sent',
    createdAt: new Date().toISOString()
  };

  if (isSupabaseConfigured) {
    try {
      await supabase
        .from('enquiries')
        .insert({
          property_id: propertyId.startsWith('prop-') ? null : propertyId,
          recipient_id: recipientId && recipientId.length > 20 ? recipientId : null,
          sender_id: senderId && senderId.length > 20 ? senderId : null,
          sender_name: senderName,
          sender_contact: senderContact,
          message: message,
          status: 'sent'
        });
    } catch (err) {
      console.warn('Could not insert enquiry to Supabase, saving to local store:', err);
    }
  }

  // Save to local enquiries store
  const stored = JSON.parse(
    localStorage.getItem('vettedhomes_enquiries') ||
    localStorage.getItem('estatelens_enquiries') ||
    '[]'
  );
  localStorage.setItem('vettedhomes_enquiries', JSON.stringify([newEnquiry, ...stored]));

  return { success: true, enquiry: newEnquiry };
}

// 2. Schedule Physical Inspection Appointment
export async function schedulePhysicalInspection({
  propertyId,
  agentId,
  userId,
  preferredDate,
  preferredTimeSlot,
  fullName,
  phone,
  email,
  notes
}) {
  const gateCode = `INS-${Math.floor(100000 + Math.random() * 900000)}`;

  const inspectionObj = {
    id: `insp-${Date.now()}`,
    propertyId,
    agentId,
    userId,
    preferredDate,
    preferredTimeSlot,
    fullName,
    phone,
    email,
    notes,
    status: 'confirmed',
    gateCode,
    createdAt: new Date().toISOString()
  };

  if (isSupabaseConfigured) {
    try {
      await supabase
        .from('inspections')
        .insert({
          property_id: propertyId.startsWith('prop-') ? null : propertyId,
          user_id: userId && userId.length > 20 ? userId : null,
          agent_id: agentId && agentId.length > 20 ? agentId : null,
          preferred_date: preferredDate,
          preferred_time_slot: preferredTimeSlot,
          full_name: fullName,
          phone: phone,
          email: email,
          notes: notes,
          status: 'confirmed',
          gate_code: gateCode
        });
    } catch (err) {
      console.warn('Could not insert inspection to Supabase, saving to local store:', err);
    }
  }

  const stored = JSON.parse(
    localStorage.getItem('vettedhomes_inspections') ||
    localStorage.getItem('estatelens_inspections') ||
    '[]'
  );
  localStorage.setItem('vettedhomes_inspections', JSON.stringify([inspectionObj, ...stored]));

  return { success: true, inspection: inspectionObj, gateCode };
}

// 3. Get User Inspections
export async function getUserInspections(userId) {
  let list = [];
  if (isSupabaseConfigured && userId) {
    try {
      const { data, error } = await supabase
        .from('inspections')
        .select('*, properties(title, location_address)')
        .or(`user_id.eq.${userId},agent_id.eq.${userId}`)
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        list = data.map(i => ({
          id: i.id,
          propertyId: i.property_id,
          propertyTitle: i.properties?.title || 'Residential Listing',
          status: i.status === 'confirmed' ? 'Inspection Confirmed' : 'Pending Schedule',
          inspectionDate: `${i.preferred_date} at ${i.preferred_time_slot}`,
          gateCode: i.gate_code,
          fullName: i.full_name,
          phone: i.phone
        }));
      }
    } catch (err) {
      console.warn('Error reading inspections from Supabase:', err);
    }
  }

  const localSaved = JSON.parse(
    localStorage.getItem('vettedhomes_inspections') ||
    localStorage.getItem('estatelens_inspections') ||
    '[]'
  );
  if (list.length === 0 && localSaved.length === 0) {
    return DEMO_USER.enquiries;
  }

  return [...list, ...localSaved];
}

// 4. Get User Enquiries
export async function getUserEnquiries(userId) {
  let list = [];
  if (isSupabaseConfigured && userId) {
    try {
      const { data, error } = await supabase
        .from('enquiries')
        .select('*, properties(title)')
        .or(`sender_id.eq.${userId},recipient_id.eq.${userId}`)
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        list = data.map(e => ({
          id: e.id,
          propertyId: e.property_id,
          propertyTitle: e.properties?.title || 'Residential Property',
          agentName: 'Listing Agent / Host',
          lastMessage: e.message,
          senderName: e.sender_name,
          senderContact: e.sender_contact,
          status: e.status || 'sent',
          createdAt: e.created_at
        }));
      }
    } catch (err) {
      console.warn('Error reading enquiries from Supabase:', err);
    }
  }

  const localEnquiries = JSON.parse(
    localStorage.getItem('vettedhomes_enquiries') ||
    localStorage.getItem('estatelens_enquiries') ||
    '[]'
  );
  const formattedLocal = localEnquiries.map(e => ({
    id: e.id,
    propertyId: e.propertyId,
    propertyTitle: 'Inquired Property',
    agentName: 'Listing Agent / Landlord',
    lastMessage: e.message,
    senderName: e.senderName,
    senderContact: e.senderContact,
    status: e.status || 'sent',
    createdAt: e.createdAt
  }));

  if (list.length === 0 && formattedLocal.length === 0) {
    return [
      {
        id: 'enq-demo-1',
        propertyId: 'prop-101',
        propertyTitle: 'Contemporary 4-Bedroom Semi-Detached Duplex',
        agentName: 'Bolanle Alade & Partners',
        lastMessage: 'Good afternoon, the inspection window for Thursday 11:00 AM is approved. The estate security gate code will activate on morning of visit.',
        status: 'responded'
      }
    ];
  }

  return [...list, ...formattedLocal];
}
