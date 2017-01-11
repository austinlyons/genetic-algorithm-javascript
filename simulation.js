const Agent = require('./agent');

class Simulation {
  constructor(target = 42, numAgents = 10, maxGenerations = 100, debug = true) {
    // TARGET is the "solution" that we are trying to generate an expression for
    this.TARGET = target;
    // NUM_AGENTS is the number of agents that will try to guess a solution
    // at each step of the simulation
    this.NUM_AGENTS = numAgents;
    this.MAX_GENERATIONS = maxGenerations;
    this.agents = [];
    this.steps = 0;
    this.debug = debug;
  }

  initializeAgents(winner) {
    // reset list of agents for each generation
    this.agents = [];

    for (let i = 0; i < this.NUM_AGENTS; i++) {
      // each agent will inherit the winning expression from their ancestor
      this.agents.push(new Agent(winner));
    }
  }

  runGeneration() {
    this.agents.forEach(a => a.guess());
  }

  /**
   * Fitness function
   */
  closest(a, b) {
    const deltaA = Math.abs(a.evaluate() - this.TARGET);
    const deltaB = Math.abs(b.evaluate() - this.TARGET);
    return deltaA <= deltaB ? a : b;
  }

  /**
   * Selection step
   */
  pickWinner() {
    return this.agents.reduce((a, b) => this.closest(a, b));
  }

  simulate() {
    let i = 0;
    let winner = null;

    while(i < this.MAX_GENERATIONS) {
      this.initializeAgents(winner);
      this.runGeneration();
      winner = this.pickWinner();
      if (this.debug) console.log(`[${i + 1}]: ${winner.evaluate()} from ${winner.expression()}`);
      if (winner.evaluate() === this.TARGET) break;
      i = i + 1;
    }

    if (this.debug) console.log(`finished simulation in ${i+1} generations`);
    this.steps = i + 1;
    this.winner = winner;
  }

  /* reporting the results of a run */
  results() {
    return {
      steps: this.steps,
      expression: this.winner.expression(),
      value: this.winner.evaluate(),
      history: this.winner.history(),
    }
  }

}

module.exports = Simulation;
