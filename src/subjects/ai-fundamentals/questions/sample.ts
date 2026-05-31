import type { Question } from "../../types";

const sample: Question[] = [
  {
    week: 0,
    topic: "Agents",
    question: "What kind of environment has a crossword puzzle?",
    options: [
      "Dynamic",
      "Static",
      "Stochastic",
      "None of the mentioned",
    ],
    answer: 1,
    explanation: "A crossword puzzle doesn't change while you think — it's static. It's also deterministic, discrete, fully observable, and sequential.",
  },
  {
    week: 0,
    topic: "Uninformed Search",
    question: "Consider the search problem with these edges (cost): S→A(1), S→B(2), A→C(1), A→D(1), B→D(2), B→G(5), C→G(5), D→G(2). S is start, G is goal. Break ties alphabetically. What path would uniform-cost graph search return?",
    options: [
      "S - A - D - G",
      "S - B - G",
      "S - A - C - G",
      "S - B - D - G",
    ],
    answer: 0,
    explanation: "UCS finds the cheapest path. Costs: S-A-D-G = 1+1+2 = 4 (winner); S-B-G = 2+5 = 7; S-A-C-G = 1+1+5 = 7; S-B-D-G = 2+2+2 = 6.",
  },
  {
    week: 0,
    topic: "Uninformed Search",
    question: "What is iterative deepening depth-first search?",
    options: [
      "Depth-first search with a gradually increasing depth limit",
      "Depth-first search with a predetermined depth limit",
      "A search strategy where two searches are run simultaneously",
      "Depth-first search that expands the lowest-cost node first",
    ],
    answer: 0,
    explanation: "IDS performs DFS with depth limit 0, then 1, then 2, etc., until the goal is found. Combines DFS's low memory with BFS's completeness/optimality (for uniform step cost).",
  },
  {
    week: 0,
    topic: "Local Search",
    question: "The efficiency of a Genetic Algorithm (how quickly it arrives at the best solution) is dependent upon:",
    options: [
      "The initial conditions",
      "The size of the population",
      "The types of operators employed",
      "All of the above",
    ],
    answer: 3,
    explanation: "GA performance depends on starting population, population size, and the selection/crossover/mutation operators — all three together drive how fast (and whether) it converges.",
  },
  {
    week: 0,
    topic: "Local Search",
    question: "In many problems the path to goal is irrelevant; this class of problems can be solved using:",
    options: [
      "Informed Search techniques",
      "Uninformed Search techniques",
      "Local Search techniques",
      "Informed & Uninformed Search Techniques",
    ],
    answer: 2,
    explanation: "Local search only cares about the final state quality (e.g. n-queens, scheduling). It ignores path history, unlike BFS/DFS/A* which build and return full paths.",
  },
  {
    week: 0,
    topic: "Constraint Satisfaction Problems",
    question: "Consider a CSP with variables X, Y with domains {1,2,3,4,5,6} for X and {2,4,6} for Y, and constraints X < Y and X + Y > 8. List the values that remain in the domain of X after enforcing arc consistency for the arc X → Y (recall arc consistency for a specific arc only prunes the tail variable, X).",
    options: [
      "The resulting domain of X is {1, 2, 3, 4, 5}",
      "The resulting domain of X is {1, 2, 6}",
      "The resulting domain of X is {3, 4, 5}",
      "The resulting domain of X is {3, 4, 5, 6}",
    ],
    answer: 2,
    explanation: "For each x in X, need some y in {2,4,6} with x<y AND x+y>8. x=3: y=6 works (3<6, 9>8) ✓. x=4: y=6 (4<6, 10>8) ✓. x=5: y=6 (5<6, 11>8) ✓. x=1,2: no y satisfies x+y>8. x=6: no y>6.",
  },
  {
    week: 0,
    topic: "Bayesian Networks",
    question: "BN with L→V←M, where P(M=T)=0.2, P(L=T)=0.7. CPT for V: P(V=T|L=T,M=T)=0.9; P(V=T|L=T,M=F)=0.5; P(V=T|L=F,M=T)=0.3; P(V=T|L=F,M=F)=0.05. What is P(V=false | L=false)?",
    options: [
      "0.3",
      "0.7",
      "0.9",
      "0.1",
    ],
    answer: 2,
    explanation: "Sum over M: P(V=F|L=F) = P(V=F|L=F,M=T)·P(M=T) + P(V=F|L=F,M=F)·P(M=F) = 0.7·0.2 + 0.95·0.8 = 0.14 + 0.76 = 0.90.",
  },
];

export default sample;
