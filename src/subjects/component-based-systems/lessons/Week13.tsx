import {
  Layers,
  Network,
  Radio,
  Share2,
  Workflow,
  Cpu,
  Server,
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
import questions from "../questions/week13";

export default function Week13() {
  return (
    <>
      <Callout type="key" title="Big picture">
        Week 13 covers <strong>Communication Protocols</strong> (RESTful, SOAP, WSDL),{" "}
        <strong>Message-Oriented Middleware</strong> (MOM / RabbitMQ), and the first half of{" "}
        <strong>Software Architecture Patterns</strong> — Layered and Event-Driven (mediator vs
        broker). Know each pattern's structure, trade-offs, and when to prefer it.
      </Callout>

      {/* ───────────────────────── RESTful Web Services ───────────────────────── */}
      <LessonSection title="RESTful Web Services" icon={Network}>
        <p>
          <strong>REST (Representational State Transfer)</strong> is an architectural style for
          building web services on top of HTTP. It uses the standard HTTP verbs:{" "}
          <strong>GET, POST, PUT, DELETE</strong> (CRUD operations) and is based on the{" "}
          <strong>stateless constraint</strong> — the server stores no client context between
          requests.
        </p>
        <p>The six core REST constraints:</p>
        <ul>
          <li>
            <strong>Client-Server</strong> — client and server are independent (separation of
            concerns).
          </li>
          <li>
            <strong>Statelessness</strong> — every request must contain all the information needed;
            no session stored server-side.
          </li>
          <li>
            <strong>Cacheability</strong> — responses must declare explicitly whether they can be
            cached (Cache-Control, ETag headers).
          </li>
          <li>
            <strong>Layered System</strong> — intermediaries (load balancers, proxies) are
            transparent to the client.
          </li>
          <li>
            <strong>Uniform Interface</strong> — standardized methods (GET/POST…) and
            representations (JSON, XML).
          </li>
          <li>
            <strong>Code on Demand (optional)</strong> — servers can send executable code (e.g.,
            JavaScript) to extend the client.
          </li>
        </ul>
        <Callout type="info" title="Statelessness benefits">
          Because the server holds no session state, <strong>any node can serve any request</strong>{" "}
          (server scalability), failures in one request don't cascade (failure tolerance), and
          responses are more easily cached.
        </Callout>

        <Accordion type="single" collapsible className="rounded-lg border px-4">
          <AccordionItem value="rest-limits">
            <AccordionTrigger>Limitations of RESTful Architecture</AccordionTrigger>
            <AccordionContent>
              <ul>
                <li>
                  <strong>No standardization for complex operations</strong> — batch processing is
                  awkward.
                </li>
                <li>
                  <strong>Overhead in statelessness</strong> — clients must resend context (e.g.,
                  tokens) every time.
                </li>
                <li>
                  <strong>Real-time communication</strong> — REST is request/response; alternatives
                  like WebSockets or GraphQL subscriptions handle real-time better.
                </li>
                <li>
                  <strong>Limited query flexibility</strong> — deeply nested hierarchical data
                  requires multiple calls.
                </li>
                <li>
                  <strong>Versioning challenges</strong> — maintaining backward compatibility across
                  many API versions is hard.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </LessonSection>

      {/* ─────────────────────────── SOAP & WSDL ─────────────────────────────── */}
      <LessonSection title="SOAP, WSDL & OpenAPI" icon={Server}>
        <p>
          <strong>SOAP (Simple Object Access Protocol)</strong> is a strict, XML-based messaging
          protocol. Key features:
        </p>
        <ul>
          <li>
            <strong>XML-Based</strong> — all messages formatted in XML.
          </li>
          <li>
            <strong>Protocol-Agnostic</strong> — works over HTTP, SMTP, TCP, etc.
          </li>
          <li>
            <strong>ACID transactions</strong> — suited for operations requiring strict consistency
            (e.g., booking flight + hotel atomically).
          </li>
          <li>
            <strong>Advanced security</strong> — WS-Security for digital signatures and secure
            routing.
          </li>
          <li>
            <strong>Typically stateful</strong> — retains session information.
          </li>
        </ul>

        <Callout type="trap" title="SOAP vs REST — the exam table">
          REST is <strong>faster</strong> (JSON, less overhead), <strong>stateless</strong>, and
          simpler. SOAP is <strong>slower</strong> (XML parsing), usually <strong>stateful</strong>,
          but required when you need ACID transactions, digital signatures, or WS-* enterprise
          standards. Do not say REST supports ACID — it does not by design.
        </Callout>

        <p className="mt-4">
          <strong>WSDL (Web Services Description Language)</strong> is an XML-based language that
          describes a SOAP web service — what it does, where to find it, and how to communicate with
          it. A WSDL document has six key elements:
        </p>
        <ul>
          <li>
            <strong>&lt;definitions&gt;</strong> — root element, namespaces, service name.
          </li>
          <li>
            <strong>&lt;types&gt;</strong> — data types (XML Schema).
          </li>
          <li>
            <strong>&lt;message&gt;</strong> — input/output message definitions.
          </li>
          <li>
            <strong>&lt;portType&gt;</strong> — set of operations (the service interface).
          </li>
          <li>
            <strong>&lt;binding&gt;</strong> — protocol used (e.g., SOAP over HTTP).
          </li>
          <li>
            <strong>&lt;service&gt;</strong> — actual endpoint URL.
          </li>
        </ul>

        <Accordion type="single" collapsible className="rounded-lg border px-4">
          <AccordionItem value="openapi">
            <AccordionTrigger>OpenAPI (formerly Swagger) — the REST equivalent of WSDL</AccordionTrigger>
            <AccordionContent>
              <p>
                <strong>OpenAPI</strong> describes RESTful services in a machine-readable format
                (YAML or JSON). Key features:
              </p>
              <ul>
                <li>
                  <strong>Standardized documentation</strong> — API endpoints, request/response
                  formats, authentication.
                </li>
                <li>
                  <strong>Automation</strong> — code generation for clients and servers in multiple
                  languages.
                </li>
                <li>
                  <strong>Interactive tools</strong> — Swagger UI for visual testing.
                </li>
                <li>
                  <strong>Version control</strong> — tracks API changes across versions.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </LessonSection>

      {/* ─────────────────────── Message-Oriented Middleware ──────────────────── */}
      <LessonSection title="Message-Oriented Middleware (MOM)" icon={Radio}>
        <p>
          <strong>MOM</strong> is software infrastructure that enables communication between
          distributed systems using messages. It{" "}
          <strong>decouples producers and consumers</strong> — they only need to agree on the
          message format, not each other's existence. MOM is platform and language independent.
        </p>

        <p>Five key characteristics:</p>
        <ul>
          <li>
            <strong>Asynchronous Communication</strong> — sender and receiver do not interact at
            the same time.
          </li>
          <li>
            <strong>Decoupling</strong> — services are loosely coupled (know only the message
            format).
          </li>
          <li>
            <strong>Reliability</strong> — supports retries, acknowledgments, and dead letter queues
            so messages are not lost.
          </li>
          <li>
            <strong>Scalability</strong> — messages distributed among multiple consumers for
            horizontal scaling.
          </li>
          <li>
            <strong>Durability</strong> — messages can be persisted to disk to survive crashes.
          </li>
        </ul>

        <Diagram caption="MOM topology: a central broker decouples four applications — none knows the others exist directly.">
          <svg viewBox="0 0 480 200" width="480" height="200" role="img">
            {/* central MOM */}
            <ellipse cx="240" cy="100" rx="42" ry="28" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
            <text x="240" y="105" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e3a8a">MOM</text>
            {/* App A */}
            <ellipse cx="80" cy="50" rx="36" ry="22" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
            <text x="80" y="55" textAnchor="middle" fontSize="10" fill="#166534">App A</text>
            {/* App B */}
            <ellipse cx="80" cy="150" rx="36" ry="22" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
            <text x="80" y="155" textAnchor="middle" fontSize="10" fill="#166534">App B</text>
            {/* App C */}
            <ellipse cx="400" cy="50" rx="36" ry="22" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
            <text x="400" y="55" textAnchor="middle" fontSize="10" fill="#166534">App C</text>
            {/* App D */}
            <ellipse cx="400" cy="150" rx="36" ry="22" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
            <text x="400" y="155" textAnchor="middle" fontSize="10" fill="#166534">App D</text>
            {/* arrows */}
            <line x1="116" y1="58" x2="198" y2="85" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arr)" />
            <line x1="116" y1="142" x2="198" y2="115" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arr)" />
            <line x1="282" y1="85" x2="364" y2="58" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arr)" />
            <line x1="282" y1="115" x2="364" y2="142" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arr)" />
            <defs>
              <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L0,6 L8,3 z" fill="#64748b" />
              </marker>
            </defs>
          </svg>
        </Diagram>

        <Accordion type="single" collapsible className="rounded-lg border px-4">
          <AccordionItem value="msg-models">
            <AccordionTrigger>Message models: Point-to-Point vs Publish-Subscribe</AccordionTrigger>
            <AccordionContent>
              <ul>
                <li>
                  <strong>Point-to-Point</strong> — uses <em>queues</em>; one message goes to
                  exactly <strong>one consumer</strong> (work distribution). Examples: RabbitMQ
                  direct queue, Amazon SQS.
                </li>
                <li>
                  <strong>Publish-Subscribe</strong> — uses <em>topics</em>; one message goes to{" "}
                  <strong>all subscribers</strong>. Implemented in RabbitMQ via fanout exchanges;
                  also native to Kafka and Google Cloud Pub/Sub.
                </li>
                <li>
                  <strong>Message Streams (Kafka)</strong> — append-only log; supports message
                  replay and real-time processing at high throughput.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="rabbitmq">
            <AccordionTrigger>RabbitMQ core components</AccordionTrigger>
            <AccordionContent>
              <ul>
                <li>
                  <strong>Producers</strong> — applications that send messages.
                </li>
                <li>
                  <strong>Consumers</strong> — applications that receive and process messages.
                </li>
                <li>
                  <strong>Exchanges</strong> — route messages to queues (direct, fanout, topic,
                  headers).
                </li>
                <li>
                  <strong>Queues</strong> — buffers where messages wait to be consumed.
                </li>
              </ul>
              <p>
                RabbitMQ supports AMQP, MQTT, STOMP, HTTP, and WebSockets. For a Publish-Subscribe
                demo: use a <strong>fanout exchange</strong>, bind multiple queues, and each
                consumer listens on its own queue — every published message goes to all queues.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </LessonSection>

      {/* ──────────────────── Software Architecture Patterns ─────────────────── */}
      <LessonSection title="Software Architecture Patterns — Overview" icon={Cpu}>
        <p>
          <strong>Software Architecture Patterns</strong> are high-level structural blueprints for
          whole systems — they describe how major components are organized and interact. This is
          different from <strong>Design Patterns</strong> (Factory, Decorator, Adapter) which solve
          specific class- or object-level problems.
        </p>
        <p>Week 13 introduces four patterns (SOA and Microservices to be continued):</p>
        <ul>
          <li>Layered Architecture (n-tier)</li>
          <li>Event-Driven Architecture (EDA) — Mediator and Broker topologies</li>
          <li>Service-Oriented Architecture (SOA) — intro</li>
          <li>Microservices Architecture — intro</li>
        </ul>
      </LessonSection>

      {/* ─────────────────────── Layered Architecture ────────────────────────── */}
      <LessonSection title="Layered (n-tier) Architecture Pattern" icon={Layers}>
        <p>
          The classic pattern: organise code into horizontal layers, each with a single
          responsibility. The standard 4-layer stack is{" "}
          <strong>Presentation → Business → Persistence → Database</strong>. All layers are
          typically <strong>closed</strong> — requests must pass through each layer in order and
          cannot skip layers.
        </p>

        <Diagram caption="4-layer closed stack: every request flows top-to-bottom through Presentation, Business, Persistence, and Database layers.">
          <svg viewBox="0 0 480 220" width="480" height="220" role="img">
            {/* layers */}
            {[
              { y: 10,  label: "Presentation Layer", fill: "#eff6ff", stroke: "#3b82f6" },
              { y: 65,  label: "Business Layer",     fill: "#f0fdf4", stroke: "#16a34a" },
              { y: 120, label: "Persistence Layer",  fill: "#fefce8", stroke: "#ca8a04" },
              { y: 175, label: "Database Layer",     fill: "#fdf2f8", stroke: "#a21caf" },
            ].map(({ y, label, fill, stroke }) => (
              <g key={label}>
                <rect x="10" y={y} width="390" height="45" rx="6" fill={fill} stroke={stroke} strokeWidth="1.5" />
                <text x="200" y={y + 27} textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e293b">{label}</text>
                <rect x="415" y={y + 8} width="55" height="28" rx="4" fill="#ef4444" />
                <text x="442" y={y + 27} textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">CLOSED</text>
              </g>
            ))}
            {/* arrows */}
            {[32, 87, 142].map((y) => (
              <line key={y} x1="205" y1={y + 23} x2="205" y2={y + 35} stroke="#475569" strokeWidth="2" markerEnd="url(#darr)" />
            ))}
            <defs>
              <marker id="darr" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8 z" fill="#475569" />
              </marker>
            </defs>
          </svg>
        </Diagram>

        <p>
          <strong>Advantages:</strong> separation of concerns, high testability (each layer can be
          tested in isolation), familiar to most developers, straightforward development.
        </p>
        <p>
          <strong>Disadvantages:</strong>
        </p>
        <ul>
          <li>
            <strong>Tends to produce monoliths</strong> — single codebase, single deployment.
          </li>
          <li>
            <strong>Low scalability</strong> — relies on vertical scaling; you can't scale one
            feature independently.
          </li>
          <li>
            <strong>Cross-cutting concerns</strong> (logging, caching, authentication) get tangled
            between layers, increasing coupling.
          </li>
          <li>
            <strong>Architecture sinkhole</strong> — requests pass through layers that add no
            value: wasted effort, performance hit, tight coupling.
          </li>
        </ul>

        <Callout type="trap" title="Architecture sinkhole — a common exam trap">
          The sinkhole occurs when a closed layer simply forwards a request to the next layer
          without adding any logic. It increases code, maintenance cost, and latency without
          benefit. Watch for questions that describe "layers that do nothing" — that is the sinkhole
          pattern.
        </Callout>

        <Accordion type="single" collapsible className="rounded-lg border px-4">
          <AccordionItem value="layered-use">
            <AccordionTrigger>When to use Layered Architecture</AccordionTrigger>
            <AccordionContent>
              <ul>
                <li>
                  <strong>CRUD-heavy applications</strong> (Create, Read, Update, Delete).
                </li>
                <li>
                  Apps with a <strong>stable, predictable domain model</strong>.
                </li>
                <li>
                  When <strong>distributed systems are overkill</strong> — small teams, simple
                  scaling needs.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </LessonSection>

      {/* ──────────────────── Event-Driven Architecture ───────────────────────── */}
      <LessonSection title="Event-Driven Architecture (EDA)" icon={Workflow}>
        <p>
          EDA is a popular <strong>distributed, asynchronous</strong> architecture pattern. Instead
          of calling each other directly, components (called{" "}
          <strong>event producers</strong> and <strong>event consumers</strong>) are loosely coupled
          and interact only through <strong>events</strong>. EDA comes in two topologies:
          Mediator and Broker.
        </p>

        <Diagram caption="Left: Mediator topology (central orchestrator). Right: Broker topology (no central coordinator — processors chain events via a message broker).">
          <svg viewBox="0 0 520 210" width="520" height="210" role="img">
            {/* ── Mediator side ── */}
            <text x="100" y="16" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e293b">Mediator Topology</text>
            {/* event box at top */}
            <rect x="70" y="22" width="60" height="26" rx="4" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
            <text x="100" y="40" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7f1d1d">Event</text>
            {/* arrow down */}
            <line x1="100" y1="48" x2="100" y2="62" stroke="#475569" strokeWidth="1.5" markerEnd="url(#a1)" />
            {/* mediator */}
            <rect x="60" y="62" width="80" height="26" rx="4" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="100" y="80" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e3a8a">Mediator</text>
            {/* channels */}
            <line x1="70" y1="88" x2="38" y2="118" stroke="#475569" strokeWidth="1.5" markerEnd="url(#a1)" />
            <line x1="100" y1="88" x2="100" y2="118" stroke="#475569" strokeWidth="1.5" markerEnd="url(#a1)" />
            <line x1="130" y1="88" x2="162" y2="118" stroke="#475569" strokeWidth="1.5" markerEnd="url(#a1)" />
            {/* processors */}
            {[20, 78, 136].map((x) => (
              <g key={x}>
                <rect x={x} y={118} width="48" height="26" rx="4" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.2" />
                <text x={x + 24} y={135} textAnchor="middle" fontSize="9" fill="#14532d">Processor</text>
              </g>
            ))}

            {/* ── Broker side ── */}
            <text x="390" y="16" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e293b">Broker Topology</text>
            {/* event */}
            <rect x="362" y="22" width="56" height="24" rx="4" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
            <text x="390" y="39" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7f1d1d">Event</text>
            {/* channel */}
            <line x1="390" y1="46" x2="390" y2="60" stroke="#475569" strokeWidth="1.5" markerEnd="url(#a1)" />
            <rect x="362" y="60" width="56" height="22" rx="4" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.2" />
            <text x="390" y="75" textAnchor="middle" fontSize="9" fill="#1e3a8a">Channel</text>
            {/* proc A */}
            <line x1="390" y1="82" x2="350" y2="100" stroke="#475569" strokeWidth="1.5" markerEnd="url(#a1)" />
            <rect x="316" y="100" width="68" height="24" rx="4" fill="#fefce8" stroke="#ca8a04" strokeWidth="1.2" />
            <text x="350" y="116" textAnchor="middle" fontSize="9" fill="#713f12">Processor A</text>
            {/* proc A publishes */}
            <line x1="350" y1="124" x2="350" y2="140" stroke="#475569" strokeWidth="1.5" markerEnd="url(#a1)" />
            <rect x="316" y="140" width="68" height="22" rx="4" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.2" />
            <text x="350" y="155" textAnchor="middle" fontSize="9" fill="#1e3a8a">Channel</text>
            <line x1="350" y1="162" x2="390" y2="178" stroke="#475569" strokeWidth="1.5" markerEnd="url(#a1)" />
            <rect x="360" y="178" width="68" height="22" rx="4" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.2" />
            <text x="394" y="193" textAnchor="middle" fontSize="9" fill="#14532d">Processor B</text>

            <defs>
              <marker id="a1" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
                <path d="M0,0 L7,3.5 L0,7 z" fill="#475569" />
              </marker>
            </defs>
          </svg>
        </Diagram>

        <Accordion type="single" collapsible className="rounded-lg border px-4">
          <AccordionItem value="mediator-detail">
            <AccordionTrigger>Mediator Topology — components and flow</AccordionTrigger>
            <AccordionContent>
              <p>Key components:</p>
              <ul>
                <li>
                  <strong>Event Queue</strong> — where initial events are submitted.
                </li>
                <li>
                  <strong>Event Mediator</strong> — the "brain": knows the sequence of steps to
                  process an event.
                </li>
                <li>
                  <strong>Event Channels</strong> — communication paths (topics/queues) the
                  mediator uses to send work.
                </li>
                <li>
                  <strong>Event Processors</strong> — self-contained components that perform
                  specific tasks.
                </li>
              </ul>
              <p>
                Real-world example: an insurance address-change event. The mediator orchestrates{" "}
                <em>change_address</em> (Customer Processor), <em>recalculate_quote</em> (Quote
                Processor), and <em>update_claims</em> (Claims Processor) — some steps can run in
                parallel.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="broker-detail">
            <AccordionTrigger>Broker Topology — no central coordinator</AccordionTrigger>
            <AccordionContent>
              <p>
                In the Broker topology there is <strong>no central coordinator</strong>. Event
                processors communicate indirectly by publishing and subscribing to events via a
                message broker (Kafka, RabbitMQ, ActiveMQ). Use it when:
              </p>
              <ul>
                <li>You want <strong>maximum decoupling</strong>.</li>
                <li>Event flows are <strong>dynamic or change often</strong>.</li>
                <li>You need <strong>easy horizontal scaling</strong> of processors.</li>
                <li>The system is <strong>real-time, high-throughput</strong>.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </LessonSection>

      {/* ─────────────────────────── Flashcards ──────────────────────────────── */}
      <LessonSection title="Flashcards — quick recall">
        <FlashcardDeck
          cards={[
            {
              front: "REST statelessness",
              back: "Server stores no client context between requests. Every request must be self-contained with all necessary info (including auth tokens).",
            },
            {
              front: "SOAP vs REST — statefulness",
              back: "SOAP is typically stateful (retains session info) and uses XML only. REST is stateless by design and supports multiple formats (JSON, XML, etc.).",
            },
            {
              front: "WSDL <service> element",
              back: "Defines the actual web service and its endpoint URL (e.g., http://localhost:8080/soap). The <portType> defines operations; <binding> specifies the protocol.",
            },
            {
              front: "Architecture sinkhole (Layered)",
              back: "Requests pass through layers that add no meaningful logic — wasted effort, performance hit, tight coupling, and increased complexity.",
            },
            {
              front: "EDA Mediator vs Broker",
              back: "Mediator = central orchestrator coordinates steps via event channels. Broker = no central coordinator; processors chain events via pub/sub through a message broker.",
            },
            {
              front: "MOM Reliability characteristic",
              back: "Ensures messages are not lost via retries, acknowledgments, and dead letter queues.",
            },
            {
              front: "OpenAPI (formerly Swagger)",
              back: "A specification for documenting and designing RESTful APIs in YAML/JSON, enabling code generation, Swagger UI testing, and version control.",
            },
            {
              front: "When to use Layered Architecture",
              back: "CRUD-heavy apps with a stable domain model where distributed systems are overkill. Avoid when fine-grained scaling or runtime plug-in extensibility is needed.",
            },
          ]}
        />
      </LessonSection>

      {/* ─────────────────────────── Mini quiz ───────────────────────────────── */}
      <MiniQuiz questions={questions.slice(0, 6)} title="Quick check — Week 13" />
    </>
  );
}
