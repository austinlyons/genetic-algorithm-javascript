# Genetic Algorithm in JavaScript
A toy problem to illustrate basic concepts of genetic algorithms.

## Concept
The basic concept is to start with a solution and try to generate an expression that evaluates to that solution.
For example, if our solution is the number 42 we'll try to generate expressions like ```(6 * 7)``` or ```((4 * 10) + 2)```

We try to "evolve" this through random guesses and selection. For each iteration of the simulation we create several agents (see `agent.js`), let them all guess at an expression, and pick the expression that evaluates closest to the target. For example, if the solution is `42` and are two agents with guesses `(2 - 1)` and `(6 * 6)`, we'll choose `(6 * 6)` as the winner of this generation. The next generation of agents will then inherit their ancestor's expression, e.g. they would start with the expression `(6 * 6)` and guess again.

During each generation we randomly choose from several genetic operators to apply to an agent.
One option is `extend`, where a random operator and operand are concatenated to the
existing expression, e.g. `(6 * 6)` could be extended to `((6 * 6) + 5)`.
Another option is `remove`, where a random operator and the proceeding operand
are removed from the expression, e.g. `((6 * 6) + 5)` could be shortened
back down to `((6 * 6))`. A third option is to `mutate`, which chooses
an operator to randomly mutate, e.g. `((6 * 6) + 5)` could be mutated to
`((6 * 6) - 5)`. The last operator is `noOp`, which is an identity operator
that simply returns itself, e.g. calling `noOp` with `((6 * 6) + 5)` returns
`((6 * 6) + 5)`. These genetic operators are chosen randomly, you can think
of a weighted four-sided die with the weights tunable in `agent.js`.

## Run
To run this code, install node and nvm then

`$ nvm run main.js`

You may have to `$ nvm install 7.3`

## Code

## Results

## Example

## Hypothesis & Future Work


## License
MIT License

Copyright (c) 2017 Austin Lyons

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
