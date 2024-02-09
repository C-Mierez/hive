export default function Toolbar() {
  return (
    <div className="absolute left-4 top-1/2 flex -translate-y-1/2 flex-col gap-4">
      <ul className="flex flex-col gap-2 rounded-sm border-global_sm bg-white px-4 py-2">
        <li>Pencil</li>
        <li>Pencil</li>
        <li>Pencil</li>
        <li>Pencil</li>
      </ul>
      <ul className="flex flex-col gap-2 rounded-sm border-global_sm bg-white px-4 py-2">
        <li>Undo</li>
        <li>Redo</li>
      </ul>
    </div>
  );
}
