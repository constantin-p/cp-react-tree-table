import React, { FunctionComponent, Fragment, useState, useRef, useEffect } from "react";

import { TreeTable, TreeState, TreeNode, Row } from "cp-react-tree-table";
import { DemoDataItem } from "./demo-data-static";
import { generateData } from "./demo-data-gen";


const GENERATED_CONTENT = generateData();
const Demo: FunctionComponent = () => {
	const [treeState, setTreeState] = useState<Readonly<TreeState<DemoDataItem>>>(TreeState.create<DemoDataItem>(GENERATED_CONTENT.data));
	const treeTableRef = useRef<TreeTable<DemoDataItem>>(null);

	// Cell rendering helpers

	const renderHeaderCell = (name: string, alignLeft: boolean = true) => {
    return () => {
      return (
        <span className={alignLeft ? "align-left" : "align-right"}>{name}</span>
      );
    }
  }

	const renderIndexCell = (row: Row<DemoDataItem>) => {
    return (
      <div style={{ paddingLeft: (row.metadata.depth * 15) + "px"}}>
        <button className={`toggle-button ${row.$state.isExpanded ? "expanded" : ""}`}
          onClick={row.toggleChildren}
          disabled={!row.metadata.hasChildren}>
          <span className={row.data.isWaldo ? "is-waldo" : ""}>{row.data.name}</span>
        </button>
      </div>
    );
  }

 const renderEditableCell = (row: Row<DemoDataItem>) => {
    return (
      <input type="text" value={row.data.contact}
        onChange={(event) => {
        	// .updateData will notify the TreeTable instance to dispatch an onChange call with 
        	// with a new value which includes the patched row data. The change will be visible 
        	// if the new value is picked up and passed through TreeTable's value prop. 
          row.updateData({
            ...row.data,
            contact: event.target.value,
          });
        }}/>
    );
  }

  const renderEmployeesCell = (row: Row<DemoDataItem>) => {
    return (
      <span className="employees-cell">{row.data.employees}</span>
    );
  }

  const renderExpensesCell = (row: Row<DemoDataItem>) => {
    return (
      <span className="expenses-cell">{row.data.expenses}</span>
    );
  }

  // Action handlers

  const handleOnExpandAll = () => {
    console.log("Expand all");

    setTreeState((prev) => TreeState.expandAll(prev));
  }

  const handleOnCollapseAll = () => {
    console.log("Collapse all");

    setTreeState((prev) => TreeState.collapseAll(prev));
  }

  const handleScrollTo = () => {
    console.log("Scroll 1000px from top");

    treeTableRef.current?.scrollTo(1000);
  }

  // Scrolling to a specific node

  const [nodeScheduledForFocus, setNodeScheduledForFocus] = useState<{node: TreeNode<DemoDataItem>, hasRendered: boolean} | undefined>();
  useEffect(() => {
    if (nodeScheduledForFocus != null) {
      if (nodeScheduledForFocus.hasRendered) {
        const currentRowModel = treeState.findRowModel(nodeScheduledForFocus.node)
        if (currentRowModel != null) {
          treeTableRef.current?.scrollTo(currentRowModel.$state.top);
        }
        setNodeScheduledForFocus(undefined);
      } else {
        setNodeScheduledForFocus((prev) => ({ node: nodeScheduledForFocus.node, hasRendered: true }));
      }
    }
  }, [nodeScheduledForFocus]);

  const handleScrollToGroupWaldo = () => {
    console.log("Scroll to 'Group Waldo'");

    const findGroupWaldo = (nodes: Array<TreeNode<DemoDataItem>>): TreeNode<DemoDataItem> | undefined => {
    	for (let i = 0; i < nodes.length; i++) {
    		if (nodes[i].data.isWaldo) return nodes[i];
  			let found = findGroupWaldo(nodes[i].children || []);
				if (found != null) return found; 
  		}
    }

    const nodeToBringIntoView = findGroupWaldo(GENERATED_CONTENT.data);
    if (nodeToBringIntoView != null) {
      // 1. Find the associated model in the current TreeState
      // 2. Expand all its ancestors
      // 3. Scroll to its position (done through nodeScheduledForFocus)

      const rowModel = treeState.findRowModel(nodeToBringIntoView);
      if (rowModel != null) {
        setTreeState((prev) => TreeState.expandAncestors(prev, rowModel));
        setNodeScheduledForFocus({ node: nodeToBringIntoView, hasRendered: false });
      }
    }
  }



	return (
		<Fragment>
			<div className="controls">
        <div className="control-section">
          <span>Node count: <span className="node-count">{GENERATED_CONTENT.count.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span></span>
        </div>
        <div className="control-section">
        	<button onClick={handleOnExpandAll}>Expand all</button>
        	<button onClick={handleOnCollapseAll}>Collapse all</button>
        	<button onClick={handleScrollTo}>Scroll 1000px from top</button>
        	<button onClick={handleScrollToGroupWaldo}>Scroll to "Group Waldo"</button>
        </div>
      </div>

			<TreeTable<DemoDataItem> className="demo-tree-table"
        height={360}
        headerHeight={32}

        ref={treeTableRef}

        value={treeState}
        onChange={(newVal: TreeState<DemoDataItem>) => { console.log("`onChange` call", newVal); setTreeState(newVal); }}>
        <TreeTable.Column renderCell={renderIndexCell} renderHeaderCell={renderHeaderCell("Name")} basis="180px" grow={0}/>
        <TreeTable.Column renderCell={renderEditableCell} renderHeaderCell={renderHeaderCell("Contact person")}/>
        <TreeTable.Column renderCell={renderEmployeesCell} renderHeaderCell={renderHeaderCell("Employees", false)}/>
        <TreeTable.Column renderCell={renderExpensesCell} renderHeaderCell={renderHeaderCell("Expenses ($)", false)}/>
      </TreeTable>
		</Fragment>
	);
}

export default Demo;
