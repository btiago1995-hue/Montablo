import { cn } from '@/lib/utils'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
        {
          'bg-primary text-white hover:bg-primary-light': variant === 'primary',
          'bg-white text-foreground border border-border hover:bg-background': variant === 'secondary',
          'bg-red-600 text-white hover:bg-red-700': variant === 'danger',
          'text-muted hover:text-foreground hover:bg-background': variant === 'ghost',
        },
        {
          'text-sm px-3 py-1.5': size === 'sm',
          'text-sm px-4 py-2.5': size === 'md',
          'px-6 py-3': size === 'lg',
        },
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
