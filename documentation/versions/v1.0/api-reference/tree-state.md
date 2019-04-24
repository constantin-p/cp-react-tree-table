---
title: "TreeState"
order: 20

kind: "class"
---

Represents a snapshot of the state of the table. Changes within the table will create new `TreeState` objects, which will be provided by the `onChange` event on `TreeTable`. This follows the [controlled component API](https://reactjs.org/docs/forms.html#controlled-components) pattern.


## Public Properties

@/readonly/`data`/@ @/type/`Array`<`RowModel`>/@
: The internal representation of the tree.

@/readonly/`height`/@ @/type/`number`/@
: The height of the visual representation of the tree, in its current state (`pixels`).

@/readonly/`hasData`/@ @/type/`boolean`/@
: Whether the tree represented by this object contains any nodes.



## Public Methods

@/tmethod/`findRowModel`/@ @/type/(`node`: `TreeNode`>) => `RowModel`|`undefined`/@
: Returns the `RowModel` object that corresponds to the given node.


## Public Static Methods

@/tmethod/`create`/@ @/type/(`data`: `Array`<`TreeNode`>) => `Readonly`<`TreeState`>/@
: Returns a new `TreeState` object based on the provided tree data.

@/tmethod/`createEmpty`/@ @/type/() => `Readonly`<`TreeState`>/@
: Returns a new `TreeState` object with no tree data.

@/tmethod/`expandAll`/@ @/type/(`source`: `Readonly`<`TreeState`>, `depthLimit`?: `number`) => `Readonly`<`TreeState`>/@
: Returns a new `TreeState` object with all tree nodes expanded (for **`depthLimit`** set to `undefined`). If **`depthLimit`** is provided, expands only nodes with their **`depth`** value less than **`depthLimit`**.

@/tmethod/`collapseAll`/@ @/type/(`source`: `Readonly`<`TreeState`>) => `Readonly`<`TreeState`>/@
:  Returns a new `TreeState` object with all tree nodes collapsed.

@/tmethod/`expandAncestors`/@ @/type/(`source`: `Readonly`<`TreeState`>, `model`: `RowModel`) => `Readonly`<`TreeState`>/@
:  Returns a new `TreeState` object with all ancestors for the given node expanded.
