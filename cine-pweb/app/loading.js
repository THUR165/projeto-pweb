export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="h-8 bg-gray-800 rounded w-1/4 mb-8 animate-pulse"></div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="bg-gray-800 rounded-lg h-[400px] animate-pulse"></div>
        ))}
      </div>
    </div>
  );
}