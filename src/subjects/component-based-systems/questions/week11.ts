import type { Question } from "../../types";

const questions: Question[] = [
  // ── Spring Framework overview ────────────────────────────────────────────
  {
    week: 11,
    topic: "Spring Framework overview",
    question:
      "Which statement best describes the Spring Framework?",
    options: [
      "A compiled, statically typed language for building Android apps",
      "A powerful, lightweight Java framework offering IoC/DI, AOP, data access, and web MVC",
      "An operating-system kernel for cloud-native microservices",
      "A database management system based on XML schemas",
    ],
    answer: 1,
    explanation:
      "Spring is a lightweight, modular Java framework whose core pillars are the IoC/DI container and AOP. It also provides data-access, transaction management, and web MVC modules. Approximately 60 % of Java developers use it for their main applications.",
  },
  {
    week: 11,
    topic: "Spring history",
    question:
      "Spring was originally created as an alternative to which heavyweight Java technology?",
    options: [
      "Java Servlets",
      "Apache Hadoop",
      "Enterprise JavaBeans (EJB)",
      "CORBA CCM",
    ],
    answer: 2,
    explanation:
      "Rod Johnson created Spring in the early 2000s specifically as a lightweight alternative to the complex EJB framework. The 2003 release introduced IoC and Dependency Injection as core concepts.",
  },
  {
    week: 11,
    topic: "Spring history",
    question:
      "In which year did Spring first add built-in AOP support (Spring 2.0)?",
    options: ["2003", "2006", "2009", "2014"],
    answer: 1,
    explanation:
      "Spring 2.0, released in 2006, added AOP support. Spring 3.0 (2009) added annotations and SpEL; Spring Boot arrived in 2014.",
  },
  // ── IoC / DI ────────────────────────────────────────────────────────────
  {
    week: 11,
    topic: "IoC container",
    question:
      "What does the Spring IoC (Inversion of Control) container primarily do?",
    options: [
      "Compiles Java source files into bytecode",
      "Manages the lifecycle and configuration of application components (beans)",
      "Routes HTTP requests to the correct controller",
      "Encrypts database connections automatically",
    ],
    answer: 1,
    explanation:
      "The IoC container manages the lifecycle (creation, initialization, destruction) and configuration of Spring beans. 'Inversion of Control' means the framework — not the application code — controls object creation and wiring.",
  },
  {
    week: 11,
    topic: "Spring Bean",
    question:
      "Which of the following is the best definition of a Spring Bean?",
    options: [
      "Any Java object created with the 'new' keyword inside a main() method",
      "A component/object whose lifecycle is managed by the Spring IoC container",
      "A POJO that must implement the java.io.Serializable interface",
      "An XML element used to declare database schemas",
    ],
    answer: 1,
    explanation:
      "A Spring Bean is any object whose creation, initialization, and destruction is handled by the Spring IoC container. The container reads configuration (XML, annotations, or Java config) to know which beans to manage.",
  },
  {
    week: 11,
    topic: "Bean definition",
    question:
      "Which of the following is NOT one of the three main ways to define a Spring Bean?",
    options: [
      "XML configuration file (beans.xml)",
      "Annotation-based configuration (@Component, @Service, @Repository)",
      "Java-based configuration (@Configuration + @Bean)",
      "Compiling a .class file directly into the Spring runtime JAR",
    ],
    answer: 3,
    explanation:
      "Spring supports XML config, annotation-based config (@Component etc.), and Java-based config (@Configuration/@Bean). Directly modifying the Spring runtime JAR is not a configuration mechanism.",
  },
  // ── Stereotype annotations ───────────────────────────────────────────────
  {
    week: 11,
    topic: "Stereotype annotations",
    question:
      "Which Spring stereotype annotation indicates that an annotated class holds business logic and belongs to the service layer?",
    options: ["@Component", "@Repository", "@Service", "@Controller"],
    answer: 2,
    explanation:
      "@Service marks a class that holds business logic. @Repository is for the data-access/DAO layer, @Controller is for web (MVC) request handling, and @Component is the generic stereotype that all others specialise.",
  },
  {
    week: 11,
    topic: "Stereotype annotations",
    question:
      "The @Repository annotation marks a Spring-managed class that:",
    options: [
      "Serves HTTP requests in a Spring MVC application",
      "Encapsulates storage, retrieval, and search behaviour — typically a database DAO",
      "Declares global application configuration and bean factory methods",
      "Applies cross-cutting advice to other beans",
    ],
    answer: 1,
    explanation:
      "@Repository is a specialisation of @Component for the data-access layer. It indicates that the class encapsulates storage, retrieval, and search behaviour, and Spring also translates persistence-layer exceptions for it.",
  },
  {
    week: 11,
    topic: "Java configuration",
    question:
      "When using Java-based Spring configuration, which annotation combination marks a class as a source of bean definitions and a method that returns a managed bean?",
    options: [
      "@Component on the class, @Autowired on the method",
      "@Configuration on the class, @Bean on the method",
      "@Service on the class, @Inject on the method",
      "@SpringBootApplication on the class, @Scope on the method",
    ],
    answer: 1,
    explanation:
      "@Configuration indicates the class can be used by the Spring IoC container as a source of bean definitions. @Bean on a method tells Spring that the return value of that method should be managed as a bean, giving the developer full control over creation.",
  },
  // ── Bean scopes ──────────────────────────────────────────────────────────
  {
    week: 11,
    topic: "Bean scopes",
    question:
      "Which Spring bean scope creates a single shared instance for the entire IoC container and is also the default scope?",
    options: ["Prototype", "Request", "Session", "Singleton"],
    answer: 3,
    explanation:
      "Singleton scope (the default) means one instance of the bean is created and shared across the whole Spring IoC container. Good examples are database connection pools and configuration classes.",
  },
  {
    week: 11,
    topic: "Bean scopes",
    question:
      "A shopping-cart bean that must maintain a user's data across multiple HTTP requests — but not across different users — best fits which Spring bean scope?",
    options: ["Singleton", "Prototype", "Request", "Session"],
    answer: 3,
    explanation:
      "Session scope creates one bean instance per HTTP session, so each user gets their own shopping-cart bean that persists across multiple requests within that session.",
  },
  {
    week: 11,
    topic: "Bean scopes",
    question:
      "With prototype scope, when does the Spring container create a new bean instance?",
    options: [
      "Once at application startup and never again",
      "Every time the bean is requested from the container",
      "Once per incoming HTTP request",
      "Once per authenticated user session",
    ],
    answer: 1,
    explanation:
      "Prototype scope instructs Spring to create a new bean instance every time the bean is requested from the container — unlike singleton, where the same instance is returned every time.",
  },
  // ── BeanFactory vs ApplicationContext ────────────────────────────────────
  {
    week: 11,
    topic: "BeanFactory vs ApplicationContext",
    question:
      "Which of the following correctly distinguishes BeanFactory from ApplicationContext?",
    options: [
      "BeanFactory eagerly loads all beans at startup; ApplicationContext loads them lazily",
      "BeanFactory supports AOP and event handling natively; ApplicationContext does not",
      "BeanFactory lazily loads beans and lacks AOP/event support; ApplicationContext eagerly loads beans and adds AOP, i18n, and event handling",
      "They are identical except for their package names",
    ],
    answer: 2,
    explanation:
      "BeanFactory is the simplest container — it lazily initialises beans and does not natively support AOP, event propagation, or i18n. ApplicationContext (the recommended choice) eagerly loads beans at startup and adds all those advanced features.",
  },
  {
    week: 11,
    topic: "BeanFactory vs ApplicationContext",
    question:
      "Which ApplicationContext implementation is preferred for modern Spring applications that use annotation-based (@Configuration) configuration?",
    options: [
      "ClassPathXmlApplicationContext",
      "FileSystemXmlApplicationContext",
      "AnnotationConfigApplicationContext",
      "WebApplicationContext",
    ],
    answer: 2,
    explanation:
      "AnnotationConfigApplicationContext loads the container definition from Java classes annotated with @Configuration — the preferred approach for modern annotation-driven Spring apps. The Xml variants use XML files; WebApplicationContext is specialised for Spring MVC.",
  },
  // ── Bean lifecycle ───────────────────────────────────────────────────────
  {
    week: 11,
    topic: "Bean lifecycle",
    question:
      "What is the correct sequence of the Spring bean lifecycle as managed by the container?",
    options: [
      "Dependencies Injected → Bean Instantiated → Custom init() → Custom destroy()",
      "Bean Instantiated → Dependencies Injected → Custom init() → Custom destroy()",
      "Custom init() → Bean Instantiated → Dependencies Injected → Custom destroy()",
      "Bean Instantiated → Custom destroy() → Dependencies Injected → Custom init()",
    ],
    answer: 1,
    explanation:
      "The Spring container follows: (1) Instantiate the bean, (2) Inject dependencies, (3) Run the custom init()/@PostConstruct method, then during shutdown (4) Run the custom destroy()/@PreDestroy method.",
  },
  {
    week: 11,
    topic: "Bean lifecycle",
    question:
      "The @PostConstruct annotation marks a method that is called:",
    options: [
      "Before the bean is instantiated by the container",
      "When the application context is first created, before any beans are read",
      "Right after the bean is created and all dependencies have been injected",
      "When the bean is about to be destroyed by the container",
    ],
    answer: 2,
    explanation:
      "@PostConstruct marks an initialisation method that runs right after the bean is created and all dependency injection is complete — ideal for setup logic such as loading data or setting default values.",
  },
  // ── Spring Boot ──────────────────────────────────────────────────────────
  {
    week: 11,
    topic: "Spring Boot",
    question:
      "Spring Boot differs from plain Spring Framework primarily because it provides:",
    options: [
      "A completely different IoC container that replaces ApplicationContext",
      "Auto-configuration, embedded servers, and Spring Boot Starters to minimise boilerplate setup",
      "A proprietary scripting language that replaces Java",
      "Support for only XML-based configuration",
    ],
    answer: 1,
    explanation:
      "Spring Boot is built on top of Spring Framework and adds auto-configuration (auto-detects classpath dependencies), embedded servers (e.g. Tomcat), and Spring Boot Starters (pre-defined dependency sets) to dramatically reduce setup boilerplate.",
  },
  // ── AOP core terminology ─────────────────────────────────────────────────
  {
    week: 11,
    topic: "AOP — Advice",
    question:
      "In Spring AOP terminology, what is an ADVICE?",
    options: [
      "An expression that selects which join points an aspect will act on",
      "The actual action taken by an aspect at a join point",
      "A point in the execution of a program where an aspect can be applied",
      "The process of linking aspects into application code",
    ],
    answer: 1,
    explanation:
      "ADVICE is the actual action taken by an aspect at a join point — it is the code that runs (e.g., the logging logic). Types of advice include @Before, @After, @Around, @AfterReturning, and @AfterThrowing.",
  },
  {
    week: 11,
    topic: "AOP — Pointcut",
    question:
      "In Spring AOP, a POINTCUT is best described as:",
    options: [
      "The module that encapsulates a cross-cutting concern",
      "The actual code executed when an aspect fires",
      "An expression that selects the set of join points where an aspect will run",
      "The object whose method is intercepted by the aspect",
    ],
    answer: 2,
    explanation:
      "A POINTCUT is a predicate (expression) that matches join points, selecting which of them will trigger the associated advice. Spring AOP uses AspectJ-style pointcut expressions such as 'execution(* com.example.service.*.*(..))'.",
  },
  {
    week: 11,
    topic: "AOP — Join Point",
    question:
      "In AOP, a JOIN POINT is:",
    options: [
      "The code that modifies application behaviour when an aspect fires",
      "A point during program execution — such as a method call or exception throw — where an aspect can be applied",
      "A configuration expression that picks which methods to intercept",
      "The mechanism by which aspects are woven into the application",
    ],
    answer: 1,
    explanation:
      "A JOIN POINT is a specific moment during program execution (e.g., a method invocation, constructor call, or field access) where an aspect can potentially run. Every method call is a join point; the pointcut expression selects which ones actually trigger advice.",
  },
  {
    week: 11,
    topic: "AOP — Aspect",
    question:
      "In AOP, an ASPECT is:",
    options: [
      "A Java annotation that replaces @Component for service classes",
      "A module that encapsulates a cross-cutting concern such as logging, security, or transaction management",
      "The concrete object whose behaviour is intercepted by the framework",
      "A type of Spring bean scope for request-scoped objects",
    ],
    answer: 1,
    explanation:
      "An ASPECT is a modularisation of a cross-cutting concern — behaviour that cuts across multiple classes (e.g. logging, security, transactions). In Spring, an aspect is typically a class annotated with @Aspect.",
  },
  {
    week: 11,
    topic: "AOP — Weaving",
    question:
      "In AOP, WEAVING refers to:",
    options: [
      "Writing pointcut expressions in AspectJ syntax",
      "Defining which methods count as join points in a class",
      "The process of linking aspects into the application code to create an advised object",
      "Injecting dependencies into an aspect class via @Autowired",
    ],
    answer: 2,
    explanation:
      "WEAVING is the process of linking aspects with other application types or objects to create an advised object. Spring AOP performs weaving at runtime via proxies; compile-time and load-time weaving are used by full AspectJ.",
  },
  {
    week: 11,
    topic: "AOP — cross-cutting concerns",
    question:
      "Which of the following is the best example of a cross-cutting concern that AOP is designed to modularise?",
    options: [
      "Calculating the total price in a shopping cart",
      "Parsing command-line arguments in a main() method",
      "Logging method entry/exit uniformly across all service classes",
      "Rendering HTML templates in a view layer",
    ],
    answer: 2,
    explanation:
      "Cross-cutting concerns are behaviours that affect many unrelated parts of an application. Logging, security, and transaction management are the canonical examples. AOP extracts them into aspects so business-logic classes stay clean.",
  },
  {
    week: 11,
    topic: "AOP — target & proxy",
    question:
      "In Spring AOP, what is the TARGET OBJECT?",
    options: [
      "The AspectJ expression that selects join points",
      "The advice code that executes before or after a method",
      "The object whose methods are being advised (intercepted) by one or more aspects",
      "The Spring container that manages bean lifecycles",
    ],
    answer: 2,
    explanation:
      "The TARGET OBJECT (also called the advised object) is the object being intercepted by one or more aspects. Spring wraps it in a proxy to apply the advice without modifying the target's source code.",
  },
  // ── Manual DI problems ───────────────────────────────────────────────────
  {
    week: 11,
    topic: "Manual DI problems",
    question:
      "Which of the following is listed as a key problem with manual dependency injection that motivates using the Spring IoC container?",
    options: [
      "Manual DI forces developers to use only XML configuration files",
      "Manual DI causes tight coupling, difficult dependency management in large projects, and issues with component lifecycle handling",
      "Manual DI prevents any form of unit testing",
      "Manual DI requires a separate operating-system process per component",
    ],
    answer: 1,
    explanation:
      "The slides list three problems with manual DI: tight coupling and maintenance overhead; difficult dependency management in large projects; and issues with component lifecycle handling. The Spring IoC container solves all three.",
  },
  // ── Core container modules ───────────────────────────────────────────────
  {
    week: 11,
    topic: "Spring core container",
    question:
      "The Spring Core Container consists of which four modules?",
    options: [
      "JDBC, ORM, OXM, and JMS",
      "Web, Servlet, Portlet, and Struts",
      "Core, Beans, Context, and Expression Language",
      "AOP, Aspects, Instrumentation, and Test",
    ],
    answer: 2,
    explanation:
      "The Spring Core Container is built from the Core, Beans, Context, and Expression Language modules — the foundation of the entire framework. The other groups listed are the Data Access/Integration and Web layers that sit on top of this foundation.",
  },
];

export default questions;
