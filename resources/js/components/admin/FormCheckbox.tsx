import { cn } from '@/lib/utils';

interface FormCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    hint?: string;
}

export default function FormCheckbox({
    label,
    error,
    hint,
    className,
    ...props
}: FormCheckboxProps) {
    return (
        <div className="space-y-1">
            <label className="flex items-center gap-3 cursor-pointer">
                <input
                    type="checkbox"
                    className={cn(
                        'h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700',
                        error && 'border-red-500',
                        className
                    )}
                    {...props}
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {label}
                </span>
            </label>
            {hint && !error && (
                <p className="text-xs text-gray-500 dark:text-gray-400 ml-8">{hint}</p>
            )}
            {error && (
                <p className="text-sm text-red-600 dark:text-red-400 ml-8">{error}</p>
            )}
        </div>
    );
}
