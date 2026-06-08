import type { Question } from "../../types";

const questions: Question[] = [
  // ── SOA fundamentals ──────────────────────────────────────────────────────
  {
    week: 16,
    topic: "SOA definition",
    question:
      "Service-Oriented Architecture (SOA) is best described as a software design paradigm that organises systems into:",
    options: [
      "A single monolithic application that exposes one public API",
      "A collection of independent and reusable services, each representing a business process or function",
      "A set of tightly coupled objects that share a common database",
      "A layered architecture where each layer calls only the layer directly below it",
    ],
    answer: 1,
    explanation:
      "SOA organises software systems into independent and reusable services, each representing a business process or function (e.g. payment, ordering). Services are combined to build larger applications.",
  },
  {
    week: 16,
    topic: "SOA core components",
    question: "Which component of SOA acts as the 'brain of the system' — routing, transforming, and mediating communication between services?",
    options: [
      "Service Registry",
      "Application Frontend",
      "Service / Message Bus (ESB)",
      "Service Contract",
    ],
    answer: 2,
    explanation:
      "The Service Bus (Enterprise Service Bus / ESB) is described in the slides as the 'brain of the system'. It routes, transforms, and mediates all inter-service communication.",
  },
  {
    week: 16,
    topic: "SOA core components",
    question: "In SOA, what is the primary role of a Service Registry?",
    options: [
      "To execute business logic on behalf of services",
      "To act as a message bus routing requests between services",
      "To provide a centralised directory where services are published and can be dynamically discovered at runtime",
      "To define the transport protocol used between services",
    ],
    answer: 2,
    explanation:
      "The Service Registry / Discovery is a centralised directory where services are published and consumers can locate them. It enables dynamic discovery of services at runtime — a key SOA feature.",
  },
  {
    week: 16,
    topic: "SOA challenges — security",
    question: "Which of the following is a recognised challenge of SOA?",
    options: [
      "Services are always synchronously coupled, making parallelism impossible",
      "Ensuring consistent service security across all independently deployed services",
      "SOA makes it impossible to reuse services across different applications",
      "SOA requires all services to be written in the same programming language",
    ],
    answer: 1,
    explanation:
      "Ensuring CONSISTENT SERVICE SECURITY across services is a real SOA challenge. Because each service is independently developed and deployed, enforcing uniform auth, authorisation, and data-protection policies is non-trivial.",
  },
  {
    week: 16,
    topic: "SOA challenges",
    question: "The slides highlight UDDI as part of SOA architectural complexity. What does UDDI stand for?",
    options: [
      "Unified Data Distribution Interface",
      "Universal Description, Discovery, and Integration",
      "Uniform Deployment and Dependency Index",
      "User-Defined Dynamic Invocation",
    ],
    answer: 1,
    explanation:
      "UDDI = Universal Description, Discovery, and Integration. It is one of the components (alongside ESB and BPEL) that can lead to SOA overengineering.",
  },
  // ── Web services: WSDL, SOAP, REST ────────────────────────────────────────
  {
    week: 16,
    topic: "WSDL",
    question: "Which of the following best describes WSDL (Web Services Description Language)?",
    options: [
      "A binary protocol for transmitting data between microservices",
      "An XML-based standard that provides a standard way to describe web services, enabling interoperability",
      "A RESTful design pattern for versioning API endpoints",
      "A database query language used in service-oriented systems",
    ],
    answer: 1,
    explanation:
      "WSDL is XML-based and provides a standard way to DESCRIBE web services, enabling INTEROPERABILITY between heterogeneous platforms and languages. This is the exact slide wording that appears on the mock exam.",
  },
  {
    week: 16,
    topic: "WSDL vs SOAP vs REST",
    question: "What distinguishes SOAP from REST in the context of web services?",
    options: [
      "SOAP uses JSON payloads; REST uses XML exclusively",
      "SOAP is a binary protocol; REST is text-based",
      "SOAP is a formal XML-based messaging protocol with extensive enterprise features (e.g. WS-Security); REST is a lightweight HTTP-based architectural style",
      "SOAP and REST are identical — only the endpoint URL differs",
    ],
    answer: 2,
    explanation:
      "SOAP is a formal XML-based messaging protocol with standards like WS-Security. REST is a lightweight architectural style using HTTP verbs — simpler and faster, now dominant for modern APIs.",
  },
  // ── MOM ───────────────────────────────────────────────────────────────────
  {
    week: 16,
    topic: "MOM",
    question: "What is the PRIMARY purpose of Message-Oriented Middleware (MOM)?",
    options: [
      "To provide synchronous, real-time remote procedure calls between services",
      "To facilitate asynchronous communication between distributed systems",
      "To replace the service registry in an SOA system",
      "To compile and deploy microservices automatically",
    ],
    answer: 1,
    explanation:
      "MOM's primary purpose is to facilitate ASYNCHRONOUS communication between distributed systems. Producers place messages on a queue/topic; consumers retrieve them independently. Examples: Kafka, RabbitMQ.",
  },
  {
    week: 16,
    topic: "MOM",
    question: "Which of the following are examples of Message-Oriented Middleware (MOM) systems?",
    options: [
      "NGINX and Traefik",
      "Docker and Kubernetes",
      "Apache Kafka and RabbitMQ",
      "Eureka and Consul",
    ],
    answer: 2,
    explanation:
      "Apache Kafka and RabbitMQ are both message brokers / MOM implementations. Eureka/Consul are service discovery tools; NGINX/Traefik are reverse proxies/API gateways; Docker/Kubernetes are container orchestration.",
  },
  // ── gRPC + Protobuf ───────────────────────────────────────────────────────
  {
    week: 16,
    topic: "gRPC",
    question: "What does gRPC stand for, and which company developed it?",
    options: [
      "General Remote Procedure Call, developed by Microsoft",
      "Google Remote Procedure Call, developed by Google",
      "Generic RPC Protocol, developed by the IETF",
      "Generic Remote Procedure Call, developed by Netflix",
    ],
    answer: 1,
    explanation:
      "gRPC stands for Google Remote Procedure Call. It is an open-source, high-performance RPC framework developed by Google that uses HTTP/2 and Protocol Buffers.",
  },
  {
    week: 16,
    topic: "gRPC + Protobuf",
    question: "What transport protocol does gRPC use for communication?",
    options: ["HTTP/1.1", "WebSocket only", "HTTP/2", "FTP"],
    answer: 2,
    explanation:
      "gRPC communicates over HTTP/2, which enables multiplexing, header compression, binary protocol, and stream prioritisation — making it more efficient than REST over HTTP/1.1.",
  },
  {
    week: 16,
    topic: "Protobuf vs JSON",
    question: "Compared to JSON (used by REST), Protocol Buffers (Protobuf) provide:",
    options: [
      "Slower serialisation but better human readability",
      "Faster serialisation and smaller message sizes",
      "Larger message sizes but simpler schema definitions",
      "No difference in performance — Protobuf is only used for schema validation",
    ],
    answer: 1,
    explanation:
      "Protobuf gives FASTER SERIALISATION and SMALLER MESSAGE SIZES compared to JSON because it encodes data in a compact binary format rather than verbose text. This is the core exam fact about Protobuf.",
  },
  {
    week: 16,
    topic: "gRPC workflow",
    question: "In the gRPC workflow, what is the role of the client 'stub'?",
    options: [
      "It is the server-side component that implements the service methods",
      "It is a generated proxy that allows the client to call remote service methods as if they were local",
      "It is the .proto file that defines the service contract",
      "It is a caching layer between client and server",
    ],
    answer: 1,
    explanation:
      "In gRPC, the client stub is a generated proxy created by protoc. It allows the client to call remote methods as if they were local — handling serialisation, HTTP/2 transport, and deserialisation transparently.",
  },
  {
    week: 16,
    topic: "gRPC workflow",
    question: "What is the correct sequence to create a working gRPC service?",
    options: [
      "Write server code → deploy to cloud → client discovers via DNS → call methods",
      "Define .proto file → compile with protoc → server implements methods → client uses stub → communicates over HTTP/2",
      "Write a REST API → convert JSON to Protobuf → wrap with gRPC adapter",
      "Register in Eureka → define WSDL → compile with protoc → deploy",
    ],
    answer: 1,
    explanation:
      "The 5-step gRPC workflow: (1) define service in .proto, (2) compile with protoc to generate stubs, (3) server implements methods, (4) client uses stub to call methods, (5) communication over HTTP/2.",
  },
  // ── SOA vs Microservices granularity ──────────────────────────────────────
  {
    week: 16,
    topic: "SOA vs Microservices granularity",
    question: "How does the granularity of services differ between SOA and Microservices?",
    options: [
      "SOA uses fine-grained, single-function services; Microservices use coarse-grained, enterprise-level services",
      "SOA uses coarse-grained, enterprise-level services; Microservices use fine-grained, business-function-level services",
      "Both SOA and Microservices use the same level of granularity",
      "Microservices have coarser granularity because they combine multiple SOA services",
    ],
    answer: 1,
    explanation:
      "SOA = COARSE-GRAINED, enterprise-level services (e.g. a single 'Order Processing Service'). Microservices = FINE-GRAINED, each owning one business function (e.g. separate Basket, Checkout, Inventory services). This distinction is directly from the slides.",
  },
  {
    week: 16,
    topic: "Microservices definition",
    question: "Microservices are best defined as:",
    options: [
      "A style of architecture where a system is structured as a collection of loosely coupled, independently deployable services",
      "A method for deploying monolithic applications inside containers",
      "A set of tightly coupled services that share a single database",
      "A design pattern exclusively for mobile application back-ends",
    ],
    answer: 0,
    explanation:
      "Microservices are a style of software architecture where systems are structured as a collection of LOOSELY COUPLED, INDEPENDENTLY DEPLOYABLE services — each owning one business capability.",
  },
  {
    week: 16,
    topic: "Microservices history",
    question: "Who formally introduced the term 'Microservices Architecture' in 2014?",
    options: [
      "Linus Torvalds and Ken Thompson",
      "Martin Fowler and James Lewis",
      "Jeff Bezos and Werner Vogels",
      "Grady Booch and Ivar Jacobson",
    ],
    answer: 1,
    explanation:
      "Martin Fowler and James Lewis formally introduced the term 'Microservices Architecture' in 2014. Netflix had already been adopting the pattern since ~2010.",
  },
  {
    week: 16,
    topic: "Microservices principles",
    question: "The 'Database Per Service' pattern in microservices means:",
    options: [
      "All microservices share one central database for simplicity",
      "Each microservice has its own private database, avoiding tight coupling via shared tables or schemas",
      "Databases are stored per geographic region, not per service",
      "Services must use a document database — relational databases are forbidden",
    ],
    answer: 1,
    explanation:
      "Database Per Service: each microservice has its own private database. Services must NOT share databases — this eliminates bottlenecks, data contention, and tight coupling via shared tables/schemas.",
  },
  // ── CBD as foundation for SOA ─────────────────────────────────────────────
  {
    week: 16,
    topic: "CBD and SOA",
    question: "How does Component-Based Development (CBD) relate to SOA?",
    options: [
      "CBD and SOA are unrelated approaches with no shared principles",
      "SOA builds on CBD principles by extending reusable components into loosely coupled, distributed services",
      "CBD replaced SOA entirely in the early 2000s",
      "SOA builds on CBD by making services more tightly coupled and language-specific",
    ],
    answer: 1,
    explanation:
      "CBD is the foundation of SOA: SOA takes the idea of reusable components from CBD and extends it to loosely coupled, distributed services. Organisations that started with CBD often evolved to SOA by exposing components as services.",
  },
  {
    week: 16,
    topic: "CBD vs SOA differences",
    question: "According to the slides' CBD vs SOA comparison table, how does REUSABILITY differ?",
    options: [
      "CBD reuses services across organisational boundaries; SOA reuses at the application level",
      "CBD reuses at the application level; SOA reuses services across organisational boundaries",
      "Both CBD and SOA reuse at identical scopes",
      "Neither CBD nor SOA supports reusability",
    ],
    answer: 1,
    explanation:
      "CBD: reusability at the application level. SOA: reusability ACROSS ORGANISATIONAL BOUNDARIES — services can be shared across different business units or even external partners.",
  },
  // ── API Gateway ───────────────────────────────────────────────────────────
  {
    week: 16,
    topic: "API Gateway",
    question: "An API Gateway in a microservices architecture is best described as:",
    options: [
      "A shared database that all microservices read from",
      "A single-entry point for all client requests that handles routing, auth, rate limiting, and aggregation",
      "A service discovery mechanism that replaces Eureka",
      "A CI/CD pipeline tool for automating microservice deployment",
    ],
    answer: 1,
    explanation:
      "An API Gateway is a SINGLE-ENTRY POINT for client requests. It handles request routing, authentication/authorisation, response aggregation, rate limiting, caching, monitoring, and load balancing.",
  },
  {
    week: 16,
    topic: "API Gateway tools",
    question: "Which API Gateway tool is highlighted in the slides as the 'modern alternative to Zuul' for Spring Boot microservices?",
    options: [
      "Kong",
      "AWS API Gateway",
      "Spring Cloud Gateway",
      "Traefik",
    ],
    answer: 2,
    explanation:
      "The slides highlight Spring Cloud Gateway (built on Spring WebFlux / Project Reactor) as the modern, reactive API Gateway for Spring Boot microservices and as the preferred alternative to the older Zuul.",
  },
  // ── Service Discovery ──────────────────────────────────────────────────────
  {
    week: 16,
    topic: "Service Discovery",
    question: "Why is dynamic service discovery needed in microservices environments?",
    options: [
      "Because services are always deployed on fixed IP addresses that never change",
      "Because services are deployed dynamically in containers or cloud, with frequently changing IP addresses and ports, making hardcoded configuration impractical",
      "Because microservices communicate exclusively via shared memory and do not use network addresses",
      "Because service discovery is required by the HTTP/2 protocol specification",
    ],
    answer: 1,
    explanation:
      "In containerised/cloud environments services are deployed dynamically with frequently changing IPs and ports. Service Discovery solves this by letting services register themselves and discover others at runtime without hardcoded addresses.",
  },
  {
    week: 16,
    topic: "Service Discovery tools",
    question: "Which service discovery tool is a Netflix OSS-based service registry integrated with Spring Cloud?",
    options: ["Consul", "Zookeeper", "Eureka", "Kubernetes DNS"],
    answer: 2,
    explanation:
      "Eureka is the Netflix OSS-based service registry. Spring Cloud Gateway integrates with Eureka via discovery.locator.enabled to automatically route to registered services without hardcoded URLs.",
  },
  // ── SOA service types / orchestration ─────────────────────────────────────
  {
    week: 16,
    topic: "Service orchestration vs choreography",
    question: "In service orchestration, how are interactions between services coordinated?",
    options: [
      "Each service independently reacts to events without any central coordinator",
      "A single centralised orchestrator coordinates all interactions by invoking other services",
      "Services communicate only through a shared database",
      "Interactions are coordinated by the client application sending simultaneous HTTP requests",
    ],
    answer: 1,
    explanation:
      "In service ORCHESTRATION a single centralised orchestrator (composite service) coordinates the interaction among different services. Contrast with choreography, where no central controller exists and each service reacts to events.",
  },
  {
    week: 16,
    topic: "Microservices resilience",
    question: "The Circuit Breaker pattern in microservices is used to:",
    options: [
      "Encrypt all messages between services using TLS",
      "Prevent cascading failures by temporarily stopping requests to a failing service",
      "Route traffic between different versions of the same service",
      "Generate API documentation automatically from service code",
    ],
    answer: 1,
    explanation:
      "The Circuit Breaker pattern prevents cascading failures by detecting when a downstream service is failing and temporarily stopping requests to it, allowing it time to recover before traffic is resumed.",
  },
];

export default questions;
