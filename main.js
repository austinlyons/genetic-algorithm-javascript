const RunSimulations = require('./runSimulations');

RunSimulations.runOnce();

RunSimulations.varyNumberOfAgents(target = 42, maxAgents = 20, testsPerStep = 100, maxSimulationSteps = 100, debug = true);
