export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-12">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white shadow-soft">
      <div className="aspect-square bg-gray-200 skeleton"></div>
      <div className="p-5 space-y-3">
        <div className="h-4 bg-gray-200 rounded skeleton w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded skeleton w-1/2"></div>
        <div className="h-6 bg-gray-200 rounded skeleton w-1/3"></div>
      </div>
    </div>
  );
}
