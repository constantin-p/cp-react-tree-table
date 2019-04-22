---
title: "TreeTable"
order: 0

kind: "class"
extends: "React.Component"
---


## Props

@/required/`value`/@ @/type/`Readonly`<`TreeState`>/@
: The `TreeState` object to be rendered by the `TreeTable` component.

@/optional/`onChange`/@ @/type/(`value`: `Readonly`<`TreeState`>) => `void`/@
: The `onChange` event to be called when changes occur. Changes will be rendered by passing the new state to the `value` prop.

@/required/`children`/@ @/type/`Array`<`React.ReactElement`<`TreeTable.Column`>>/@
: A list of `TreeTable.Column` components that will be used to render the table.

@/required/`onScroll`/@ @/type/(`scrollTop`: `number`) => `void`/@
: The `onScroll` event to be called when the table's content is being scrolled.

@/optional/`height`/@ @/type/`number`/@
: The height of the rendered table (`pixels`).

@/optional/`headerHeight`/@ @/type/`number`/@
: The height of the rendered header row (`pixels`).

@/optional/`className`/@ @/type/`string`/@
: The custom string that will be appended to the classList of `TreeTable`'s root element.



## Public Methods

@/tmethod/`scrollTo`/@ @/type/(`posY`: `number`) => `void`/@
: Scrolls the content of the table to a given position (`pixels`).
