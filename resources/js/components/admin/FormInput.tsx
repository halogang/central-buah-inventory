import { cn } from '@/lib/utils';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    hint?: string;
}

export default function FormInput({
    label,
    error,
    hint,
    className,
    required,
    ...props
}: FormInputProps) {
    return (
        <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
                className={cn(
                    'w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white',
                    error && 'border-red-500 focus:ring-red-500',
                    className
                )}
                required={required}
                {...props}
            />
            {hint && !error && (
                <p className="text-xs text-gray-500 dark:text-gray-400">{hint}</p>
            )}
            {error && (
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
        </div>
    );
}
