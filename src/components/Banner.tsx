export default function Banner({ title,onClickButton }: { title: string,onClickButton:()=> void }) {
  return (
    <div className="flex m-2 rounded-md h-f bg-vibe-green p-2 text-2xl font-semibold justify-between">
      {title}
      <button className="rounded-md bg-button p-2" onClick={onClickButton}>
        show
      </button>
    </div>
  );
}
