import type { Question } from "../../types";

const questions: Question[] = [
  {
    week: 9,
    topic: "JPMS introduction",
    question: "In which Java version was the Java Platform Module System (JPMS) introduced?",
    options: ["Java 6", "Java 8", "Java 9", "Java 11"],
    answer: 2,
    explanation:
      "JPMS (Project Jigsaw) was introduced in Java 9. Java 6 introduced ServiceLoader, Java 8 introduced lambdas, and Java 11 is an LTS release — but none of those is the JPMS release.",
  },
  {
    week: 9,
    topic: "module-info.java",
    question: "Which statement about module-info.java is correct?",
    options: [
      "It is optional; modules without it are called automatic modules",
      "Every named module must have a module-info.java file at its root",
      "It replaces the Java classpath entirely, making the classpath obsolete",
      "It can only declare exports directives; requires are inferred automatically",
    ],
    answer: 1,
    explanation:
      "Every named module must have a module-info.java. Modules without it on the module path are automatic modules; modules on the classpath form the unnamed module. The classpath is not eliminated.",
  },
  {
    week: 9,
    topic: "JPMS directives",
    question:
      "Which module-info.java directive makes a package accessible to ALL other modules at compile time and runtime?",
    options: [
      "opens com.example.pkg",
      "requires com.example.pkg",
      "exports com.example.pkg",
      "uses com.example.pkg",
    ],
    answer: 2,
    explanation:
      "'exports' makes a package readable by all other modules for normal use (compile + runtime). 'opens' grants runtime-only deep reflection. 'requires' declares a dependency. 'uses' declares a service consumer.",
  },
  {
    week: 9,
    topic: "Strong encapsulation",
    question:
      "A class in module A is declared public but its package is not listed in an exports directive. What happens when module B tries to use that class?",
    options: [
      "It compiles and runs normally because the class is public",
      "It compiles normally but throws a ClassNotFoundException at runtime",
      "Access is denied at compile time (and runtime) — the package is not exported",
      "It works only if module B is on the classpath",
    ],
    answer: 2,
    explanation:
      "Strong encapsulation: 'public' alone no longer guarantees cross-module accessibility. Without an 'exports' directive for the package, no other module can access the class. This is the key JPMS exam trap.",
  },
  {
    week: 9,
    topic: "JPMS directives",
    question: "What is the difference between 'requires' and 'requires transitive'?",
    options: [
      "requires transitive makes the dependency optional at runtime",
      "requires transitive re-exports the dependency so modules that require this module also implicitly read it",
      "requires transitive is only valid for JDK platform modules, not custom modules",
      "There is no difference; they are aliases for the same directive",
    ],
    answer: 1,
    explanation:
      "'requires transitive X' means that any module reading this module automatically also reads X — useful when this module's public API exposes types from X. 'requires X' does not propagate to callers.",
  },
  {
    week: 9,
    topic: "JPMS directives",
    question:
      "A Spring-based module needs to inspect private fields of domain objects via reflection. Which directive should the domain module use?",
    options: [
      "exports com.example.domain to com.example.spring",
      "opens com.example.domain to com.example.spring",
      "requires transitive com.example.spring",
      "uses com.example.domain.DomainService",
    ],
    answer: 1,
    explanation:
      "'opens ... to' grants runtime-only deep reflection (including private members) to the named module. 'exports' gives compile + runtime public access but not private member access. Frameworks like Spring and Hibernate need 'opens'.",
  },
  {
    week: 9,
    topic: "JPMS services",
    question:
      "In JPMS, which pair of directives replaces the META-INF/services registration file used by the pre-Java-9 ServiceLoader?",
    options: [
      "exports … to and requires transitive",
      "uses and provides … with",
      "opens and exports",
      "requires and exports",
    ],
    answer: 1,
    explanation:
      "'uses ServiceInterface' declares a consumer and 'provides ServiceInterface with Impl' declares a provider. Together they replace the META-INF/services/com.example.ServiceInterface file that was required by the pre-JPMS ServiceLoader.",
  },
  {
    week: 9,
    topic: "Module types",
    question:
      "A third-party library JAR with no module-info.java is placed on the module path. What kind of module is it treated as?",
    options: [
      "Named module — JPMS generates a module-info.java for it",
      "Unnamed module — it goes on the classpath automatically",
      "Automatic module — JPMS derives a name from the JAR filename and exports all its packages",
      "Forbidden module — JPMS rejects JARs without module-info.java on the module path",
    ],
    answer: 2,
    explanation:
      "A JAR on the module path without module-info.java becomes an automatic module: JPMS derives its name from the filename, it exports all packages, and it reads all other modules — acting as a migration bridge.",
  },
  {
    week: 9,
    topic: "Module types",
    question: "Which statement correctly describes the unnamed module?",
    options: [
      "It is a module with an empty module-info.java and no exports",
      "It represents everything on the classpath; it reads all named modules but no named module can require it",
      "It is the default module used when no module path is specified and it has full encapsulation",
      "It is another name for an automatic module",
    ],
    answer: 1,
    explanation:
      "The unnamed module aggregates everything on the classpath. It can read all named and automatic modules, but named modules cannot declare 'requires' on it — ensuring backward compatibility without polluting the module graph.",
  },
  {
    week: 9,
    topic: "Classpath Hell",
    question: "What is the core problem of 'JAR Hell' (classpath hell) that JPMS resolves?",
    options: [
      "JARs could not be compressed, making deployments very large",
      "If two JARs contained the same package, the classloader silently picked the first one found, causing unpredictable behavior",
      "Java required JARs to be digitally signed before they could be loaded",
      "JARs on the classpath were loaded in alphabetical order, causing ordering bugs",
    ],
    answer: 1,
    explanation:
      "JAR Hell: duplicate classes/packages across JARs → classloader picks the first match silently → wrong version used at runtime. JPMS forbids split packages entirely (same package in two named modules causes a startup error).",
  },
  {
    week: 9,
    topic: "JPMS benefits",
    question: "Which JPMS benefit means a missing required module is detected before any application code runs?",
    options: [
      "Strong encapsulation",
      "Reliable configuration (startup-time dependency checking)",
      "Smaller runtime via jlink",
      "Qualified exports",
    ],
    answer: 1,
    explanation:
      "Reliable configuration: the JVM resolves and validates the entire module graph at startup. Missing or duplicate modules cause an immediate startup error rather than a ClassNotFoundException deep in a running program.",
  },
  {
    week: 9,
    topic: "jlink",
    question: "What is the primary purpose of the jlink tool introduced with JPMS?",
    options: [
      "To link Java source files into a single .java file for distribution",
      "To assemble a custom minimal JRE containing only the modules an application needs",
      "To merge multiple module-info.java files into one descriptor",
      "To convert classpath-based JARs into JPMS named modules automatically",
    ],
    answer: 1,
    explanation:
      "jlink creates a custom runtime image with only the required modules, dramatically reducing size — ideal for cloud and embedded deployments. It does not convert JARs or merge descriptors.",
  },
  {
    week: 9,
    topic: "SPI / ServiceLoader",
    question: "What is the Service Provider Interface (SPI) in Java?",
    options: [
      "A network protocol for inter-service communication",
      "A mechanism for dynamic discovery and loading of service implementations at runtime",
      "A compile-time annotation processor that generates service stubs",
      "A JPMS-only feature that replaces all interface definitions",
    ],
    answer: 1,
    explanation:
      "SPI enables dynamic service discovery at runtime. A provider registers an implementation; a consumer uses ServiceLoader to load it without hardcoding the concrete class. It decouples interfaces from implementations.",
  },
  {
    week: 9,
    topic: "SPI / ServiceLoader",
    question: "In the pre-JPMS ServiceLoader mechanism, where does a provider register its implementation?",
    options: [
      "In a file named META-INF/services/<fully-qualified-interface-name>",
      "In a Java annotation on the implementation class (@ServiceProvider)",
      "In a Spring application context XML file",
      "In the MANIFEST.MF file under the Service-Provider key",
    ],
    answer: 0,
    explanation:
      "Before JPMS, a provider creates a file at META-INF/services/<interface-FQN> containing the fully qualified class name of the implementation. ServiceLoader reads this file to discover providers.",
  },
  {
    week: 9,
    topic: "SPI / ServiceLoader",
    question:
      "What does ServiceLoader return when no service provider is registered for a given interface?",
    options: [
      "null",
      "A ServiceConfigurationError exception",
      "An empty iterator — no exception is thrown",
      "A NoSuchServiceException",
    ],
    answer: 2,
    explanation:
      "ServiceLoader returns an empty iterator silently — it does NOT throw an exception if no providers are found. Always check hasNext() before calling next(), or use stream() in Java 9+.",
  },
  {
    week: 9,
    topic: "Service Locator pattern",
    question: "The Service Locator design pattern is classified as which type of pattern?",
    options: [
      "Structural pattern",
      "Behavioral pattern",
      "Creational pattern",
      "Architectural pattern",
    ],
    answer: 2,
    explanation:
      "Service Locator is a creational design pattern. Its purpose is to return service instances on demand, centralizing the creation and lookup of service objects.",
  },
  {
    week: 9,
    topic: "Service Locator pattern",
    question:
      "When is the Service Locator pattern most appropriate to use?",
    options: [
      "When you need compile-time type safety and want to avoid runtime lookups",
      "When centralized access to services is needed, dependencies must be resolved dynamically at runtime, or migrating legacy apps that do not support modern DI frameworks",
      "When you want to eliminate all interfaces from the codebase",
      "Only when building microservices; it is not suitable for monolithic applications",
    ],
    answer: 1,
    explanation:
      "Service Locator suits: centralized service access, dynamic runtime resolution, legacy migration without DI framework support, and plugin-based architectures requiring dynamic discovery.",
  },
  {
    week: 9,
    topic: "Three tenets of modularity",
    question: "Which of the following is NOT one of the three tenets of modularity as presented in the lecture?",
    options: [
      "Strong Encapsulation",
      "Well-Defined Interfaces",
      "Explicit Dependencies",
      "Automatic Versioning",
    ],
    answer: 3,
    explanation:
      "The three tenets of modularity are: Strong Encapsulation, Well-Defined Interfaces, and Explicit Dependencies. Automatic versioning is not a JPMS tenet — JPMS deliberately does not support module versioning in the module descriptor.",
  },
  {
    week: 9,
    topic: "Qualified exports",
    question:
      "A module wants to share an internal package with exactly one sibling module but hide it from everyone else. Which directive achieves this?",
    options: [
      "exports com.example.internal",
      "opens com.example.internal",
      "exports com.example.internal to com.example.sibling",
      "requires transitive com.example.internal",
    ],
    answer: 2,
    explanation:
      "'exports pkg to ModuleName' is a qualified export — only the named module can access the package. An unqualified 'exports' would expose it to all modules. 'opens' is for reflection, not normal API access.",
  },
  {
    week: 9,
    topic: "Module vs Component",
    question: "According to the lecture, what is the key distinction between a module and a component?",
    options: [
      "Modules and components are synonymous in JPMS",
      "Modules handle code organization and dependency management; components focus on UI and runtime behavior",
      "Components contain modules but not vice versa",
      "Modules are only a JavaScript concept; Java uses components instead",
    ],
    answer: 1,
    explanation:
      "Modules are a code organization / dependency management construct (module-info.java). Components focus on UI and behavior (e.g. JButton in Swing). A module can contain multiple components, but a component is not necessarily a module.",
  },
  {
    week: 9,
    topic: "JPMS — monolithic JDK problem",
    question:
      "Before JPMS, what was a key problem with the Java Development Kit (JDK) that affected embedded and cloud applications?",
    options: [
      "The JDK required a paid license for cloud deployments",
      "The JDK was a single monolithic JAR — unused libraries could not be stripped, making runtimes unnecessarily large",
      "The JDK had no support for multi-threading, forcing developers to use third-party libraries",
      "The JDK classpath was limited to 256 JAR files",
    ],
    answer: 1,
    explanation:
      "Pre-JPMS, the JDK was one monolithic JAR. Even if an app only needed java.base and java.logging, it had to ship the entire JDK including java.sql, java.desktop, etc. JPMS + jlink allows shipping only the required modules.",
  },
  {
    week: 9,
    topic: "SPI limitations",
    question: "Which is a known limitation of Java's ServiceLoader that motivates using full DI frameworks like Spring?",
    options: [
      "ServiceLoader requires Java 11 or later",
      "ServiceLoader can only load one provider per interface",
      "ServiceLoader always calls the default (no-arg) constructor and cannot inject dependencies into providers",
      "ServiceLoader only works with named modules, not with classes on the classpath",
    ],
    answer: 2,
    explanation:
      "ServiceLoader instantiates providers using the default constructor only. It cannot inject dependencies into providers, making complex dependency graphs difficult. This limitation (along with no lifecycle management and no AOP) pushes developers toward Spring/CDI.",
  },
  {
    week: 9,
    topic: "JPMS split packages",
    question:
      "What happens in JPMS if two different named modules both contain classes in the same Java package?",
    options: [
      "The JVM picks classes from the module that was loaded first, as on the classpath",
      "The JVM merges both modules' packages transparently",
      "The JVM throws an error at startup — split packages are forbidden in JPMS",
      "The package is accessible from both modules with no conflicts",
    ],
    answer: 2,
    explanation:
      "JPMS explicitly forbids split packages: the same package cannot span two named modules. The JVM will report an error at startup. This is one of the main improvements over classpath-based loading where split packages caused silent, hard-to-debug behavior.",
  },
];

export default questions;
