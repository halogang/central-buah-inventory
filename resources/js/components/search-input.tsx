import * as React from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function SearchInput(props: SearchInputProps) {
    return (
        <div className="relative w-full">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <Search className="h-4 w-4 text-muted-foreground" />
            </span>
            <input  
                type="text"
                className="w-full rounded-lg border border-input bg-background px-8 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                {...props}
            />
        </div>
    );
}
