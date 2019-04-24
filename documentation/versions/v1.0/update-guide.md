---
title: "v0.x → v1.0 API Migration"
---


In `v1.0`, library bindings are exported as **named exports**:

`import { TreeTable, TreeState } from 'cp-react-tree-table';`


---


In`v1.0`, `findRowModel(node)`, `expandAncestors(treeState, rowModel)` and `scrollTo(posY)` can be used to replace the functionality offered by `scrollIntoView(node, expandAncestors)` from `v0.x`.

[Example — scroll to a specific node](#v1_0_demos_scroll-into-view)
