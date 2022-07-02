import TreeState from '../model/tree-state';
import Row, { RowModel, RowAPI } from '../model/row';


export const createRow = <TData>(model: Readonly<RowModel<TData>>, source: Readonly<TreeState<TData>>, onChangeCb: (value: Readonly<TreeState<TData>>) => void): Readonly<Row<TData>> => {
  let rowAPI: RowAPI<TData> = {
    toggleChildren: () => {
      const nextState: Readonly<TreeState<TData>> = TreeState.toggleChildren(source, model);
      onChangeCb(nextState);
    },
    updateData: (newData: TData) => {
      const nextState: Readonly<TreeState<TData>> = TreeState.updateData(source, model, newData);
      onChangeCb(nextState);
    }
  };
  return new Row(model, rowAPI);
}
