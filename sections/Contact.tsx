'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle, Clock } from 'lucide-react';
import { ContactInfo, SocialLinks } from '@/types';
import SectionHeader from '@/components/SectionHeader';
import Card from '@/components/Card';
import Button from '@/components/Button';

interface ContactProps {
  contactInfo: ContactInfo;
  socials: SocialLinks;
}

export const Contact: React.FC<ContactProps> = ({ contactInfo, socials }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required.';
    
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Invalid email address.';
    }

    if (!formData.subject.trim()) tempErrors.subject = 'Subject is required.';
    if (!formData.message.trim()) tempErrors.message = 'Message is required.';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    // Simulate sending email api call
    await new Promise((resolve) => setTimeout(resolve, 1800));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form fields
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative overflow-hidden bg-background">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
        <SectionHeader 
          title="Get In Touch" 
          subtitle="Contact" 
          description="Let's collaborate on your next design project or discuss freelance/full-time senior roles."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Details Column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <Card variant="glass" className="p-6 md:p-8 flex flex-col gap-8 h-full border border-card-border/80" hoverEffect={false}>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold font-heading text-primary">
                  Contact Information
                </h3>
                <p className="text-sm text-muted-text font-sans leading-relaxed">
                  Feel free to send a message via the form, send an email, or initiate a chat on WhatsApp directly.
                </p>
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-accent/5 dark:bg-accent/15 text-accent border border-accent/10 shrink-0">
                    <Mail size={18} />
                  </div>
                  <div className="flex flex-col font-sans">
                    <span className="text-xs text-muted-text uppercase font-semibold tracking-wider">Email</span>
                    <a href={`mailto:${contactInfo.email}`} className="text-sm md:text-base font-medium text-primary hover:text-accent transition-colors mt-0.5">
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-accent/5 dark:bg-accent/15 text-accent border border-accent/10 shrink-0">
                    <Phone size={18} />
                  </div>
                  <div className="flex flex-col font-sans">
                    <span className="text-xs text-muted-text uppercase font-semibold tracking-wider">Phone / WhatsApp</span>
                    <a href={`tel:${contactInfo.phone.replace(/\s+/g, '')}`} className="text-sm md:text-base font-medium text-primary hover:text-accent transition-colors mt-0.5">
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-accent/5 dark:bg-accent/15 text-accent border border-accent/10 shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div className="flex flex-col font-sans">
                    <span className="text-xs text-muted-text uppercase font-semibold tracking-wider">Location</span>
                    <span className="text-sm md:text-base font-medium text-primary mt-0.5">
                      {contactInfo.location}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-accent/5 dark:bg-accent/15 text-accent border border-accent/10 shrink-0">
                    <Clock size={18} />
                  </div>
                  <div className="flex flex-col font-sans">
                    <span className="text-xs text-muted-text uppercase font-semibold tracking-wider">Availability</span>
                    <span className="text-sm md:text-base font-medium text-primary mt-0.5">
                      {contactInfo.availability}
                    </span>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp CTA */}
              <div className="border-t border-border-line/40 pt-6 mt-auto">
                <Button href={socials.whatsapp} variant="glass" className="w-full gap-2 justify-center" external>
                  <MessageSquare size={16} />
                  <span>Chat on WhatsApp</span>
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Form Column */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <Card variant="glass" className="p-6 md:p-8 h-full border border-card-border/80" hoverEffect={false}>
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form 
                    key="contact-form"
                    onSubmit={handleSubmit} 
                    className="flex flex-col gap-5 h-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name field */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="name" className="text-xs font-semibold text-primary font-heading">Your Name</label>
                        <input
                          id="name"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-xl glass border focus:outline-none focus:ring-1 focus:ring-accent font-sans text-sm ${
                            errors.name ? 'border-red-500/80 focus:ring-red-500' : 'border-card-border'
                          }`}
                          placeholder="John Doe"
                        />
                        {errors.name && <span className="text-[10px] text-red-500 font-medium font-sans">{errors.name}</span>}
                      </div>

                      {/* Email field */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="email" className="text-xs font-semibold text-primary font-heading">Your Email</label>
                        <input
                          id="email"
                          type="text"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-xl glass border focus:outline-none focus:ring-1 focus:ring-accent font-sans text-sm ${
                            errors.email ? 'border-red-500/80 focus:ring-red-500' : 'border-card-border'
                          }`}
                          placeholder="john@example.com"
                        />
                        {errors.email && <span className="text-[10px] text-red-500 font-medium font-sans">{errors.email}</span>}
                      </div>
                    </div>

                    {/* Subject field */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="subject" className="text-xs font-semibold text-primary font-heading">Subject</label>
                      <input
                        id="subject"
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl glass border focus:outline-none focus:ring-1 focus:ring-accent font-sans text-sm ${
                          errors.subject ? 'border-red-500/80 focus:ring-red-500' : 'border-card-border'
                        }`}
                        placeholder="Amazon A+ Content Project Proposal"
                      />
                      {errors.subject && <span className="text-[10px] text-red-500 font-medium font-sans">{errors.subject}</span>}
                    </div>

                    {/* Message field */}
                    <div className="flex flex-col gap-1.5 flex-1">
                      <label htmlFor="message" className="text-xs font-semibold text-primary font-heading">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={5}
                        className={`w-full px-4 py-3 rounded-xl glass border focus:outline-none focus:ring-1 focus:ring-accent font-sans text-sm resize-none flex-1 min-h-[140px] ${
                          errors.message ? 'border-red-500/80 focus:ring-red-500' : 'border-card-border'
                        }`}
                        placeholder="Describe your design objectives, timelines, and deliverables..."
                      />
                      {errors.message && <span className="text-[10px] text-red-500 font-medium font-sans">{errors.message}</span>}
                    </div>

                    {/* Submit Button */}
                    <Button 
                      type="submit" 
                      variant="primary" 
                      className="w-full gap-2 justify-center py-3.5 mt-2" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          <span>Send Message</span>
                        </>
                      )}
                    </Button>
                  </motion.form>
                ) : (
                  // Success State Visual Card
                  <motion.div 
                    key="success-card"
                    className="flex flex-col items-center justify-center text-center h-full py-12 gap-5"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="p-4 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      <CheckCircle size={48} className="animate-bounce" />
                    </div>
                    <div className="flex flex-col gap-2 max-w-sm">
                      <h3 className="text-xl font-bold font-heading text-primary">Message Sent Successfully!</h3>
                      <p className="text-sm text-muted-text font-sans leading-relaxed">
                        Thank you for reaching out, your message has been delivered. I will respond to your proposal within 24 business hours.
                      </p>
                    </div>
                    <Button 
                      onClick={() => setIsSubmitted(false)}
                      variant="secondary" 
                      size="sm" 
                      className="mt-2"
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
