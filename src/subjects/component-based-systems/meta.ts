/** Static metadata for the Component-Based Systems subject. */

export const SUBJECT_ID = "component-based-systems";
export const SUBJECT_TITLE = "Component-Based Systems";
export const SUBJECT_DESCRIPTION =
  "SDU course (Spring 2026). Building software by assembling reusable components — from Java & Maven, through component design, JPMS, Dependency Injection, Spring & AOP, architecture patterns, SOA & microservices, to component testing.";

export interface WeekInfo {
  week: number;
  title: string;
  summary: string;
}

/** Weeks in the order they appear on the dashboard. */
export const WEEK_INFO: WeekInfo[] = [
  {
    week: 6,
    title: "Introduction to Component-Based Software Engineering",
    summary:
      "What components are, the core vocabulary (interfaces, model, framework, container, composition), and the CORBA → SOA → microservices evolution.",
  },
  {
    week: 7,
    title: "Java Crash Course, Maven & Component Thinking in Java",
    summary:
      "Java essentials for the course, dependency management with Maven, and how to think in components when writing Java.",
  },
  {
    week: 8,
    title: "Component-Oriented Application Design & Architecture",
    summary:
      "Designing systems as components: responsibilities, interfaces, cohesion & coupling, and architecture for component-based software.",
  },
  {
    week: 9,
    title: "The Java Platform Module System (JPMS)",
    summary:
      "Modules, module-info, requires/exports, strong encapsulation and reliable configuration in modern Java.",
  },
  {
    week: 10,
    title: "Dependency Injection",
    summary:
      "Inversion of Control, the patterns of DI (constructor/setter/interface injection), and why DI improves testability and maintainability.",
  },
  {
    week: 11,
    title: "Spring Framework & AOP (Part 1)",
    summary:
      "The Spring container, beans and IoC, plus an introduction to Aspect-Oriented Programming: aspects, join points, pointcuts and advice.",
  },
  {
    week: 12,
    title: "Spring Framework & AOP (Part 2)",
    summary:
      "More Spring, and AOP in depth: advice types, weaving, and cross-cutting concerns like logging, security and transactions.",
  },
  {
    week: 13,
    title: "Software Architecture Patterns",
    summary:
      "Layered, event-driven, microkernel/plug-in, microservices and space-based patterns — trade-offs and when to use each.",
  },
  {
    week: 16,
    title: "SOA & Introduction to Microservices",
    summary:
      "Service-Oriented Architecture, web services (WSDL, SOAP, REST), MOM, gRPC/Protobuf, API gateways and dynamic service discovery.",
  },
  {
    week: 17,
    title: "Microservices Patterns",
    summary:
      "Decomposition, data management, communication, and reliability patterns for microservice architectures.",
  },
  {
    week: 18,
    title: "Component Testing — Principles & Practices",
    summary:
      "Unit vs component vs integration testing, test doubles (mocks/stubs), and what makes a good, maintainable test.",
  },
  {
    week: 19,
    title: "Component Testing — Test Types & Strategy",
    summary:
      "The test pyramid, integration/system testing, and performance testing: load vs stress testing.",
  },
  {
    week: 98,
    title: "Concept Notes — Quick Explainers",
    summary:
      "Growing collection of answers to your study-session questions (SOA, ESB, coarse vs fine grained, SOA vs SOAP, Protobuf & gRPC, …) with diagrams and flashcards.",
  },
  {
    week: 99,
    title: "Hard Exam Simulation",
    summary:
      "Exam-level-plus difficulty — the teacher said the real exam is harder than the mock. Take this last, after the weekly quizzes and the mock.",
  },
];
