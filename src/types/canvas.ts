import { PencilPoints } from "~/lib/utils";

/* ------------------------------ Global Types ------------------------------ */
export type Point = {
  x: number;
  y: number;
};

export type XYHW = {
  x: number;
  y: number;
  height: number;
  width: number;
};

// Bitmask for the sides of a rectangle
export enum Side {
  Top = 1,
  Bottom = 2,
  Left = 4,
  Right = 8,
}

export type Color = {
  r: number;
  g: number;
  b: number;
  a: number;
};

export type Camera = {
  x: number;
  y: number;
};

/* ------------------------------- Layer Types ------------------------------ */
export enum LayerType {
  Rectangle,
  Circle,
  Text,
  Path,
  Note,
}

export type RectangleLayer = {
  type: LayerType.Rectangle;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  value?: string;
};

export type CircleLayer = {
  type: LayerType.Circle;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  value?: string;
};

export type PathLayer = {
  type: LayerType.Path;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  points: PencilPoints;
  value?: string;
};

export type TextLayer = {
  type: LayerType.Text;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  value?: string;
};

export type NoteLayer = {
  type: LayerType.Note;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  value?: string;
};

export type Layer =
  | RectangleLayer
  | CircleLayer
  | TextLayer
  | PathLayer
  | NoteLayer;

/* --------------------------------- Canvas --------------------------------- */
export enum CanvasMode {
  None,
  Pressing,
  SelectionNet,
  Translating,
  Inserting,
  Resizing,
  Pencil,
}

export type CanvasState =
  | {
      mode: CanvasMode.None;
    }
  | {
      mode: CanvasMode.Pressing;
      origin: Point; // The point where the mouse was pressed
    }
  | {
      mode: CanvasMode.SelectionNet;
      origin: Point; // The point where the selection net started
      current?: Point; // The point where the selection net is currently
    }
  | {
      mode: CanvasMode.Translating;
      current: Point; // The point where the mouse is currently
    }
  | {
      mode: CanvasMode.Inserting;
      layerType:
        | LayerType.Rectangle
        | LayerType.Circle
        | LayerType.Text
        | LayerType.Note; // The type of layer that is being inserted
    }
  | {
      mode: CanvasMode.Resizing;
      initialBounds: XYHW; // The bounds of the layer before resizing
      corner: Side; // The corner that is being resized
    }
  | {
      mode: CanvasMode.Pencil;
    };
