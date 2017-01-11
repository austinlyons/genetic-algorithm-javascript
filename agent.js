class Agent {
  constructor(previousWinner) {
    this.operators = ['+', '-', '/', '*'];

    // inherit from previous generation
    this._expression = previousWinner ? previousWinner.expression() : null;

    // Percent chance of choosing each genetic operator
    this.EXTEND = 0.25;
    this.MUTATE = 0.40;
    this.REMOVE = 0.25;
    this.NO_OP = 0.10;
    const total = this.EXTEND + this.MUTATE + this.REMOVE + this.NO_OP;
    if (Math.round(total * 100) !== 100) throw "Invalid ratios; must sum to 1"

    // keep track of steps for fun and debugging
    this._history = previousWinner ? [...previousWinner._history] : [];
  }

  /**
   * When evaluating the expression we'll use Math.floor
   * so that we can stick with integers and not have to mess around with floats
   */
  evaluate() {
    return Math.floor(eval(this._expression));
  }

  /**
   * agent attemps to find a winning expression by
   * adding a random operator and operand to the existing expression
   * or, if it is the first generation, creating an initial expression
   */
   guess() {
     if (this._expression)
      this._expression = this.updateExpression(this._expression);
     else
      this._expression = this.init();
   }

   updateExpression(existing) {
     let { operatorFn, operation } = this.geneticOperator();

     this.updateHistory(operation);
     return operatorFn(existing);
   }

   /**
    * Randomly chooses a genetic operator (function)
    * based on the probabilities defined in the constructor
    */
   geneticOperator() {
     const rand = Math.random();
     let operatorFn, operation;

     if (rand <= this.EXTEND) {
       operatorFn = this.extend.bind(this);
       operation = 'extend';
     }
     else if (rand <= this.EXTEND + this.MUTATE) {
       operatorFn = this.mutate.bind(this);
       operation = 'mutate'
     }
     else if (rand <= this.EXTEND + this.MUTATE + this.REMOVE) {
       operatorFn = this.remove.bind(this);
       operation = 'remove';
     }
     else {
       operatorFn = this.noOp.bind(this);
       operation = 'no-op';
     }

     return { operatorFn, operation };
   }

  /**
   * seed agent with initial expression
   * return string in the form "(num1 operator num2)", i.e. "(8 / 5)"
   */
  init() {
    return `(${this.operand()} ${this.operator()} ${this.operand()})`;
  }

  extend(existing) {
    return `(${existing} ${this.operator()} ${this.operand()})`;
  }

  mutate(existing) {
    const positions = this.operatorPositions(existing);
    let posToMutate = this.sample(positions);
    let opToRemove = existing[posToMutate];
    let newOp = this.randomDifferentOperator(opToRemove);
    return this.stringReplaceAt(existing, posToMutate, newOp);
  }

  /**
   * remove an operator and operand in this existing expression
   */
  remove(existing) {
    const positions = this.operatorPositions(existing);

    if (positions.length === 0)
      return existing;

    const opPos = this.sample(positions);

    if (positions.length === 1) {
      const digit = existing.search(/\d/);
      return `(${existing.slice(digit, digit + 1)})`;
    }

    // remove operator, space, operand
    // so ((9 + 5) * 2) would be ((9 + 5))
    return `${existing.slice(0, opPos - 1)}${existing.slice(opPos + 3, existing.length)}`;
  }

  /**
   * do nothing to this expression
   */
  noOp(existing) {
    return existing;
  }

  updateHistory(operation) {
    this._history.push(operation);
  }

  /**
   * return number between 1 - 9, randomly chosen
   */
  operand() {
    return 1 + Math.floor(Math.random() * 9);
  }

  /**
   * return a single operator, randomly chosen
   */
  operator() {
    return this.sample(this.operators);
  }

  expression() {
    return this._expression;
  }

  sample(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  /**
   * return a list indices for the operators
   */
  operatorPositions(expression) {
    return expression
            .split("")
            .reduce((acc, character, idx) => {
              if (this.operators.includes(character))
                acc.push(idx)
              return acc;
            }, []);
  }

  randomDifferentOperator(old) {
    const others = this.removeElementFromArray(this.operators, old);
    return this.sample(others);
  }

  stringReplaceAt(str, idx, newChar) {
    return str.slice(0, idx) + newChar + str.slice(idx + 1);
  }

  removeElementFromArray(array, element) {
    let copy = [...array];
    let idx = copy.indexOf(element);
    if (idx >= 0)
      copy.splice(idx, 1);
    return copy;
  }

  history() {
    return this._history;
  }

}

module.exports = Agent;
