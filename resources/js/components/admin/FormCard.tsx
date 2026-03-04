import type { PropsWithChildren } from 'react';

interface FormCardProps extends PropsWithChildren {
    title?: string;
}

export default function FormCard({ title, children }: FormCardProps) {
    return (
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            {title && (
                <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                    {title}
                </h2>
            )}
            {children}
        </div>
    );
}
