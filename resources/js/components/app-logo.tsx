import AppLogoIcon from '@/components/app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex items-start gap-2">
                <div className="flex aspect-square size-10 items-center justify-center rounded-md">
                    <AppLogoIcon />
                </div>
                <div className="ml-1 grid flex-1 text-left text-xl">
                    <span className="truncate leading-tight font-semibold -mb-0.5">
                        Central Buah
                    </span>
                    <span className="truncate leading-tight font-medium text-sm text-muted-foreground">
                        Sutomo
                    </span>
                </div>
            </div>
        </>
    );
}
