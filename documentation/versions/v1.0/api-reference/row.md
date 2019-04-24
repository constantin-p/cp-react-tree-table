---
title: "Row"
order: 30

kind: "class"
extends: "RowModel"
implements: ["RowAPI"]
---


## Public Properties

@/readonly/`data`/@ @/type/`any`/@
: The node data object.

@/readonly/`metadata`/@ @/type/`RowMetadata`/@
: Metadata object containing properties of the corresponding node.

@/readonly/`$state`/@ @/type/`RowState`/@
: Metadata object describing the row's visual state.



## Public Methods

@/tmethod/`toggleChildren`/@ @/type/() => `void`/@
: Will toggle direct descendants of the node represented by the current row. If the direct descendants don't share the same visibility state, the updated state will be determined by the `isVisible` property of the first descendant.
: @/note/This will trigger an `onChange` event. Changes will be rendered by passing the new state to the `value` prop of `TreeTable`./@


@/tmethod/`updateData`/@ @/type/(`newData`: `any`) => `void`/@
: Will update the data object.
: @/note/This will trigger an `onChange` event. Changes will be rendered by passing the new state to the `value` prop of `TreeTable`./@
