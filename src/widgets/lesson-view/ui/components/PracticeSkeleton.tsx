export default function PracticeSkeleton() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-16 py-8 font-sans w-full">
      <div className="w-full max-w-[850px] animate-pulse space-y-8 flex flex-col items-center">
        <div className="h-8 w-48 bg-indigo-50 rounded-xl"></div>
        <div className="w-full h-80 bg-white border border-indigo-100/20 rounded-3xl p-10 shadow-sm"></div>
      </div>
    </div>
  );
}
