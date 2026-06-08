import type { Question } from "../../types";

const questions: Question[] = [
  {
    week: 10,
    topic: "Dependency Injection — definition",
    question:
      "Which of the following best defines Dependency Injection (DI)?",
    options: [
      "A runtime garbage-collection strategy that destroys unused objects automatically",
      "A set of software design principles and patterns that enables you to develop loosely coupled code",
      "A technique for compiling components at build time so no runtime wiring is needed",
      "A network protocol for distributing objects across multiple servers",
    ],
    answer: 1,
    explanation:
      "The slide definition (from the DI book): 'Dependency Injection is a set of software design principles and patterns that enables you to develop loosely coupled code.' It is about design — not garbage collection, compilation, or networking.",
  },
  {
    week: 10,
    topic: "DI — primary benefit",
    question:
      "What is the primary benefit of Dependency Injection according to the lecture slides?",
    options: [
      "Improved runtime performance and lower memory usage",
      "Improved code readability and maintainability",
      "Faster compilation by reducing the number of classes",
      "Automatic encryption of all inter-component communication",
    ],
    answer: 1,
    explanation:
      "The exam-emphasised answer: DI improves code readability and maintainability by making dependencies explicit and by decoupling components. It is NOT primarily about performance or memory.",
  },
  {
    week: 10,
    topic: "DI — large-scale applications",
    question:
      "Why is a DI framework particularly beneficial for large-scale applications?",
    options: [
      "It eliminates the need for any interfaces between components",
      "It reduces the number of classes that need to be written",
      "It automates dependency management, which becomes cumbersome to handle manually in large applications",
      "It enforces compile-time binding so all errors are caught early",
    ],
    answer: 2,
    explanation:
      "The slide states: 'In a large application, manually managing dependencies becomes cumbersome.' A DI framework automates this — the exam-reward answer for why DI helps at scale.",
  },
  {
    week: 10,
    topic: "Inversion of Control",
    question:
      "Inversion of Control (IoC) is best described as:",
    options: [
      "A pattern where classes pull their own dependencies from a global registry at startup",
      "A design principle where the control flow is inverted so that custom code receives control from an external source (e.g. a framework) rather than calling the framework directly",
      "A technique for reversing the order of method execution inside a class",
      "A database transaction strategy that rolls back failed operations",
    ],
    answer: 1,
    explanation:
      "IoC inverts the traditional flow: instead of your code calling the framework ('Don't call me, I'll call you'), the framework calls your code. This achieves loose coupling and modularity.",
  },
  {
    week: 10,
    topic: "Tight coupling vs DI",
    question:
      "In the Car/Engine example from the slides, what is the key problem when Car directly uses `new Engine()` inside its constructor?",
    options: [
      "The Engine class is not serializable",
      "Car is tightly coupled to Engine, making it hard to swap implementations and hard to unit-test",
      "The constructor runs too slowly for production use",
      "Engine cannot be garbage-collected because Car holds a strong reference",
    ],
    answer: 1,
    explanation:
      "When a class creates its own dependency with `new`, it is tightly coupled: you cannot swap the implementation (e.g. ElectricEngine) without modifying Car, and you cannot inject a mock for testing.",
  },
  {
    week: 10,
    topic: "Constructor injection",
    question:
      "Constructor injection is best suited for:",
    options: [
      "Optional dependencies that may or may not be needed",
      "Mandatory dependencies, because it prevents objects from being created in an invalid state",
      "Dependencies that should be changed repeatedly after object creation",
      "Circular dependencies between two components",
    ],
    answer: 1,
    explanation:
      "Constructor injection passes dependencies through the constructor. The slides state it is 'best for mandatory dependencies' and 'prevents objects from being created in an invalid state.'",
  },
  {
    week: 10,
    topic: "Setter injection",
    question:
      "Which statement about setter (property) injection is correct?",
    options: [
      "It always guarantees a fully initialised object immediately after construction",
      "It is best for mandatory dependencies and prevents invalid states",
      "It is best for optional dependencies but may lead to partially initialised objects",
      "It cannot be used with interfaces",
    ],
    answer: 2,
    explanation:
      "Setter injection allows flexibility for optional dependencies but carries the risk of partially initialised objects if a setter is never called.",
  },
  {
    week: 10,
    topic: "Interface injection",
    question:
      "Interface injection differs from constructor and setter injection in that:",
    options: [
      "The dependency is passed via a dedicated interface method that the client must implement",
      "The dependency is always resolved at compile time",
      "It is the most common injection style in Java and C#",
      "It requires no interface definitions at all",
    ],
    answer: 0,
    explanation:
      "In interface injection, the client implements an interface (e.g. `EngineProvider`) that exposes an `injectEngine(Engine)` method. It is less common in Java/C# than constructor or setter injection.",
  },
  {
    week: 10,
    topic: "Service Locator vs DI",
    question:
      "Why is the Service Locator pattern considered an anti-pattern compared to Dependency Injection?",
    options: [
      "Service Locator requires a DI container, which is too heavyweight",
      "Service Locator hides dependencies inside the class (classes pull what they need), making dependencies implicit and harder to test",
      "Service Locator only works with static methods, whereas DI works with instances",
      "Service Locator cannot be used in object-oriented languages",
    ],
    answer: 1,
    explanation:
      "With a Service Locator, a class calls the locator itself to retrieve dependencies — the dependencies are hidden. With DI, dependencies are declared explicitly (constructor, setter), making them visible, testable, and replaceable.",
  },
  {
    week: 10,
    topic: "Dependency Inversion Principle",
    question:
      "The Dependency Inversion Principle (DIP) states that high-level modules should:",
    options: [
      "Directly instantiate low-level modules to maintain control",
      "Not depend on low-level modules; both should depend on abstractions (interfaces)",
      "Depend only on concrete classes, never on interfaces",
      "Be compiled before low-level modules so the build order is correct",
    ],
    answer: 1,
    explanation:
      "DIP says high-level modules must not depend on low-level modules; both should depend on abstractions. This is the principle that makes DI work — components depend on interfaces, not concrete classes.",
  },
  {
    week: 10,
    topic: "Composition root",
    question:
      "What is the 'Composition Root' in the context of Dependency Injection?",
    options: [
      "The base class that all components must extend",
      "The single location in the application (typically at startup) where all dependencies are wired together",
      "The root directory of the project's source code",
      "The first component to be garbage-collected when the application shuts down",
    ],
    answer: 1,
    explanation:
      "The Composition Root is the unique place (e.g. `main()` or startup class) where the object graph is assembled. Wiring should happen there — not scattered across the codebase.",
  },
  {
    week: 10,
    topic: "DI container",
    question:
      "What is the role of a DI container (IoC container) such as the Spring ApplicationContext?",
    options: [
      "To store compiled bytecode and distribute it across a network",
      "To automatically resolve, create, and inject dependencies based on registered mappings",
      "To replace the need for interfaces by dynamically generating them at runtime",
      "To enforce that only one instance of each class exists (singleton pattern only)",
    ],
    answer: 1,
    explanation:
      "A DI container reads registrations (annotations, XML, code) and automatically constructs objects with all their dependencies injected. Spring's ApplicationContext is the classic example.",
  },
  {
    week: 10,
    topic: "Static vs dynamic composition",
    question:
      "Which of the following best describes a statically composed component system?",
    options: [
      "Components are loaded, replaced, or reconfigured at runtime",
      "Components are integrated at compile time or build time; changes require recompilation and redeployment",
      "Components discover each other using a service registry at startup",
      "Components communicate only through asynchronous message queues",
    ],
    answer: 1,
    explanation:
      "Static composition binds components at compile/build time. The slide example shows `private static final PaymentGateway gateway = new PayPalPaymentGateway()` — changing it requires recompilation.",
  },
  {
    week: 10,
    topic: "Dynamic composition",
    question:
      "Plugin-based software such as Eclipse or Visual Studio Code is a classic example of:",
    options: [
      "Static composition, because all plugins are compiled into the main binary",
      "Black-box composition, because plugins expose no public APIs",
      "Dynamic composition, because components (plugins) are loaded, replaced, or reconfigured at runtime",
      "Vertical framework composition, because IDEs are domain-specific tools",
    ],
    answer: 2,
    explanation:
      "Dynamic composition loads, replaces, or reconfigures components at runtime using dependency injection, plugins, and dynamic service discovery — exactly how Eclipse/VS Code plugins work.",
  },
  {
    week: 10,
    topic: "Horizontal vs vertical framework",
    question:
      "Java EE, .NET, Spring, Angular, and React are cited in the slides as examples of:",
    options: [
      "Vertical component frameworks — domain-specific for enterprise applications",
      "Horizontal component frameworks — reusable across different domains or application areas",
      "Static composition systems — all components are fixed at compile time",
      "Gray-box frameworks — partially configurable via metadata files",
    ],
    answer: 1,
    explanation:
      "Horizontal frameworks provide reusable components applicable across many domains. The slides explicitly list Java EE, .NET, Spring, Angular, and React as horizontal framework examples.",
  },
  {
    week: 10,
    topic: "Black-box composition",
    question:
      "In black-box composition, how do developers interact with a component?",
    options: [
      "By modifying the component's internal source code to fit their needs",
      "Only through well-defined interfaces (APIs); internal logic is hidden",
      "By inheriting from the component's base class and overriding its methods",
      "By configuring the component via metadata and extension points",
    ],
    answer: 1,
    explanation:
      "Black-box composition hides internal logic. Developers interact only through well-defined interfaces. Microservices (REST/gRPC) and SaaS APIs (PayPal, Stripe) are canonical examples.",
  },
  {
    week: 10,
    topic: "Gray-box composition",
    question:
      "Gray-box composition is best described as:",
    options: [
      "Composition where internal logic is fully visible and freely modifiable",
      "Composition where internal logic is fully hidden behind a strict API",
      "A mix of black-box and white-box approaches where limited internal details are partially visible and configurable via metadata, config files, or extension points",
      "Composition performed exclusively at compile time with no runtime flexibility",
    ],
    answer: 2,
    explanation:
      "Gray-box composition blends black-box and white-box: some internals are exposed via config files or extension points (e.g. Spring Boot's application.yml, Apache Kafka, Eclipse plugins).",
  },
  {
    week: 10,
    topic: "EJB — types of beans",
    question:
      "Which type of Enterprise JavaBean (EJB) is used for asynchronous processing via JMS?",
    options: [
      "Stateless Session Bean",
      "Stateful Session Bean",
      "Message-Driven Bean",
      "Entity Bean",
    ],
    answer: 2,
    explanation:
      "Message-Driven Beans (MDBs) handle asynchronous processing through JMS (Java Message Service), used in event-driven systems and notifications. Stateless/Stateful Session Beans handle synchronous business logic.",
  },
  {
    week: 10,
    topic: "EJB — problems",
    question:
      "Which of the following is a well-known problem with Enterprise JavaBeans (EJB) that contributed to the rise of lighter frameworks like Spring?",
    options: [
      "EJBs cannot support transactions or security at all",
      "EJBs require a full Jakarta EE-compliant application server, making them heavyweight and overkill for small projects",
      "EJBs only run on Microsoft Windows servers",
      "EJBs do not support any form of dependency injection",
    ],
    answer: 1,
    explanation:
      "EJBs require a full Jakarta EE application server (GlassFish, JBoss/WildFly, WebLogic), introducing complexity, performance overhead, and limited flexibility — especially for microservices.",
  },
  {
    week: 10,
    topic: "JavaBean",
    question:
      "A JavaBean is a POJO with additional constraints. Which of the following is NOT a required constraint of a JavaBean?",
    options: [
      "A no-argument constructor",
      "Private fields accessed via getter and setter methods",
      "Implementation of java.io.Serializable",
      "At least one abstract method that subclasses must override",
    ],
    answer: 3,
    explanation:
      "JavaBean constraints are: no-arg constructor, encapsulation via getters/setters, and Serializable. Abstract methods are not a JavaBean requirement — that is a feature of abstract classes.",
  },
  {
    week: 10,
    topic: "Liskov Substitution Principle",
    question:
      "The Liskov Substitution Principle (LSP) states that:",
    options: [
      "Subclasses should always throw new exceptions to notify callers of unsupported operations",
      "Objects of a superclass should be replaceable with objects of a subclass without altering the correctness of the program",
      "Every class must implement at least one interface to be substitutable",
      "High-level modules must not depend on low-level modules",
    ],
    answer: 1,
    explanation:
      "LSP: if S is a subtype of T, objects of type T may be replaced with objects of type S without altering correctness. Violating it — e.g. Penguin extends Bird but throws UnsupportedOperationException on fly() — breaks program correctness.",
  },
  {
    week: 10,
    topic: "Decorator pattern",
    question:
      "In the Decorator design pattern, how does a decorator add behaviour to a component?",
    options: [
      "It modifies the component's source code to insert new functionality",
      "It wraps the component, receives it as a dependency via constructor injection, and delegates calls while adding extra behaviour",
      "It extends the component class and overrides all its methods",
      "It replaces the component in the DI container with a completely new implementation",
    ],
    answer: 1,
    explanation:
      "A decorator wraps the original component and injects it via the constructor (dependency injection principle). It delegates to the wrapped component and adds behaviour — e.g. `MilkDecorator(coffee)` adds milk without modifying `SimpleCoffee`.",
  },
  {
    week: 10,
    topic: "DI framework — scope",
    question:
      "In ASP.NET Core's built-in DI container, which scope creates a new instance every time the service is requested?",
    options: [
      "Singleton",
      "Scoped",
      "Transient",
      "Prototype",
    ],
    answer: 2,
    explanation:
      "ASP.NET Core supports Transient (new instance every time the service is resolved), Scoped (one per HTTP request), and Singleton (one for the app lifetime). 'Prototype' is the equivalent scope name in Spring.",
  },
  {
    week: 10,
    topic: "Composition system",
    question:
      "According to the slides, a composition system has three elements. Which of the following is NOT one of them?",
    options: [
      "Component model",
      "Composition technique",
      "Composition language",
      "Deployment descriptor",
    ],
    answer: 3,
    explanation:
      "A composition system comprises: a Component Model, a Composition Technique, and a Composition Language (for programming-in-the-large architecture). A deployment descriptor is a detail of specific frameworks, not one of the three core elements.",
  },
  {
    week: 10,
    topic: "DI — what it is NOT about",
    question:
      "A student claims: 'The main benefit of Dependency Injection is that it improves application performance by reducing object creation overhead.' This statement is:",
    options: [
      "Correct — DI containers pool objects to avoid repeated instantiation",
      "Partially correct — DI improves performance only for singleton-scoped services",
      "Incorrect — DI is primarily about improved code readability, maintainability, and loose coupling, not performance",
      "Correct — DI avoids the overhead of reflection-based method calls",
    ],
    answer: 2,
    explanation:
      "DI's benefits are improved readability, maintainability, testability, and loose coupling. Performance is not the primary benefit and is NOT what the exam expects as the answer. DI may even add a small overhead.",
  },
];

export default questions;
