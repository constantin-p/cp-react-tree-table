const BenchTable = require('benchtable');

const { generateData } = require('./mock-data');
const { TreeState } = require('../../dist');


const normalLoad = () => { // approx 10 000 nodes
  console.log('Generating sample data:');
  const FLAT_TREE_INPUT = generateData(10000, 1);
  const FLAT_TREE = TreeState.create(FLAT_TREE_INPUT) 
  console.log('Sample 1 (DONE)');

  const TREE_INPUT = generateData(10, 4);
  const TREE = TreeState.create(TREE_INPUT);
  console.log('Sample 2 (DONE)');


  const suiteCreate = new BenchTable('normal load (approx. 10 000 nodes)', { isTransposed : true });
  suiteCreate
    .addFunction('TreeState.create', (input) => TreeState.create(input))
    // Add inputs
    .addInput(`FLAT_TREE ${FLAT_TREE_INPUT[1]} nodes`, [FLAT_TREE_INPUT[0]])
    .addInput(`TREE ${TREE_INPUT[1]} nodes`, [TREE_INPUT[0]])
    // Add listeners
    .on('cycle', event => {
      console.log(event.target.toString());
    })
    .on('complete', () => {
      console.log('Fastest is ' + suiteCreate.filter('fastest').map('name'));
      console.log(suiteCreate.table.toString());
    })
    // Run async
    .run({ async: false });

  
  const suiteExpandAll = new BenchTable('normal load (approx. 10 000 nodes)', { isTransposed : true });
  suiteExpandAll
    .addFunction('TreeState.expandAll', (input) => TreeState.expandAll(input))
    // Add inputs
    .addInput(`FLAT_TREE ${FLAT_TREE_INPUT[1]} nodes`, [FLAT_TREE])
    .addInput(`TREE ${TREE_INPUT[1]} nodes`, [TREE])
    // Add listeners
    .on('cycle', event => {
      console.log(event.target.toString());
    })
    .on('complete', () => {
      console.log('Fastest is ' + suiteExpandAll.filter('fastest').map('name'));
      console.log(suiteExpandAll.table.toString());
    })
    // Run async
    .run({ async: false });
}

normalLoad();

