import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay },
  }),
};

const SectionHeading = ({
  title,
  subtitle,
  body,
  centered = false,
  light = false,
  className,
  delay = 0,
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className={cn(
        'mb-14',
        centered && 'text-center flex flex-col items-center',
        className
      )}
    >
      {subtitle && (
        <motion.span
          custom={delay}
          variants={fadeUp}
          className={cn('label-xs mb-4 block', light ? 'text-brand-gold' : 'text-brand-gold')}
        >
          {subtitle}
        </motion.span>
      )}

      {/* Gold rule */}
      {centered && (
        <motion.span custom={delay + 0.05} variants={fadeUp} className="gold-rule mb-6" />
      )}

      <motion.h2
        custom={delay + 0.1}
        variants={fadeUp}
        className={cn(
          'font-serif text-balance',
          'text-display-lg',
          light ? 'text-white' : 'text-brand-charcoal'
        )}
      >
        {title}
      </motion.h2>

      {body && (
        <motion.p
          custom={delay + 0.2}
          variants={fadeUp}
          className={cn(
            'mt-5 max-w-xl text-base font-light leading-relaxed',
            light ? 'text-white/70' : 'text-brand-muted',
            centered && 'text-center'
          )}
        >
          {body}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
