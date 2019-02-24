import { ROW_DEFAULT_HEIGHT } from './constants';


export type RowData = any;

export type RowMetadata = {
  depth: number;
  index: number;

  height: number;
  hasChildren: boolean;
}

export type RowState = {
  isVisible: boolean;
  top: number;
}

export default class Row {
  static DEFAULT_HEIGHT: number = ROW_DEFAULT_HEIGHT;

  readonly data: RowData;
  readonly metadata: RowMetadata;
  readonly $state: RowState;

  constructor(data: RowData, metadata: RowMetadata, state: RowState) {
    this.data = data;
    this.$state = state;
    this.metadata = metadata;
  }
}