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
  const base = "inline-flex items-center justify-center font-sans font-semibold tracking-widest uppercase transition-all duration-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 disabled:opacity-40 disabled:pointer-events-none";

  const variants = {
    primary:  "bg-brand-charcoal text-brand-gold border border-brand-charcoal hover:bg-brand-gold hover:text-brand-charcoal hover:border-brand-gold",
    outline:  "bg-transparent border border-brand-charcoal text-brand-charcoal hover:bg-brand-charcoal hover:text-brand-gold",
    ghost:    "bg-transparent text-brand-charcoal hover:text-brand-gold border border-transparent",
    light:    "bg-transparent border border-white/50 text-white hover:bg-white hover:text-brand-charcoal",
    gold:     "bg-brand-gold border border-brand-gold text-brand-charcoal hover:bg-brand-charcoal hover:text-brand-gold hover:border-brand-charcoal",
  };

  const sizes = {
    sm: "h-9 px-6 text-[0.65rem]",
    md: "h-11 px-8 text-[0.7rem]",
    lg: "h-13 px-10 text-[0.72rem]",
  };

  const classes = cn(base, variants[variant], sizes[size], className);

  const spinner = (
    <span className="flex items-center gap-2">
      <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
      </svg>
      Processing
    </span>
  );

  if (to) return <Link to={to} className={classes} {...props}>{isLoading ? spinner : children}</Link>;
  if (href) return <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...props}>{isLoading ? spinner : children}</a>;

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={classes}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? spinner : children}
    </motion.button>
  );
};

export default Button;
