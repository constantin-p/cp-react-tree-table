import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

import pkg from './package.json';


export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs'
    },
    {
      file: pkg.module,
      format: 'es'
    },
    {
      file: pkg.umd,
      name: pkg.umdName,
      format: 'umd',
      globals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
      }
    }
  ],
  external: [
    'react',
    'react-dom'
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**',
      extensions: ['.ts','.tsx']
    }),
    resolve({
      extensions: ['.ts','.tsx']
    }),
    commonjs()
  ]
};
