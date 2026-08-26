import React from 'react';
import { cn } from '../../utils/cn';

const FormField = React.forwardRef(({ 
  label, 
  error, 
  type = 'text', 
  className, 
  ...props 
}, ref) => {
  const inputStyles = cn(
    "w-full px-4 py-3 bg-transparent border rounded-sm focus:outline-none transition-colors",
    error 
      ? "border-red-500 focus:border-red-500" 
      : "border-brand-charcoal/30 focus:border-brand-gold",
    className
  );

  return (
    <div className="flex flex-col gap-2 w-full mb-4">
      {label && (
        <label className="text-sm font-medium text-brand-charcoal uppercase tracking-wider">
          {label}
        </label>
      )}
      
      {type === 'textarea' ? (
        <textarea ref={ref} className={cn(inputStyles, "min-h-[120px] resize-y")} {...props} />
      ) : type === 'select' ? (
        <select ref={ref} className={inputStyles} {...props}>
          {props.children}
        </select>
      ) : (
        <input ref={ref} type={type} className={inputStyles} {...props} />
      )}
      
      {error && (
        <span className="text-red-500 text-xs font-medium">{error.message}</span>
      )}
    </div>
  );
});

FormField.displayName = 'FormField';
export default FormField;
