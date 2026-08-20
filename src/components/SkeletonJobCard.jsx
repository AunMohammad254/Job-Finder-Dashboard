export default function SkeletonJobCard() {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-5 sm:p-6 animate-pulse flex flex-col justify-between h-[280px]">
      <div>
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-zinc-800 flex-shrink-0" />
            <div className="space-y-2">
              <div className="h-4 w-36 bg-zinc-800 rounded-md" />
              <div className="h-3 w-24 bg-zinc-850 rounded-md" />
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-zinc-800" />
        </div>

        {/* Badges row */}
        <div className="flex items-center gap-2 mb-4">
          <div className="h-5 w-16 bg-zinc-800 rounded-full" />
          <div className="h-5 w-24 bg-zinc-800 rounded-full" />
          <div className="h-5 w-28 bg-zinc-800 rounded-full" />
        </div>

        {/* Description lines */}
        <div className="space-y-2 mb-4">
          <div className="h-3 w-full bg-zinc-800/60 rounded" />
          <div className="h-3 w-4/5 bg-zinc-800/60 rounded" />
        </div>

        {/* Skills */}
        <div className="flex gap-1.5 mb-4">
          <div className="h-5 w-14 bg-zinc-800 rounded-md" />
          <div className="h-5 w-16 bg-zinc-800 rounded-md" />
          <div className="h-5 w-12 bg-zinc-800 rounded-md" />
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-zinc-800/60 flex items-center justify-between">
        <div className="h-3 w-20 bg-zinc-800 rounded" />
        <div className="h-7 w-20 bg-zinc-800 rounded-lg" />
      </div>
    </div>
  );
}
