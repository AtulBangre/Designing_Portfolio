'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

interface WhatsAppButtonProps {
  phoneNumber: string; // e.g. "916266531716" (no + or spaces)
  message?: string;
}

export default function WhatsAppButton({ phoneNumber, message }: WhatsAppButtonProps) {
  const [visible, setVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show after a short delay so it doesn't flash on initial load
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const encodedMessage = message
    ? encodeURIComponent(message)
    : encodeURIComponent("Hi Atul! I'd like to discuss a design project.");

  const href = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Tooltip */}
      {showTooltip && (
        <div className="bg-[#111] text-white text-xs font-medium px-3 py-2 rounded-xl border border-white/10 shadow-xl whitespace-nowrap animate-in fade-in slide-in-from-bottom-2 duration-200">
          Chat on WhatsApp →
        </div>
      )}

      {/* Button */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="group w-14 h-14 rounded-full flex items-center justify-center bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-lg shadow-[#25D366]/30 hover:shadow-[#25D366]/50 transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={26} strokeWidth={1.8} />
      </a>
    </div>
  );
}
