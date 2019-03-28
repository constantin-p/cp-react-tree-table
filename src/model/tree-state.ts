import Row, { RowData } from './row';


interface TreeNode {
  data: any;
  children?: Array<TreeNode>;

  height: number;
}

export default class TreeState {
  readonly data: Readonly<Array<Row>>;
  readonly height: number;
  readonly hasData: boolean;

  protected constructor(data: Readonly<Array<Row>>) {
    this.data = data;
    this.hasData = (data.length > 0);
    this.height = (data.length == 0)
      ? 0
      : (data[data.length - 1].$state.isVisible)
        ? data[data.length - 1].$state.top + data[data.length - 1].metadata.height
        : data[data.length - 1].$state.top;
  }

  static create(data: Array<TreeNode>): Readonly<TreeState> {
    function _processNode(children: Array<TreeNode>, depth: number, index: number, top: number, isVisible: boolean = false): Array<Row> {
      let result: Array<Row> = [];
      let _top: number = top;
      for (let child of children) {
        if (child.children != null && child.children.length > 0) { // hasChildren
          result.push(new Row(child.data, {  // Metadata
            depth: depth,
            index: index++,

            height: child.height || Row.DEFAULT_HEIGHT,
            hasChildren: true,
          }, { // State
            isVisible: isVisible,
            top: _top,
          }));

          const grandchildren = _processNode(child.children, depth + 1, index, _top);
          for (let grandchild of grandchildren) {
            result.push(grandchild);
            index++;
          }
        } else {
          result.push(new Row(child.data, {  // Metadata
            depth: depth,
            index: index++,

            height: child.height || Row.DEFAULT_HEIGHT,
            hasChildren: false,
          }, { // State
            isVisible: isVisible,
            top: _top,
          }));
        }

        if (isVisible) {
          _top+= child.height || Row.DEFAULT_HEIGHT;
        }
      }

      return result;
    }
    const rows = _processNode(data, 0, 0, 0, true);
    return new TreeState(rows);
  }

  static createEmpty(): Readonly<TreeState> {
    return new TreeState([]);
  }

  static sliceRows(source: Readonly<TreeState>, from: number, to: number): ReadonlyArray<Row> {
    if (from < 0) {
      throw new Error('Invalid range: from < 0 (${from} < 0).');
    }
    if (from > source.data.length) {
      throw new Error('Invalid range: from > max size (${from} > ${source.data.length}).');
    }
    if (to > source.data.length) {
      throw new Error('Invalid range: to > max size (${to} > ${source.data.length}).');
    }
    if (from > to) {
      throw new Error('Invalid range: from > to (${from} > ${to}).');
    }

    return source.data.slice(from, to);
  }

  private static _hideRowsInRange(source: Readonly<TreeState>, from: number = 0, to: number = source.data.length): Readonly<TreeState> {
    const startRange = TreeState.sliceRows(source, 0, from);
    let _top: number = source.data[from].$state.top;
    const updatedRange = TreeState.sliceRows(source, from, to).map((row: Row): Row => {
      if (row.metadata.depth > 0 && row.$state.isVisible) {
        row.$state.isVisible = false;
      }
      row.$state.top = _top;
      if (row.$state.isVisible) {
        _top+= row.metadata.height;
      }
      return row;
    });
    const endRange = TreeState.sliceRows(source, to, source.data.length).map((row: Row): Row => {
      row.$state.top = _top;
      if (row.$state.isVisible) {
        _top+= row.metadata.height;
      }
      return row;
    });

    return new TreeState(startRange.concat(updatedRange, endRange));
  }

  private static _showRowsInRange(source: Readonly<TreeState>, from: number = 0, to: number = source.data.length, depthLimit?: number): Readonly<TreeState> {
    const startRange = TreeState.sliceRows(source, 0, from);
    let _top: number = source.data[from].$state.top;
    const updatedRange = TreeState.sliceRows(source, from, to).map((row: Row): Row => {
      if (row.metadata.depth > 0 && !row.$state.isVisible) {
        // If a depthLimit value is set, only show nodes with a depth value less or equal
        if (depthLimit == null || (depthLimit != null && row.metadata.depth <= depthLimit)) {
          row.$state.isVisible = true;
        }
      }
      row.$state.top = _top;
      if (row.$state.isVisible) {
        _top+= row.metadata.height;
      }
      return row;
    });
    const endRange = TreeState.sliceRows(source, to, source.data.length).map((row: Row): Row => {
      row.$state.top = _top;
      if (row.$state.isVisible) {
        _top+= row.metadata.height;
      }
      return row;
    });

    return new TreeState(startRange.concat(updatedRange, endRange));
  }

  static expandAll(source: Readonly<TreeState>, depthLimit?: number): Readonly<TreeState> {
    return TreeState._showRowsInRange(source, undefined, undefined, depthLimit);
  }

  static collapseAll(source: Readonly<TreeState>): Readonly<TreeState> {
    return TreeState._hideRowsInRange(source);
  }

  static toggleChildren(source: Readonly<TreeState>, row: Row): Readonly<TreeState> {
    if (row.metadata.index == source.data.length - 1) {
      // Last item, no children available
      return new TreeState(source.data.slice());
    }

    const currentDepth = row.metadata.depth;
    let shouldToggleOpen: boolean | null = null;

    let lastChildIndex = row.metadata.index + 1;
    for (; lastChildIndex < source.data.length; lastChildIndex++) {
      const currentRow = source.data[lastChildIndex];
      if (currentRow.metadata.depth < currentDepth + 1) {
        break;
      }

      if (shouldToggleOpen == null) {
        shouldToggleOpen = !currentRow.$state.isVisible;
      }
    }

    return shouldToggleOpen
      ? TreeState._showRowsInRange(source, row.metadata.index + 1, lastChildIndex, currentDepth + 1)
      : TreeState._hideRowsInRange(source, row.metadata.index + 1, lastChildIndex);
  }

  static updateData(source: Readonly<TreeState>, row: Row, newData: RowData): Readonly<TreeState> {
    const startRange = TreeState.sliceRows(source, 0, row.metadata.index);

    const updatedRange = [new Row(newData, row.metadata, row.$state)];

    const endRange = TreeState.sliceRows(source, row.metadata.index + 1, source.data.length);
    return new TreeState(startRange.concat(updatedRange, endRange));
  }

  indexAtYPos(yPos: number): number {
    if (yPos < 0 || yPos > this.height) {
      throw new Error(`Invalid y position! No row at y: ${yPos}.`);
    }

    let i = 0;
    for (; i < this.data.length; i++) {
      const row = this.data[i];
      if (row.$state.isVisible && row.$state.top + row.metadata.height > yPos) {
        break;
      }
    }
    return i;
  }

  yPosAtIndex(index: number): number {
    if (index < 0 || index >= this.data.length) {
      throw new Error(`Invalid index! No row at index: ${index}.`);
    }
    
    return this.data[index].$state.top;
  }
}
