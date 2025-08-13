export default function TaskSkeleton() {
  return (
    <div className="overflow-hidden m-2 py-2 rounded-md h-40 shadow-md bg-linear-90 bg-gray-500 animate-pulse relative">
      <div className="justify-between flex flex-row">
        <div className="bg-gray-300 rounded-md h-11 m-2 w-full"></div>
        <div className="bg-gray-300 rounded-md m-2 p-2 h-7 w-11"></div>
      </div>
      <div className="absolute bottom-4 right-4 flex flex-row gap-1">
        <div className="rounded-md bg-gray-300 w-8 h-10"></div>
        <div className="rounded-md bg-gray-300 w-8 h-10"></div>
        <div className="rounded-md bg-gray-300 w-8 h-10"></div>
      </div>
    </div>
  );
}
