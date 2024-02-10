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
import { CanvasMode, CanvasState, LayerType } from "~/types/canvas";

interface ToolbarParams {
  canvasState: CanvasState;
  setCanvasState: (newState: CanvasState) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export default function Toolbar({
  canvasState,
  setCanvasState,
  undo,
  redo,
  canUndo,
  canRedo,
}: ToolbarParams) {
  return (
    <div className="absolute left-4 top-1/2 grid -translate-y-1/2 grid-flow-row gap-4">
      <div className="flex flex-col gap-2 rounded-sm border-global_sm bg-white px-2 py-2">
        <ToolButton
          label="Cursor"
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.None,
            })
          }
          isDisabled={false}
          isActive={
            canvasState.mode === CanvasMode.None ||
            canvasState.mode === CanvasMode.Translating ||
            canvasState.mode === CanvasMode.SelectionNet ||
            canvasState.mode === CanvasMode.Pressing ||
            canvasState.mode === CanvasMode.Resizing
          }
        >
          <CursorArrowIcon />
        </ToolButton>

        <ToolButton
          label="Pen"
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Pencil,
            })
          }
          isDisabled={false}
          isActive={canvasState.mode === CanvasMode.Pencil}
        >
          <Pencil1Icon />
        </ToolButton>

        <ToolButton
          label="Circle"
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Circle,
            })
          }
          isDisabled={false}
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Circle
          }
        >
          <CircleIcon />
        </ToolButton>

        <ToolButton
          label="Rectangle"
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Rectangle,
            })
          }
          isDisabled={false}
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Rectangle
          }
        >
          <SquareIcon />
        </ToolButton>

        <ToolButton
          label="Note"
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Note,
            })
          }
          isDisabled={false}
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Note
          }
        >
          <FileIcon />
        </ToolButton>

        <ToolButton
          label="Text"
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Text,
            })
          }
          isDisabled={false}
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Text
          }
        >
          <TextIcon />
        </ToolButton>
      </div>
      <ul className="flex flex-col gap-2 rounded-sm border-global_sm bg-white px-2 py-2">
        <ToolButton
          label="Redo"
          onClick={redo}
          isDisabled={!canRedo}
          isActive={false}
        >
          <ResetIcon className="scale-x-[-1]" />
        </ToolButton>

        <ToolButton
          label="Undo"
          onClick={undo}
          isDisabled={!canUndo}
          isActive={false}
        >
          <ResetIcon />
        </ToolButton>
      </ul>
    </div>
  );
}
