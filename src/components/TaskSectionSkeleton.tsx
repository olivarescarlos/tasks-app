export default function TaskSectionSkeleton() {
  return (
    <div className="overflow-hidden m-2 rounded-md h-16 shadow-md bg-gray-500 animate-pulse relative">
      <div className="justify-between flex flex-row">
        <div className="bg-gray-300 rounded-md h-10 m-2 w-full"></div>
        <div className="bg-gray-300 rounded-md m-2 p-2 w-25 h-12"></div>
      </div>
    </div>
  );
}
