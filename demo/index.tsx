import * as ReactDOM from 'react-dom/client';

import Demo from "./components/Demo";
import Layout from "./components/Layout";


const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<Layout><Demo /></Layout>)