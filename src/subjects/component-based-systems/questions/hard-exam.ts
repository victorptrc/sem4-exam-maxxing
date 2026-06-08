import type { Question } from "../../types";

/** Hard Exam Simulation (week 99) — exam-level-plus difficulty, scenario-based. */
const questions: Question[] = [
  // ───────────────────────── CBSE foundations (4) ─────────────────────────
  {
    week: 99,
    topic: "Component definition",
    question:
      "A vendor sells a logging library and claims it is a 'software component' in Szyperski's sense. Which statement about the library would be TRUE under that definition?",
    options: [
      "It must be implemented in an object-oriented language so that third parties can subclass and compose it",
      "It must be deployed together with each application that uses it, sharing that application's context dependencies implicitly",
      "It must be a unit of composition with contractually specified interfaces and explicit context dependencies, independently deployable and composable by third parties",
      "It differs from an object mainly because its lifecycle is controlled by program logic instead of a component framework",
    ],
    answer: 2,
    explanation:
      "Szyperski's definition requires contractually specified interfaces, context dependencies ONLY (i.e. explicit), independent deployment, and third-party composition. The last option is the inverted object/component contrast — it is objects whose lifecycle is managed by program logic, while components are managed by a framework.",
  },
  {
    week: 99,
    topic: "Provided vs required interfaces",
    question:
      "In a UML 2.0 component diagram, OrderProcessor shows an open half-circle (socket) labelled PaymentApi, joined by an assembly connector to a filled circle (lollipop) on PaymentService. What does this notation express?",
    options: [
      "OrderProcessor requires PaymentApi and PaymentService provides it; the assembly connector shows the two interfaces are compatible",
      "OrderProcessor provides PaymentApi to PaymentService, since the socket symbol denotes a provided interface",
      "The connector is a delegation connector linking PaymentApi to the internal class that implements it inside OrderProcessor",
      "PaymentService requires PaymentApi at runtime, while OrderProcessor realizes it through its internal sub-components",
    ],
    answer: 0,
    explanation:
      "The socket (open half-circle) is always the REQUIRED interface and the lollipop (filled circle) is the PROVIDED interface; an assembly connector wires a socket to a matching lollipop. The second option swaps the two symbols — the most common error on this notation. Delegation connectors link an external port to internal implementing parts, which is not what is described.",
  },
  {
    week: 99,
    topic: "Model vs framework vs container",
    question:
      "During a design review a teammate says: 'EJB is a component framework, the EJB runtime is the component model, and the container is just documentation of the standards.' Which correction assigns the three terms correctly?",
    options: [
      "The framework is the specification of standards, the model is its executable implementation, and the container documents the deployment format",
      "The component model is the specification of structure, interaction and deployment standards; the framework is the implementation that provides the runtime; the container is the part of the framework managing component lifecycle",
      "Model and framework are synonyms; the container is the build tool that compiles components against the model",
      "The container defines the interaction standards, while the model executes components and the framework stores their metadata",
    ],
    answer: 1,
    explanation:
      "Model = specification (the standards for interfaces, communication, deployment), framework = the implementation of that model providing the runtime environment, and the container is the framework part that manages a component's lifecycle (creation, initialization, destruction). Any answer that makes the framework the 'specification' or the container the 'standards' has the roles inverted.",
  },
  {
    week: 99,
    topic: "Over-componentization",
    question:
      "A team splits its single Notification component into separate Like-Notification, Comment-Notification and Follow-Notification components. Each new component is internally well-focused, yet total development cost rises sharply. What is the most accurate diagnosis?",
    options: [
      "Each new component has low cohesion, because notification logic is now spread across three places",
      "The components are tightly coupled because they were derived from the same original class",
      "The team should instead aim for low cohesion and low coupling to reduce the integration burden",
      "Over-componentization: the design moved past the minimum-cost region, so integration and interaction effort now outweighs the per-component reuse savings",
    ],
    answer: 3,
    explanation:
      "Componentization is a balancing act — both too few and too many components raise cost, and splitting too finely (over-componentization) drives up integration and interaction effort. The first option is tempting but wrong: each split component is actually MORE cohesive, not less; the problem is the multiplied inter-component interaction, not internal focus.",
  },

  // ─────────────────── Component design / architecture (3) ───────────────────
  {
    week: 99,
    topic: "Dependency depth",
    question:
      "In the monolithic Virtual Store, Product has no dependencies; Inventory and ShoppingCart each depend on Product; Store depends on Inventory, ShoppingCart and Product; UI depends on Store. Which statement about coupling is TRUE?",
    options: [
      "Store has dependency depth 3 because it has three direct dependencies",
      "Store has dependency depth 2, so a change to ShoppingCart forces recompilation of Store, which in turn forces recompilation of UI",
      "Product has dependency depth 1 because exactly one chain of classes leads down to it",
      "Componentizing the system removes all dependencies, reducing every class to depth 0",
    ],
    answer: 1,
    explanation:
      "Dependency depth is the length of the transitive dependency chain, not the count of direct dependencies: Product = 0, Inventory/ShoppingCart = 1, Store = 2 (and UI also reaches depth 2 through Store). Higher depth means tighter coupling and longer recompilation cascades. Componentizing does not remove dependencies — it redirects them toward stable interfaces, lowering the maximum build-time depth to 1.",
  },
  {
    week: 99,
    topic: "Componentization rules",
    question:
      "Applying the five componentization rules to the Virtual Store, a teammate insists the Application Component (Store + UI) must publish an 'AppService' provided interface so other components can call it. Which response is correct?",
    options: [
      "The Application Component provides no interface at all — it only consumes InventoryService and ShoppingCartService, whose definitions live in the Base Library together with the Product entity",
      "Correct — every component in a component-based design must expose at least one provided interface",
      "The Application Component should instead provide InventoryService, since it is the component that calls the inventory",
      "The interface definitions should be packaged inside the Inventory and ShoppingCart components rather than the Base Library, so each provider owns its contract",
    ],
    answer: 0,
    explanation:
      "Rule 4 groups the mutually dependent application classes (Store, UI) into an Application Component that consumes services but provides none, and rule 5 places the service interfaces and entity classes in the shared Base Library. Putting the interface definitions inside the provider components would force consumers to depend on the volatile implementation JARs instead of the stable Base Library.",
  },
  {
    week: 99,
    topic: "Layered architecture",
    question:
      "In a closed four-layer system, profiling shows that for read requests the Business layer method just calls the Persistence layer and returns the result unchanged, adding latency and code to maintain. How is this best classified?",
    options: [
      "A broker topology misuse — the layer should publish an event instead of forwarding the call",
      "Correct closed layering — every request must pass through each layer, so the forwarding adds architectural value by definition",
      "An architecture sinkhole — requests pass through a layer that adds no logic, costing performance and maintenance without benefit",
      "Over-componentization — the system has been split into too many deployable components",
    ],
    answer: 2,
    explanation:
      "The architecture sinkhole occurs when closed layers merely forward requests without adding logic: wasted effort, extra latency, and tighter coupling. The second option is the tempting trap — closed layering mandates the call path, but pass-through layers are still an anti-pattern symptom, not 'value by definition'. Note layers are logical, not physical, so this is also not a componentization problem.",
  },

  // ───────────────────────── JPMS / ServiceLoader (3) ─────────────────────────
  {
    week: 99,
    topic: "JPMS requires transitive",
    question:
      "Module com.shop.api exposes public methods that return the type Money declared in module com.shop.base. Every module that requires com.shop.api fails to compile when it touches Money. Which single change to com.shop.api's module-info.java fixes this for ALL its consumers?",
    options: [
      "Add 'exports com.shop.base.money;' to com.shop.api so the package becomes visible",
      "Add 'uses com.shop.base.Money;' so the JVM binds the type at startup",
      "Add 'opens com.shop.base.money to ALL-UNNAMED;' to enable reflection on Money",
      "Change 'requires com.shop.base;' to 'requires transitive com.shop.base;' so every module reading com.shop.api implicitly reads com.shop.base",
    ],
    answer: 3,
    explanation:
      "'requires transitive' is exactly for the case where a module's public API exposes types from a dependency: consumers automatically read that dependency without repeating the requires. A module cannot export a package it does not contain, 'uses' is for ServiceLoader consumption (not type readability), and 'opens' grants runtime reflection only — none solves the compile-time readability problem.",
  },
  {
    week: 99,
    topic: "exports vs opens",
    question:
      "Hibernate must reflectively access private fields of entity classes in package com.app.model, but the team does not want other modules compiling against those classes. Which module-info directive achieves both goals?",
    options: [
      "exports com.app.model; — exporting grants both compile-time access and deep reflection on private members",
      "opens com.app.model to the persistence framework module — runtime-only deep reflection, including private members, with no compile-time exposure",
      "exports com.app.model to the persistence framework module — a qualified export is what reflection frameworks require",
      "requires transitive on the Hibernate module, so Hibernate gains reflective access to all packages that read it",
    ],
    answer: 1,
    explanation:
      "'opens' grants runtime-only deep reflection (private fields and methods included) without making the package available at compile time — exactly what ORM/serialization frameworks like Hibernate, Jackson and Spring need. 'exports' (even qualified) only exposes public types and does NOT permit deep reflection on private members, which is the subtle trap here.",
  },
  {
    week: 99,
    topic: "JPMS services",
    question:
      "Module com.app declares 'uses com.pay.PaymentService;' and module com.paypal declares 'provides com.pay.PaymentService with com.paypal.PayPalPayment;'. Which statement about this setup is TRUE?",
    options: [
      "ServiceLoader.load(PaymentService.class) in com.app will find PayPalPayment without com.app declaring any 'requires' on the provider module",
      "com.app must additionally declare 'requires com.paypal;' or the provider cannot be discovered",
      "com.paypal must still ship a META-INF/services file, since module directives only supplement the legacy registration",
      "If no provider module is present, ServiceLoader throws a MissingServiceException at startup",
    ],
    answer: 0,
    explanation:
      "The whole point of the uses / provides..with pairing is decoupling: the consumer never names the provider module, and the module system binds them at runtime via ServiceLoader. The directives fully replace the legacy META-INF/services file, and a missing provider produces an empty iterator — no exception is raised, which is one of ServiceLoader's documented pitfalls.",
  },

  // ───────────────────────── DI + Spring (5) ─────────────────────────
  {
    week: 99,
    topic: "Constructor vs setter injection",
    question:
      "OrderService cannot function without a PaymentGateway, but an AuditLogger is optional and may be configured later. Which injection strategy best matches these requirements?",
    options: [
      "Setter injection for both, because setters maximize configuration flexibility",
      "Field injection for both, because it minimizes boilerplate in the class",
      "Constructor injection for PaymentGateway (object can never exist in an invalid state, field can be final) and setter injection for AuditLogger (optional dependency)",
      "Constructor injection for both, because setter injection is formally classified as an anti-pattern",
    ],
    answer: 2,
    explanation:
      "Constructor injection is best for mandatory dependencies because the object cannot be created in an invalid, partially initialized state; setter injection is appropriate for optional dependencies. Setter injection is not an anti-pattern (Service Locator is) — its documented risk is merely partial initialization if a setter is never called, which is acceptable for genuinely optional collaborators.",
  },
  {
    week: 99,
    topic: "Circular dependencies",
    question:
      "Two Spring beans, A and B, each take the other as a constructor parameter. The application fails at startup with a circular-dependency error. Which statement is accurate?",
    options: [
      "The container always injects dynamic proxies into constructors automatically, so the error must come from somewhere else",
      "Constructor injection cannot satisfy the cycle because each bean needs the other fully constructed first; moving one side to setter injection — or better, redesigning to remove the cycle — lets the container create the beans",
      "Declaring both beans with prototype scope resolves the cycle, since new instances break the dependency loop",
      "The cycle is harmless evidence of high cohesion and can simply be suppressed in configuration",
    ],
    answer: 1,
    explanation:
      "With constructor injection neither bean can be instantiated before the other exists, so the container cannot break the cycle; setter injection allows Spring to instantiate both objects first and wire them afterwards. The real lesson is that a cycle signals tight coupling and usually a missing abstraction — prototype scope makes things worse, not better, and the container does not silently proxy constructor arguments.",
  },
  {
    week: 99,
    topic: "Bean scopes",
    question:
      "A ShoppingCart bean is declared with @Component and no @Scope annotation in a Spring web shop. Users report seeing items added by other users. What is the cause and the most appropriate fix?",
    options: [
      "Beans default to prototype scope, so each request creates a new cart that leaks; declare it singleton",
      "Request scope is the default, which shares the cart for a whole session; switch to prototype",
      "The singleton default is correct, but the cart must be made static to isolate users",
      "Beans default to singleton scope, so one cart instance is shared across the entire container; declare a per-user scope such as session",
    ],
    answer: 3,
    explanation:
      "When no @Scope is given, Spring uses singleton: one shared instance per container, which is exactly why all users see the same cart. Session scope (one instance per HTTP session) matches a shopping cart's lifecycle. The first option inverts the default, the classic trap on this topic.",
  },
  {
    week: 99,
    topic: "Bean lifecycle",
    question:
      "A bean's @PostConstruct method reads a value from an @Autowired dependency, and @PreDestroy releases a connection. In which order does the Spring container perform the lifecycle steps?",
    options: [
      "Instantiate the bean → inject dependencies → invoke @PostConstruct → bean in use → invoke @PreDestroy before destruction",
      "Invoke @PostConstruct → instantiate the bean → inject dependencies → bean in use → invoke @PreDestroy",
      "Instantiate the bean → invoke @PostConstruct → inject dependencies → bean in use → invoke @PreDestroy",
      "Inject dependencies → instantiate the bean → bean in use → invoke @PreDestroy → invoke @PostConstruct on shutdown",
    ],
    answer: 0,
    explanation:
      "The container instantiates the bean, injects its dependencies, then runs the init callback (@PostConstruct), and runs @PreDestroy just before destruction. The order matters precisely because @PostConstruct may rely on injected dependencies — if init ran before injection (option 3's claim), the autowired field would still be null.",
  },
  {
    week: 99,
    topic: "@Qualifier ambiguity",
    question:
      "EmailNotifier and SmsNotifier both implement Notifier and are both annotated @Component. A service that autowires a single Notifier now fails to start. The team needs BOTH beans registered. What is the correct resolution?",
    options: [
      "Remove @Component from SmsNotifier so only one candidate remains in the container",
      "Nothing is needed — Spring resolves ties by choosing the bean whose class name comes first alphabetically",
      "Disambiguate at the injection point with @Qualifier naming the desired bean, or mark one implementation @Primary as the default",
      "Change both beans to prototype scope so the container can hand each consumer its own implementation",
    ],
    answer: 2,
    explanation:
      "With multiple type-compatible candidates, autowiring by type is ambiguous and the context fails; @Qualifier selects a specific bean at the injection point, while @Primary nominates a container-wide default — both keep all beans registered. Removing @Component violates the stated requirement, and Spring never resolves ambiguity alphabetically; scope has nothing to do with candidate selection.",
  },

  // ───────────────────────── AOP (3) ─────────────────────────
  {
    week: 99,
    topic: "@Around and proceed()",
    question:
      "A caching aspect uses @Around advice: on a cache hit it returns the cached value and never calls proceed() on the ProceedingJoinPoint. What is the runtime behavior?",
    options: [
      "The target method still executes because @Around merely observes the call like @Before plus @After",
      "The target method is never executed — @Around fully controls whether the join point runs and can substitute its own return value",
      "An exception is thrown, because every @Around advice is required to invoke proceed() exactly once",
      "The advice executes but its return value is discarded; the caller always receives the target method's real result",
    ],
    answer: 1,
    explanation:
      "@Around is the most powerful advice type: it wraps the entire invocation, decides whether to call proceed() at all, and can replace the return value — which is exactly how a cache-hit short-circuit works. Calling proceed() is optional, not mandatory, and skipping it simply skips the target method, so the first and third options describe behavior @Around does not have.",
  },
  {
    week: 99,
    topic: "Pointcut expressions",
    question:
      "Which set of join points does the pointcut 'execution(* com.shop.service.*.set*(..))' select in Spring AOP?",
    options: [
      "Only void setter methods that take exactly one parameter, in com.shop.service and all of its subpackages",
      "All public methods of classes annotated with @Service, regardless of package",
      "Any method in any package whose declaring class name starts with 'set'",
      "Execution of any method whose name starts with 'set', with any return type and any parameters, declared in classes directly in the com.shop.service package",
    ],
    answer: 3,
    explanation:
      "The leading '*' matches any return type, 'com.shop.service.*' matches any class directly in that package (subpackages would need '..'), 'set*' matches method names starting with 'set', and '(..)' matches any parameter list. The first option is the close trap: it wrongly restricts return type and parameter count and wrongly includes subpackages.",
  },
  {
    week: 99,
    topic: "Proxy self-invocation",
    question:
      "A @Before logging advice fires when a controller calls orderService.placeOrder(), but when placeOrder() internally calls this.validate() — also matched by the pointcut — no advice runs for validate(). Why?",
    options: [
      "Spring AOP weaves at runtime via proxies, so a self-invocation through 'this' bypasses the proxy and the advice is never applied",
      "@Before advice can only be applied once per request thread, so the second join point is skipped",
      "The pointcut expression cannot match private or internal methods even when they are public",
      "Runtime weaving only supports @Around advice for nested calls; @Before requires compile-time AspectJ weaving",
    ],
    answer: 0,
    explanation:
      "Spring AOP's default runtime weaving wraps the bean in a JDK dynamic proxy or CGLIB subclass; advice only runs when calls enter through the proxy. An internal call on 'this' goes straight to the target object, skipping the proxy and all advice — the classic self-invocation pitfall. Full AspectJ compile-time or load-time weaving would intercept it, but not for the reason option 3 gives.",
  },

  // ──────────────── Spring Boot / Security / Actuator (2) ────────────────
  {
    week: 99,
    topic: "Spring Boot auto-configuration",
    question:
      "A developer adds spring-boot-starter-web to the build and, without writing any configuration, the app starts an embedded Tomcat on port 8080. Which mechanism explains this?",
    options: [
      "Spring Boot replaces the Spring Framework IoC container with its own lightweight runtime that bundles Tomcat",
      "Component scanning detected Tomcat's classes and registered them as @Component beans",
      "Auto-configuration: @SpringBootApplication includes @EnableAutoConfiguration, which configures beans (such as an embedded server) based on what is present on the classpath",
      "The starter compiles a custom minimal JRE with jlink that includes the web server modules",
    ],
    answer: 2,
    explanation:
      "@SpringBootApplication combines @Configuration, @ComponentScan and @EnableAutoConfiguration; the last one inspects the classpath and auto-configures matching infrastructure — the web starter pulls in an embedded Tomcat. Spring Boot sits ON TOP of Spring Framework, it does not replace the IoC container, and jlink is a JPMS tool unrelated to starters.",
  },
  {
    week: 99,
    topic: "Security & Actuator",
    question:
      "An operations engineer wants to know which Spring Boot Actuator endpoints are safe to leave reachable in production by default. Which statement is TRUE?",
    options: [
      "All actuator endpoints are enabled and public by default, since their purpose is monitoring",
      "/actuator/health and /actuator/info are enabled by default and non-sensitive, while endpoints like /env, /beans and /loggers are sensitive and disabled by default because they can leak configuration internals",
      "Actuator performs authentication itself, deciding 'who are you' for every management request",
      "/actuator/metrics is disabled by default but classified as non-sensitive once enabled",
    ],
    answer: 1,
    explanation:
      "Only health and info are enabled and non-sensitive out of the box; metrics is enabled but sensitive (requires auth), and most others (env, beans, loggers, threaddump) are sensitive and disabled by default. Authentication ('who are you?') versus authorization ('what may you do?') is Spring Security's mandate, not Actuator's — Actuator only exposes management endpoints.",
  },

  // ─────────────── SOA / web services / messaging (6) ───────────────
  {
    week: 99,
    topic: "WSDL structure",
    question:
      "An integration developer receives only a WSDL document and must determine (a) which operations the service exposes and (b) the concrete URL to call. Which elements answer (a) and (b) respectively?",
    options: [
      "<portType> lists the operations (the service interface); <service> gives the actual endpoint URL",
      "<types> lists the operations; <binding> gives the endpoint URL",
      "<binding> lists the operations; <message> gives the endpoint URL",
      "<definitions> lists the operations; <portType> gives the endpoint URL",
    ],
    answer: 0,
    explanation:
      "In WSDL, <portType> is the abstract interface — the set of operations — while <service> declares the concrete endpoint URL. <binding> specifies the protocol (e.g. SOAP over HTTP), <types> defines data types via XML Schema, and <message> defines the input/output payload structures; mixing up binding and portType is the standard trap.",
  },
  {
    week: 99,
    topic: "SOAP vs REST trade-off",
    question:
      "A bank must implement a booking operation that atomically reserves a flight and a hotel with strict ACID semantics, mandatory digital signatures on every message, and the option of routing over SMTP instead of HTTP. Which approach best fits these constraints?",
    options: [
      "REST with JSON, since statelessness inherently provides atomicity across the two reservations",
      "gRPC with Protobuf, because binary serialization makes the booking faster and therefore more consistent",
      "REST with OpenAPI, because the OpenAPI specification includes a WS-Security equivalent for signatures",
      "SOAP web services, which support ACID transaction semantics, WS-Security digital signatures, and are protocol-agnostic (HTTP, SMTP, TCP)",
    ],
    answer: 3,
    explanation:
      "These are precisely the cases where SOAP remains the right tool: ACID-style transactional operations, WS-Security (signatures, secure routing), and transport beyond HTTP. REST does not support ACID transactions by design and OpenAPI is documentation, not a security standard; gRPC's speed has nothing to do with transactional consistency.",
  },
  {
    week: 99,
    topic: "Enterprise Service Bus",
    question:
      "Which statement correctly characterizes the Enterprise Service Bus (ESB) in SOA — including its main architectural risk?",
    options: [
      "The ESB is the registry where services are published so consumers can discover them dynamically at runtime",
      "The ESB enforces the database-per-service rule by isolating each service's persistent storage",
      "The ESB is the central mediator that routes, transforms and mediates communication between coarse-grained services — and, together with BPEL and UDDI, a known source of over-engineering and architectural complexity",
      "The ESB decomposes coarse-grained enterprise services into fine-grained microservices automatically",
    ],
    answer: 2,
    explanation:
      "The ESB is the 'brain' of SOA — routing, transformation and mediation between services — and the lecture lists it (with BPEL and UDDI) under SOA's architectural-complexity challenge. The first option describes the Service Registry, a different SOA component; database-per-service is a microservices pattern, not an ESB function.",
  },
  {
    week: 99,
    topic: "MOM reliability",
    question:
      "A payments team asks how Message-Oriented Middleware achieves its 'reliability' and 'durability' guarantees. Which combination of mechanisms is correct?",
    options: [
      "Synchronous blocking calls, so the producer waits until the consumer confirms business processing",
      "Consumer acknowledgments, automatic retries, dead-letter queues for poison messages, and persisting messages to disk so they survive broker crashes",
      "A shared database between producer and consumer that both poll for state changes",
      "Global exactly-once delivery enforced by the broker, requiring no participation from consumers",
    ],
    answer: 1,
    explanation:
      "MOM reliability rests on acknowledgments, retries, and dead-letter queues, while durability comes from persisting messages to disk — all explicitly listed MOM characteristics. Synchronous blocking contradicts MOM's defining asynchronous nature, and brokers generally provide at-least-once style guarantees, not effortless global exactly-once, which is why consumer-side care still matters.",
  },
  {
    week: 99,
    topic: "Queue vs pub-sub semantics",
    question:
      "An order-placed event must reach BOTH the inventory service and the billing service, and billing runs three identical instances that should share the work so each event is billed exactly once. Which messaging design is correct?",
    options: [
      "Publish to a topic (e.g. a fanout exchange) so each subscribing service receives every event; billing's three instances consume competitively from one shared queue so each message is processed by only one instance",
      "Put all events on one shared point-to-point queue that inventory and billing both consume from, so everyone sees every message",
      "Have each billing instance subscribe individually to the topic, so all three instances receive and process every order event",
      "Send each event twice with direct point-to-point messages, once per service, and let billing instances filter duplicates by timestamp",
    ],
    answer: 0,
    explanation:
      "Publish-subscribe (topics/fanout) delivers each message to ALL subscriber endpoints, which fans the event out across services; point-to-point queues deliver each message to exactly ONE consumer, which is what makes competing billing instances share the workload. Option 2 misunderstands queues (one message goes to one consumer, so services would steal each other's events), and option 3 would triple-bill every order.",
  },
  {
    week: 99,
    topic: "Idempotent consumers",
    question:
      "A billing consumer charges the customer, then crashes before acknowledging the message; the broker redelivers it and the customer is charged twice. What is the most appropriate fix?",
    options: [
      "Disable acknowledgments entirely so the broker never redelivers a message",
      "Rely on the dead-letter queue, which automatically removes duplicate deliveries",
      "Make the consumer idempotent — for example, record processed message IDs and skip any message already handled — because redelivery of unacknowledged messages is expected at-least-once behavior",
      "Switch from a queue to a fanout topic so each message is spread across more consumers",
    ],
    answer: 2,
    explanation:
      "Redelivering an unacknowledged message is precisely how the broker's reliability (ack + retry) mechanism works, so duplicates must be tolerated by design — the consumer has to detect and skip already-processed messages (idempotency). Disabling acks trades duplicate processing for silent message loss, and a dead-letter queue holds repeatedly failing messages; it performs no duplicate detection.",
  },

  // ───────────────────── gRPC / microservices (5) ─────────────────────
  {
    week: 99,
    topic: "Protobuf schema evolution",
    question:
      "A developer deletes the field 'discount_code = 3' from an order .proto file and later adds a new field 'gift_flag' reusing number 3. Old clients begin misreading orders. Which statement about Protobuf is TRUE?",
    options: [
      "Field names are transmitted on the wire, so renaming a field is what broke the old clients",
      "Protobuf messages are self-describing like JSON, so old clients should have ignored the unknown field automatically",
      "Field numbers are irrelevant after protoc regenerates the stubs, so the bug must be in the transport layer",
      "Field numbers — not names — identify fields in the compact binary encoding, so a removed field's number must never be reused; renaming a field while keeping its number is wire-compatible",
    ],
    answer: 3,
    explanation:
      "Protobuf's binary format tags every value with the field NUMBER, which is why the encoding is so compact and fast compared to JSON — but it also means numbers are the contract: reusing a dead field's number makes old binaries decode new data as the old type. Names never travel on the wire, so renames are safe; that inversion is the trap in the first option.",
  },
  {
    week: 99,
    topic: "gRPC streaming types",
    question:
      "A team builds (a) a chat feature where client and server continuously exchange messages over one connection, and (b) a live metrics feed where the server pushes a stream of updates after a single subscribe request. Which gRPC call types fit (a) and (b)?",
    options: [
      "Unary RPC for both — one call per chat message and one call per metric update is equivalent and simpler",
      "Bidirectional streaming for the chat; server streaming for the metrics feed — both carried efficiently over multiplexed HTTP/2",
      "Client streaming for both, since the client initiates each interaction",
      "Server streaming for the chat and bidirectional streaming for the metrics feed",
    ],
    answer: 1,
    explanation:
      "Continuous two-way exchange is the definition of bidirectional streaming, while one request followed by many server-pushed responses is server streaming; HTTP/2 multiplexing lets these long-lived streams share a connection. Modeling chat as repeated unary calls forfeits exactly the streaming capability that distinguishes gRPC from plain REST.",
  },
  {
    week: 99,
    topic: "Eureka failure scenario",
    question:
      "After user-service is redeployed on a new dynamic port, requests through Spring Cloud Gateway to /user-service/users/hello start failing, even though the service process is up and healthy. What is the most likely cause?",
    options: [
      "The new instance has not (yet) registered with Eureka, so the gateway's discovery lookup resolves the logical name 'user-service' to no instance or a stale address",
      "The gateway requires a recompiled gRPC stub whenever a backend service changes port",
      "Spring Cloud Gateway can only route to services whose IP and port are hardcoded in its route table",
      "Eureka resolves service names at compile time, so the application must be rebuilt after every redeploy",
    ],
    answer: 0,
    explanation:
      "The gateway routes by performing a runtime Eureka lookup of the logical service name; if the restarted instance has not registered (or the registry still holds the old address), the gateway cannot reach it. Service discovery exists precisely because containerized services get changing IPs and ports, so hardcoding (option 3) or compile-time resolution (option 4) contradicts the pattern's purpose.",
  },
  {
    week: 99,
    topic: "API Gateway pattern",
    question:
      "Mobile clients currently call six microservices directly, causing many network round trips, duplicated authentication code in every service, and unmanageable cross-cutting concerns. Which is the BEST architectural response?",
    options: [
      "Introduce an Enterprise Service Bus, since mediating between services is the ESB's role",
      "Merge the six services back into a monolith so the client has one endpoint again",
      "Introduce an API Gateway as the single entry point — routing requests, centralizing authentication, aggregating multiple service responses into one call, and applying rate limiting",
      "Give the mobile clients a local copy of the service registry so they can load-balance themselves",
    ],
    answer: 2,
    explanation:
      "These symptoms — chatty clients, duplicated security, scattered cross-cutting concerns — are exactly what the API Gateway pattern solves: one entry point that routes, authenticates, aggregates responses and throttles. The ESB is the tempting wrong answer: it mediates service-to-service communication inside an SOA, whereas the gateway addresses the client-facing edge of a microservice system.",
  },
  {
    week: 99,
    topic: "When NOT to use microservices",
    question:
      "A four-developer startup is building a CRUD product catalog with a stable domain, modest traffic and no independent-scaling needs. They ask whether to start with microservices. What is the soundest advice?",
    options: [
      "Adopt microservices immediately — they always reduce operational overhead compared to a monolith",
      "Adopt microservices because they provide free ACID transactions across all services",
      "Adopt microservices since fine-grained services remove the need for testing and monitoring",
      "Start with a well-structured (layered/modular) monolith — microservices would add distributed data management, deployment overhead, and monitoring/debugging complexity that this context does not justify",
    ],
    answer: 3,
    explanation:
      "Layered architecture is explicitly recommended for CRUD-heavy apps with a stable domain where distributed systems are overkill, and the known microservice costs — communication complexity, distributed data, eventual consistency, deployment overhead, harder debugging — buy nothing here. Microservices in fact REMOVE cross-service ACID (forcing Sagas), the opposite of option 2's claim.",
  },

  // ───────────────────── Distributed data (4) ─────────────────────
  {
    week: 99,
    topic: "Saga: choreography vs orchestration",
    question:
      "An order workflow spans six services. The business demands one place where the workflow's current state can be seen and rollback logic kept together; the team worries this introduces a critical central component. Which analysis is correct?",
    options: [
      "Choreography fits best, because its central controller gives full visibility of every step",
      "Orchestration fits: a central Saga Orchestrator sends commands and tracks state, making the flow easy to visualize and compensations centralized — at the cost of a potential single point of failure and growing orchestrator complexity",
      "Orchestration means each service simply reacts to events on the broker with no controller, so visibility must come from log aggregation",
      "Both styles require two-phase commit locks, so the choice only affects naming",
    ],
    answer: 1,
    explanation:
      "Orchestration uses a central orchestrator issuing commands and receiving replies — giving exactly the demanded visibility and centralized compensation logic, with the documented limitations of a single point of failure and a controller that can grow bulky. Options 1 and 3 each describe the OTHER style: choreography is the controller-less, event-reactive variant whose weaknesses are scattered rollback logic and a hard-to-visualize flow.",
  },
  {
    week: 99,
    topic: "Compensating transactions",
    question:
      "In a Create Order saga the steps are: createOrder(), verifyConsumerDetails() (read-only), createTicket(), authorizeCreditCard(), approveTicket(), approveOrder(). Which statement about compensating transactions is correct?",
    options: [
      "Only steps whose committed state changes might need undoing after a later failure require compensations (e.g. rejectOrder() for createOrder(), rejectTicket() for createTicket()); read-only steps and steps at/after the pivot need none",
      "Every step must define a compensating transaction, otherwise the saga cannot be executed",
      "A compensating transaction is the database engine rolling back the step's still-open local transaction",
      "Compensating transactions are coordinated by the 2PC prepare phase to guarantee atomic undo",
    ],
    answer: 0,
    explanation:
      "Compensations are new, semantically inverse local transactions that undo ALREADY COMMITTED steps — which is why read-only steps (verifyConsumerDetails) and steps after the pivot, beyond which the saga cannot fail backwards, do not need them. Option 3 confuses compensation with an ordinary rollback of an uncommitted transaction, and sagas exist precisely to avoid 2PC coordination.",
  },
  {
    week: 99,
    topic: "CQRS eventual consistency",
    question:
      "In a CQRS system with event-driven synchronization, a user updates their profile and an immediate page refresh still shows the old name for about a second. What is the correct interpretation?",
    options: [
      "A defect: CQRS guarantees that the query model is strongly consistent with the command model at all times",
      "The event store must have lost the update event, since projections are synchronous",
      "Expected behavior: the read model is a projection updated asynchronously from events published by the write side, so it can briefly lag — eventual consistency is an inherent CQRS trade-off",
      "The fix is to route all queries directly to the write database permanently, which preserves the benefits of CQRS",
    ],
    answer: 2,
    explanation:
      "CQRS separates the command (write) model from the query (read) model and synchronizes them asynchronously via events, so a short read-side lag is a documented challenge of the pattern, not a bug. Permanently querying the write store would discard the read model's independent scaling and optimization — the very reason CQRS was introduced.",
  },
  {
    week: 99,
    topic: "2PC vs Saga",
    question:
      "Orders must reserve inventory and charge payment 'atomically' across three microservices, and an engineer proposes coordinating this with Two-Phase Commit. Why do microservice architectures prefer the Saga pattern instead?",
    options: [
      "Because 2PC is no longer implemented by any modern database or transaction manager",
      "Because Sagas deliver exactly the same strict, immediate atomicity as 2PC but with no trade-offs",
      "Because Sagas are faster only in that they skip the prepare phase while keeping global locks",
      "Because 2PC holds locks across services and blocks all participants if one crashes mid-protocol, sacrificing the availability and autonomy microservices need — Sagas instead chain local transactions with compensations, accepting eventual consistency",
    ],
    answer: 3,
    explanation:
      "2PC's prepare/commit protocol requires every participant to hold locks and assumes reliable synchronous communication; a crashed participant (e.g. Payment) leaves Order and Inventory blocked — incompatible with resilient, independently scaling services. The price of the Saga alternative is honest: it trades strict atomicity for eventual consistency plus compensating transactions, so option 2's 'no trade-offs' claim is the giveaway distractor.",
  },

  // ───────────────────────── Testing (5) ─────────────────────────
  {
    week: 99,
    topic: "Test pyramid trade-offs",
    question:
      "A team's suite has 900 browser-driven E2E tests and 50 unit tests; CI takes six hours and fails intermittently. According to the testing pyramid, what is the BEST corrective strategy?",
    options: [
      "Invert the distribution: push most verification down into many fast, isolated unit and component tests, and keep only a few E2E tests for critical user paths — lower layers are faster, cheaper and more stable",
      "Add more E2E tests, since they exercise the most code per test and therefore give the best return",
      "Replace the unit tests with manual exploratory sessions, which sit at the reliable base of the pyramid",
      "The pyramid prescribes roughly equal numbers of tests at every layer, so move 425 tests into each remaining category",
    ],
    answer: 0,
    explanation:
      "The pyramid is widest at the bottom: unit tests should be the most numerous (fast, isolated, cheap), with progressively fewer component, integration, E2E and manual tests, because upper-layer tests are slow, expensive and brittle — exactly the six-hour flaky symptom described. Manual testing sits at the TIP, not the base, and the pyramid is explicitly not uniform.",
  },
  {
    week: 99,
    topic: "Performance test classification",
    question:
      "Match the scenario to the performance test type: (1) abrupt 10x traffic surge during a 5-minute flash sale; (2) 2,000 constant virtual users for 48 hours hunting memory leaks; (3) ramping users beyond limits until the system breaks; (4) expected daily traffic while measuring response time and throughput. Which pairing is fully correct?",
    options: [
      "(1) stress, (2) load, (3) spike, (4) soak",
      "(1) spike, (2) endurance/soak, (3) stress, (4) load",
      "(1) load, (2) volume, (3) soak, (4) stress",
      "(1) spike, (2) scalability, (3) load, (4) stress",
    ],
    answer: 1,
    explanation:
      "Spike testing applies sudden, abrupt load changes (flash sale); endurance/soak testing applies constant load over long periods to expose memory leaks; stress testing pushes beyond normal limits to find the breaking point (focus: stability, recovery, max capacity); load testing stays within expected load measuring response time and throughput. Distinguishing stress (gradual beyond-limit) from spike (abrupt burst) is the deliberate difficulty here.",
  },
  {
    week: 99,
    topic: "Mocks, stubs, fakes",
    question:
      "A test for OrderService uses (a) an in-memory HashMap implementation of the repository, (b) when(rateService.currentRate()).thenReturn(0.25), and (c) verify(emailService).send(anyString()). Which classification of the three test doubles is correct?",
    options: [
      "(a) stub, (b) mock, (c) fake — verification always indicates a fake object",
      "(a) dummy, (b) spy, (c) stub — thenReturn wraps the real implementation",
      "(a) fake (simplified but working implementation), (b) stubbing (canned return values), (c) mocking (verifying that an interaction occurred)",
      "All three are mocks, because Mockito creates every kind of test double",
    ],
    answer: 2,
    explanation:
      "A fake is a working-but-simplified implementation (in-memory HashMap repository); when(...).thenReturn(...) is stubbing (canned responses, no interaction checks); verify(...) is the defining act of mocking — failing the test if an expected call did not happen. A spy would wrap and delegate to the real object, which thenReturn does not do, and one Mockito object can serve as both stub and mock in the same test.",
  },
  {
    week: 99,
    topic: "Integration test scope",
    question:
      "Which of the following tests is correctly classified as an INTEGRATION test rather than a unit, component, or end-to-end test?",
    options: [
      "Calling an API controller whose repository and message client are replaced by Mockito mocks, asserting it routes requests correctly",
      "Asserting a pure price-calculation function returns the right total for boundary inputs",
      "Driving the deployed UI with Selenium through sign-up, checkout and payment as a real user would",
      "Booting the registration module against a real PostgreSQL container (Testcontainers) and a real RabbitMQ broker, asserting the user row is written and the welcome message is published",
    ],
    answer: 3,
    explanation:
      "Integration testing verifies multiple REAL components working together — real database, real broker — typically with Testcontainers, focusing on communication, data flow and wiring. The controller-with-mocks case is component testing (external dependencies stubbed), the pure function is a unit test, and the Selenium journey is end-to-end: full-stack via the UI, a broader scope than integration.",
  },
  {
    week: 99,
    topic: "Flaky tests & observability",
    question:
      "A cross-service checkout test fails intermittently in CI, and in production the team cannot tell which of five services adds the latency to slow requests. Which combination of practices addresses both problems best?",
    options: [
      "Isolate the test by resetting shared state/data between runs, and adopt distributed tracing (e.g. Jaeger/OpenTelemetry/Zipkin) to follow a single request across all service boundaries",
      "Increase CI retries until the test usually passes, and rely on Prometheus metrics, which record each individual request's full path across services",
      "Convert the test to a manual check, and use the ELK logging stack, since per-service logs automatically reconstruct cross-service request paths",
      "Delete the test, and enable every Spring Boot Actuator endpoint publicly so latency can be inspected ad hoc",
    ],
    answer: 0,
    explanation:
      "Flakiness commonly stems from shared state between tests, so each test must set up and clean its own context (isolation/independence); tracing is the observability pillar designed to track ONE request across many microservices, which neither metrics (aggregate time-series numbers) nor per-service logs do on their own. Retrying until green hides the defect rather than fixing it, and exposing all Actuator endpoints publicly is a security anti-pattern.",
  },
];

export default questions;
