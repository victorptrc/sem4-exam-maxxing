import type { Question } from "../../types";

const questions: Question[] = [
  {
    week: 12,
    topic: "AOP definition",
    question:
      "Which statement best defines Aspect-Oriented Programming (AOP)?",
    options: [
      "A paradigm that replaces object-oriented programming entirely",
      "A programming paradigm that increases modularity by allowing the separation of cross-cutting concerns",
      "A design pattern for managing database transactions only",
      "A technique for compiling Java code at runtime",
    ],
    answer: 1,
    explanation:
      "AOP is defined as a programming paradigm that aims to increase modularity by allowing the separation of cross-cutting concerns — concerns that affect multiple components, such as logging, security, and transaction management.",
  },
  {
    week: 12,
    topic: "Cross-cutting concerns",
    question:
      "Which of the following is the best example of a cross-cutting concern?",
    options: [
      "A method that calculates the total price of a shopping cart",
      "A database entity class representing a user",
      "Logging that must be applied across every service method in the application",
      "A REST controller that handles a single HTTP endpoint",
    ],
    answer: 2,
    explanation:
      "Cross-cutting concerns are aspects of a program that affect multiple components. Logging that applies across all service methods is the canonical example — it cannot be cleanly modularised without AOP.",
  },
  {
    week: 12,
    topic: "AOP key concepts — Aspect",
    question: "In AOP terminology, what is an Aspect?",
    options: [
      "A specific point in program execution, such as a method call",
      "The action performed by the framework at a join point",
      "A modular unit that encapsulates a cross-cutting concern",
      "An expression that selects which join points should trigger behaviour",
    ],
    answer: 2,
    explanation:
      "An aspect is a modular unit of cross-cutting concern — analogous to security cameras in a shopping mall. It is declared with @Aspect and contains the pointcuts and advice that implement the concern.",
  },
  {
    week: 12,
    topic: "AOP key concepts — Join Point",
    question: "Which statement correctly describes a Join Point in AOP?",
    options: [
      "A rule that selects which methods should be intercepted",
      "The compiled bytecode produced after weaving",
      "A specific point in program execution where an aspect can be applied, such as a method execution",
      "The return value captured after a method completes successfully",
    ],
    answer: 2,
    explanation:
      "A join point is a specific execution moment — typically a method execution in Spring AOP. Think of it like a customer entering, ordering, or paying in a restaurant: discrete moments where an action (aspect) can be triggered.",
  },
  {
    week: 12,
    topic: "Join Point vs Pointcut",
    question:
      "What is the key difference between a Pointcut and a Join Point?",
    options: [
      "A pointcut is a specific execution moment; a join point is a rule for selecting those moments",
      "A join point is a specific execution moment; a pointcut is a rule (expression) that selects which join points trigger advice",
      "They are synonyms for the same AOP concept",
      "A pointcut always runs after the join point; a join point runs before",
    ],
    answer: 1,
    explanation:
      "A join point is the actual execution moment (e.g., calling processPayment()). A pointcut is the expression/rule that selects which join points should have advice applied — like 'apply the VIP greeting only when the customer is in the Penthouse Suite'.",
  },
  {
    week: 12,
    topic: "AOP key concepts — Advice",
    question: "In Spring AOP, 'advice' is best described as:",
    options: [
      "The class annotated with @Aspect",
      "The action an aspect performs at a join point (before, after, or around the method)",
      "The expression that filters which methods are intercepted",
      "The process of integrating aspect code into the application at compile time",
    ],
    answer: 1,
    explanation:
      "Advice is the action the aspect takes at a join point. It defines what to do and when — before, after (always/finally), after-returning, after-throwing, or around the method execution.",
  },
  {
    week: 12,
    topic: "Advice types — @After",
    question:
      "Which advice type runs after the target method completes, regardless of whether it threw an exception or returned normally?",
    options: ["@AfterReturning", "@AfterThrowing", "@After", "@Around"],
    answer: 2,
    explanation:
      "@After advice runs after method execution always — whether it succeeded or threw an exception. It behaves like a 'finally' block. @AfterReturning only fires on normal return; @AfterThrowing only fires when an exception is thrown.",
  },
  {
    week: 12,
    topic: "Advice types — @AfterReturning",
    question:
      "You need advice that only executes when a method returns a value successfully (no exception). Which annotation should you use?",
    options: ["@Before", "@After", "@AfterThrowing", "@AfterReturning"],
    answer: 3,
    explanation:
      "@AfterReturning fires only after a method completes without throwing an exception. You can bind the return value using the 'returning' attribute, e.g. @AfterReturning(pointcut = \"...\", returning = \"result\").",
  },
  {
    week: 12,
    topic: "Advice types — @Around",
    question:
      "Which advice type is the most powerful because it completely wraps the join point and can control whether the target method even executes?",
    options: ["@Before", "@After", "@AfterReturning", "@Around"],
    answer: 3,
    explanation:
      "@Around advice surrounds the join point entirely. It receives a ProceedingJoinPoint and must call proceed() to invoke the actual method. It can modify arguments, the return value, or suppress the call altogether — making it the most powerful advice type.",
  },
  {
    week: 12,
    topic: "Advice types — @AfterThrowing",
    question:
      "A logging aspect must capture exception details only when a service method throws a runtime exception. Which advice type is correct?",
    options: ["@After", "@AfterThrowing", "@AfterReturning", "@Before"],
    answer: 1,
    explanation:
      "@AfterThrowing fires only when the advised method throws an exception. It allows the aspect to inspect the exception without running for normal returns.",
  },
  {
    week: 12,
    topic: "Advice types — @Before",
    question:
      "Which advice annotation executes its logic BEFORE the target method is invoked?",
    options: ["@After", "@AfterReturning", "@Around", "@Before"],
    answer: 3,
    explanation:
      "@Before advice runs before the target method is invoked. It cannot stop the method from executing (unlike @Around which controls proceed()). A common use case is validation or permission checks before placeOrder().",
  },
  {
    week: 12,
    topic: "Pointcut expressions",
    question:
      "What does the pointcut expression execution(* com.example.service.*.*(..)) match?",
    options: [
      "Only void methods in the com.example.service package",
      "All methods with any return type, any name, and any parameters in any class inside com.example.service",
      "Only public static methods in com.example.service",
      "Only constructors in classes under com.example.service",
    ],
    answer: 1,
    explanation:
      "The execution() designator matches method executions. * (any return type) com.example.service.* (any class in that package) .* (any method name) (..) (any parameter list) — so it matches all methods in all classes in the service package.",
  },
  {
    week: 12,
    topic: "Weaving",
    question: "In AOP, 'weaving' refers to:",
    options: [
      "Writing advice code directly inside each target business class",
      "The process of applying aspects to the target code — at compile-time, load-time, or runtime",
      "Selecting which join points trigger advice using a pointcut expression",
      "Compiling the @Aspect class into a separate JAR file",
    ],
    answer: 1,
    explanation:
      "Weaving is the process of linking aspects with the main application code. It can happen at compile-time (AspectJ compiler), load-time (LTW via Java agent), or at runtime using proxies (Spring AOP's default).",
  },
  {
    week: 12,
    topic: "Weaving types",
    question:
      "Spring AOP's default weaving strategy — creating a proxy object that intercepts method calls — is which type of weaving?",
    options: [
      "Compile-time weaving",
      "Load-time weaving",
      "Runtime / proxy-based weaving",
      "Source-level weaving",
    ],
    answer: 2,
    explanation:
      "Spring AOP uses runtime proxy-based weaving by default. The framework creates either a JDK dynamic proxy (if the bean implements an interface) or a CGLIB subclass proxy (if it does not). This is lighter than compile-time or load-time weaving but limited to method-execution join points on Spring-managed beans.",
  },
  {
    week: 12,
    topic: "Spring AOP proxies — CGLIB",
    question:
      "Spring AOP creates a JDK dynamic proxy when the target bean implements an interface. What mechanism does it fall back to when the bean does NOT implement any interface?",
    options: [
      "AspectJ compile-time weaving",
      "A CGLIB subclass proxy",
      "A JDK reflection proxy targeting the concrete class directly",
      "Load-time weaving via a Java agent",
    ],
    answer: 1,
    explanation:
      "When the target class does not implement an interface, Spring AOP falls back to CGLIB, which generates a runtime subclass of the target class. JDK dynamic proxies require at least one interface to proxy.",
  },
  {
    week: 12,
    topic: "Spring AOP proxies — JDK",
    question:
      "A Spring bean implements the OrderService interface. Which proxy type will Spring AOP use by default?",
    options: [
      "A CGLIB proxy that subclasses OrderServiceImpl",
      "A JDK dynamic proxy backed by the OrderService interface",
      "No proxy — Spring AOP modifies the class bytecode directly",
      "An AspectJ proxy compiled at build time",
    ],
    answer: 1,
    explanation:
      "When the target bean implements at least one interface, Spring AOP uses a JDK dynamic proxy that implements the same interface(s). CGLIB is the fallback for concrete classes without interfaces.",
  },
  {
    week: 12,
    topic: "AOP advantages",
    question:
      "Which AOP advantage stems from centralising cross-cutting concerns, reducing code duplication across multiple classes?",
    options: [
      "Improved runtime performance",
      "Enhanced code maintainability",
      "Elimination of all runtime exceptions",
      "Automatic database schema generation",
    ],
    answer: 1,
    explanation:
      "Centralising concerns like logging in one aspect reduces duplication, making it easier to maintain — change one aspect instead of many scattered calls. The slides label this 'Enhanced Code Maintainability'.",
  },
  {
    week: 12,
    topic: "AOP practical applications",
    question:
      "Which of the following is NOT listed as a practical application of AOP in the lecture slides?",
    options: [
      "Logging — automatically recording method entries and exits",
      "Security — implementing security checks uniformly across modules",
      "Transaction management — managing transactions declaratively",
      "UI rendering — constructing React component trees",
    ],
    answer: 3,
    explanation:
      "The slides list logging, security, transaction management, and performance monitoring as practical AOP applications. UI rendering (React/front-end) is unrelated to AOP.",
  },
  {
    week: 12,
    topic: "Spring stereotypes",
    question:
      "Which stereotype annotation marks a class as the data-access layer, encapsulating storage and retrieval behaviour?",
    options: ["@Service", "@Controller", "@Repository", "@Aspect"],
    answer: 2,
    explanation:
      "@Repository (org.springframework.stereotype) marks a class as a Repository — a mechanism for encapsulating storage, retrieval, and search behaviour, typically applied to database access classes. @Service is for business logic; @Controller is for web requests.",
  },
  {
    week: 12,
    topic: "Spring annotations — configuration",
    question:
      "What is the purpose of the @Primary annotation in Spring's annotation-based configuration?",
    options: [
      "It marks a bean as the only one allowed in the context",
      "It lazily initialises the bean on first use",
      "It gives a bean preference when multiple candidates qualify for autowiring",
      "It configures condition-based bean registration",
    ],
    answer: 2,
    explanation:
      "@Primary tells Spring that when multiple beans of the same type are present and autowiring is ambiguous, this bean should be preferred. @Conditional handles condition-based registration; @Lazy handles lazy initialisation.",
  },
  {
    week: 12,
    topic: "Spring container lifecycle",
    question:
      "What is the correct order of the Spring bean lifecycle steps after the container starts?",
    options: [
      "Custom init() → Bean Instantiated → Dependencies Injected → Custom destroy()",
      "Bean Instantiated → Dependencies Injected → Custom init() → Custom utility method → Custom destroy()",
      "Dependencies Injected → Bean Instantiated → Custom destroy() → Custom init()",
      "Bean Instantiated → Custom destroy() → Dependencies Injected → Custom init()",
    ],
    answer: 1,
    explanation:
      "The Spring container lifecycle is: Bean Instantiated → Dependencies Injected → Custom init() method → Custom utility method(s) → Custom destroy() method. The container manages this sequence automatically.",
  },
  {
    week: 12,
    topic: "Spring Boot — auto-configuration",
    question:
      "Which Spring Boot feature automatically configures Spring components based on the classpath dependencies present?",
    options: [
      "Spring Boot Starters",
      "Auto-Configuration",
      "Spring Boot Actuator",
      "Embedded Server Support",
    ],
    answer: 1,
    explanation:
      "Auto-Configuration automatically sets up Spring components based on what is on the classpath. For example, if spring-boot-starter-web is present, Spring Boot sets up an embedded web server automatically.",
  },
  {
    week: 12,
    topic: "Spring Security",
    question:
      "Spring Security's two core mandates are authentication and authorisation. Which correctly distinguishes them?",
    options: [
      "Authentication = what you can do; Authorisation = who you are",
      "Authentication = who you are (identity); Authorisation = what you are allowed to do (permissions)",
      "They are the same concept expressed differently",
      "Authentication handles CSRF; Authorisation handles session fixation",
    ],
    answer: 1,
    explanation:
      "Authentication answers 'Who are you?' (identity verification). Authorisation answers 'What are you allowed to do?' (permissions/access control). This distinction is fundamental to Spring Security.",
  },
  {
    week: 12,
    topic: "Spring Actuator",
    question:
      "Which Spring Boot Actuator endpoint shows the application's UP/DOWN health status and is vital for Kubernetes liveness probes?",
    options: ["/metrics", "/env", "/health", "/loggers"],
    answer: 2,
    explanation:
      "The /health endpoint shows application health information including UP/DOWN status — vital for Kubernetes liveness probes and load balancers. /metrics shows JVM/CPU metrics; /env exposes environment properties; /loggers lets you view and change log levels at runtime.",
  },
  {
    week: 12,
    topic: "AOP weaving — language comparison",
    question:
      "According to the lecture's AOP comparison table, which language/tool combination supports compile-time, load-time, AND runtime weaving?",
    options: [
      "Python with AspectLib/Decorators",
      "C# with PostSharp/Castle",
      "Java with AspectJ/Spring AOP",
      "All three support all three weaving types equally",
    ],
    answer: 2,
    explanation:
      "The lecture's comparison table shows Java (AspectJ/Spring AOP) as the only combination supporting compile-time, load-time, and runtime weaving. C# (PostSharp) is primarily compile-time; Python uses runtime decorators/metaclasses only.",
  },
];

export default questions;
