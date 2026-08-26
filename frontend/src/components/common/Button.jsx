import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className, 
  to,
  href,
  isLoading,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-brand-charcoal text-brand-ivory hover:bg-brand-gold hover:text-brand-charcoal border border-transparent",
    outline: "border-2 border-brand-gold text-brand-charcoal hover:bg-brand-gold hover:text-brand-charcoal",
    ghost: "text-brand-charcoal hover:text-brand-gold hover:bg-brand-charcoal/5",
  };
  
  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-8 text-base",
    lg: "h-14 px-10 text-lg",
  };

  const classes = cn(baseStyles, variants[variant], sizes[size], className);

  const content = isLoading ? (
    <span className="flex items-center gap-2">
      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
      Loading...
    </span>
  ) : children;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {content}
      </a>
    );
  }

  return (
    <motion.button 
      whileTap={{ scale: 0.98 }} 
      className={classes} 
      disabled={isLoading || props.disabled}
      {...props}
    >
      {content}
    </motion.button>
  );
};

export default Button;
