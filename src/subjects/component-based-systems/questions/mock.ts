import type { Question } from "../../types";

/** The 15 official mock-exam questions (week: 0). Correct answers taken from the mock key. */
const questions: Question[] = [
  {
    week: 0,
    topic: "WSDL / Web Services",
    question: "Which of the following is a key advantage of using WSDL (Web Services Description Language)?",
    options: [
      "It simplifies the process of monitoring web services",
      "It provides a standard way to describe web services, enabling interoperability",
      "It ensures the security of web services",
      "It improves the performance of web services",
    ],
    answer: 1,
    explanation:
      "WSDL is an XML-based language that provides a standardized, machine-readable description of a web service (its operations, messages and endpoints), which enables interoperability between different systems.",
  },
  {
    week: 0,
    topic: "Component framework",
    question:
      "Which of the following best describes a key function of a Component Framework in the context of component-based software development?",
    options: [
      "It ensures that each component is independently compiled and executed without any interaction",
      "It enforces architectural constraints, provides lifecycle management, and facilitates interaction between components through standardized interfaces",
      "It dynamically generates business logic for components based on user input",
      "It eliminates the need for interface definitions between components by embedding all logic within the framework itself",
    ],
    answer: 1,
    explanation:
      "A component framework implements a component model: it manages component lifecycle, provides runtime services, and lets components interact through standardized interfaces while enforcing architectural constraints.",
  },
  {
    week: 0,
    topic: "MOM",
    question: "Which of the following best describes the primary purpose of Message-Oriented Middleware (MOM)?",
    options: [
      "To enable peer-to-peer file sharing between servers",
      "To directly connect web browsers to backend databases",
      "To facilitate asynchronous communication between distributed systems",
      "To provide high-performance computation for big data processing",
    ],
    answer: 2,
    explanation:
      "MOM enables asynchronous, loosely-coupled communication between distributed systems by passing messages (often via queues), so senders and receivers need not be available at the same time.",
  },
  {
    week: 0,
    topic: "SOA challenges",
    question: "Which of the following is a common challenge in implementing a Service-Oriented Architecture (SOA)?",
    options: [
      "Easy integration with legacy systems",
      "Simplified service governance",
      "Ensuring consistent service security across services",
      "Elimination of service dependencies",
    ],
    answer: 2,
    explanation:
      "Maintaining consistent security across many independently-developed, distributed services is a real SOA challenge. The other options describe benefits that SOA does NOT automatically provide.",
  },
  {
    week: 0,
    topic: "SOA vs Microservices",
    question: "Which of the following best describes a key difference in the service granularity between SOA and Microservices?",
    options: [
      "SOA uses fine-grained services, while Microservices use coarse-grained services",
      "SOA and Microservices both use monolithic service structures",
      "SOA typically uses coarse-grained, enterprise-level services; Microservices use fine-grained, business-function-level services",
      "Microservices are more centralized compared to SOA",
    ],
    answer: 2,
    explanation:
      "SOA services are coarse-grained and enterprise-level (often sharing an ESB), whereas microservices are fine-grained, each scoped to a single business function and independently deployable.",
  },
  {
    week: 0,
    topic: "WSDL",
    question: "What type of language is Web Services Description Language (WSDL) based on?",
    options: ["HTML", "XML", "JSON", "gRPC"],
    answer: 1,
    explanation:
      "WSDL is an XML-based language for describing the functionality of a web service.",
  },
  {
    week: 0,
    topic: "Component testing",
    question: "In which of the following cases is component testing the most appropriate type of testing?",
    options: [
      "Verifying a recursive function that calculates factorial values",
      "Ensuring an API controller properly handles and routes user requests to underlying services",
      "Testing a private helper method used inside a utility class",
      "Debugging a failed assertion in a single algorithm implementation",
    ],
    answer: 1,
    explanation:
      "Component testing checks a whole component (e.g. an API controller) including its interactions with the services it orchestrates — broader than a single function/method (unit testing) but narrower than full system testing.",
  },
  {
    week: 0,
    topic: "Integration testing",
    question:
      "You are testing a user registration feature. A new user signs up, the system accepts input, validates it, sends it to the database, and a welcome email is sent. Which test best classifies as integration testing rather than component testing?",
    options: [
      "Verifying the login module works when tested with a mock user database",
      "Ensuring the cart module calculates totals correctly with discounts applied",
      "Testing that the user registration module successfully stores new users in the actual database and sends a welcome email",
      "Checking if a utility function correctly formats error messages",
    ],
    answer: 2,
    explanation:
      "Integration testing verifies that multiple real components work together — here the registration handler, the actual database, and the email service — rather than a single component in isolation (which would use a mock).",
  },
  {
    week: 0,
    topic: "Performance testing",
    question:
      "During performance testing of a web application, you observe the system becomes unresponsive when the user count exceeds 5000. This scenario is best classified as:",
    options: ["A successful load test", "A failed unit test", "A stress testing result", "A regression test issue"],
    answer: 2,
    explanation:
      "Stress testing pushes a system beyond normal capacity to find its breaking point. Becoming unresponsive past 5000 users is a stress-test finding (the failure threshold).",
  },
  {
    week: 0,
    topic: "Cohesion & coupling",
    question: "What is the recommended approach to cohesion and coupling in a component-based system?",
    options: [
      "Low cohesion and high coupling",
      "High cohesion and high coupling",
      "Low cohesion and low coupling",
      "High cohesion and low coupling",
    ],
    answer: 3,
    explanation:
      "High cohesion (a component does one well-defined job) and low coupling (minimal dependence between components) keep components independent, reusable and maintainable.",
  },
  {
    week: 0,
    topic: "Dependency Injection",
    question: "Which of the following is a key benefit of Dependency Injection?",
    options: [
      "Improved code readability and maintainability",
      "Faster execution of code",
      "To prevent the use of external libraries in the application",
      "Reduced memory usage",
    ],
    answer: 0,
    explanation:
      "DI decouples a class from the creation of its dependencies, improving readability, testability and maintainability. It is not primarily a performance or memory optimization.",
  },
  {
    week: 0,
    topic: "Horizontal frameworks",
    question: "Which of the following best describes a Horizontal Component Framework?",
    options: [
      "A framework designed for a specific industry or domain such as healthcare or finance",
      "A reusable, general-purpose framework that can be applied across various domains",
      "A framework used exclusively for mobile application development",
      "A framework built to manage vertical scaling in cloud infrastructure",
    ],
    answer: 1,
    explanation:
      "Horizontal frameworks are general-purpose and reusable across domains; vertical frameworks are domain-specific (e.g. healthcare, finance).",
  },
  {
    week: 0,
    topic: "Dependency Injection",
    question: "Why is using a DI (dependency injection) framework beneficial for large-scale applications?",
    options: [
      "It automates dependency management, which becomes cumbersome to handle manually in large applications",
      "It ensures all components are implemented using the same programming language",
      "It allows hardcoded dependencies to improve runtime performance",
      "It eliminates the need for object-oriented design principles",
    ],
    answer: 0,
    explanation:
      "In large systems, wiring dependencies by hand becomes error-prone and tedious; a DI framework (e.g. Spring) automates construction and injection of dependencies.",
  },
  {
    week: 0,
    topic: "AOP",
    question: "Which of the following best describes the primary 'Advice' in Aspect-Oriented Programming (AOP)?",
    options: [
      "A configuration file that defines how aspects should be woven into the code",
      "The actual action taken by an aspect at a particular join point in the program",
      "A point in the program where an aspect can be inserted",
      "A class that defines a set of related pointcuts and advices",
    ],
    answer: 1,
    explanation:
      "In AOP, 'advice' is the actual action executed by an aspect at a join point. (A join point is where it can run; a pointcut selects join points; an aspect groups pointcuts and advice.)",
  },
  {
    week: 0,
    topic: "gRPC / Protobuf",
    question: "What is the primary benefit of using Protocol Buffers (Protobuf) in gRPC?",
    options: [
      "Faster serialization and smaller message sizes compared to JSON",
      "Human-readable formatting",
      "Built-in database functionality",
      "Automatic HTML rendering of responses",
    ],
    answer: 0,
    explanation:
      "Protobuf is a compact binary serialization format — faster to serialize/deserialize and smaller on the wire than text formats like JSON, which is why gRPC uses it.",
  },
];

export default questions;
