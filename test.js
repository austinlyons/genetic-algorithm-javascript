const assert = require('assert');
const Agent = require('./agent');

const ZERO_OPERATORS_LEN = 3;  // i.e. "(9)"
const ONE_OPERATOR_LEN = 7;    // i.e. "(9 + 5)"
const TWO_OPERATORS_LEN = 13;  // i.e. "((9 + 5) * 2)"

// instantiate to null expression
(() => {
  const agent = new Agent();
  assert.equal(agent.expression(), null);
})();

// initialize to "(operand operator operand)"
(() => {
  const agent = new Agent();
  agent.guess();
  assert.equal(agent.expression().length, ONE_OPERATOR_LEN);
})();

// extend to "((operand operator operand) operator operand)"
(() => {
  const agent = new Agent();
  agent.guess();
  let expr = agent.expression();
  assert.equal(agent.extend(expr).length, TWO_OPERATORS_LEN);
})();

// mutate to "(operand operator operand)"
(() => {
  const agent = new Agent();
  agent.guess();
  let expr = agent.expression();
  assert.equal(agent.mutate(expr).length, ONE_OPERATOR_LEN);
})();

// remove: zero operators is a no-op
(() => {
  const agent = new Agent();
  agent._expression = "(9)";
  let expr = agent.expression();
  assert.equal(agent.remove(expr).length, ZERO_OPERATORS_LEN);
})();

// remove: one operator is shortened to zero operators
(() => {
  const agent = new Agent();
  agent.guess();
  let expr = agent.expression();
  assert.equal(agent.remove(expr).length, ZERO_OPERATORS_LEN);
})();

// remove: two operators is shortened to one operator
(() => {
  const agent = new Agent();
  agent.guess();
  let expr = agent.extend(agent.expression());
  assert.ok(agent.remove(expr).length < TWO_OPERATORS_LEN);
})();

// no-op
(() => {
  const agent = new Agent();
  agent.guess();
  let expr = agent.expression();
  assert.equal(agent.noOp(expr).length, ONE_OPERATOR_LEN);
})();
