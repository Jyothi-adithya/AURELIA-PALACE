import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useFetch } from '../hooks/useFetch';
import { eventService } from '../services/eventService';
import { enquiryService } from '../services/enquiryService';
import Container from '../components/common/Container';
import SectionHeading from '../components/common/SectionHeading';
import FormField from '../components/common/FormField';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const enquirySchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  eventTypeId: z.string().min(1, 'Please select an event type'),
  eventDate: z.string().min(1, 'Event date is required'),
  guestCount: z.string().refine((val) => parseInt(val) > 0, { message: 'Guest count must be positive' }),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
});

const EnquiryPage = () => {
  const { data: eventTypes, loading: eventsLoading } = useFetch(eventService.getAll);
  const [submitStatus, setSubmitStatus] = useState({ loading: false, success: false, error: null });

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(enquirySchema)
  });

  const onSubmit = async (data) => {
    setSubmitStatus({ loading: true, success: false, error: null });
    try {
      // Format data for backend
      const payload = {
        ...data,
        eventTypeId: parseInt(data.eventTypeId, 10),
        guestCount: parseInt(data.guestCount, 10)
      };
      
      await enquiryService.submit(payload);
      setSubmitStatus({ loading: false, success: true, error: null });
      reset();
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Something went wrong. Please try again.';
      setSubmitStatus({ loading: false, success: false, error: errorMsg });
    }
  };

  if (submitStatus.success) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-20 bg-brand-ivory">
        <Container className="text-center max-w-lg">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <CheckCircle2 size={64} className="text-green-600 mx-auto mb-6" />
            <h2 className="text-4xl font-serif text-brand-charcoal mb-4">Enquiry Received</h2>
            <p className="text-gray-600 mb-8">
              Thank you for reaching out to Aurelia Palace. Our team has received your enquiry and will be in touch shortly to discuss your extraordinary event.
            </p>
            <Button onClick={() => setSubmitStatus({ loading: false, success: false, error: null })}>
              Submit Another Enquiry
            </Button>
          </motion.div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-20 bg-brand-ivory">
      <Container className="max-w-3xl">
        <SectionHeading 
          title="Plan Your Event" 
          subtitle="Enquiry Form" 
          centered 
        />
        
        <div className="bg-white p-8 md:p-12 shadow-sm rounded-sm">
          {submitStatus.error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-sm mb-6 text-sm font-medium">
              {submitStatus.error}
            </div>
          )}
          
          {eventsLoading ? (
            <Loader text="Loading form..." />
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField 
                  label="Full Name" 
                  placeholder="John Doe"
                  error={errors.name}
                  {...register('name')}
                />
                <FormField 
                  label="Email Address" 
                  type="email"
                  placeholder="john@example.com"
                  error={errors.email}
                  {...register('email')}
                />
                <FormField 
                  label="Phone Number" 
                  placeholder="+1 (234) 567-8900"
                  error={errors.phone}
                  {...register('phone')}
                />
                <FormField 
                  label="Guest Count" 
                  type="number"
                  placeholder="150"
                  error={errors.guestCount}
                  {...register('guestCount')}
                />
                <FormField 
                  label="Event Type" 
                  type="select"
                  error={errors.eventTypeId}
                  {...register('eventTypeId')}
                >
                  <option value="">Select an Event Type</option>
                  {eventTypes?.map(et => (
                    <option key={et.id} value={et.id}>{et.name}</option>
                  ))}
                </FormField>
                <FormField 
                  label="Target Date" 
                  type="date"
                  error={errors.eventDate}
                  {...register('eventDate')}
                />
              </div>
              
              <FormField 
                label="Additional Details" 
                type="textarea"
                placeholder="Tell us a bit about your vision..."
                error={errors.message}
                {...register('message')}
              />
              
              <div className="pt-4 text-center">
                <Button type="submit" size="lg" className="w-full md:w-auto" isLoading={submitStatus.loading}>
                  Submit Enquiry
                </Button>
              </div>
            </form>
          )}
        </div>
      </Container>
    </div>
  );
};

export default EnquiryPage;
