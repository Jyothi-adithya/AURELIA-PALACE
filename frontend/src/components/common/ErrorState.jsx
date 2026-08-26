import { AlertTriangle } from 'lucide-react';
import Button from './Button';

const ErrorState = ({ 
  title = "Something went wrong", 
  message = "We couldn't load this content right now.", 
  onRetry 
}) => {
  return (
    <div className="py-20 flex flex-col items-center justify-center text-center px-4 w-full">
      <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
        <AlertTriangle size={32} />
      </div>
      <h3 className="text-2xl font-serif text-brand-charcoal mb-2">{title}</h3>
      <p className="text-gray-500 max-w-md mb-8">{message}</p>
      
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          Try Again
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
