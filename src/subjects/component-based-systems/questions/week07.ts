import type { Question } from "../../types";

const questions: Question[] = [
  {
    week: 7,
    topic: "Java WORA",
    question:
      "What makes Java's 'Write Once, Run Anywhere' (WORA) promise possible?",
    options: [
      "Java source code is interpreted directly by each operating system without compilation",
      "The Java compiler produces platform-independent bytecode that the JVM executes on any platform",
      "Java uses a different programming syntax on each operating system",
      "The JDK includes a separate compiler for every target operating system",
    ],
    answer: 1,
    explanation:
      "javac compiles .java source to platform-independent bytecode (.class files). The JVM on each platform then executes this bytecode, delivering WORA. Source code is not interpreted directly by the OS, and there is only one compiler output.",
  },
  {
    week: 7,
    topic: "JDK vs JRE",
    question:
      "A developer needs to write, compile, and run Java programs. Which tool should they install?",
    options: [
      "JRE (Java Runtime Environment), because it includes the compiler",
      "JVM only, because that is what executes Java programs",
      "JDK (Java Development Kit), because it includes the JRE plus compiler and development tools",
      "Maven, because it can compile Java without the JDK",
    ],
    answer: 2,
    explanation:
      "The JDK contains the JRE (which includes the JVM and class libraries) plus developer tools such as javac (compiler) and jdb (debugger). The JRE alone is for end users who only need to run Java applications, not develop them.",
  },
  {
    week: 7,
    topic: "JVM internals",
    question:
      "Which JVM component converts frequently executed bytecode into native machine code at runtime to improve performance?",
    options: [
      "The Interpreter",
      "The Bootstrap ClassLoader",
      "The Just-In-Time (JIT) Compiler",
      "The Garbage Collector",
    ],
    answer: 2,
    explanation:
      "The JIT Compiler detects hot code paths and compiles them to native machine code, dramatically improving performance compared to pure interpretation. The Interpreter executes bytecode line-by-line (flexible but slower). The Garbage Collector frees memory. The Bootstrap ClassLoader loads core Java classes.",
  },
  {
    week: 7,
    topic: "Maven definition",
    question: "Which of the following best describes Apache Maven?",
    options: [
      "A Java IDE produced by JetBrains",
      "A build automation and project management tool for Java projects that handles dependency management and build lifecycle",
      "A Java virtual machine implementation",
      "A testing framework for Java unit tests",
    ],
    answer: 1,
    explanation:
      "Maven is a build automation and project management tool primarily for Java. It manages dependencies, standardises the project structure, and automates the build lifecycle. It is not an IDE, a JVM implementation, or a testing framework (though it can run tests as part of the lifecycle).",
  },
  {
    week: 7,
    topic: "Maven coordinates",
    question:
      "Which three elements form the Maven coordinates (GAV) that uniquely identify an artifact in a repository?",
    options: [
      "groupId, artifactId, version",
      "packageName, className, version",
      "groupId, moduleName, releaseDate",
      "artifactId, scope, packaging",
    ],
    answer: 0,
    explanation:
      "GAV stands for groupId (organisation/domain), artifactId (unique project name within the group), and version. Together they form a globally unique identifier for any artifact in any Maven repository.",
  },
  {
    week: 7,
    topic: "pom.xml structure",
    question:
      "In a Maven pom.xml, which element is used to centralise dependency version numbers in a parent POM so child modules inherit versions without declaring them directly?",
    options: [
      "<dependencies>",
      "<build>",
      "<dependencyManagement>",
      "<modules>",
    ],
    answer: 2,
    explanation:
      "<dependencyManagement> in a parent POM declares versions centrally; child modules can then list a dependency without specifying a version and will inherit the parent's version. <dependencies> adds a dependency to the classpath. <build> contains plugin configuration. <modules> lists sub-modules.",
  },
  {
    week: 7,
    topic: "Maven lifecycle",
    question:
      "A developer runs 'mvn package'. Which phases execute as a result?",
    options: [
      "Only the package phase",
      "validate, compile, test, and package — all prior phases execute automatically",
      "compile and package only, skipping test",
      "install and deploy are also executed",
    ],
    answer: 1,
    explanation:
      "Maven's default lifecycle is cumulative: running a phase automatically executes all prior phases. 'mvn package' therefore runs validate → compile → test → package in order. Only running 'mvn install' would also run install; 'mvn package' stops at package.",
  },
  {
    week: 7,
    topic: "Maven lifecycle phases",
    question:
      "Which Maven default lifecycle phase installs the built artifact into the local repository (~/.m2) so other local projects can use it?",
    options: ["package", "verify", "install", "deploy"],
    answer: 2,
    explanation:
      "The 'install' phase copies the artifact to the local Maven repository (~/.m2/repository). 'package' bundles the code but does not install it. 'verify' runs integration checks. 'deploy' copies to a remote repository for sharing.",
  },
  {
    week: 7,
    topic: "Maven repositories",
    question:
      "When Maven resolves a dependency, in what order does it search repositories?",
    options: [
      "Remote repository → Central repository → Local repository",
      "Central repository → Remote repository → Local repository",
      "Local repository → Central repository → Remote repository (if declared)",
      "Local repository → Remote repository → Central repository",
    ],
    answer: 2,
    explanation:
      "Maven always checks the local cache (~/.m2) first to avoid unnecessary downloads. If not found locally it checks Maven Central (the default online repository), and then any additional remote repositories declared in the pom.xml.",
  },
  {
    week: 7,
    topic: "Dependency scopes",
    question:
      "A Servlet API JAR is needed at compile time but will be provided by the application server at runtime and must NOT be packaged in the WAR. Which dependency scope should be used?",
    options: ["compile", "runtime", "provided", "test"],
    answer: 2,
    explanation:
      "The 'provided' scope makes the dependency available at compile time but assumes the runtime environment (e.g. Tomcat/JBoss) will supply it, so it is excluded from the packaged artifact. 'compile' would include it in the WAR. 'runtime' is for the opposite case. 'test' limits to test phases only.",
  },
  {
    week: 7,
    topic: "Dependency scopes",
    question:
      "JUnit is only needed when running tests and should NOT be included in the final JAR. Which scope is appropriate?",
    options: ["compile", "test", "provided", "runtime"],
    answer: 1,
    explanation:
      "The 'test' scope restricts the dependency to the test compilation and execution phases and excludes it from the packaged artifact. 'compile' would bundle it. 'provided' is for runtime-provided libraries. 'runtime' is available at runtime but not compile time.",
  },
  {
    week: 7,
    topic: "Transitive dependencies",
    question:
      "Your project depends on Library A. Library A itself depends on Library B. What does Maven do with Library B?",
    options: [
      "It ignores Library B — you must add it manually to your pom.xml",
      "It automatically downloads and includes Library B as a transitive dependency",
      "It asks you which version of Library B to use before proceeding",
      "It only includes Library B if you explicitly set its scope to 'compile'",
    ],
    answer: 1,
    explanation:
      "Maven automatically resolves and downloads transitive dependencies — dependencies of your dependencies. You only declare direct dependencies. This is one of Maven's core advantages over manually managing JARs.",
  },
  {
    week: 7,
    topic: "SNAPSHOT versions",
    question: "A pom.xml declares version '2.0-SNAPSHOT'. What does this indicate?",
    options: [
      "The artifact is a stable, immutable release ready for production",
      "The artifact is still in active development and Maven may re-download it on every build",
      "The artifact has been deprecated and should not be used",
      "The artifact is stored only in the local repository and not in Maven Central",
    ],
    answer: 1,
    explanation:
      "A -SNAPSHOT version signals active development. Maven treats snapshot artifacts as potentially changing and may re-download them to get the latest iteration. Release versions (without -SNAPSHOT) are immutable once published to Maven Central.",
  },
  {
    week: 7,
    topic: "Java naming conventions",
    question:
      "Which naming convention does Java use for packages, and how does it differ from C#?",
    options: [
      "Java uses PascalCase (MyApp.Services); C# uses lowercase (myapp.services)",
      "Both Java and C# use lowercase dot notation",
      "Java uses all-lowercase dot notation with reverse-domain (com.example.app); C# uses PascalCase dot notation (Company.Project.Module)",
      "Java uses UPPER_CASE for packages; C# uses camelCase",
    ],
    answer: 2,
    explanation:
      "Java package names are all lowercase and conventionally follow reverse-domain notation (com.example.app). C# namespaces use PascalCase hierarchies (Company.Project.Module). This is a key distinction tested in the naming-convention questions.",
  },
  {
    week: 7,
    topic: "Java naming conventions",
    question:
      "In Java, what is the correct naming convention for an interface that provides a payment service?",
    options: [
      "IPaymentService (prefix with 'I' as in C#)",
      "paymentService (camelCase)",
      "PaymentService (PascalCase, no prefix)",
      "PAYMENT_SERVICE (UPPER_CASE)",
    ],
    answer: 2,
    explanation:
      "Java uses PascalCase for interfaces with NO 'I' prefix. The convention is 'PaymentService', not 'IPaymentService' (which is C#-style). Methods use camelCase; constants use UPPER_CASE_WITH_UNDERSCORES.",
  },
  {
    week: 7,
    topic: "Access modifiers",
    question:
      "A class field is declared with no access modifier in Java. Which of the following accurately describes its visibility?",
    options: [
      "It is public — visible from anywhere",
      "It is private — visible only within the class",
      "It is package-private — visible within the class and all classes in the same package, but not from outside the package",
      "It is protected — visible to all subclasses regardless of package",
    ],
    answer: 2,
    explanation:
      "In Java, omitting an access modifier gives the field 'package-private' (default) visibility: accessible within the same package but invisible to code in other packages, even subclasses in different packages. This is distinct from C# where omitting a modifier is 'private' inside a type or 'internal' at the type level.",
  },
  {
    week: 7,
    topic: "Java OOP",
    question:
      "Java does not support multiple class inheritance. How does Java achieve multiple inheritance of behaviour?",
    options: [
      "Through the 'extends' keyword applied to multiple classes",
      "Through abstract classes only",
      "Through implementing multiple interfaces",
      "Through the 'mixin' keyword",
    ],
    answer: 2,
    explanation:
      "A Java class can extend only one superclass but can implement multiple interfaces, thereby inheriting type contracts and (from Java 8+) default method implementations. This is the mechanism for multiple inheritance of behaviour in Java.",
  },
  {
    week: 7,
    topic: "Maven multi-module",
    question:
      "In a Maven multi-module project, what packaging type should the parent (root) pom.xml use?",
    options: ["jar", "war", "pom", "ear"],
    answer: 2,
    explanation:
      "The parent/aggregator pom.xml must declare <packaging>pom</packaging>. This tells Maven the project is an aggregator that manages child modules rather than producing a JAR or WAR artifact itself.",
  },
  {
    week: 7,
    topic: "Component thinking in Java",
    question:
      "According to the slides, what is the primary mechanism Java components use to avoid tight coupling at build time?",
    options: [
      "Extending a shared abstract base class in every module",
      "Copying source code between modules to avoid dependencies",
      "Programming to interfaces — the consumer depends on an interface JAR, not the concrete implementation",
      "Using the 'private' access modifier on all public methods",
    ],
    answer: 2,
    explanation:
      "The slides explicitly show how Java interfaces decouple consumers from implementations. The App module depends on the interface JAR; the concrete implementation is wired at runtime by a glue module or DI framework. This is 'programming to interfaces, not implementations'.",
  },
  {
    week: 7,
    topic: "Component assembly",
    question:
      "In the whiteboard component model, how does Component B obtain a reference to the interface it needs from Component A?",
    options: [
      "Component A directly instantiates Component B and passes itself as a parameter",
      "Component A publishes its interface to a Component Registry; Component B retrieves it from that registry",
      "The JVM automatically connects components that share the same interface",
      "Component B hard-codes the fully qualified class name of Component A's implementation",
    ],
    answer: 1,
    explanation:
      "In the whiteboard model, Component A publishes (registers) its interface implementation to a central Component Registry. Component B then queries and retrieves the interface from that registry, with no direct reference between A and B — decoupling is achieved.",
  },
  {
    week: 7,
    topic: "Inheritance vs component-based design",
    question:
      "The Asteroid collision game example contrasts two designs. Which statement correctly describes the component-based design?",
    options: [
      "A GameObject base class is subclassed by Asteroid and Spaceship — clear hierarchy, easy to extend",
      "Each game object is an entity (container) that assembles interchangeable behaviour components such as PositionComponent and HealthComponent dynamically",
      "All game logic is placed in a single monolithic class to reduce the number of files",
      "Game objects inherit from multiple base classes using multiple inheritance",
    ],
    answer: 1,
    explanation:
      "In the component-based design, a GameObject entity contains no behaviour itself but acts as a container for components (PositionComponent, VelocityComponent, CollisionComponent, HealthComponent). Behaviour is assembled by adding/removing components dynamically — this is 'composition over inheritance'.",
  },
  {
    week: 7,
    topic: "Maven lifecycle phases",
    question:
      "Which Maven default lifecycle phase runs integration tests to check the package meets quality criteria, sitting between 'package' and 'install'?",
    options: ["test", "compile", "verify", "deploy"],
    answer: 2,
    explanation:
      "The 'verify' phase runs any integration checks to validate the packaged artifact. It comes after 'package' and before 'install' in the default lifecycle: ... → package → verify → install → deploy.",
  },
  {
    week: 7,
    topic: "Java POJO/JavaBean",
    question:
      "A Java class has a private field 'salary' and provides access via 'getSalary()' and 'setSalary()' methods. Which pattern does this illustrate?",
    options: [
      "Multiple inheritance through interfaces",
      "The Singleton pattern",
      "The POJO/JavaBean convention with explicit getter and setter methods",
      "The abstract factory pattern",
    ],
    answer: 2,
    explanation:
      "Private fields with explicit public getSomething()/setSomething() methods is the JavaBean convention (POJO pattern). Unlike C#'s auto-properties ({ get; set; }), Java requires manually writing the getter and setter methods to expose encapsulated fields.",
  },
  {
    week: 7,
    topic: "Maven dependency tool",
    question:
      "Which command generates a new Maven project from a template (archetype) without interactive prompts?",
    options: [
      "mvn compile -DarchetypeArtifactId=maven-archetype-quickstart",
      "mvn archetype:generate -DgroupId=... -DartifactId=... -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false",
      "mvn install -Dtemplate=quickstart",
      "mvn new-project --archetype quickstart",
    ],
    answer: 1,
    explanation:
      "The 'archetype:generate' goal with -DinteractiveMode=false generates a new project non-interactively from the specified archetype. The other options show incorrect Maven syntax or goals that do not exist.",
  },
];

export default questions;
