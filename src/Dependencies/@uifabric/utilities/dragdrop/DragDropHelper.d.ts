import { EventGroup } from "../@uifabric/utilities";
import { IDragDropHelper, IDragDropOptions } from "./interfaces";
import { ISelection } from "../@uifabric/utilities/selection";
export interface IDragDropHelperParams {
  selection: ISelection;
  minimumPixelsForDrag?: number;
}
export declare class DragDropHelper implements IDragDropHelper {
  private _dragEnterCounts;
  private _isDragging;
  private _dragData;
  private _selection;
  private _activeTargets;
  private _events;
  private _lastId;
  private _initialized;
  constructor(params: IDragDropHelperParams);
  dispose(): void;
  subscribe(
    root: HTMLElement,
    events: EventGroup,
    dragDropOptions: IDragDropOptions
  ): {
    key: string;
    dispose(): void;
  };
  unsubscribe(root: HTMLElement, key: string): void;
  private _onDragEnd;
  /**
   * clear drag data when mouse up on body
   */
  private _onMouseUp;
  /**
   * clear drag data when mouse up outside of the document
   */
  private _onDocumentMouseUp;
  /**
   * when mouse move over a new drop target while dragging some items,
   * fire dragleave on the old target and fire dragenter to the new target
   * The target will handle style change on dragenter and dragleave events.
   */
  private _onMouseMove;
  /**
   * when mouse leave a target while dragging some items, fire dragleave to the target
   */
  private _onMouseLeave;
  /**
   * when mouse down on a draggable item, we start to track dragdata.
   */
  private _onMouseDown;
  /**
   * determine whether the child target is a descendant of the parent
   */
  private _isChild;
  private _isDraggable;
  private _isDroppable;
}
