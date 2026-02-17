export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
            <div className="relative w-16 h-16">
                <div className="absolute inset-0 border-4 border-surface rounded-full"></div>
                <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
            </div>
            <div className="flex items-center gap-2 text-primary">
                <span className="text-sm font-bold uppercase tracking-widest animate-pulse">Preparing your experience</span>
            </div>
        </div>
    );
}
