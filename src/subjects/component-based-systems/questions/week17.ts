import type { Question } from "../../types";

const questions: Question[] = [
  // answer: 1
  {
    week: 17,
    topic: "Database-per-service",
    question:
      "In the database-per-service pattern, which statement is correct about data ownership?",
    options: [
      "Any microservice may read directly from another service's database for performance",
      "Each microservice owns its database exclusively; no other service may read or write it directly",
      "A shared relational database is used but access is controlled by a single gateway service",
      "Databases are shared between services that belong to the same bounded context",
    ],
    answer: 1,
    explanation:
      "The database-per-service pattern mandates that each service owns and exclusively accesses its own database. No other service may read or write that database directly; data exchange happens only via the service's API or events.",
  },
  // answer: 2
  {
    week: 17,
    topic: "Database-per-service",
    question:
      "Which of the following is a benefit of enforcing one database per microservice?",
    options: [
      "Cross-service joins become simpler because each service knows the others' schemas",
      "It eliminates the need for eventual consistency entirely",
      "Each service can choose the most suitable storage technology (SQL, NoSQL, graph DB)",
      "A single failure cannot propagate because all data is replicated centrally",
    ],
    answer: 2,
    explanation:
      "Database-per-service allows polyglot persistence: each service selects the storage technology best suited to its workload. The pattern does NOT eliminate eventual consistency — it makes it necessary.",
  },
  // answer: 1
  {
    week: 17,
    topic: "Database-per-service",
    question:
      "Which of the following is a challenge of the database-per-service pattern?",
    options: [
      "Services become tightly coupled at the schema level",
      "Cross-service queries are difficult because data cannot be joined across service-owned databases",
      "All services must use the same database engine",
      "Independent deployment of services is no longer possible",
    ],
    answer: 1,
    explanation:
      "Because each service owns its database, SQL JOINs across service boundaries are not possible. Cross-service queries require API calls, event-driven aggregation, or CQRS read models — making them significantly harder than in a monolith.",
  },
  // answer: 3
  {
    week: 17,
    topic: "Event Sourcing",
    question: "What is the core idea behind Event Sourcing?",
    options: [
      "Store only the latest snapshot of each entity in a relational table",
      "Publish domain events to a message broker without persisting them locally",
      "Replace the write database with a read-optimised materialized view",
      "Store all changes to application state as a sequence of immutable, append-only events",
    ],
    answer: 3,
    explanation:
      "Event Sourcing stores every state change as an immutable event in an append-only event store rather than overwriting the current state. The current state is derived by replaying the event log.",
  },
  // answer: 1
  {
    week: 17,
    topic: "Event Sourcing",
    question:
      "A bank account managed with Event Sourcing has this log: AccountOpened {balance:0}, MoneyDeposited {amount:1000}, MoneyWithdrawn {amount:500}, MoneyDeposited {amount:200}. What is the current balance after replaying?",
    options: ["500", "700", "1200", "200"],
    answer: 1,
    explanation:
      "Replaying the events: 0 + 1000 − 500 + 200 = 700. Event Sourcing builds current state by replaying the full event sequence from the append-only store.",
  },
  // answer: 0
  {
    week: 17,
    topic: "Event Sourcing",
    question:
      "Which of the following is a trade-off (disadvantage) of Event Sourcing?",
    options: [
      "The read model must be built separately because the event store is optimised for writes, not queries",
      "No audit trail — history of changes is permanently lost",
      "Events can be modified in-place to correct mistakes easily",
      "It is incompatible with message brokers such as Kafka or RabbitMQ",
    ],
    answer: 0,
    explanation:
      "Because the event store is append-only and optimised for writes, querying current state requires a separately maintained read model (projection/materialized view). This is a key trade-off alongside added complexity and versioning concerns.",
  },
  // answer: 2
  {
    week: 17,
    topic: "Event Sourcing",
    question:
      "In Event Sourcing, 'time travel' (temporal queries) refers to which capability?",
    options: [
      "Scheduling future events to execute at a specific date and time",
      "Synchronising clocks across distributed microservices",
      "Answering 'what was the state at time X?' by replaying events up to that point",
      "Rolling back the entire database to a previous migration version",
    ],
    answer: 2,
    explanation:
      "Because events are immutable and ordered, you can replay only the events up to a given timestamp to reconstruct exactly what the state was at that moment — enabling temporal queries ('time travel').",
  },
  // answer: 1
  {
    week: 17,
    topic: "CQRS",
    question:
      "CQRS (Command Query Responsibility Segregation) addresses scalability primarily by:",
    options: [
      "Combining reads and writes into a single optimised data model",
      "Separating read and write operations into distinct models that can scale independently",
      "Replacing the relational database with an in-memory cache for all operations",
      "Eliminating the need for a message broker between services",
    ],
    answer: 1,
    explanation:
      "CQRS separates the Command model (handles writes: Create, Update, Delete) from the Query model (handles reads). Because reads are typically 80–95% of traffic and writes 5–20%, the two models can be scaled, optimised, and stored independently.",
  },
  // answer: 3
  {
    week: 17,
    topic: "CQRS",
    question:
      "In a CQRS architecture, what does the Command model handle?",
    options: [
      "Read-only queries optimised for high-throughput caching",
      "Routing incoming HTTP requests to the correct microservice",
      "Producing materialized views from the event bus",
      "Data-modifying operations such as Create, Update, and Delete",
    ],
    answer: 3,
    explanation:
      "The Command model handles data-modifying operations (CUD). It writes to the write database or event store. The Query model handles read-only operations against a separately maintained read database or materialized view.",
  },
  // answer: 1
  {
    week: 17,
    topic: "CQRS",
    question:
      "A known challenge of CQRS is that the read model may lag behind the write model after a command. Which consistency model does this exemplify?",
    options: [
      "Strong consistency",
      "Eventual consistency",
      "Causal consistency",
      "Linearisability",
    ],
    answer: 1,
    explanation:
      "Because the write and read databases are separate and synchronised asynchronously via an event bus, the read model may momentarily lag behind — this is eventual consistency, and it is listed in the lecture as a key CQRS challenge.",
  },
  // answer: 0
  {
    week: 17,
    topic: "CQRS",
    question:
      "Why does traditional CRUD fail under heavy load according to the lecture?",
    options: [
      "One model must serve both heavy read traffic (80–95%) and complex write validation simultaneously, causing locking, bloated entities, and scalability issues",
      "CRUD does not support NoSQL databases",
      "CRUD requires two-phase commit for every write operation",
      "CRUD cannot be used with REST APIs",
    ],
    answer: 0,
    explanation:
      "A single CRUD model must handle business rules, validation, joins, reporting, and search — while reads are 80–95% of traffic and writes 5–20%. The mismatch causes locking/contention, slow queries, bloated entities, and hard-to-scale systems.",
  },
  // answer: 2
  {
    week: 17,
    topic: "2PC",
    question:
      "In the Two-Phase Commit (2PC) protocol, what happens during the Prepare Phase?",
    options: [
      "The coordinator sends a commit command and all nodes release their locks",
      "Each node independently commits its local transaction without coordination",
      "The coordinator sends a prepare message; each node acquires a lock and replies yes or no",
      "The saga orchestrator issues compensating transactions to all participating services",
    ],
    answer: 2,
    explanation:
      "In the Prepare Phase, the coordinator sends a 'prepare' to all nodes. Each node acquires a lock on the resource and replies 'yes' (ready) or 'no' (abort). In the Commit Phase, if all replied 'yes', the coordinator sends 'commit' and nodes commit and release locks.",
  },
  // answer: 1
  {
    week: 17,
    topic: "2PC",
    question:
      "Why is 2PC considered risky in cloud-native microservices?",
    options: [
      "It requires all services to use the same programming language",
      "It assumes synchronous reliable communication and holds locks, causing blocking and deadlocks that break resilience goals",
      "It is too fast — services cannot process commits quickly enough",
      "It is only compatible with NoSQL databases",
    ],
    answer: 1,
    explanation:
      "2PC assumes synchronous, reliable communication. In microservices, if one participant is slow or crashes, all others remain locked — breaking resilience and scalability. This is why Sagas are preferred over 2PC in microservice architectures.",
  },
  // answer: 3
  {
    week: 17,
    topic: "Saga pattern",
    question:
      "A Saga maintains data consistency across microservices without distributed transactions by:",
    options: [
      "Using a single shared database with a two-phase locking protocol",
      "Wrapping all service calls in a distributed ACID transaction managed by the API gateway",
      "Blocking all participating services until the slowest one completes",
      "Executing a sequence of local transactions where each step emits an event triggering the next; failures trigger compensating transactions",
    ],
    answer: 3,
    explanation:
      "A Saga is a sequence of local transactions. Each local transaction updates its own database and publishes an event (or sends a command) to trigger the next step. If any step fails, compensating transactions undo prior committed steps, achieving eventual consistency without distributed locks.",
  },
  // answer: 1
  {
    week: 17,
    topic: "Saga pattern",
    question:
      "In a Choreography-based Saga, how does one service trigger the next step in the workflow?",
    options: [
      "It calls the next service directly via synchronous REST and waits for a response",
      "It publishes an event to a message broker; the next service subscribes and reacts to the event",
      "It sends a command to a central saga orchestrator which then forwards it",
      "It writes a flag to the shared database that the next service polls",
    ],
    answer: 1,
    explanation:
      "In choreography, services react to events: each service performs its local transaction, publishes an event to the message broker (e.g. Kafka), and the next service subscribes and handles it autonomously. There is no central controller.",
  },
  // answer: 2
  {
    week: 17,
    topic: "Saga pattern",
    question:
      "Which of the following is a listed challenge of choreography-based Sagas?",
    options: [
      "The orchestrator becomes a single point of failure",
      "The workflow logic is centralised and hard to modify",
      "The full business workflow is hard to visualise because logic is spread across services with no central definition",
      "Services cannot subscribe to more than one event topic simultaneously",
    ],
    answer: 2,
    explanation:
      "In choreography there is no single place where the complete workflow is defined. The flow is implicit in event subscriptions of each service, making it hard to visualise, debug, and reason about. The orchestrator SPOF is a limitation of orchestration, not choreography.",
  },
  // answer: 0
  {
    week: 17,
    topic: "Saga pattern",
    question:
      "In an Orchestration-based Saga, which component manages the entire workflow?",
    options: [
      "A central Saga Orchestrator that sends commands via request channels and receives replies on a single shared reply channel",
      "Direct REST calls between participant services coordinated by the API Gateway",
      "A shared event store that every service polls independently",
      "Each microservice independently decides the next step based on its own state",
    ],
    answer: 0,
    explanation:
      "In orchestration, a central Saga Orchestrator sends commands to each participant via per-service request channels and listens for replies on a single reply channel. Participant services do not communicate with each other — they only respond to the orchestrator.",
  },
  // answer: 1
  {
    week: 17,
    topic: "Saga pattern",
    question:
      "What is a 'compensating transaction' in the Saga pattern?",
    options: [
      "A second attempt to re-execute a failed local transaction with the same parameters",
      "A transaction that semantically undoes the changes of a previously committed local transaction when a later step fails",
      "A rollback command issued by the 2PC coordinator to all participants simultaneously",
      "A read-only query used to verify state before committing a saga step",
    ],
    answer: 1,
    explanation:
      "Because committed local transactions cannot be rolled back in the database sense, the Saga uses compensating transactions — semantically inverse operations (e.g. rejectOrder() compensates createOrder()) — to undo the effect of earlier committed steps when a later step fails.",
  },
  // answer: 1
  {
    week: 17,
    topic: "Saga pattern",
    question:
      "In the Create Order Saga (steps: createOrder → verifyConsumer → createTicket → authorizeCard → approveTicket → approveOrder), which step has NO compensating transaction?",
    options: [
      "createOrder() — compensated by rejectOrder()",
      "verifyConsumerDetails() — has no compensating transaction because it is read-only",
      "createTicket() — compensated by rejectTicket()",
      "approveOrder() — compensated by a rollback to pending",
    ],
    answer: 1,
    explanation:
      "verifyConsumerDetails() is a read-only validation step that causes no state change, so no compensating transaction is needed. Not all saga steps need compensating transactions — only those that write state that may need to be undone.",
  },
  // answer: 3
  {
    week: 17,
    topic: "Saga vs 2PC",
    question:
      "Compared to 2PC, the Saga pattern provides better microservice resilience because:",
    options: [
      "Sagas use synchronous locking to guarantee atomicity across all participants",
      "Sagas use the same two-phase protocol but only for two services at a time",
      "Sagas require a single shared database, eliminating network round-trips",
      "Sagas avoid distributed locks by using local transactions and compensating transactions, so a failed service does not block others",
    ],
    answer: 3,
    explanation:
      "2PC holds locks on all participants until the coordinator commits or aborts — if one service fails, all others are stuck. Sagas commit locally and use compensating transactions on failure, so no distributed locks are held and other services remain unblocked.",
  },
  // answer: 2
  {
    week: 17,
    topic: "gRPC vs REST",
    question:
      "According to the lecture's gRPC vs REST comparison, which feature gives gRPC a stronger inter-service contract than REST?",
    options: [
      "HTTP/2 transport protocol",
      "Protobuf binary payload format, which is faster",
      "Proto files that define a strong, machine-enforced contract between services",
      "JSON payload format for human readability",
    ],
    answer: 2,
    explanation:
      "gRPC uses Protocol Buffer (proto) files as a strong, enforced contract. REST typically uses OpenAPI (Swagger) which the lecture characterises as a 'weak' contract because it is not enforced at the protocol level.",
  },
  // answer: 1
  {
    week: 17,
    topic: "Microservices challenges",
    question:
      "Which of the following is listed in the lecture as a top-level challenge of microservices architectures?",
    options: [
      "Services cannot be deployed independently of each other",
      "Distributed Data Management — coordinating data consistency across service-owned databases",
      "Each service is forced to use the same technology stack",
      "Horizontal scaling is impossible in a microservice architecture",
    ],
    answer: 1,
    explanation:
      "The lecture lists five challenges: Complexity in Communication, Distributed Data Management, Monitoring and Debugging Complexity, Eventual Consistency, and Deployment Overhead. Distributed Data Management — the inability to use ACID transactions across service-owned databases — is central to Week 17.",
  },
  // answer: 0
  {
    week: 17,
    topic: "Event Sourcing + CQRS",
    question:
      "Why does the lecture state that 'Eventual Consistency + Event Sourcing needs CQRS'?",
    options: [
      "Event Sourcing stores state as events optimised for writes, so a separate read model built via CQRS is needed to serve efficient queries",
      "CQRS eliminates eventual consistency by using synchronous writes to both read and write models",
      "CQRS requires a single database shared between the command and query sides",
      "Event Sourcing cannot work with message brokers, so CQRS replaces them",
    ],
    answer: 0,
    explanation:
      "Event Sourcing appends events to a write-optimised store; querying this directly is inefficient. CQRS complements Event Sourcing by projecting events into purpose-built read models (materialized views) that serve queries efficiently. Eventual consistency arises from the asynchronous propagation of events to the read model.",
  },
  // answer: 2
  {
    week: 17,
    topic: "Orchestration vs Choreography",
    question:
      "Which limitation of Orchestration-based Sagas is highlighted in the lecture?",
    options: [
      "There is no way to add compensating transactions in orchestration",
      "Services must subscribe to and understand specific events, causing tight event coupling",
      "The orchestrator can become a single point of failure and its centralised logic may violate microservice autonomy",
      "Orchestration is incompatible with message brokers like Kafka",
    ],
    answer: 2,
    explanation:
      "The lecture lists three orchestration limitations: (1) single point of failure — the orchestrator is a critical component; (2) centralized logic may violate microservice autonomy; (3) complexity grows fast as workflows scale. Option B describes a choreography challenge, not orchestration.",
  },
];

export default questions;
