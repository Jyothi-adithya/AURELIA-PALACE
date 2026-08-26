import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

const SectionHeading = ({ 
  title, 
  subtitle, 
  centered = false,
  className,
  light = false
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={cn(
        "mb-12",
        centered && "text-center",
        light ? "text-brand-ivory" : "text-brand-charcoal",
        className
      )}
    >
      {subtitle && (
        <span className="block text-brand-gold font-sans font-medium tracking-widest uppercase text-sm mb-3">
          {subtitle}
        </span>
      )}
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif">
        {title}
      </h2>
    </motion.div>
  );
};

export default SectionHeading;
