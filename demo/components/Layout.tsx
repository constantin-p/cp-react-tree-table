import React, { FunctionComponent, ReactElement } from "react";


interface ILayoutProps {
	children: ReactElement;
}

const Layout: FunctionComponent<ILayoutProps> = ({ children }) => {
	return (
		<div className="wrapper">
      <header>
        <section>
          <div className="description">
            <h1>cp-react-tree-table</h1>
            <p>A fast, efficient tree table component for ReactJS.</p>
            <ul>
             <li>
                <a href="https://constantin.software/cp-react-tree-table/docs/">
                  <span className="service">Documentation</span>
                </a>
              </li>
              <li>
                <a href="https://github.com/constantin-p/cp-react-tree-table">
                  <span className="service">GitHub</span>
                  {/* <span className="name hide-mobile"><u>cp-react-tree-table</u></span> */}
                </a>
              </li>
              <li>
                <a href="https://www.npmjs.com/package/cp-react-tree-table">
                  <span className="service">npm</span>
                  {/* <span className="name hide-mobile"><u>cp-react-tree-table</u></span> */}
                </a>
              </li>
            </ul>
          </div>

          <div className="install-instructions">
            <p className="install-npm">
              npm install --save cp-react-tree-table
            </p>
            <div className="divider"></div>
            <p className="install-yarn">
              yarn add cp-react-tree-table
            </p>
          </div>
        </section>
      </header>
        
     	{children}
    </div>
	)
}

export default Layout;
