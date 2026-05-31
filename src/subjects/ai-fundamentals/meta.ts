/** Static metadata for the AI Fundamentals subject (quiz-only, no lessons). */

export const SUBJECT_ID = "ai-fundamentals";
export const SUBJECT_TITLE = "AI Fundamentals";
export const SUBJECT_DESCRIPTION =
  "Introductory Artificial Intelligence — intelligent agents, search (uninformed, informed, local & adversarial), constraint satisfaction, probabilistic reasoning (Bayesian networks, HMMs), and machine learning (classification, regression, clustering).";

export interface LectureInfo {
  /** Lecture number (used as the `week` field on questions). */
  week: number;
  title: string;
  summary: string;
}

/** Lectures in order. Quiz-only: these provide titles for the "by lecture" picker. */
export const LECTURE_INFO: LectureInfo[] = [
  { week: 1, title: "Introduction to AI", summary: "What AI is, the four definitions (acting/thinking × humanly/rationally), rationality, and the history of the field." },
  { week: 2, title: "Intelligent Agents", summary: "Agents, environments (PEAS), environment types, and agent architectures: simple-reflex, model-based, goal-based, utility-based, learning." },
  { week: 3, title: "Uninformed Search", summary: "Problem formulation and blind search: BFS, DFS, uniform-cost, depth-limited and iterative deepening; completeness, optimality, complexity." },
  { week: 4, title: "Informed Search", summary: "Heuristics, greedy best-first and A*; admissibility, consistency, and how a good heuristic guides search." },
  { week: 5, title: "Local Search", summary: "Hill climbing, simulated annealing, local beam search and genetic algorithms for optimization over large/continuous spaces." },
  { week: 6, title: "Adversarial Search", summary: "Games: minimax, alpha-beta pruning, evaluation functions, and search under time limits." },
  { week: 7, title: "Constraint Satisfaction Problems", summary: "Variables, domains and constraints; backtracking, forward checking, arc consistency (AC-3) and heuristics (MRV, LCV)." },
  { week: 8, title: "Bayesian Networks", summary: "Probabilistic reasoning: conditional independence, the chain rule, network structure, and inference by enumeration." },
  { week: 9, title: "Hidden Markov Models", summary: "Temporal models: states, observations, transition/emission models; filtering, prediction, smoothing and the Viterbi algorithm." },
  { week: 10, title: "Machine Learning & Classification", summary: "Supervised learning, train/test, overfitting, evaluation metrics, and classifiers (k-NN, decision trees, Naive Bayes)." },
  { week: 11, title: "Regression", summary: "Linear regression, least squares, gradient descent, cost functions, and regularization/overfitting." },
  { week: 12, title: "Clustering", summary: "Unsupervised learning: k-means, distance measures, choosing k, and hierarchical clustering." },
];
