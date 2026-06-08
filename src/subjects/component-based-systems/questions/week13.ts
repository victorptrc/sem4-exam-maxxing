import type { Question } from "../../types";

const questions: Question[] = [
  // ── Web Services & REST ─────────────────────────────────────────────────────
  {
    week: 13,
    topic: "Web services",
    question:
      "Which of the following best defines a web service?",
    options: [
      "A desktop application that runs locally without network access",
      "A standardized way of allowing applications to communicate over the internet using open protocols",
      "A database engine that stores structured XML data",
      "A hardware component that routes TCP packets between networks",
    ],
    answer: 1,
    explanation:
      "A web service is a standardized way of allowing applications to communicate with each other over the internet using open protocols (REST, SOAP, etc.).",
  },
  {
    week: 13,
    topic: "RESTful constraints",
    question:
      "The statelessness constraint in REST means that:",
    options: [
      "The server stores all client session information between requests",
      "Each request from the client must contain all the information the server needs; the server stores no client context between requests",
      "Clients are forbidden from sending authentication tokens",
      "REST can only be used for read-only GET operations",
    ],
    answer: 1,
    explanation:
      "Statelessness requires every request to be self-contained with all necessary information (including auth tokens). The server does not retain session state between requests, enabling better scalability and failure tolerance.",
  },
  {
    week: 13,
    topic: "RESTful constraints",
    question:
      "Which REST constraint states that responses must explicitly declare whether they can be cached, using headers such as Cache-Control or ETag?",
    options: [
      "Statelessness",
      "Uniform Interface",
      "Cacheability",
      "Code on Demand",
    ],
    answer: 2,
    explanation:
      "The Cacheability constraint requires RESTful responses to explicitly define their cache status via HTTP cache control headers (Cache-Control, ETag), improving performance and reducing server load.",
  },
  {
    week: 13,
    topic: "RESTful constraints",
    question:
      "The Layered System constraint in REST means that:",
    options: [
      "All layers must be visible to the client at the same time",
      "Clients must know whether they are talking to the real server or an intermediary such as a load balancer",
      "Each layer has a specific responsibility and clients typically cannot tell whether they are interacting with the server or an intermediary",
      "REST can only have exactly three architectural layers",
    ],
    answer: 2,
    explanation:
      "Layered System means the architecture is organized in layers (e.g., security, load balancing) where each has a specific responsibility, and clients cannot distinguish between a real server and an intermediary — enabling transparent proxies and gateways.",
  },
  {
    week: 13,
    topic: "REST limitations",
    question:
      "Which of the following is a known limitation of RESTful architecture?",
    options: [
      "REST cannot use JSON as a data format",
      "REST is inherently stateful and cannot support caching",
      "REST struggles with real-time communication — WebSockets or GraphQL subscriptions are common alternatives",
      "REST only works with SOAP-based transport protocols",
    ],
    answer: 2,
    explanation:
      "REST uses a request/response model and is not well-suited for real-time bidirectional communication. Alternatives like WebSockets or GraphQL subscriptions address this limitation.",
  },
  // ── SOAP & WSDL ─────────────────────────────────────────────────────────────
  {
    week: 13,
    topic: "SOAP vs REST",
    question:
      "Compared with REST, SOAP is typically described as:",
    options: [
      "Stateless, lightweight, and JSON-only",
      "Supporting stateful operations, XML-based, stricter, and slower due to XML parsing overhead",
      "Faster because it uses binary encoding instead of text",
      "Incapable of supporting security features like digital signatures",
    ],
    answer: 1,
    explanation:
      "SOAP supports stateful operations (via WS-* extensions), uses strict XML formatting, is defined by W3C standards, and is slower than REST because of XML parsing overhead. REST is generally simpler, stateless, and faster especially with JSON.",
  },
  {
    week: 13,
    topic: "SOAP",
    question:
      "A system that requires ACID-compliant distributed transactions (e.g., booking a flight and a hotel atomically) is best served by:",
    options: [
      "RESTful web services with JSON",
      "WebSocket streaming",
      "SOAP web services",
      "GraphQL subscriptions",
    ],
    answer: 2,
    explanation:
      "SOAP supports ACID-compliant transactions and advanced security (WS-Security, WS-ReliableMessaging), making it well-suited for systems requiring strict consistency across distributed operations.",
  },
  {
    week: 13,
    topic: "WSDL",
    question:
      "What is WSDL (Web Services Description Language)?",
    options: [
      "A runtime protocol for sending binary messages between services",
      "An XML-based language used to define and describe web services — what they do, where to find them, and how to send and receive messages",
      "A REST constraint that enforces a uniform interface",
      "A Java framework for building microservices",
    ],
    answer: 1,
    explanation:
      "WSDL is an XML-based language that describes a web service's operations, message formats, and endpoint location, enabling automatic discovery and code generation.",
  },
  {
    week: 13,
    topic: "WSDL structure",
    question:
      "In a WSDL document, which element defines the actual web service and its endpoint URL?",
    options: [
      "<portType>",
      "<binding>",
      "<message>",
      "<service>",
    ],
    answer: 3,
    explanation:
      "The <service> element in WSDL defines the actual web service and specifies the endpoint URL (e.g., http://localhost:8080/soap). <portType> defines operations, <binding> specifies the protocol, and <message> describes inputs/outputs.",
  },
  // ── Message-Oriented Middleware ─────────────────────────────────────────────
  {
    week: 13,
    topic: "Message-Oriented Middleware",
    question:
      "Message-Oriented Middleware (MOM) primarily aims to:",
    options: [
      "Replace RESTful APIs with synchronous remote procedure calls",
      "Decouple producers and consumers by handling message transmission, routing, persistence, and delivery guarantees asynchronously",
      "Force all services to communicate using shared memory",
      "Synchronously bind services so they respond in real time to each request",
    ],
    answer: 1,
    explanation:
      "MOM decouples producers and consumers — they only need to agree on the message format, not each other's existence. MOM handles routing, persistence, and delivery guarantees asynchronously.",
  },
  {
    week: 13,
    topic: "MOM message models",
    question:
      "In MOM, the Publish-Subscribe model differs from Point-to-Point in that:",
    options: [
      "Point-to-Point sends one message to many subscribers; Publish-Subscribe sends to exactly one consumer",
      "Publish-Subscribe uses topics and delivers one message to many subscribers; Point-to-Point uses queues and delivers to exactly one consumer",
      "Both models use the same queue mechanism and produce identical results",
      "Publish-Subscribe requires synchronous communication while Point-to-Point is asynchronous",
    ],
    answer: 1,
    explanation:
      "Point-to-Point (queues): one message goes to exactly one consumer. Publish-Subscribe (topics): one message goes to all subscribers. RabbitMQ supports both via fanout exchanges (Pub-Sub) and direct queues (P2P).",
  },
  {
    week: 13,
    topic: "RabbitMQ",
    question:
      "In RabbitMQ, what is the role of an Exchange?",
    options: [
      "It stores messages permanently to disk for disaster recovery",
      "It acts as the consuming application that processes messages",
      "It routes incoming messages to the appropriate queues based on exchange type such as direct, fanout, topic, or headers",
      "It defines the WSDL contract between producer and consumer",
    ],
    answer: 2,
    explanation:
      "In RabbitMQ an Exchange receives messages from producers and routes them to queues based on the exchange type: fanout (broadcast to all queues), direct (exact routing key), topic (pattern match), headers.",
  },
  // ── Software Architecture Patterns ──────────────────────────────────────────
  {
    week: 13,
    topic: "Architecture vs design patterns",
    question:
      "What is the key scope difference between a Software Architecture Pattern and a Design Pattern?",
    options: [
      "Architecture patterns apply to specific class interactions; design patterns apply to whole systems",
      "Architecture patterns are high-level blueprints for the whole system; design patterns are reusable solutions for specific class or object problems",
      "Architecture patterns are only used in object-oriented languages; design patterns apply to any paradigm",
      "There is no meaningful difference — both terms describe the same thing",
    ],
    answer: 1,
    explanation:
      "Architecture patterns (e.g., Layered, Event-Driven, Microservices) describe how major system components are organized — scope: whole system. Design patterns (e.g., Factory, Decorator, Adapter) solve specific class-level or object-interaction problems.",
  },
  {
    week: 13,
    topic: "Layered architecture",
    question:
      "In the Layered (n-tier) Architecture pattern, a 'closed' layer means:",
    options: [
      "The layer is read-only and cannot be modified at runtime",
      "Requests must pass through that layer before reaching the next one; they cannot skip it",
      "The layer is open-source and freely accessible from any other layer",
      "The layer has no components inside it",
    ],
    answer: 1,
    explanation:
      "A closed layer enforces that requests must flow through it sequentially (Presentation → Business → Persistence → Database). An open layer allows requests to bypass it when justified. Closed layers promote isolation — changes in one layer do not impact others.",
  },
  {
    week: 13,
    topic: "Layered architecture",
    question:
      "The 'architecture sinkhole' anti-pattern in Layered Architecture occurs when:",
    options: [
      "Too many open layers bypass business logic, improving performance",
      "Requests pass through multiple layers that add no meaningful logic or processing, wasting effort and causing a performance hit",
      "The database layer is directly accessible from the presentation layer",
      "The system has fewer than three layers and cannot separate concerns",
    ],
    answer: 1,
    explanation:
      "An architecture sinkhole happens when requests simply pass through layers without any layer adding real value — wasted code, increased complexity, tighter coupling, and unnecessary performance overhead.",
  },
  {
    week: 13,
    topic: "Layered architecture disadvantages",
    question:
      "Which of the following is a disadvantage of the Layered Architecture pattern?",
    options: [
      "It is unfamiliar to most developers, making onboarding expensive",
      "It offers very high agility since individual layers can be deployed independently",
      "It tends to produce monolithic applications that rely on vertical scaling and struggle to scale individual components independently",
      "It makes unit testing almost impossible because layers are hidden from test frameworks",
    ],
    answer: 2,
    explanation:
      "The Layered pattern typically compiles and deploys as a single unit (monolith), relies on vertical scaling (bigger servers rather than more servers), and makes it hard to scale just one feature independently.",
  },
  {
    week: 13,
    topic: "Layered architecture — when to use",
    question:
      "Layered Architecture is most appropriate for which type of application?",
    options: [
      "Real-time high-throughput event streaming with dynamic event flows",
      "CRUD-heavy applications with a stable, predictable domain model where distributed systems are overkill",
      "Applications that require each feature to scale independently based on load",
      "Systems where plug-in modules are added and removed at runtime without redeployment",
    ],
    answer: 1,
    explanation:
      "Layered architecture suits CRUD-heavy apps with a stable domain model and low need for distributed deployment. When you need fine-grained independent scaling or runtime extensibility, other patterns such as microservices or microkernel are better.",
  },
  {
    week: 13,
    topic: "Event-Driven Architecture",
    question:
      "Event-Driven Architecture (EDA) is best characterized as:",
    options: [
      "A synchronous, tightly coupled pattern where components call each other directly via REST",
      "A distributed asynchronous pattern where event producers and consumers are loosely coupled and interact through events, not direct calls",
      "A layered pattern where events replace HTTP requests at each tier",
      "A pattern that requires all components to share a single database",
    ],
    answer: 1,
    explanation:
      "EDA is a popular distributed, asynchronous architecture. Components (event producers and consumers) are loosely coupled — they interact only through events, not through direct invocations. This enables high scalability and agility.",
  },
  {
    week: 13,
    topic: "EDA — mediator vs broker",
    question:
      "In Event-Driven Architecture, the key difference between the Mediator and Broker topologies is:",
    options: [
      "The Mediator uses a message queue for all events; the Broker uses HTTP only",
      "The Mediator has a central orchestrator that coordinates event processing steps; the Broker has no central coordinator — processors communicate via publish/subscribe through a message broker",
      "The Broker topology requires all event processors to share the same codebase",
      "The Mediator topology is stateless; the Broker topology is always stateful",
    ],
    answer: 1,
    explanation:
      "Mediator: a central Event Mediator receives an event, determines the steps, and coordinates them via event channels to Event Processors. Broker: no central coordinator; processors publish events and other processors subscribe to them via a broker such as Kafka or RabbitMQ.",
  },
  {
    week: 13,
    topic: "EDA — mediator topology",
    question:
      "In the EDA Mediator topology, which component 'knows the sequence of steps' and coordinates processing?",
    options: [
      "The Event Channel",
      "The Event Processor",
      "The Event Mediator",
      "The Event Queue",
    ],
    answer: 2,
    explanation:
      "The Event Mediator is the 'brain' that determines what steps are needed to process an event and coordinates them by sending processing events to Event Channels. Event Processors then listen to those channels and perform their specific tasks.",
  },
  {
    week: 13,
    topic: "EDA — broker topology",
    question:
      "When should you prefer the Broker topology over the Mediator topology in EDA?",
    options: [
      "When you need strict, centrally controlled step-by-step orchestration of complex workflows",
      "When you want maximum decoupling, the event flow changes often, and you need easy plug-and-play of processors for real-time high-throughput systems",
      "When you want all processing to happen synchronously and in a fixed order",
      "When your system has very few events and simple routing requirements",
    ],
    answer: 1,
    explanation:
      "Broker topology is preferred when maximum decoupling is needed, event flows are dynamic, processors need to scale independently (plug-and-play), and throughput or real-time processing is critical. Mediator is better for fixed, coordinated workflows.",
  },
  {
    week: 13,
    topic: "MOM reliability",
    question:
      "Which MOM characteristic ensures that messages are not lost across consumer failures, by supporting retries, acknowledgments, and dead letter queues?",
    options: [
      "Durability",
      "Scalability",
      "Reliability",
      "Asynchronous Communication",
    ],
    answer: 2,
    explanation:
      "Reliability in MOM ensures messages are not lost: the middleware supports retries (if a consumer fails), acknowledgments (confirming receipt), and dead letter queues (for messages that cannot be processed).",
  },
  {
    week: 13,
    topic: "OpenAPI",
    question:
      "OpenAPI (formerly Swagger Specification) is primarily used for:",
    options: [
      "Defining binary message contracts for SOAP web services",
      "Documenting and designing RESTful web services in a machine-readable format (YAML or JSON), enabling code generation and interactive testing via Swagger UI",
      "Providing runtime security for microservices via OAuth2 tokens",
      "Replacing WSDL as the description language for SOAP services",
    ],
    answer: 1,
    explanation:
      "OpenAPI is a specification for documenting and designing RESTful web services using YAML or JSON. It enables standardized documentation, automated code generation for clients and servers, interactive testing tools (Swagger UI), and API version control.",
  },
  {
    week: 13,
    topic: "Architecture pattern selection",
    question:
      "A startup needs a real-time stock trading platform where events (trades, price updates) must fan out to many independent services with high throughput and no single point of orchestration failure. Which pattern fits best?",
    options: [
      "Layered (n-tier) Architecture",
      "Event-Driven Architecture with Broker topology",
      "Event-Driven Architecture with Mediator topology",
      "SOAP-based Service-Oriented Architecture",
    ],
    answer: 1,
    explanation:
      "Broker topology in EDA is ideal here: high throughput, no central coordinator (removing a single point of failure), maximum decoupling between producers and consumers, and easy horizontal scaling of individual processors.",
  },
  {
    week: 13,
    topic: "Kafka vs RabbitMQ",
    question:
      "Which of the following best distinguishes Apache Kafka from RabbitMQ?",
    options: [
      "Kafka is a traditional message queue; RabbitMQ is a distributed log-based event stream",
      "Kafka is a distributed log-based event stream with high throughput and persistent storage; RabbitMQ is a message queue broker with flexible routing via exchanges using AMQP",
      "Both Kafka and RabbitMQ only support the Point-to-Point message model",
      "RabbitMQ supports replay of past messages; Kafka does not support message persistence",
    ],
    answer: 1,
    explanation:
      "Kafka is a distributed, append-only log optimized for high throughput and persistent storage, supporting message replay. RabbitMQ is a traditional message broker with flexible routing (direct, fanout, topic, headers) via AMQP exchanges, optimized for work distribution.",
  },
  {
    week: 13,
    topic: "REST statelessness benefits",
    question:
      "Which of the following is a direct benefit of REST's statelessness constraint?",
    options: [
      "The server can maintain rich session context, making personalization easier",
      "Responses can never be cached because each request is unique",
      "The server scales easily since it does not maintain per-client session state, and a failure in one request does not affect others",
      "Clients do not need to send authentication tokens with every request",
    ],
    answer: 2,
    explanation:
      "Statelessness enables server scalability (no session affinity needed — any server can handle any request), fault isolation (one failed request does not affect others), and improved cacheability (responses are not tied to session state).",
  },
];

export default questions;
