import { Loader2 } from 'lucide-react';
import type { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

interface FormButtonProps extends PropsWithChildren {
    type?: 'submit' | 'button' | 'reset';
    variant?: 'primary' | 'secondary' | 'danger';
    loading?: boolean;
    disabled?: boolean;
    onClick?: () => void;
    className?: string;
}

export default function FormButton({
    type = 'button',
    variant = 'primary',
    loading = false,
    disabled = false,
    onClick,
    className,
    children,
}: FormButtonProps) {
    const baseClasses =
        'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

    const variantClasses = {
        primary:
            'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
        secondary:
            'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600',
        danger:
            'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={cn(baseClasses, variantClasses[variant], className)}
        >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {children}
        </button>
    );
}
