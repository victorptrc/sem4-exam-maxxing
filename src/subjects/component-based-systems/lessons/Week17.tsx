import {
  ArrowRightLeft,
  Database,
  GitBranch,
  Layers,
  Network,
  Server,
  Share2,
  Workflow,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Callout } from "@/components/Callout";
import { Diagram } from "@/components/Diagram";
import { FlashcardDeck } from "@/components/Flashcard";
import { LessonSection } from "@/components/LessonLayout";
import { MiniQuiz } from "@/components/MiniQuiz";
import questions from "../questions/week17";

export default function Week17() {
  return (
    <>
      <Callout type="key" title="Big picture">
        Week 17 is a deep dive into <strong>data management patterns for microservices</strong>:
        how each service keeps its own database, how we achieve consistency without distributed
        locks (Sagas vs 2PC), how Event Sourcing replaces destructive updates with an immutable
        event log, and how CQRS separates read and write models so each can scale independently.
      </Callout>

      {/* ─────────────────────── Microservices challenges ─────────────────────── */}
      <LessonSection title="Challenges of Microservices" icon={Network}>
        <p>
          Microservices give us independent deployability and fine-grained scaling, but they
          introduce five recurring challenges you must know for the exam:
        </p>
        <ul>
          <li><strong>Complexity in Communication</strong> — many services calling each other over the network.</li>
          <li><strong>Distributed Data Management</strong> — no single database means no free ACID transactions across services.</li>
          <li><strong>Monitoring and Debugging Complexity</strong> — tracing a request across dozens of services is hard.</li>
          <li><strong>Eventual Consistency</strong> — data written to one service's DB is not immediately visible elsewhere.</li>
          <li><strong>Deployment Overhead</strong> — many independently running processes to configure, deploy, and monitor.</li>
        </ul>
        <p>
          The recap slides also remind you that the course path has been:
          Component-Based {"->"} Service-Oriented {"->"} API Gateways {"->"} Service Discovery {"->"} gRPC.
        </p>

        <Accordion type="single" collapsible className="rounded-lg border px-4">
          <AccordionItem value="grpc-vs-rest">
            <AccordionTrigger>gRPC vs REST — quick comparison (exam table)</AccordionTrigger>
            <AccordionContent>
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="text-left p-2 border">Feature</th>
                    <th className="text-left p-2 border">gRPC</th>
                    <th className="text-left p-2 border">REST</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="p-2 border">Transport</td><td className="p-2 border font-semibold">HTTP/2</td><td className="p-2 border">HTTP/1.1</td></tr>
                  <tr><td className="p-2 border">Payload</td><td className="p-2 border font-semibold">Protobuf (binary)</td><td className="p-2 border">JSON (text)</td></tr>
                  <tr><td className="p-2 border">Speed</td><td className="p-2 border">Faster</td><td className="p-2 border">Slower</td></tr>
                  <tr><td className="p-2 border">Streaming</td><td className="p-2 border">Supported</td><td className="p-2 border">Limited</td></tr>
                  <tr><td className="p-2 border font-semibold">Contract</td><td className="p-2 border font-semibold text-green-700">Strong (proto files)</td><td className="p-2 border font-semibold text-amber-700">Weak (OpenAPI)</td></tr>
                </tbody>
              </table>
              <p className="mt-2 text-sm text-muted-foreground">
                The <strong>contract</strong> row is the most commonly tested: gRPC proto files
                are machine-enforced; OpenAPI is descriptive only.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </LessonSection>

      {/* ─────────────────────── Database-per-service ─────────────────────── */}
      <LessonSection title="Database-per-Service Pattern" icon={Database}>
        <p>
          The <strong>database-per-service</strong> pattern is the microservices answer to shared
          databases. Each service owns and exclusively accesses its own dedicated database —{" "}
          <strong>no other service may read or write it directly</strong>.
        </p>

        <Diagram caption="API Gateway fronts five microservices, each with its own dedicated database (polyglot persistence).">
          <svg viewBox="0 0 520 260" width="520" height="260" role="img">
            {/* Client */}
            <rect x="210" y="10" width="100" height="36" rx="6" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
            <text x="260" y="33" textAnchor="middle" fontSize="12" fontWeight="700" fill="#075985">Client / UI</text>
            {/* Arrow down to gateway */}
            <line x1="260" y1="46" x2="260" y2="68" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrow17)" />
            {/* API Gateway */}
            <rect x="185" y="68" width="150" height="36" rx="6" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
            <text x="260" y="91" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">API Gateway</text>
            {/* Arrow lines to services */}
            <line x1="60"  y1="104" x2="60"  y2="130" stroke="#64748b" strokeWidth="1.2" />
            <line x1="150" y1="104" x2="150" y2="130" stroke="#64748b" strokeWidth="1.2" />
            <line x1="260" y1="104" x2="260" y2="130" stroke="#64748b" strokeWidth="1.2" />
            <line x1="370" y1="104" x2="370" y2="130" stroke="#64748b" strokeWidth="1.2" />
            <line x1="460" y1="104" x2="460" y2="130" stroke="#64748b" strokeWidth="1.2" />
            {/* Fan-out line */}
            <line x1="60" y1="104" x2="460" y2="104" stroke="#64748b" strokeWidth="1.2" />
            <line x1="260" y1="104" x2="260" y2="104" stroke="#64748b" strokeWidth="1.2" />
            <line x1="260" y1="86" x2="260" y2="104" stroke="#64748b" strokeWidth="1.5" />
            {/* Services */}
            {[60, 150, 260, 370, 460].map((x, i) => (
              <g key={i}>
                <rect x={x - 42} y={130} width={84} height={30} rx="4" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
                <text x={x} y={150} textAnchor="middle" fontSize="9" fontWeight="600" fill="#166534">
                  {["Order", "Inventory", "Payment", "Shipping", "Notify"][i]} Svc
                </text>
                {/* DB */}
                <ellipse cx={x} cy={192} rx={28} ry={10} fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
                <rect x={x - 28} y={192} width={56} height={24} fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
                <ellipse cx={x} cy={216} rx={28} ry={10} fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
                <line x1={x} y1={160} x2={x} y2={182} stroke="#64748b" strokeWidth="1.2" />
                <text x={x} y={240} textAnchor="middle" fontSize="8" fill="#1e40af">DB</text>
              </g>
            ))}
            <defs>
              <marker id="arrow17" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                <path d="M0,0 L0,6 L6,3 z" fill="#64748b" />
              </marker>
            </defs>
          </svg>
        </Diagram>

        <p className="font-semibold mt-2">Why enforce database-per-service?</p>
        <ul>
          <li><strong>Isolation &amp; Resilience</strong> — one service's failure doesn't corrupt shared data.</li>
          <li><strong>Prevents tight coupling</strong> — no schema changes in one service break another.</li>
          <li><strong>Polyglot persistence</strong> — each service chooses the best storage technology (SQL, NoSQL, graph DB, search index).</li>
          <li><strong>Independent scaling</strong> — scale each database based on that service's workload.</li>
        </ul>

        <Callout type="trap" title="Challenges you must know">
          <ul>
            <li><strong>Data duplication</strong> — some data must be copied across services.</li>
            <li><strong>Cross-service queries are hard</strong> — you cannot JOIN across service databases.</li>
            <li><strong>Consistency requires Sagas and eventual consistency</strong> — no global ACID.</li>
            <li><strong>Complex debugging</strong> — tracing data flows across services is harder.</li>
          </ul>
        </Callout>
      </LessonSection>

      {/* ─────────────────────── Event Sourcing ─────────────────────── */}
      <LessonSection title="Event Sourcing" icon={GitBranch}>
        <p>
          Traditional systems store only the <em>current state</em> (a destructive UPDATE that
          loses history). <strong>Event Sourcing</strong> stores <strong>every state change as an
          immutable event</strong> in an <strong>append-only event store</strong>. The current
          state is rebuilt by <strong>replaying</strong> the event log.
        </p>
        <p>
          Example (banking): instead of <code>UPDATE user SET balance = 5500</code>, the store
          holds{" "}
          <code>AccountOpened, MoneyDeposited&#123;1000&#125;, MoneyWithdrawn&#123;500&#125;</code>.
          Replaying gives the correct balance — and a perfect audit trail.
        </p>

        <Accordion type="single" collapsible className="rounded-lg border px-4">
          <AccordionItem value="es-concepts">
            <AccordionTrigger>Key concepts in Event Sourcing</AccordionTrigger>
            <AccordionContent>
              <ul>
                <li><strong>Event store</strong> — append-only log; each microservice writes to its own store.</li>
                <li><strong>Message broker</strong> (Kafka, RabbitMQ) — used to share important events with other services.</li>
                <li><strong>Replay</strong> — replaying the event log rebuilds the current state at any point in time.</li>
                <li><strong>Time travel / temporal queries</strong> — "what was the state at time X?" answered by partial replay.</li>
                <li><strong>Materialized view</strong> — a pre-computed read model built by consuming events; enables fast queries.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="es-tradeoffs">
            <AccordionTrigger>Benefits vs trade-offs</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold text-green-700 mb-1">Benefits</p>
                  <ul>
                    <li>Complete audit trail</li>
                    <li>Rebuild state anytime via event replay</li>
                    <li>Loose coupling between services</li>
                    <li>Temporal queries ("time travel")</li>
                    <li>Append-only is performance-friendly</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-red-700 mb-1">Trade-offs</p>
                  <ul>
                    <li>More complexity (events, handlers, projections)</li>
                    <li>Events must be backward-compatible (versioning)</li>
                    <li>Read model must be built separately</li>
                    <li>Requires tooling for event inspection/debugging</li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </LessonSection>

      {/* ─────────────────────── CQRS ─────────────────────── */}
      <LessonSection title="CQRS — Command Query Responsibility Segregation" icon={ArrowRightLeft}>
        <p>
          <strong>CQRS</strong> is a design pattern that <strong>separates read and write
          operations into distinct models</strong>. This solves the problem that traditional
          CRUD uses one model for everything — but reads are 80–95% of traffic while writes are
          only 5–20%, so the same schema must satisfy business rules, validation, joins, reporting
          and search simultaneously.
        </p>
        <ul>
          <li>
            <strong>Command Model</strong> — handles data-modifying operations (Create, Update,
            Delete); writes to the write database (often an event store).
          </li>
          <li>
            <strong>Query Model</strong> — handles read-only operations against a separately
            maintained read database / materialized view; optimised for caching and high
            throughput.
          </li>
        </ul>

        <Callout type="trap" title="CQRS challenges — these are commonly tested">
          <ul>
            <li>
              <strong>Eventual consistency</strong> — the read model may lag behind the write model
              because synchronisation happens asynchronously via an event bus.
            </li>
            <li>
              <strong>Increased complexity</strong> — more moving parts: events, sync logic,
              projection handlers.
            </li>
            <li>
              <strong>More code paths</strong> — requires syncing projections and handling failures.
            </li>
          </ul>
        </Callout>

        <Accordion type="single" collapsible className="rounded-lg border px-4">
          <AccordionItem value="cqrs-es">
            <AccordionTrigger>Why Event Sourcing needs CQRS</AccordionTrigger>
            <AccordionContent>
              <p>
                Event Sourcing stores state as an append-only event log — great for writes, poor
                for queries. CQRS provides the solution: events are consumed by projectors that
                build read-optimised materialized views. The read model may briefly lag (eventual
                consistency) but can be independently scaled and optimised.
              </p>
              <p className="mt-2">
                The lecture states: "Eventual Consistency + Event Sourcing Needs CQRS" and
                "Different Storage Models for read and write."
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </LessonSection>

      {/* ─────────────────────── 2PC ─────────────────────── */}
      <LessonSection title="Two-Phase Commit (2PC) — and Why It Fails in Microservices" icon={Share2}>
        <p>
          In a monolith with one database, ACID transactions are straightforward. In
          microservices, business processes span multiple services, each with their own database —
          so multi-service operations need coordination. The traditional approach is{" "}
          <strong>2PC (Two-Phase Commit)</strong>, an atomic commitment protocol (ACP).
        </p>
        <ul>
          <li>
            <strong>Prepare Phase</strong> — coordinator sends <code>prepare</code> to all nodes;
            each acquires a lock and replies <code>yes</code> or <code>no</code>.
          </li>
          <li>
            <strong>Commit Phase</strong> — if all said <code>yes</code>, coordinator sends{" "}
            <code>commit</code>; each node commits and releases its lock.
          </li>
        </ul>

        <Callout type="trap" title="Why 2PC is risky in microservices">
          <ul>
            <li><strong>Tight coupling</strong> — all participants must know about and participate in the protocol.</li>
            <li><strong>Performance overhead</strong> — multiple network round-trips for every transaction.</li>
            <li><strong>Blocking / deadlocks</strong> — if one participant crashes, locks persist; others are stuck waiting, requiring manual intervention.</li>
            <li><strong>Synchronous assumption</strong> — 2PC assumes reliable synchronous communication, which is incompatible with cloud-native, auto-scaling microservices.</li>
          </ul>
          Example: if Order, Inventory, and Payment services are all locked in a 2PC and Payment crashes — Order and Inventory remain blocked. This breaks the resilience and scalability goals of microservices.
        </Callout>
      </LessonSection>

      {/* ─────────────────────── Saga pattern ─────────────────────── */}
      <LessonSection title="Saga Pattern — Distributed Transactions Without Locks" icon={Workflow}>
        <p>
          <strong>Sagas</strong> maintain data consistency across microservices{" "}
          <strong>without distributed transactions</strong>. A saga is a{" "}
          <strong>sequence of local transactions</strong>. After each local transaction the service
          emits an event or sends a command to trigger the next step. If any step fails, the
          system triggers <strong>compensating transactions</strong> to undo prior committed steps
          — ensuring eventual consistency without distributed locks.
        </p>

        <Diagram caption="Saga sequence: Order → Payment → Shipping. Right arrows are compensating transactions triggered on failure.">
          <svg viewBox="0 0 520 200" width="520" height="200" role="img">
            {/* Swimlane headers */}
            <rect x="10"  y="10" width="140" height="30" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
            <text x="80"  y="30" textAnchor="middle" fontSize="11" fontWeight="700" fill="#166534">Order Service</text>
            <rect x="190" y="10" width="140" height="30" rx="4" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
            <text x="260" y="30" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">Payment Service</text>
            <rect x="370" y="10" width="140" height="30" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
            <text x="440" y="30" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">Shipping Service</text>

            {/* Step 1 */}
            <rect x="20"  y="55" width="120" height="28" rx="4" fill="#f0fdf4" stroke="#16a34a" />
            <text x="80"  y="73" textAnchor="middle" fontSize="10" fill="#166534">createOrder()</text>
            <line x1="140" y1="69" x2="190" y2="69" stroke="#16a34a" strokeWidth="1.5" markerEnd="url(#sarrow)" />

            {/* Step 2 */}
            <rect x="200" y="55" width="120" height="28" rx="4" fill="#eff6ff" stroke="#2563eb" />
            <text x="260" y="73" textAnchor="middle" fontSize="10" fill="#1e40af">processPayment()</text>
            <line x1="320" y1="69" x2="370" y2="69" stroke="#2563eb" strokeWidth="1.5" markerEnd="url(#sarrow)" />

            {/* Step 3 */}
            <rect x="380" y="55" width="120" height="28" rx="4" fill="#fefce8" stroke="#d97706" />
            <text x="440" y="73" textAnchor="middle" fontSize="10" fill="#92400e">shipOrder()</text>

            {/* Compensating transactions label */}
            <text x="260" y="115" textAnchor="middle" fontSize="10" fontWeight="600" fill="#dc2626">If shipOrder() fails → compensating transactions:</text>

            {/* Comp txn arrows (reverse) */}
            <rect x="200" y="125" width="120" height="28" rx="4" fill="#fee2e2" stroke="#dc2626" />
            <text x="260" y="143" textAnchor="middle" fontSize="10" fill="#991b1b">refundPayment()</text>
            <line x1="200" y1="139" x2="145" y2="139" stroke="#dc2626" strokeWidth="1.5" markerEnd="url(#rarrow)" />

            <rect x="20"  y="125" width="120" height="28" rx="4" fill="#fee2e2" stroke="#dc2626" />
            <text x="80"  y="143" textAnchor="middle" fontSize="10" fill="#991b1b">rejectOrder()</text>

            <defs>
              <marker id="sarrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L0,6 L6,3 z" fill="#64748b" />
              </marker>
              <marker id="rarrow" markerWidth="6" markerHeight="6" refX="1" refY="3" orient="auto">
                <path d="M6,0 L6,6 L0,3 z" fill="#dc2626" />
              </marker>
            </defs>
          </svg>
        </Diagram>

        <Accordion type="single" collapsible className="rounded-lg border px-4">
          <AccordionItem value="choreography">
            <AccordionTrigger>Choreography-based Sagas — how they work and their challenges</AccordionTrigger>
            <AccordionContent>
              <p>
                In <strong>choreography</strong>, each service reacts to events:{" "}
                perform local transaction → publish event to message broker (Kafka) → next service
                subscribes and reacts. <strong>No central controller.</strong>
              </p>
              <p className="mt-2 font-semibold">Challenges:</p>
              <ul>
                <li><strong>Hard to visualise</strong> — no central place shows the full workflow.</li>
                <li><strong>Tight coupling to events</strong> — services must subscribe to and understand specific event types.</li>
                <li><strong>Complex compensations</strong> — rollback logic is scattered across services.</li>
                <li><strong>Event explosion</strong> — many events can make the event bus noisy.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="orchestration">
            <AccordionTrigger>Orchestration-based Sagas — how they work and their limitations</AccordionTrigger>
            <AccordionContent>
              <p>
                In <strong>orchestration</strong>, a central{" "}
                <strong>Saga Orchestrator</strong> manages the workflow: it sends commands to
                each participant via per-service <em>request channels</em> and receives replies on
                a single <em>reply channel</em>. Services do not interact with each other —
                they only respond to the orchestrator.
              </p>
              <p className="mt-2 font-semibold">Limitations:</p>
              <ul>
                <li><strong>Single point of failure</strong> — the orchestrator becomes a critical component.</li>
                <li><strong>Centralised logic</strong> — may violate microservice autonomy.</li>
                <li><strong>Complexity grows fast</strong> — as workflows grow, the orchestrator becomes bulky.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="compensating">
            <AccordionTrigger>Compensating transactions — not every step needs one</AccordionTrigger>
            <AccordionContent>
              <p>
                From the Create Order Saga (Food Order example):
              </p>
              <table className="w-full text-sm mt-2 border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="p-2 border text-left">Step</th>
                    <th className="p-2 border text-left">Transaction</th>
                    <th className="p-2 border text-left">Compensating</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="p-2 border">1</td><td className="p-2 border">createOrder()</td><td className="p-2 border text-red-700">rejectOrder()</td></tr>
                  <tr><td className="p-2 border">2</td><td className="p-2 border">verifyConsumerDetails()</td><td className="p-2 border text-muted-foreground">— (read only, no undo needed)</td></tr>
                  <tr><td className="p-2 border">3</td><td className="p-2 border">createTicket()</td><td className="p-2 border text-red-700">rejectTicket()</td></tr>
                  <tr><td className="p-2 border">4</td><td className="p-2 border">authorizeCreditCard()</td><td className="p-2 border text-muted-foreground">—</td></tr>
                  <tr><td className="p-2 border">5</td><td className="p-2 border">approveTicket()</td><td className="p-2 border text-muted-foreground">—</td></tr>
                  <tr><td className="p-2 border">6</td><td className="p-2 border">approveOrder()</td><td className="p-2 border text-muted-foreground">—</td></tr>
                </tbody>
              </table>
              <p className="mt-2 text-sm text-muted-foreground">
                Read-only or pivot steps (steps after which failure is impossible) do not need
                compensating transactions.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </LessonSection>

      {/* ─────────────────────── Flashcards ─────────────────────── */}
      <LessonSection title="Flashcards — quick recall" icon={Layers}>
        <FlashcardDeck
          cards={[
            {
              front: "Database-per-service",
              back: "Each microservice owns its database exclusively. No other service may read or write it directly. Enables polyglot persistence and independent scaling.",
            },
            {
              front: "Event Sourcing",
              back: "Store all state changes as immutable, append-only events. Current state is built by replaying the event log. Enables audit trail and temporal queries.",
            },
            {
              front: "CQRS",
              back: "Command Query Responsibility Segregation: separate the write model (Commands: Create/Update/Delete) from the read model (Queries: read-only). Each can scale independently.",
            },
            {
              front: "Eventual Consistency in CQRS",
              back: "The read model may lag behind the write model because synchronisation happens asynchronously via the event bus. This is a known challenge of CQRS.",
            },
            {
              front: "2PC — Two-Phase Commit",
              back: "Phase 1 (Prepare): coordinator asks all nodes to lock and reply yes/no. Phase 2 (Commit): if all yes → commit and release locks; else → rollback. Risky in microservices because locking breaks resilience.",
            },
            {
              front: "Saga pattern",
              back: "A sequence of local transactions. Each step emits an event or command to trigger the next. On failure, compensating transactions undo prior committed steps. Achieves eventual consistency without distributed locks.",
            },
            {
              front: "Choreography vs Orchestration (Saga)",
              back: "Choreography: no central controller — services react to events. Orchestration: a central Saga Orchestrator sends commands and receives replies. Orchestration is easier to reason about but can become a single point of failure.",
            },
            {
              front: "Compensating transaction",
              back: "A semantically inverse operation that undoes the effect of a previously committed local transaction in a saga (e.g. rejectOrder() compensates createOrder()). Not every step needs one.",
            },
          ]}
        />
      </LessonSection>

      {/* ─────────────────────── Mini quiz ─────────────────────── */}
      <MiniQuiz questions={questions.slice(0, 6)} title="Quick check — Week 17" />
    </>
  );
}
