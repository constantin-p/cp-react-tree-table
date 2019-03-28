import TreeState from '../model/tree-state';
import Row, { RowModel, RowAPI, RowData } from '../model/row';


export const createRow = (model: Readonly<RowModel>, source: Readonly<TreeState>, onChangeCb: (value: Readonly<TreeState>) => void): Readonly<Row> => {
  let rowAPI: RowAPI = {
    toggleChildren: () => {
      const nextState: Readonly<TreeState> = TreeState.toggleChildren(source, model);
      onChangeCb(nextState);
    },
    updateData: (newData: RowData) => {
      const nextState: Readonly<TreeState> = TreeState.updateData(source, model, newData);
      onChangeCb(nextState);
    }
  };
  return new Row(model, rowAPI);
}
