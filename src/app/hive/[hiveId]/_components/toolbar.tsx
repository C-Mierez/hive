import {
  CircleIcon,
  CursorArrowIcon,
  FileIcon,
  Pencil1Icon,
  ResetIcon,
  SquareIcon,
  TextIcon,
} from "@radix-ui/react-icons";
import ToolButton from "./tool-button";

export default function Toolbar() {
  return (
    <div className="absolute left-4 top-1/2 grid -translate-y-1/2 grid-flow-row gap-4">
      <div className="flex flex-col gap-2 rounded-sm border-global_sm bg-white px-2 py-2">
        <ToolButton
          label="Cursor"
          onClick={() => {}}
          isDisabled={false}
          isActive={true}
        >
          <CursorArrowIcon />
        </ToolButton>
        <ToolButton
          label="Pen"
          onClick={() => {}}
          isDisabled={false}
          isActive={false}
        >
          <Pencil1Icon />
        </ToolButton>
        <ToolButton
          label="Circle"
          onClick={() => {}}
          isDisabled={false}
          isActive={false}
        >
          <CircleIcon />
        </ToolButton>
        <ToolButton
          label="Square"
          onClick={() => {}}
          isDisabled={false}
          isActive={false}
        >
          <SquareIcon />
        </ToolButton>
        <ToolButton
          label="Note"
          onClick={() => {}}
          isDisabled={false}
          isActive={false}
        >
          <FileIcon />
        </ToolButton>
        <ToolButton
          label="Text"
          onClick={() => {}}
          isDisabled={false}
          isActive={false}
        >
          <TextIcon />
        </ToolButton>
      </div>
      <ul className="flex flex-col gap-2 rounded-sm border-global_sm bg-white px-2 py-2">
        <ToolButton
          label="Redo"
          onClick={() => {}}
          isDisabled={true}
          isActive={false}
        >
          <ResetIcon className="scale-x-[-1]" />
        </ToolButton>
        <ToolButton
          label="Undo"
          onClick={() => {}}
          isDisabled={true}
          isActive={false}
        >
          <ResetIcon />
        </ToolButton>
      </ul>
    </div>
  );
}
