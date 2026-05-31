import type { Question } from "../../types";

const questions: Question[] = [
  {
    week: 8,
    topic: "Coupling & cohesion goal",
    question:
      "What is the universally recommended combination of cohesion and coupling for well-designed components?",
    options: [
      "Low cohesion and low coupling",
      "High cohesion and high coupling",
      "Low cohesion and high coupling",
      "High cohesion and low coupling",
    ],
    answer: 3,
    explanation:
      "The goal is HIGH cohesion (each component has one clear responsibility) combined with LOW coupling (minimal dependencies between components). This maximises replaceability and independent deployment.",
  },
  {
    week: 8,
    topic: "Tight coupling",
    question: "Tight coupling is best described as a scenario where:",
    options: [
      "Components communicate only through well-defined interfaces",
      "One class is heavily dependent on the internal details of another class",
      "Components are deployed independently in separate JAR files",
      "A component exposes both a provides and a requires interface",
    ],
    answer: 1,
    explanation:
      "Tight coupling means one class depends on the internal implementation details of another, making the system less flexible, harder to maintain, and difficult to modify or test.",
  },
  {
    week: 8,
    topic: "Dependency depth",
    question:
      "In the monolithic Virtual Store, the Store class depends on Inventory, ShoppingCart, Product, and UI. What is its dependency depth?",
    options: ["0", "1", "2", "3"],
    answer: 2,
    explanation:
      "Dependency depth is measured transitively. Product has depth 0; Inventory and ShoppingCart depend on Product so they have depth 1; Store depends on depth-1 classes, giving it depth 2. Higher dependency depth implies tighter coupling.",
  },
  {
    week: 8,
    topic: "Dependency depth",
    question: "A class that has NO dependencies at all has a dependency depth of:",
    options: [
      "–1",
      "0",
      "1",
      "It depends on the number of its methods",
    ],
    answer: 1,
    explanation:
      "A class with no dependencies has dependency depth 0. Any class that depends only on depth-0 classes has depth 1, and so on. This metric directly measures the degree of coupling in the system.",
  },
  {
    week: 8,
    topic: "Loose coupling",
    question:
      "In the loose-coupling example from the slides, OrderService is refactored so that its constructor receives an IPaymentService parameter instead of instantiating PaymentService directly. Which technique does this illustrate?",
    options: [
      "Static composition",
      "Service Locator",
      "Dependency Injection",
      "Hierarchical composition",
    ],
    answer: 2,
    explanation:
      "Dependency Injection (DI) means a dependency is supplied (injected) from outside the class rather than created inside it. OrderService now depends on the IPaymentService abstraction, not the concrete PaymentService — achieving loose coupling.",
  },
  {
    week: 8,
    topic: "Rules for componentizing",
    question:
      "According to the general rules for effective componentizing from the Virtual Store case, entity classes (e.g. Product) should be:",
    options: [
      "Packaged as their own standalone component with a provided interface",
      "Placed in the Application Component alongside UI logic",
      "Treated as data-carrying objects and packaged in a shared Base Library",
      "Avoided entirely in a component-based design",
    ],
    answer: 2,
    explanation:
      "Entity classes are data-carrying objects, not components in their own right. The lecture prescribes packaging them in a Base Library shared by all components (along with service interface definitions).",
  },
  {
    week: 8,
    topic: "Rules for componentizing",
    question:
      "Rule 3 of effective componentizing states that business functionality should be exposed through:",
    options: [
      "Direct class references so callers can access all public methods",
      "Provided interfaces only — the interface is the only thing visible from outside the component boundary",
      "The Application Component which re-exports all methods",
      "Static utility classes accessible without instantiation",
    ],
    answer: 1,
    explanation:
      "Only the provided interface should be visible from outside the component boundary. In the Virtual Store example this produces ShoppingCartService and InventoryService interfaces — the concrete ShoppingCart and Inventory classes remain hidden inside their components.",
  },
  {
    week: 8,
    topic: "Component-based Virtual Store",
    question:
      "In the componentized Virtual Store, the Application Component depends on InventoryService and ShoppingCartService. This means:",
    options: [
      "It is permanently bound to the specific Inventory Component and Shopping Cart Component",
      "Any component that provides InventoryService and ShoppingCartService can be substituted — enabling replaceability",
      "The Application Component must be recompiled whenever the Inventory class changes",
      "The Application Component becomes the highest coupling point in the system",
    ],
    answer: 1,
    explanation:
      "Because the Application Component depends on interfaces rather than concrete classes, any component that satisfies those interfaces can be plugged in — e.g. the Promotional Shopping Cart Component replaces the standard one without touching the Application Component.",
  },
  {
    week: 8,
    topic: "Accommodate change",
    question:
      "When the Virtual Store needs a 10% Christmas discount, the component-based design handles it by:",
    options: [
      "Modifying ShoppingCart, Store, and UI classes and recompiling all three",
      "Replacing only the Shopping Cart Component with a PromotionalShoppingCartComponent that implements the same ShoppingCartService interface",
      "Changing the Base Library and redeploying every component",
      "Adding a new Application Component that duplicates existing logic",
    ],
    answer: 1,
    explanation:
      "The PromotionalShoppingCart class implements ShoppingCartService and overrides getPrice() to return 0.9 * totalPrice. Because the Application Component depends on the interface, only the Shopping Cart Component is swapped — no other component is recompiled.",
  },
  {
    week: 8,
    topic: "Build-time vs run-time dependencies",
    question:
      "In the componentized Virtual Store, the Application Component has build-time dependency depth 1 but run-time dependency depth 2. Why?",
    options: [
      "At run time the Application Component directly instantiates the Inventory and ShoppingCart classes",
      "At run time the Application Component depends on the Inventory Component and Shopping Cart Component, both of which themselves depend on the Base Library",
      "The Base Library gains additional classes at run time that increase depth",
      "Run-time depth is always exactly double the build-time depth",
    ],
    answer: 1,
    explanation:
      "At build time the Application Component only needs the Base Library (depth 1). At run time it also needs the Inventory Component and Shopping Cart Component, which themselves depend on the Base Library — increasing the run-time depth to 2.",
  },
  {
    week: 8,
    topic: "Layered architecture limitation",
    question:
      "Why does adding gratuity logic to the POS layered application require recompiling and redeploying the WHOLE application, despite the layered design?",
    options: [
      "Because layers are physical deployment units that must always be compiled together",
      "Because layers are logical separations, not physical — a change ripples across layers since all code compiles as one unit",
      "Because the gratuity logic sits in the Presentation Layer which depends on all other layers",
      "Because the DAO layer holds all business rules and must be rebuilt first",
    ],
    answer: 1,
    explanation:
      "Layers are logical, not physical. A single functional change (gratuity) touches BillBiz (business layer), Bill model, BillDAO (data layer), and PayBillUI (presentation layer). Since all layers compile together, the whole application must be recompiled and redeployed — the key motivation for componentizing.",
  },
  {
    week: 8,
    topic: "Componentizing a layered architecture",
    question:
      "When componentizing the POS layered application, the BillBiz component groups together:",
    options: [
      "All four business objects: BillBiz, FoodBiz, OrderBiz, and TableBiz",
      "Only the Presentation Layer views related to billing",
      "BillBiz (business logic) and BillDAO (data access) — spanning both the Business and Data layers",
      "The Bill model entity and all controllers",
    ],
    answer: 2,
    explanation:
      "Each business component in the POS design crosses both the Business Layer and the Data Layer — e.g. the BillBiz component contains BillBiz and BillDAO. This gives the component a single cohesive responsibility while encapsulating its own persistence.",
  },
  {
    week: 8,
    topic: "Componentizing a layered architecture",
    question:
      "In the POS component architecture, which statement best describes a UI component such as GuestUI?",
    options: [
      "It spans all three layers to consolidate all functionality for guests",
      "It contains the necessary View and Controller objects for the guest use cases (CheckInUI, CheckOutUI, CheckInCtrlr, CheckOutCtrlr)",
      "It provides an InventoryService interface consumed by other components",
      "It holds only entity classes shared across the whole system",
    ],
    answer: 1,
    explanation:
      "Each UI component groups the relevant View and Controller objects from the Presentation Layer. GuestUI contains CheckInUI, CheckOutUI, CheckInCtrlr, and CheckOutCtrlr — all objects needed for guest check-in and check-out use cases.",
  },
  {
    week: 8,
    topic: "Component replaceability",
    question:
      "The POS gratuity example demonstrates that the BillGratuity and BillUIGratuity components can replace the original Bill and BillUI components:",
    options: [
      "Only after recompiling the Table, Food, and Order components",
      "Without recompiling the rest of the application — because they implement the same interfaces",
      "But only if the Base Library is also replaced",
      "Only if the entire Presentation Layer is rebuilt from scratch",
    ],
    answer: 1,
    explanation:
      "Because components interact through published interfaces, a new component implementing the same interface can replace the old one without touching other components. This is the core benefit of component-based design: independent replaceability.",
  },
  {
    week: 8,
    topic: "Java components: JARs and packages",
    question: "In Java, a software component is physically realised as:",
    options: [
      "A single class file with a main() method",
      "A JAR file containing one or more packages",
      "A Spring Bean XML configuration file",
      "An abstract class with no concrete implementation",
    ],
    answer: 1,
    explanation:
      "In the Java world, components are packaged as JAR files, each containing one or more packages. The slides show AgeCalculator01.jar containing the package codabook.agecalculator01 as a concrete example.",
  },
  {
    week: 8,
    topic: "Java: loose coupling via interfaces",
    question:
      "In the AgeCalculator example, splitting the interface (AgeCalculatorIfce) into its own JAR solves which problem?",
    options: [
      "It removes the need for an Assembler or glue code entirely",
      "It breaks the build-time tight coupling: both the App and the Calculator depend on the interface JAR rather than on each other",
      "It allows the AgeCalculator to be used without any package declaration",
      "It prevents the application from running without a Spring container",
    ],
    answer: 1,
    explanation:
      "By extracting the interface into a separate AgeCalculatorIfce.jar, the AgeCalculatorApp and AgeCalculator JARs both depend on the stable interface JAR rather than on each other directly — breaking build-time tight coupling and enabling independent deployment.",
  },
  {
    week: 8,
    topic: "Glue code and runtime dependency",
    question:
      "In the AgeCalculator loose-coupling example, what is the role of the Glue JAR (AgeCalculatorGlue)?",
    options: [
      "It redefines the AgeCalculatorIfce interface with additional methods",
      "It wires the concrete AgeCalculator to the AgeCalculatorApp at runtime by performing dependency injection via an Assembler",
      "It replaces the Service Locator pattern entirely",
      "It holds all entity classes shared by the other JARs",
    ],
    answer: 1,
    explanation:
      "The Glue JAR instantiates the concrete AgeCalculator, injects it into AgeCalculatorApp via setAgeCalculator(), and then calls main(). This breaks the runtime dependency between App and Calculator — neither needs to know about the other's concrete class.",
  },
  {
    week: 8,
    topic: "Component assembly patterns",
    question:
      "In the Whiteboard component model, components interact by:",
    options: [
      "Calling each other's methods directly using concrete class references",
      "Publishing interfaces to and retrieving interfaces from a central Component Registry",
      "Sharing a global singleton that all components read from",
      "Being wired together statically at compile time by the developer",
    ],
    answer: 1,
    explanation:
      "In the Whiteboard (publish-and-consume) component model, Component A publishes Interface X to a Component Registry; Component B retrieves and uses Interface X from the same registry. Neither A nor B needs a direct reference to the other.",
  },
  {
    week: 8,
    topic: "UML component diagrams — notation",
    question:
      "In a UML 2.0 component diagram, a component's REQUIRED interface is depicted with:",
    options: [
      "A filled circle ('lollipop') on the component boundary",
      "A half-circle ('socket') on the component boundary",
      "A dashed dependency arrow pointing FROM the interface TO the component",
      "A solid realization arrow pointing FROM the component TO the interface",
    ],
    answer: 1,
    explanation:
      "UML 2.0 uses a filled circle (lollipop) for provided interfaces and a half-circle (socket) for required interfaces. The LanguageTranslator example in the slides shows LanguageIn as a socket (required) and LanguageOut as a lollipop (provided).",
  },
  {
    week: 8,
    topic: "UML component diagrams — realization",
    question: "In a UML component diagram, 'Realization' refers to:",
    options: [
      "The dependency relationship between two components connected by assembly connectors",
      "The relationship between a component and the classes or sub-components that implement its functionality",
      "The deployment descriptor specifying which server hosts the component",
      "The registry entry that makes an interface discoverable at runtime",
    ],
    answer: 1,
    explanation:
      "Realization is the relationship between a component and the classes (or inner components) that implement its functionality. In the LanguageTranslator example, StrToConvert and IndivWords are the realizing classes shown inside or below the component boundary.",
  },
  {
    week: 8,
    topic: "UML component diagrams — delegation connectors",
    question: "Delegation connectors in a UML component diagram are used to:",
    options: [
      "Connect two components' provided interfaces to merge them into one",
      "Link a component's external port to the internal class or sub-component that realizes or requires the service represented by that port",
      "Mark classes that are deprecated and should not be called externally",
      "Show that one component depends on another at build time only",
    ],
    answer: 1,
    explanation:
      "Delegation connectors link the external port of a component to the internal part that actually handles the service. In the LanguageTranslator diagram, delegation connectors route the LanguageIn port to StrToConvert and route output from IndivWords to the SpanishOut and GermanOut ports.",
  },
  {
    week: 8,
    topic: "Base library role",
    question:
      "In the componentized Virtual Store, which artefacts belong in the Base Library?",
    options: [
      "The Store class, UI class, and main application entry point",
      "The Product entity class, the InventoryService interface, and the ShoppingCartService interface",
      "The Inventory class and its database connection logic",
      "Only the ShoppingCart class, because it has the most public methods",
    ],
    answer: 1,
    explanation:
      "The Base Library holds: (1) entity classes (Product) which are data-carrying objects shared by all components, and (2) the service interface definitions (InventoryService, ShoppingCartService) that form the contracts between components.",
  },
  {
    week: 8,
    topic: "Purpose of componentization",
    question:
      "The lecture lists two primary purposes for componentizing an application. Which pair is correct?",
    options: [
      "Eliminate all inter-class dependencies; reduce the number of classes",
      "Improve maintainability; extract reusable parts for storage and future reuse",
      "Increase the number of interfaces; reduce the size of each JAR file",
      "Replace the layered architecture with a flat structure; speed up compilation",
    ],
    answer: 1,
    explanation:
      "The slides state the two purposes explicitly: (1) improve maintainability and (2) extract reusable parts for storage and future reuse. The discount and gratuity examples illustrate both: isolated change and pluggable replacement components.",
  },
  {
    week: 8,
    topic: "Interface stability",
    question:
      "After componentizing the Virtual Store the total number of class-level dependencies increases, yet the design is considered superior to the monolith. The key reason is:",
    options: [
      "The component-based design has fewer classes overall",
      "All dependencies are now between a class and a stable interface rather than a concrete implementation — interfaces change less frequently",
      "The component-based design eliminates all runtime dependencies",
      "The build-time dependency graph has fewer nodes than the monolithic one",
    ],
    answer: 1,
    explanation:
      "The slides note that even with more dependencies, quality is higher because each dependency targets an interface, not an implementation. Interfaces are more stable than implementation classes, making the entire system far more accommodating of change.",
  },
  {
    week: 8,
    topic: "Application component design",
    question:
      "In the componentized Virtual Store, the Application Component provides no interface to other components. This is because:",
    options: [
      "Application components are forbidden from defining interfaces by the component model",
      "The Store and UI classes are mutually dependent and form the top-level orchestrator that only consumes services — nothing above it needs to consume its interface",
      "The Application Component's interface is defined in the Base Library instead",
      "Providing an interface would create a circular dependency with the Inventory Component",
    ],
    answer: 1,
    explanation:
      "Rule 4 groups mutually dependent application classes (UI and Store) into an Application Component that only consumes services. As the top-level orchestrator it has nothing above it to consume its interface, so it exposes none.",
  },
  {
    week: 8,
    topic: "Dependency Injection vs Service Locator",
    question:
      "Which statement correctly distinguishes Dependency Injection (DI) from the Service Locator pattern?",
    options: [
      "In DI the component pulls its dependency from a registry; in Service Locator the dependency is pushed in from outside",
      "In Service Locator a dependency is pushed into a component by an Assembler; in DI the component asks a registry for its dependency",
      "In DI an Assembler or container pushes (injects) the dependency into the component (Inversion of Control); in Service Locator the component queries a central registry to find its dependency",
      "There is no meaningful difference — both always use an Assembler class",
    ],
    answer: 2,
    explanation:
      "DI uses Inversion of Control: an external Assembler creates and injects the dependency — the component is passive. Service Locator: the component actively queries a central registry. The slides show both patterns with the AgeCalculator example.",
  },
];

export default questions;
