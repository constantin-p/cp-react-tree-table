import { RowModel } from './row';


export interface TreeNode<T> {
  data: T;
  children?: Array<TreeNode<T>>;

  height?: number;
}

export default class TreeState<T> {
  readonly data: ReadonlyArray<RowModel<T>>;
  readonly height: number;
  readonly hasData: boolean;

  protected constructor(data: ReadonlyArray<RowModel<T>>) {
    this.data = data;
    this.hasData = (data.length > 0);
    this.height = (data.length == 0)
      ? 0
      : (data[data.length - 1].$state.isVisible)
        ? data[data.length - 1].$state.top + data[data.length - 1].metadata.height
        : data[data.length - 1].$state.top;
  }

  static create<TData>(data: Array<TreeNode<TData>>): Readonly<TreeState<TData>> {
    function _processNode<TNodeData>(
      children: Array<TreeNode<TNodeData>>,
      depth: number, index: number, top: number, isVisible: boolean = false
    ): Array<RowModel<TNodeData>> {
      let result: Array<RowModel<TNodeData>> = [];
      let _top: number = top;
      for (let child of children) {
        if (child.children != null && child.children.length > 0) { // hasChildren
          const childRowModel = new RowModel(child.data, {  // Metadata
            depth: depth,
            index: index++,

            height: child.height || RowModel.DEFAULT_HEIGHT,
            hasChildren: true,
          }, { // State
            isVisible: isVisible,
            isExpanded: false,
            top: _top,
          })

          if (isVisible) {
            _top+= child.height || RowModel.DEFAULT_HEIGHT;
          }

          let hasVisibleChildren = false;
          const grandchildren = _processNode(child.children, depth + 1, index, _top);
          const grandchildrenRowModels: Array<RowModel<TNodeData>> = [];
          for (let grandchild of grandchildren) {
            grandchildrenRowModels.push(grandchild);
            index++;

            if (grandchild.$state.isVisible) {
              hasVisibleChildren = true;
            }
          }

          // Append the current child & its descendants row models
          result.push(
            hasVisibleChildren
              ? new RowModel(childRowModel.data, childRowModel.metadata, { ...childRowModel.$state, isExpanded: true })
              : childRowModel
          );
          grandchildrenRowModels.map((gcRowModel: RowModel<TNodeData>) => result.push(gcRowModel));
        } else {
          result.push(new RowModel(child.data, {  // Metadata
            depth: depth,
            index: index++,

            height: child.height || RowModel.DEFAULT_HEIGHT,
            hasChildren: false,
          }, { // State
            isVisible: isVisible,
            isExpanded: false,
            top: _top,
          }));

          if (isVisible) {
            _top+= child.height || RowModel.DEFAULT_HEIGHT;
          }
        }
      }

      return result;
    }

    const rowModels = _processNode<TData>(data, 0, 0, 0, true);
    return new TreeState(rowModels);
  }

  static createEmpty<TData>(): Readonly<TreeState<TData>> {
    return new TreeState([]);
  }

  static sliceRows<TData>(source: Readonly<TreeState<TData>>, from: number, to: number): ReadonlyArray<RowModel<TData>> {
    if (from < 0) {
      throw new Error(`Invalid range: from < 0 (${from} < 0).`);
    }
    if (from > source.data.length) {
      throw new Error(`Invalid range: from > max size (${from} > ${source.data.length}).`);
    }
    if (to > source.data.length) {
      throw new Error(`Invalid range: to > max size (${to} > ${source.data.length}).`);
    }
    if (from > to) {
      throw new Error(`Invalid range: from > to (${from} > ${to}).`);
    }

    return source.data.slice(from, to);
  }

  private static _hideRowsInRange<TData>(source: Readonly<TreeState<TData>>, from: number = 0, to: number = source.data.length): Readonly<TreeState<TData>> {
    const startRange = TreeState.sliceRows(source, 0, from);
    let _top: number = source.data[from].$state.top;
    const updatedRange = TreeState.sliceRows(source, from, to).map((model: RowModel<TData>): RowModel<TData> => {
      if (model.metadata.depth > 0 && model.$state.isVisible) {
        model.$state.isVisible = false;
      }
      model.$state.isExpanded = false;
      model.$state.top = _top;
      if (model.$state.isVisible) {
        _top+= model.metadata.height;
      }
      return model;
    });
    const endRange = TreeState.sliceRows(source, to, source.data.length).map((model: RowModel<TData>): RowModel<TData> => {
      model.$state.top = _top;
      if (model.$state.isVisible) {
        _top+= model.metadata.height;
      }
      return model;
    });

    // Update $state.isExpanded for rows before the from↔to range
    if (startRange.length > 0 && updatedRange.length > 0) {
      if (startRange[startRange.length - 1].metadata.depth < updatedRange[0].metadata.depth) {
        startRange[startRange.length - 1].$state.isExpanded = false;
      }
    }

    return new TreeState(startRange.concat(updatedRange, endRange));
  }

  private static _showRowsInRange<TData>(source: Readonly<TreeState<TData>>, from: number = 0, to: number = source.data.length, depthLimit?: number): Readonly<TreeState<TData>> {
    const startRange = TreeState.sliceRows(source, 0, from);
    let _top: number = source.data[from].$state.top;
    const updatedRange = TreeState.sliceRows(source, from, to).map((model: RowModel<TData>, i: number): RowModel<TData> => {
      if (model.metadata.depth > 0 && !model.$state.isVisible) {
        // If a depthLimit value is set, only show nodes with a depth value less or equal
        if (depthLimit == null || (depthLimit != null && model.metadata.depth <= depthLimit)) {
          model.$state.isVisible = true;
        }
      }
      model.$state.top = _top;
      if (model.$state.isVisible) {
        _top+= model.metadata.height;

        // Peek at the next row, if depth > currentDepth & it will be toggled to be visible,
        // $state.isExpanded on the current row will be set to true
        if (from + i + 1 < to) {
          const nextRowModel = source.data[from + i + 1];
          if (nextRowModel.metadata.depth > model.metadata.depth &&
            depthLimit == null || (depthLimit != null && nextRowModel.metadata.depth <= depthLimit)) {
            model.$state.isExpanded = model.metadata.hasChildren;
          }
        }
      }
      
      return model;
    });
    const endRange = TreeState.sliceRows(source, to, source.data.length).map((model: RowModel<TData>): RowModel<TData> => {
      model.$state.top = _top;
      if (model.$state.isVisible) {
        _top+= model.metadata.height;
      }
      return model;
    });

    // Update $state.isExpanded for rows before the from↔to range
    if (startRange.length > 0 && updatedRange.length > 0) {
      if (startRange[startRange.length - 1].metadata.depth < updatedRange[0].metadata.depth) {
        startRange[startRange.length - 1].$state.isExpanded = true;
      }
    }

    return new TreeState(startRange.concat(updatedRange, endRange));
  }

  static expandAll<TData>(source: Readonly<TreeState<TData>>, depthLimit?: number): Readonly<TreeState<TData>> {
    return TreeState._showRowsInRange(source, undefined, undefined, depthLimit);
  }

  static collapseAll<TData>(source: Readonly<TreeState<TData>>): Readonly<TreeState<TData>> {
    return TreeState._hideRowsInRange(source);
  }

  static expandAncestors<TData>(source: Readonly<TreeState<TData>>, model: RowModel<TData>): Readonly<TreeState<TData>> {
    if (!source.hasData) {
      return TreeState.createEmpty();
    }
    if (model.$state.isVisible || model.metadata.depth == 0 || model.metadata.index == 0) {
      return new TreeState(source.data.slice());
    }

    // Find range start
    let startIndex = model.metadata.index - 1;
    for (; startIndex >= 0; startIndex--) {
      const currentRowModel = source.data[startIndex];
      if (currentRowModel.metadata.depth == 0) {
        break;
      }
    }

    // Find range end (the end of the current root node)
    let endIndex = model.metadata.index;
    for (; endIndex < source.data.length; endIndex++) {
      const currentRowModel = source.data[endIndex];
      if (currentRowModel.metadata.depth === 0) {
        break;
      }
    }

    return TreeState._showRowsInRange(source, startIndex, endIndex);
  }

  static toggleChildren<TData>(source: Readonly<TreeState<TData>>, model: RowModel<TData>): Readonly<TreeState<TData>> {
    if (
      model.metadata.index == source.data.length - 1 // Last item, no children available
      || model.metadata.hasChildren == false
    ) {
      return new TreeState(source.data.slice());
    }

    const currentDepth = model.metadata.depth;
    let shouldToggleOpen: boolean | null = null;

    let lastChildIndex = model.metadata.index + 1;
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
      ? TreeState._showRowsInRange(source, model.metadata.index + 1, lastChildIndex, currentDepth + 1)
      : TreeState._hideRowsInRange(source, model.metadata.index + 1, lastChildIndex);
  }

  static updateData<TData>(source: Readonly<TreeState<TData>>, model: RowModel<TData>, newData: TData): Readonly<TreeState<TData>> {
    const startRange = TreeState.sliceRows(source, 0, model.metadata.index);

    const updatedRange = [new RowModel(newData, model.metadata, model.$state)];

    const endRange = TreeState.sliceRows(source, model.metadata.index + 1, source.data.length);
    return new TreeState(startRange.concat(updatedRange, endRange));
  }

  findRowModel(node: TreeNode<T>): RowModel<T> | undefined {
    if (node.data == null) {
      throw new Error(`Invalid TreeNode! No data property: ${node}.`);
    }
    if (!this.hasData) {
      return;
    }
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].data == node.data) {
        return this.data[i];
      }
    }
    return;
  }

  indexAtYPos(yPos: number): number {
    if (yPos < 0 || yPos > this.height) {
      throw new Error(`Invalid y position! No row at y: ${yPos}.`);
    }

    let i = 0;
    for (; i < this.data.length; i++) {
      const model = this.data[i];
      if (model.$state.isVisible && model.$state.top + model.metadata.height > yPos) {
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
