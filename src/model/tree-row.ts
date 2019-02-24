import TreeState from './tree-state';
import Row from './row';


export default class TreeRow extends Row {
  private readonly onChangeCb: (value: Readonly<TreeState>) => void;
  private readonly treeState: Readonly<TreeState>;

  constructor(row: Row, treeState: Readonly<TreeState>, onChangeCb: (value: Readonly<TreeState>) => void) {
    super(row.data, row.metadata, row.$state);
    this.treeState = treeState;
    this.onChangeCb = onChangeCb;
  }

  toggleChildren = () => {
    const nextState: Readonly<TreeState> = TreeState.toggleChildren(this.treeState, this);
    this.onChangeCb(nextState);
  }
}