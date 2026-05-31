import type { Question } from "../../types";

const questions: Question[] = [
  {
    week: 6,
    topic: "Component definition",
    question:
      "According to Szyperski, a software component is best described as a unit of composition with:",
    options: [
      "Contractually specified interfaces and context dependencies only, deployable independently",
      "A fixed set of clients and tightly coupled dependencies",
      "Source code that must be recompiled into each application that uses it",
      "An internal state that is shared globally across the system",
    ],
    answer: 0,
    explanation:
      "Szyperski's classic definition stresses contractually specified interfaces, context dependencies only, independent deployment, and composition by third parties.",
  },
  {
    week: 6,
    topic: "Object vs Component",
    question: "What is the key difference between an object and a component regarding lifecycle?",
    options: [
      "Objects are managed by a framework; components by program logic",
      "Objects are created/destroyed by program logic; components are managed by a component framework",
      "Both are managed exclusively by the operating system",
      "Components have no lifecycle at all",
    ],
    answer: 1,
    explanation:
      "An object's lifecycle is controlled by program logic, whereas a component's lifecycle (creation, init, destruction) is managed by the component framework/container.",
  },
  {
    week: 6,
    topic: "Object vs Component",
    question: "Compared with objects, components are generally:",
    options: [
      "Lower-level and fine-grained",
      "Higher-level and coarse-grained",
      "Identical in abstraction and granularity",
      "Always written in assembly language",
    ],
    answer: 1,
    explanation:
      "Objects are low-level and fine-grained; components are higher-level, coarse-grained units that encapsulate objects and logic.",
  },
  {
    week: 6,
    topic: "Component framework",
    question:
      "Which of the following best describes a key function of a component framework in the context of component-based software development?",
    options: [
      "It compiles each component independently and executes it without any interaction",
      "It enforces architectural constraints, provides lifecycle management, and facilitates interaction between components through standardized interfaces",
      "It dynamically generates business logic for components based on user input",
      "It eliminates the need for interface definitions by embedding all logic within the framework itself",
    ],
    answer: 1,
    explanation:
      "A component framework is the implementation of a component model: it provides the runtime environment, a container that manages lifecycle, and platform/support services that let components interact via standardized interfaces.",
  },
  {
    week: 6,
    topic: "Model vs framework",
    question: "What is the relationship between a component model and a component framework?",
    options: [
      "The model is the implementation; the framework is the specification",
      "The model defines the standards/specification; the framework is the implementation that provides the runtime",
      "They are two words for exactly the same thing",
      "The framework defines interfaces; the model executes them at runtime",
    ],
    answer: 1,
    explanation:
      "A component model specifies structure, behaviour and interaction standards; a component framework implements that model and provides the runtime environment and container.",
  },
  {
    week: 6,
    topic: "Horizontal vs vertical frameworks",
    question:
      "Which of the following best describes a horizontal component framework?",
    options: [
      "A framework designed for a specific industry or domain such as healthcare or finance",
      "A reusable, general-purpose framework that can be applied across various domains",
      "A framework used exclusively for mobile application development",
      "A framework built to manage vertical scaling in cloud infrastructure",
    ],
    answer: 1,
    explanation:
      "Horizontal frameworks are general-purpose and reusable across many domains; vertical frameworks are domain-specific (e.g. healthcare, finance).",
  },
  {
    week: 6,
    topic: "Component container",
    question: "What is the primary role of a component container within a framework?",
    options: [
      "To store the source code of all components permanently",
      "To manage the component's lifecycle and provide services to it",
      "To replace the need for interfaces between components",
      "To compile components into machine code",
    ],
    answer: 1,
    explanation:
      "The container manages component lifecycle (creation, initialization, destruction) and supplies runtime services to the component.",
  },
  {
    week: 6,
    topic: "Interfaces",
    question: "A component's 'requires' interface specifies:",
    options: [
      "The services the component provides to other components",
      "The services the component needs other components to provide for it to work correctly",
      "The internal private methods of the component",
      "The deployment descriptor of the component",
    ],
    answer: 1,
    explanation:
      "The 'requires' interface declares what the component needs from others; the 'provides' interface declares what it offers to others.",
  },
  {
    week: 6,
    topic: "Interfaces",
    question: "In hierarchical composition, for one component to call another directly:",
    options: [
      "The caller's 'provides' interface must match the callee's 'requires' interface",
      "The called component's 'provides' interface must be compatible with the calling component's 'requires' interface",
      "Both components must share the same source file",
      "No interface compatibility is needed",
    ],
    answer: 1,
    explanation:
      "In hierarchical composition the provides interface of the called component must be compatible with the requires interface of the caller.",
  },
  {
    week: 6,
    topic: "Composition",
    question: "Which composition style typically requires extra 'glue code' and has components called in order by an external application rather than calling each other?",
    options: ["Hierarchical composition", "Sequential composition", "Additive composition", "Recursive composition"],
    answer: 1,
    explanation:
      "In sequential composition components don't call each other; an external application calls them in sequence, usually needing some glue code.",
  },
  {
    week: 6,
    topic: "Component adaptor",
    question: "When two components have incompatible interfaces, what is used to connect them?",
    options: [
      "A component adaptor that sits between the 'requires' and 'provides' interfaces",
      "A second component model",
      "A new programming language",
      "A garbage collector",
    ],
    answer: 0,
    explanation:
      "An adaptor translates between mismatched interfaces, sitting between the requires and provides interfaces.",
  },
  {
    week: 6,
    topic: "Componentization",
    question: "Over-componentization (splitting a system into too many components) primarily increases:",
    options: [
      "Reusability with no downside",
      "The cost of integration and the interaction effort",
      "The compile speed of the application",
      "The number of programming languages required",
    ],
    answer: 1,
    explanation:
      "Breaking a system into too many components raises integration cost and interaction effort — there is a minimum-cost region between too few and too many.",
  },
  {
    week: 6,
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
      "Good component design maximizes cohesion within a component and minimizes coupling between components, so components stay independent and replaceable.",
  },
  {
    week: 6,
    topic: "Principles of CBSD",
    question: "Which principle of CBSD means a component's internal implementation is hidden and only public interfaces are exposed?",
    options: ["Composability", "Encapsulation", "Interoperability", "Scalability"],
    answer: 1,
    explanation:
      "Encapsulation hides internal details and exposes only public interfaces (e.g. interacting with the Stripe API without knowing its internals).",
  },
  {
    week: 6,
    topic: "Principles of CBSD",
    question: "A RESTful API component that serves multiple different front-end systems best illustrates which principle?",
    options: ["Interoperability", "Maintainability", "Over-componentization", "Statelessness only"],
    answer: 0,
    explanation:
      "Interoperability means components work across different platforms and environments — e.g. one REST API serving many front-ends.",
  },
  {
    week: 6,
    topic: "Benefits",
    question: "Which is a benefit of CBSD that comes from reusing pre-built, already-tested components?",
    options: [
      "Improved quality and reliability",
      "Guaranteed elimination of all bugs",
      "Removal of the need for any interfaces",
      "Slower time-to-market",
    ],
    answer: 0,
    explanation:
      "Reusable components are pre-tested, improving quality/reliability while also speeding development and reducing cost.",
  },
  {
    week: 6,
    topic: "Static vs dynamic composition",
    question: "What distinguishes dynamically composed components from statically composed ones?",
    options: [
      "Dynamic composition binds components at runtime; static composition binds them at build/compile time",
      "Dynamic composition happens only at compile time",
      "Static composition can change while the application is running",
      "There is no difference",
    ],
    answer: 0,
    explanation:
      "Statically composed assemblies are fixed at build/compile time; dynamically composed systems discover and bind components at runtime.",
  },
  {
    week: 6,
    topic: "Component model examples",
    question: "Which of the following is NOT a component model / framework example mentioned for CBSE?",
    options: ["Enterprise JavaBeans (EJB)", "CORBA Component Model", "COM+/.NET", "TCP/IP"],
    answer: 3,
    explanation:
      "EJB, CORBA CCM, COM+/.NET (and Spring, OSGi, SCA) are component models/frameworks. TCP/IP is a networking protocol, not a component model.",
  },
  {
    week: 6,
    topic: "CORBA",
    question: "In CORBA, what component manages requests and responses between distributed objects?",
    options: ["The Object Request Broker (ORB)", "The garbage collector", "The JVM", "The component container"],
    answer: 0,
    explanation:
      "CORBA defines Object Request Brokers (ORBs) that route requests/responses; clients use stubs and servers use skeletons, communicating via IIOP.",
  },
  {
    week: 6,
    topic: "Evolution",
    question: "What was a key limitation of SOA that contributed to the rise of microservices?",
    options: [
      "Services were too fine-grained to be useful",
      "A scalability bottleneck where coarse-grained services had to be scaled together",
      "It had no support for standardized protocols",
      "It made components impossible to reuse",
    ],
    answer: 1,
    explanation:
      "SOA's centralized, coarse-grained services scaled together (a bottleneck) and became bloated, motivating finer-grained, independently deployable microservices.",
  },
  {
    week: 6,
    topic: "Component repository",
    question: "A component repository (e.g. Maven Central) primarily stores:",
    options: [
      "Only the running processes of components",
      "The component code, metadata, interfaces and other information about components",
      "User passwords for the application",
      "Nothing — it is only a naming convention",
    ],
    answer: 1,
    explanation:
      "A component repository is a database of components containing their code, metadata, interfaces and related information; Maven Central is a real example.",
  },
  {
    week: 6,
    topic: "Reusability examples",
    question: "Using OAuth2 authentication libraries, Google reCAPTCHA and the PayPal SDK across many applications best demonstrates which CBSD principle?",
    options: ["Reusability", "Encapsulation", "Over-componentization", "Static composition"],
    answer: 0,
    explanation:
      "These are reused across multiple projects/sites — the definition of reusability, which saves development time and cost.",
  },
];

export default questions;
