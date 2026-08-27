import Button from './Button';

const ErrorState = ({
  title = 'Something went wrong',
  message = "We couldn't load this content. Please try again.",
  onRetry,
}) => (
  <div className="py-24 flex flex-col items-center justify-center text-center px-6 w-full">
    {/* Thin decorative line */}
    <div className="w-8 h-px bg-brand-gold mb-8" />

    <h3 className="font-serif text-display-sm text-brand-charcoal mb-3">{title}</h3>
    <p className="text-brand-muted font-light max-w-sm mb-10">{message}</p>

    {onRetry && (
      <Button onClick={onRetry} variant="outline" size="sm">
        Try Again
      </Button>
    )}
  </div>
);

export default ErrorState;
