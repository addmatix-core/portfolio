export default function SiteSkeleton() {
  return (
    <div className="min-h-[100dvh] bg-[#08101f] px-6 py-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="skeleton h-10 w-28 rounded-lg" />
        <div className="grid min-h-[56vh] items-center gap-10 lg:grid-cols-2">
          <div className="space-y-6"><div className="skeleton h-4 w-44 rounded" /><div className="skeleton h-24 w-full rounded-xl" /><div className="skeleton h-10 w-4/5 rounded" /></div>
          <div className="skeleton aspect-square max-w-[520px] rounded-full" />
        </div>
        <div className="grid gap-4 md:grid-cols-4">{[1,2,3,4].map((item) => <div key={item} className="skeleton h-28 rounded-xl" />)}</div>
      </div>
    </div>
  );
}