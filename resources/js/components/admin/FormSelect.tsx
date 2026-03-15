import { cn } from '@/lib/utils'

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string
    error?: string
    hint?: string
    options: { value: string; label: string }[]
    placeholder?: string
}

export default function FormSelect({
    label,
    error,
    hint,
    options,
    placeholder,
    className,
    required,
    ...props
}: FormSelectProps) {
    return (
        <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>

            <select
                className={cn(
                    // appearance-none menghilangkan arrow
                    'w-full appearance-none rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900',
                    // style focus
                    'focus:outline-none focus:ring-2 focus:ring-blue-500',
                    // dark mode
                    'dark:border-gray-600 dark:bg-gray-800 dark:text-white',
                    // error state
                    error && 'border-red-500 focus:ring-red-500',
                    className
                )}
                required={required}
                {...props}
            >
                {placeholder && (
                    <option value="">{placeholder}</option>
                )}

                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            {hint && !error && (
                <p className="text-xs text-gray-500 dark:text-gray-400">{hint}</p>
            )}

            {error && (
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
        </div>
    )
}