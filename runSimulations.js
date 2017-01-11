const Simulation = require('./simulation');

let average = (array) => array.reduce((a, b) => a + b) / array.length;

class RunSimulations {

  static runOnce(target = 42, numAgents = 10, maxGenerations = 100, debug = true) {
    const simulation = new Simulation(target, numAgents, maxGenerations, debug);
    simulation.simulate();
    console.log(simulation.results());
  }

  static varyNumberOfAgents(target = 42, maxAgents = 20, testsPerStep = 1000, maxGenerations = 100, debug = false) {
    console.time('vary-number-of-agents');
    let results = {};

    console.log(`Running ${testsPerStep} simulations for each agent, testing up to ${maxAgents} agents, running a max of ${maxGenerations} generations per simulation`);

    for (let count = 1; count <= maxAgents; count++) {
      results[count] = [];
      console.log(`testing ${count} agents ...`);
      for (let i = 0; i < testsPerStep; i++) {
        const simulation = new Simulation(target, count, maxGenerations, debug);
        simulation.simulate();
        let { steps, expression, value, history } = simulation.results();
        results[count].push(steps);
        console.log(history);
      }
    }

    console.log();
    console.log('Number of Agents\tAvg Iterations')
    Object.keys(results).forEach((key, i) => {
      console.log(`${key}\t\t\t${average(results[key])}`);
    });

    console.log();
    console.timeEnd('vary-number-of-agents');
  }
}

module.exports = RunSimulations;
