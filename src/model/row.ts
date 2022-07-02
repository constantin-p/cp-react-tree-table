import { ROW_DEFAULT_HEIGHT } from './constants';


export type RowMetadata = {
  depth: number;
  index: number;

  height: number;
  hasChildren: boolean;
}

export type RowState = {
  isVisible: boolean;
  isExpanded: boolean;
  top: number;
}

export class RowModel<T> {
  static DEFAULT_HEIGHT: number = ROW_DEFAULT_HEIGHT;

  readonly data: T;
  readonly metadata: RowMetadata;
  readonly $state: RowState;

  constructor(data: T, metadata: RowMetadata, state: RowState) {
    this.data = data;
    this.$state = state;
    this.metadata = metadata;
  }
}

export interface RowAPI<T> {
  toggleChildren: () => void;
  updateData: (newData: T) => void;
}

export default class Row<T> extends RowModel<T> implements RowAPI<T> {
  // RowAPI
  public toggleChildren: () => void;
  public updateData: (newData: T) => void;

  constructor(model: RowModel<T>, api: RowAPI<T>) {
    // RowModel
    super(model.data, model.metadata, model.$state)

    // RowAPI
    this.toggleChildren = api.toggleChildren;
    this.updateData = api.updateData;
  }
}