import type { Question } from "../../types";

// Exercise-based questions modeled on the lab handouts. These mirror the style of
// the official sample exam's exercise questions ("using your homework, compute ...").
// Each carries the lecture `week` it belongs to plus source: "exercise-based".
//
// The search questions all use the Lab 2/3 graph (same edges as the sample exam):
//   S→A(1), S→B(2), A→C(1), A→D(1), B→D(2), B→G(5), C→G(5), D→G(2)
// The greedy/A* questions add the heuristic h(A)=3, h(B)=1, h(C)=4, h(D)=2, h(G)=0.
// The Bayesian answers are validated against the completed Lab 7 code (Runner.py).

const exercises: Question[] = [
  // ---- Lecture 3: Uninformed Search (Lab 2) ----
  {
    week: 3,
    topic: "Uninformed Search",
    question:
      "Search graph (Lab 2): S→A(1), S→B(2), A→C(1), A→D(1), B→D(2), B→G(5), C→G(5), D→G(2). S is start, G is goal, ties broken alphabetically. What path does breadth-first graph search return?",
    options: ["S - A - C - G", "S - B - G", "S - A - D - G", "S - B - D - G"],
    answer: 1,
    explanation:
      "BFS minimizes the NUMBER of edges, ignoring cost. S - B - G reaches the goal in 2 steps; every other path needs 3+. (Its cost 7 is higher, but BFS doesn't look at cost — that's UCS's job.)",
    source: "exercise-based",
  },
  {
    week: 3,
    topic: "Uninformed Search",
    question:
      "Same Lab 2 graph: S→A(1), S→B(2), A→C(1), A→D(1), B→D(2), B→G(5), C→G(5), D→G(2). Expanding successors alphabetically, what path does depth-first graph search return?",
    options: ["S - B - G", "S - A - C - G", "S - A - D - G", "S - B - D - G"],
    answer: 1,
    explanation:
      "DFS goes deep, alphabetically: S → A → C → G. It returns the first goal found by deepest-first exploration, not the cheapest or shallowest one.",
    source: "exercise-based",
  },
  // ---- Lecture 4: Informed Search (Lab 3) ----
  {
    week: 4,
    topic: "Informed Search",
    question:
      "Lab graph with heuristic h(A)=3, h(B)=1, h(C)=4, h(D)=2, h(G)=0. Edges: S→A(1), S→B(2), A→C(1), A→D(1), B→D(2), B→G(5), C→G(5), D→G(2). What path does GREEDY best-first search return?",
    options: ["S - A - D - G", "S - B - G", "S - A - C - G", "S - B - D - G"],
    answer: 1,
    explanation:
      "Greedy expands the node with the smallest h, ignoring path cost. h(B)=1 is lowest, so it goes to B, then G (h=0). It returns S - B - G (cost 7) — greedy is NOT optimal; the cheapest path is actually S - A - D - G (cost 4).",
    source: "exercise-based",
  },
  {
    week: 4,
    topic: "Informed Search",
    question:
      "Same graph and heuristic h(A)=3, h(B)=1, h(C)=4, h(D)=2, h(G)=0. What path does A* graph search (f = g + h) return?",
    options: ["S - B - G", "S - A - D - G", "S - A - C - G", "S - B - D - G"],
    answer: 1,
    explanation:
      "A* expands by f = g + h. Tracing it: S-A-D-G keeps the lowest f (g=4, h=0 → f=4) and is returned. With an admissible heuristic A* is optimal, so it finds the cost-4 path — unlike greedy, which was lured to S - B - G.",
    source: "exercise-based",
  },
  // ---- Lecture 5: Local Search / Genetic Algorithms (Lab 4) ----
  {
    week: 5,
    topic: "Local Search",
    question:
      "In the n-queens genetic algorithm (Lab 4), fitness = the number of non-attacking pairs of queens. For 8 queens, what fitness value corresponds to a solved board (no two queens attacking)?",
    options: ["8", "16", "28", "56"],
    answer: 2,
    explanation:
      "There are C(8,2) = 28 pairs of queens. A solution has all 28 pairs non-attacking → fitness 28. (8 is just the queen count; 56 = 8×7 counts ordered pairs.)",
    source: "exercise-based",
  },
  {
    week: 5,
    topic: "Local Search",
    question:
      "In the genetic algorithm, which operator introduces new genetic material by randomly altering a single gene (e.g. moving one queen to a different row)?",
    options: ["Crossover", "Mutation", "Selection", "Fitness evaluation"],
    answer: 1,
    explanation:
      "Mutation randomly changes part of an individual, keeping diversity and exploring new states. Crossover only recombines existing parent genes; selection just picks who reproduces.",
    source: "exercise-based",
  },
  {
    week: 5,
    topic: "Local Search",
    question:
      "A genetic algorithm has converged so every individual in the population is identical, but it is not a solution. Without which operator can it never escape this state?",
    options: ["Crossover", "Selection", "Mutation", "Elitism"],
    answer: 2,
    explanation:
      "If all individuals are identical, crossover just produces copies and selection has nothing new to choose from. Only mutation can introduce new gene values to break out of the local optimum.",
    source: "exercise-based",
  },
  // ---- Lecture 6: Adversarial Search (Lab 5) ----
  {
    week: 6,
    topic: "Adversarial Search",
    question:
      "In the minimax tic-tac-toe lab, utility is +1 win, -1 loss, 0 draw (from MAX's view). It is MAX's turn and one available move wins immediately. What value does minimax assign to that move?",
    options: ["-1", "0", "+1", "Depends on the opponent"],
    answer: 2,
    explanation:
      "A move giving an immediate win is a terminal state with utility +1. MAX takes the maximum over its children, so it selects the +1 move.",
    source: "exercise-based",
  },
  {
    week: 6,
    topic: "Adversarial Search",
    question: "Compared with plain minimax, what does alpha-beta pruning change?",
    options: [
      "It returns the same move but explores fewer nodes",
      "It can return a better move than minimax",
      "It only works at chance nodes",
      "It changes the computed utility values",
    ],
    answer: 0,
    explanation:
      "Alpha-beta computes the exact same minimax value and move; it just skips branches that cannot affect the result, so it runs faster. The decision is identical.",
    source: "exercise-based",
  },
  {
    week: 6,
    topic: "Adversarial Search",
    question: "In minimax, the MIN player is assumed to:",
    options: [
      "Play randomly",
      "Choose the move that minimizes MAX's utility",
      "Maximize both players' utility",
      "Always take the center square",
    ],
    answer: 1,
    explanation:
      "Minimax assumes an optimal adversary: MIN always picks the child with the smallest value (the worst outcome for MAX).",
    source: "exercise-based",
  },
  // ---- Lecture 7: Constraint Satisfaction Problems (Lab 6) ----
  {
    week: 7,
    topic: "Constraint Satisfaction Problems",
    question:
      "In the Australia map-coloring CSP (Lab 6) with 3 colors, what is the constraint between two adjacent regions?",
    options: [
      "Adjacent regions must have the same color",
      "Adjacent regions must have different colors",
      "Every region must be green",
      "At least one region must be red",
    ],
    answer: 1,
    explanation:
      "Map coloring requires regions that share a border to differ in color. (Tasmania has no neighbors, so it is unconstrained and can take any color.)",
    source: "exercise-based",
  },
  {
    week: 7,
    topic: "Constraint Satisfaction Problems",
    question:
      "X has domain {1,2,3,4,5} and Y has domain {1,2,3}, with the single constraint X < Y. After enforcing arc consistency for the arc X → Y (which prunes only the tail X), what is the domain of X?",
    options: ["{1, 2, 3}", "{1, 2}", "{3, 4, 5}", "{1, 2, 3, 4}"],
    answer: 1,
    explanation:
      "Keep x only if some y in {1,2,3} has x < y. The largest y is 3, so x must be < 3 → x ∈ {1, 2}. Values 3,4,5 have no supporting y and are pruned.",
    source: "exercise-based",
  },
  {
    week: 7,
    topic: "Constraint Satisfaction Problems",
    question:
      "During backtracking search, a variable has no value consistent with the current partial assignment. What happens?",
    options: [
      "It assigns a random value anyway",
      "It restarts the whole search from scratch",
      "It backtracks to the previous variable and tries another value",
      "It immediately reports the CSP is unsolvable",
    ],
    answer: 2,
    explanation:
      "Backtracking undoes the most recent assignment and tries that variable's next value. Only when all values at the very first variable are exhausted does it conclude the CSP has no solution.",
    source: "exercise-based",
  },
  // ---- Lecture 8: Bayesian Networks (Lab 7 car-diagnosis network) ----
  {
    week: 8,
    topic: "Bayesian Networks",
    question:
      "Car-diagnosis network (Lab 7): roots DT, EM, FTL with P(DT=T)=0.3, P(EM=T)=0.3, P(FTL=T)=0.2; HC depends on DT, FTL, EM. Using the lab's CPTs, what is P(Fuel Tank Leaking = true | High Consumption = true)?",
    options: ["≈ 0.12", "≈ 0.20", "≈ 0.42", "≈ 0.62"],
    answer: 3,
    explanation:
      "Bayes' rule, summing out DT and EM by their priors: P(HC=T|FTL=T)=0.620, P(HC=T|FTL=F)=0.0949. P(FTL=T|HC=T) = 0.620·0.2 / (0.620·0.2 + 0.0949·0.8) = 0.124/0.19992 ≈ 0.62. (The completed lab code prints 0.6202.)",
    source: "exercise-based",
  },
  {
    week: 8,
    topic: "Bayesian Networks",
    question:
      "Car network: P(DT=T)=0.3, P(EM=T)=0.3, P(FTL=T)=0.2, P(V=T|DT=T)=0.7, P(SMS=T|DT=T,EM=T)=0.05, P(HC=T|DT=T,FTL=T,EM=T)=0.9. What is the joint probability that ALL six variables are true?",
    options: ["≈ 0.00057", "≈ 0.0063", "≈ 0.057", "≈ 0.18"],
    answer: 0,
    explanation:
      "A joint entry is one CPT value per node multiplied together: P(DT)·P(EM)·P(FTL)·P(V|DT)·P(SMS|DT,EM)·P(HC|DT,FTL,EM) = 0.3·0.3·0.2·0.7·0.05·0.9 = 0.000567.",
    source: "exercise-based",
  },
  {
    week: 8,
    topic: "Bayesian Networks",
    question:
      "In the car-diagnosis network, with no evidence given, what is the marginal probability P(High Consumption = true)?",
    options: ["≈ 0.09", "≈ 0.20", "≈ 0.50", "≈ 0.62"],
    answer: 1,
    explanation:
      "Summing HC over every parent configuration weighted by the priors gives ≈ 0.20 (the lab code prints 0.19992). Most of the time the car does not over-consume.",
    source: "exercise-based",
  },
  {
    week: 8,
    topic: "Bayesian Networks",
    question:
      "Car network with P(DT=T)=0.3, P(V=T|DT=T)=0.7, P(V=T|DT=F)=0.1. You observe Vibrations = true. What is P(Damaged Tire = true | V = true)?",
    options: ["0.21", "0.30", "0.70", "0.75"],
    answer: 3,
    explanation:
      "Bayes on the single edge DT→V: P(V=T) = 0.7·0.3 + 0.1·0.7 = 0.28. P(DT=T|V=T) = 0.7·0.3 / 0.28 = 0.21/0.28 = 0.75.",
    source: "exercise-based",
  },
  // ---- Lecture 9: Hidden Markov Models (Lab 8) ----
  {
    week: 9,
    topic: "Hidden Markov Models",
    question:
      "A 2-state HMM (Rain / No-Rain): P(Rain₀)=0.5; transition P(Rainₜ|Rainₜ₋₁)=0.7, P(Rainₜ|¬Rainₜ₋₁)=0.3; sensor P(Umbrella|Rain)=0.9, P(Umbrella|¬Rain)=0.2. On day 1 you see an umbrella. What is the filtered P(Rain₁ | Umbrella₁ = true)?",
    options: ["≈ 0.45", "≈ 0.50", "≈ 0.82", "≈ 0.90"],
    answer: 2,
    explanation:
      "Predict: P(Rain₁) = 0.7·0.5 + 0.3·0.5 = 0.5. Update by the sensor: Rain → 0.9·0.5 = 0.45, ¬Rain → 0.2·0.5 = 0.10. Normalize: 0.45 / (0.45+0.10) = 0.45/0.55 ≈ 0.82.",
    source: "exercise-based",
  },
  {
    week: 9,
    topic: "Hidden Markov Models",
    question: "In the forward (filtering) algorithm, each time step performs:",
    options: [
      "Only a prediction step",
      "A prediction using the transition model, then an update using the observation",
      "Backward smoothing over future evidence",
      "Sampling random states",
    ],
    answer: 1,
    explanation:
      "Filtering = predict (apply the transition model to the previous belief) then correct (multiply by the observation likelihood) and normalize. Using future evidence would be smoothing, not filtering.",
    source: "exercise-based",
  },
  {
    week: 9,
    topic: "Hidden Markov Models",
    question: "What does the (first-order) Markov assumption state in an HMM?",
    options: [
      "Observations are independent of the states",
      "The next state depends only on the current state, not the full history",
      "The state never changes over time",
      "All states are always equally likely",
    ],
    answer: 1,
    explanation:
      "First-order Markov: P(Xₜ | X₀…Xₜ₋₁) = P(Xₜ | Xₜ₋₁). The future depends on the present alone. (A separate sensor-Markov assumption says each observation depends only on the current state.)",
    source: "exercise-based",
  },
];

export default exercises;
