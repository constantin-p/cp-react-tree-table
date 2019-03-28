import TreeState from './tree-state';
import Row, { RowData } from './row';


export default class TreeRow extends Row {
  private readonly _onChangeCb: (value: Readonly<TreeState>) => void;
  private readonly _treeState: Readonly<TreeState>;

  constructor(row: Row, treeState: Readonly<TreeState>, onChangeCb: (value: Readonly<TreeState>) => void) {
    super(row.data, row.metadata, row.$state);
    this._treeState = treeState;
    this._onChangeCb = onChangeCb;
  }

  toggleChildren = () => {
    const nextState: Readonly<TreeState> = TreeState.toggleChildren(this._treeState, this);
    this._onChangeCb(nextState);
  }

  updateData = (newData: RowData) => {
    const nextState: Readonly<TreeState> = TreeState.updateData(this._treeState, this, newData);
    this._onChangeCb(nextState);
  }
}