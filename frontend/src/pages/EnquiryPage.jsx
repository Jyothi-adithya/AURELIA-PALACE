import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useFetch } from '../hooks/useFetch';
import { eventService } from '../services/eventService';
import { enquiryService } from '../services/enquiryService';
import Container from '../components/common/Container';
import SEO from '../components/common/SEO';
import Loader from '../components/common/Loader';
import Button from '../components/common/Button';

const schema = z.object({
  name:        z.string().min(2, 'Full name is required'),
  email:       z.string().email('A valid email address is required'),
  phone:       z.string().min(10, 'A valid phone number is required'),
  eventTypeId: z.string().min(1, 'Please select an event type'),
  eventDate:   z.string().min(1, 'Please select an event date'),
  guestCount:  z.string().refine(v => parseInt(v) > 0, { message: 'Guest count must be at least 1' }),
  message:     z.string().min(10, 'Please provide at least 10 characters').max(2000),
});

const Field = ({ label, error, type = 'text', children, ...props }) => {
  const base = "w-full px-0 py-3 bg-transparent border-0 border-b font-light text-brand-charcoal placeholder-brand-stone focus:outline-none transition-colors duration-300 text-[0.9375rem]";
  const borderClass = error ? "border-red-400 focus:border-red-500" : "border-brand-stone focus:border-brand-charcoal";

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-[0.65rem] font-semibold tracking-widest uppercase text-brand-muted">
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea className={`${base} ${borderClass} min-h-[110px] resize-none`} {...props} />
      ) : type === 'select' ? (
        <select className={`${base} ${borderClass} cursor-pointer`} {...props}>{children}</select>
      ) : (
        <input type={type} className={`${base} ${borderClass}`} {...props} />
      )}
      {error && <span className="text-red-500 text-xs font-medium mt-0.5">{error.message}</span>}
    </div>
  );
};

const EnquiryPage = () => {
  const { data: eventTypes, loading: eventsLoading } = useFetch(eventService.getAll);
  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    setStatus({ loading: true, success: false, error: null });
    try {
      await enquiryService.submit({
        ...data,
        eventTypeId: parseInt(data.eventTypeId, 10),
        guestCount:  parseInt(data.guestCount, 10),
      });
      setStatus({ loading: false, success: true, error: null });
      reset();
    } catch (err) {
      setStatus({ loading: false, success: false, error: err.response?.data?.message || 'Something went wrong. Please try again.' });
    }
  };

  return (
    <div className="bg-brand-ivory min-h-screen">
      <SEO title="Plan Your Event" description="Submit an enquiry to start planning your dream event at Aurelia Palace." />

      {/* Hero */}
      <div className="pt-36 pb-20 bg-brand-charcoal text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="label-xs mb-4"
        >
          Enquiry
        </motion.p>
        <span className="gold-rule mx-auto mb-7 block" />
        <motion.h1
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="font-serif text-display-xl text-white"
        >
          Plan Your Event
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="mt-5 text-white/50 font-light max-w-md mx-auto text-sm leading-loose"
        >
          Tell us about your vision. Our team will be in touch within 24 hours.
        </motion.p>
      </div>

      <Container className="max-w-3xl -mt-0 py-20">
        {status.success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <CheckCircle2 size={48} className="text-brand-gold mx-auto mb-6" />
            <h2 className="font-serif text-display-md text-brand-charcoal mb-4">Enquiry Received</h2>
            <p className="text-brand-muted font-light max-w-sm mx-auto mb-10">
              Thank you for reaching out to Aurelia Palace. Our events team will review your enquiry and contact you shortly.
            </p>
            <Button onClick={() => setStatus({ loading: false, success: false, error: null })} variant="outline">
              Submit Another Enquiry
            </Button>
          </motion.div>
        ) : eventsLoading ? (
          <Loader />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-0">
            {status.error && (
              <div className="bg-red-50 border border-red-200 text-red-600 p-4 text-sm mb-8">
                {status.error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 mb-8">
              <Field label="Full Name" placeholder="Jane Doe" error={errors.name} {...register('name')} />
              <Field label="Email Address" type="email" placeholder="jane@example.com" error={errors.email} {...register('email')} />
              <Field label="Phone Number" placeholder="+1 (234) 567-8900" error={errors.phone} {...register('phone')} />
              <Field label="Number of Guests" type="number" placeholder="150" error={errors.guestCount} {...register('guestCount')} />
              <Field label="Event Type" type="select" error={errors.eventTypeId} {...register('eventTypeId')}>
                <option value="">Select an event type</option>
                {eventTypes?.map(et => (
                  <option key={et.id} value={et.id}>{et.name}</option>
                ))}
              </Field>
              <Field label="Preferred Date" type="date" error={errors.eventDate} {...register('eventDate')} />
            </div>

            <Field
              label="Tell Us About Your Vision"
              type="textarea"
              placeholder="Describe your ideal event — theme, expectations, any special requirements…"
              error={errors.message}
              {...register('message')}
            />

            <div className="pt-12 flex justify-start">
              <Button type="submit" variant="primary" size="lg" isLoading={status.loading}>
                Submit Enquiry
              </Button>
            </div>
          </form>
        )}
      </Container>
    </div>
  );
};

export default EnquiryPage;
