import {
  ArrowRightLeft,
  Boxes,
  Cloud,
  Container,
  Globe,
  Layers,
  Network,
  Radio,
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
import questions from "../questions/week16";

export default function Week16() {
  return (
    <>
      <Callout type="key" title="Big picture — highest-yield week">
        Week 16 is the most exam-dense week in the course. It covers{" "}
        <strong>Service-Oriented Architecture (SOA)</strong> — its core components, the{" "}
        <strong>Enterprise Service Bus (ESB)</strong>, key challenges (including{" "}
        <strong>consistent service security</strong>), web-service standards (WSDL/SOAP/REST),{" "}
        <strong>Message-Oriented Middleware (MOM)</strong>, the{" "}
        <strong>gRPC + Protocol Buffers</strong> communication stack, microservices principles,
        and API Gateway / dynamic service discovery patterns.
      </Callout>

      {/* ─────────────────────────── What is SOA ─────────────────────────── */}
      <LessonSection title="What is Service-Oriented Architecture (SOA)?" icon={Share2}>
        <p>
          <strong>SOA</strong> is a software design paradigm that organises systems into a
          collection of <strong>independent and reusable services</strong>. Each service represents
          a <strong>business process or function</strong> (e.g. payment processing, user
          authentication) and can be combined to create larger, more complex applications.
        </p>
        <p>
          SOA gained traction in the early 2000s as enterprises sought to modernise legacy systems
          and improve scalability. A classic e-commerce SOA example decomposes into a{" "}
          <strong>Product Catalog Service</strong>, <strong>Order Processing Service</strong>, and{" "}
          <strong>Payment Service</strong> — each stand-alone and reusable across applications.
        </p>

        <Callout type="info" title="Key characteristics of SOA">
          <ul>
            <li>
              <strong>Modularity</strong> — services are independent modules developed and deployed
              separately.
            </li>
            <li>
              <strong>Interoperability</strong> — services communicate across platforms, languages,
              and protocols.
            </li>
            <li>
              <strong>Loose Coupling</strong> — minimal dependencies between services for
              flexibility and scalability.
            </li>
            <li>
              <strong>Reusability</strong> — services reused across many applications and business
              processes.
            </li>
            <li>
              <strong>Discoverability</strong> — services are published in a service registry and
              located at runtime.
            </li>
          </ul>
        </Callout>
      </LessonSection>

      {/* ─────────────────────────── Core SOA components ─────────────────────────── */}
      <LessonSection title="Core Components of SOA" icon={Layers}>
        <p>Four pillars make up an SOA system:</p>
        <ul>
          <li>
            <strong>Services</strong> — self-contained units performing specific tasks; reusable
            across different applications. Each service has a <em>contract</em>, an{" "}
            <em>interface</em>, and an <em>implementation</em> (business logic + data).
          </li>
          <li>
            <strong>Service Contract</strong> — defines the interface and usage agreements between
            the service and its consumers; usually described with <strong>WSDL</strong> or REST API
            specifications.
          </li>
          <li>
            <strong>Service Registry / Discovery</strong> — a centralised directory where services
            are published and can be located by consumers; allows{" "}
            <strong>dynamic discovery of services at runtime</strong>.
          </li>
          <li>
            <strong>Service / Message Bus (ESB)</strong> — the "brain" of the system that routes,
            transforms, and mediates communication between services.
          </li>
        </ul>

        <Diagram caption="SOA with an Enterprise Service Bus (ESB) connecting coarse-grained enterprise services">
          <svg viewBox="0 0 520 230" width="520" height="230" role="img">
            {/* ESB bar */}
            <rect x="20" y="95" width="480" height="40" rx="6" fill="#7c3aed" opacity="0.85" />
            <text
              x="260"
              y="120"
              textAnchor="middle"
              fontWeight="700"
              fontSize="13"
              fill="#fff"
            >
              Enterprise Service Bus (ESB)
            </text>
            {/* Services above the ESB */}
            <rect x="30" y="20" width="100" height="55" rx="6" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="80" y="42" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e3a8a">Product</text>
            <text x="80" y="56" textAnchor="middle" fontSize="10" fill="#1e3a8a">Catalog</text>
            <line x1="80" y1="75" x2="80" y2="95" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="3,2" />

            <rect x="148" y="20" width="100" height="55" rx="6" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="198" y="42" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e3a8a">Order</text>
            <text x="198" y="56" textAnchor="middle" fontSize="10" fill="#1e3a8a">Processing</text>
            <line x1="198" y1="75" x2="198" y2="95" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="3,2" />

            <rect x="266" y="20" width="100" height="55" rx="6" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="316" y="42" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e3a8a">Payment</text>
            <text x="316" y="56" textAnchor="middle" fontSize="10" fill="#1e3a8a">Service</text>
            <line x1="316" y1="75" x2="316" y2="95" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="3,2" />

            <rect x="384" y="20" width="110" height="55" rx="6" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="439" y="42" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e3a8a">User</text>
            <text x="439" y="56" textAnchor="middle" fontSize="10" fill="#1e3a8a">Auth</text>
            <line x1="439" y1="75" x2="439" y2="95" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="3,2" />

            {/* Application frontend below */}
            <rect x="50" y="155" width="130" height="40" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
            <text x="115" y="179" textAnchor="middle" fontSize="11" fontWeight="600" fill="#78350f">
              App Frontend
            </text>
            <line x1="115" y1="135" x2="115" y2="155" stroke="#ca8a04" strokeWidth="1.5" strokeDasharray="3,2" />

            {/* Service repository */}
            <rect x="330" y="155" width="150" height="40" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
            <text x="405" y="179" textAnchor="middle" fontSize="11" fontWeight="600" fill="#14532d">
              Service Registry
            </text>
            <line x1="405" y1="135" x2="405" y2="155" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="3,2" />

            <text x="260" y="220" textAnchor="middle" fontSize="10" fill="#64748b">
              SOA = coarse-grained, enterprise-level services mediated by the ESB
            </text>
          </svg>
        </Diagram>

        <Accordion type="single" collapsible className="rounded-lg border px-4">
          <AccordionItem value="service-types">
            <AccordionTrigger>Four types of services in SOA</AccordionTrigger>
            <AccordionContent>
              <ul>
                <li>
                  <strong>Business Services</strong> — high-level business logic (e.g. customer
                  management, order processing).
                </li>
                <li>
                  <strong>Enterprise Services</strong> — more granular, reusable core
                  functionalities like authentication, billing, inventory.
                </li>
                <li>
                  <strong>Application Services</strong> — domain-specific; translate
                  application-level needs into calls to enterprise services.
                </li>
                <li>
                  <strong>Infrastructure Services</strong> — file systems, databases, logging.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="orchestration-vs-choreography">
            <AccordionTrigger>Service Orchestration vs Choreography</AccordionTrigger>
            <AccordionContent>
              <ul>
                <li>
                  <strong>Orchestration</strong> — a single centralised orchestrator coordinates
                  all interactions (like a conductor). The orchestrator knows the entire workflow.
                </li>
                <li>
                  <strong>Choreography</strong> — no central controller; each service knows its
                  own role, interaction rules, and timing. Event-driven communication; each service
                  reacts to events from others.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </LessonSection>

      {/* ─────────────────────────── SOA Challenges ─────────────────────────── */}
      <LessonSection title="Key Challenges of SOA" icon={Network}>
        <ul>
          <li>
            <strong>Service Governance</strong> — managing service versions, ownership, and
            lifecycle is complex.
          </li>
          <li>
            <strong>Performance Overhead</strong> — XML-based SOAP messaging is verbose and slower
            than modern alternatives.
          </li>
          <li>
            <strong>Architectural Complexity</strong> — components like ESB, BPEL, and UDDI
            (Universal Description, Discovery, and Integration) often lead to over-engineering.
          </li>
          <li>
            <strong>Testing &amp; Debugging Difficulties</strong> — tracing issues across
            distributed services is harder.
          </li>
        </ul>
        <Callout type="trap" title="Exam trap — SOA security challenge">
          A real and frequently tested SOA challenge is ensuring{" "}
          <strong>consistent service security across all services</strong>. Because each service is
          independently developed and deployed, enforcing uniform authentication, authorisation, and
          data-protection policies across the entire SOA ecosystem is non-trivial. Do not confuse
          this with a benefit — it is a <strong>challenge</strong>.
        </Callout>
      </LessonSection>

      {/* ─────────────────────────── Web Services & WSDL ─────────────────────────── */}
      <LessonSection title="Web Services: WSDL, SOAP, and REST" icon={Globe}>
        <p>Web services are the communication backbone of SOA. Three standards dominate:</p>
        <ul>
          <li>
            <strong>WSDL (Web Services Description Language)</strong> — an XML-based standard that
            provides a standard way to <strong>describe web services</strong>, enabling{" "}
            <strong>interoperability</strong> between heterogeneous platforms and languages. WSDL
            documents specify what operations a service offers, what messages it accepts/returns, and
            how to access it.
          </li>
          <li>
            <strong>SOAP (Simple Object Access Protocol)</strong> — an XML-based messaging protocol
            used as the transport layer for web services. Verbose but highly standardised; supports
            WS-Security and other enterprise features.
          </li>
          <li>
            <strong>REST (Representational State Transfer)</strong> — a lightweight, HTTP-based
            architectural style; became the dominant approach for modern web APIs because it is
            simpler and faster than SOAP.
          </li>
        </ul>
        <Callout type="info" title="WSDL in one sentence">
          WSDL is XML-based and provides a standard way to <strong>describe</strong> web services,
          enabling <strong>interoperability</strong>. This exact phrasing is exam-tested.
        </Callout>
      </LessonSection>

      {/* ─────────────────────────── MOM ─────────────────────────── */}
      <LessonSection title="Message-Oriented Middleware (MOM)" icon={Radio}>
        <p>
          <strong>MOM</strong> is middleware whose primary purpose is to facilitate{" "}
          <strong>asynchronous communication between distributed systems</strong>. Rather than
          calling each other directly and waiting for a response, services place messages on a queue
          or topic; the consumer picks them up independently.
        </p>
        <p>
          This decouples producers from consumers in time and space — a producer does not need the
          consumer to be online when the message is sent. Popular MOM implementations:{" "}
          <strong>Apache Kafka</strong> and <strong>RabbitMQ</strong>.
        </p>
        <Callout type="trap" title="MOM's primary purpose — exam wording">
          The primary purpose of MOM is to facilitate <strong>asynchronous</strong> communication
          between distributed systems — not synchronous, not real-time RPC. Kafka and RabbitMQ are
          MOM examples; they also appear in event-driven microservice architectures.
        </Callout>
      </LessonSection>

      {/* ─────────────────────────── CBD as Foundation for SOA ─────────────────────────── */}
      <LessonSection title="Component-Based Development as a Foundation for SOA" icon={Boxes}>
        <p>
          SOA builds on the principles of <strong>Component-Based Development (CBD)</strong> by
          taking the idea of reusable components and extending it to{" "}
          <strong>loosely coupled, distributed services</strong>. Key connections:
        </p>
        <ul>
          <li>
            <strong>CBD as foundation:</strong> CBD promotes reusable, encapsulated units; SOA
            extends this across network boundaries.
          </li>
          <li>
            <strong>Evolution:</strong> organisations that started with component-based applications
            often evolved to SOA by exposing those components as services.
          </li>
          <li>
            <strong>Reusability:</strong> CBD reuses software modules at the application level; SOA
            reuses services across organisational boundaries.
          </li>
        </ul>

        <Diagram caption="SOA vs Microservices — granularity. SOA = coarse-grained enterprise services; Microservices = fine-grained, single business function per service.">
          <svg viewBox="0 0 520 210" width="520" height="210" role="img">
            {/* SOA side */}
            <rect x="20" y="20" width="220" height="175" rx="8" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="130" y="44" textAnchor="middle" fontWeight="700" fontSize="14" fill="#1e3a8a">
              SOA
            </text>
            <text x="130" y="62" textAnchor="middle" fontSize="11" fill="#475569">
              Coarse-grained
            </text>
            <rect x="40" y="70" width="180" height="32" rx="4" fill="#bfdbfe" stroke="#3b82f6" />
            <text x="130" y="91" textAnchor="middle" fontSize="11" fill="#1e3a8a">
              Order Processing Service
            </text>
            <rect x="40" y="110" width="180" height="32" rx="4" fill="#bfdbfe" stroke="#3b82f6" />
            <text x="130" y="131" textAnchor="middle" fontSize="11" fill="#1e3a8a">
              Payment Service
            </text>
            <rect x="40" y="150" width="180" height="32" rx="4" fill="#bfdbfe" stroke="#3b82f6" />
            <text x="130" y="171" textAnchor="middle" fontSize="11" fill="#1e3a8a">
              User Auth Service
            </text>

            {/* arrow */}
            <text x="265" y="115" textAnchor="middle" fontSize="22" fill="#94a3b8">
              {">"}
            </text>

            {/* Microservices side */}
            <rect x="280" y="20" width="220" height="175" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
            <text x="390" y="44" textAnchor="middle" fontWeight="700" fontSize="14" fill="#14532d">
              Microservices
            </text>
            <text x="390" y="62" textAnchor="middle" fontSize="11" fill="#475569">
              Fine-grained
            </text>
            <rect x="295" y="70" width="190" height="25" rx="4" fill="#bbf7d0" stroke="#16a34a" />
            <text x="390" y="87" textAnchor="middle" fontSize="10" fill="#14532d">
              Basket Service
            </text>
            <rect x="295" y="101" width="190" height="25" rx="4" fill="#bbf7d0" stroke="#16a34a" />
            <text x="390" y="118" textAnchor="middle" fontSize="10" fill="#14532d">
              Checkout Service
            </text>
            <rect x="295" y="132" width="190" height="25" rx="4" fill="#bbf7d0" stroke="#16a34a" />
            <text x="390" y="149" textAnchor="middle" fontSize="10" fill="#14532d">
              Notification Service
            </text>
            <rect x="295" y="163" width="190" height="25" rx="4" fill="#bbf7d0" stroke="#16a34a" />
            <text x="390" y="180" textAnchor="middle" fontSize="10" fill="#14532d">
              Inventory Service
            </text>
          </svg>
        </Diagram>
      </LessonSection>

      {/* ─────────────────────────── Microservices ─────────────────────────── */}
      <LessonSection title="Introduction to Microservices" icon={Container}>
        <p>
          <strong>Microservices</strong> are a style of software architecture where systems are
          structured as a collection of{" "}
          <strong>loosely coupled, independently deployable services</strong>. Each service owns one
          business capability (Single Responsibility Principle), has its own database (Database Per
          Service), and communicates via well-defined APIs.
        </p>
        <p>
          Microservices didn't replace SOA — they <strong>evolved from it</strong>, addressing SOA's
          complexity, scalability bottlenecks, and heavyweight governance. Netflix coined the term
          around 2010; Martin Fowler and James Lewis formally defined "Microservices Architecture" in
          2014.
        </p>

        <Accordion type="single" collapsible className="rounded-lg border px-4">
          <AccordionItem value="soa-vs-ms">
            <AccordionTrigger>SOA vs Microservices — key differences</AccordionTrigger>
            <AccordionContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="border px-3 py-2 text-left">Aspect</th>
                      <th className="border px-3 py-2 text-left">SOA</th>
                      <th className="border px-3 py-2 text-left">Microservices</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="even:bg-slate-50">
                      <td className="border px-3 py-1 font-medium">Granularity</td>
                      <td className="border px-3 py-1">Coarse-grained, enterprise-level</td>
                      <td className="border px-3 py-1">Fine-grained, business-function-level</td>
                    </tr>
                    <tr className="even:bg-slate-50">
                      <td className="border px-3 py-1 font-medium">Deployment</td>
                      <td className="border px-3 py-1">Distributed across networks</td>
                      <td className="border px-3 py-1">Independently deployable containers</td>
                    </tr>
                    <tr className="even:bg-slate-50">
                      <td className="border px-3 py-1 font-medium">Communication</td>
                      <td className="border px-3 py-1">Network-based via ESB (SOAP/REST)</td>
                      <td className="border px-3 py-1">REST, gRPC, message brokers</td>
                    </tr>
                    <tr className="even:bg-slate-50">
                      <td className="border px-3 py-1 font-medium">Data</td>
                      <td className="border px-3 py-1">Shared databases common</td>
                      <td className="border px-3 py-1">Database Per Service pattern</td>
                    </tr>
                    <tr className="even:bg-slate-50">
                      <td className="border px-3 py-1 font-medium">Governance</td>
                      <td className="border px-3 py-1">Centralised, heavy</td>
                      <td className="border px-3 py-1">Team autonomy, lightweight</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="ms-principles">
            <AccordionTrigger>Principles of good microservice design</AccordionTrigger>
            <AccordionContent>
              <ul>
                <li>
                  <strong>Single Responsibility</strong> — each service owns one business
                  capability (DDD Bounded Context).
                </li>
                <li>
                  <strong>Database Per Service</strong> — services must not share databases;
                  eliminates bottlenecks and data contention.
                </li>
                <li>
                  <strong>Event-Driven Communication</strong> — use asynchronous messaging (Kafka,
                  RabbitMQ) where possible.
                </li>
                <li>
                  <strong>Clear API Contracts</strong> — expose via REST, gRPC, or GraphQL; use
                  versioned APIs (/v1/resource); document with OpenAPI/Swagger.
                </li>
                <li>
                  <strong>Independent Deployment</strong> — Docker + Kubernetes + CI/CD pipelines.
                </li>
                <li>
                  <strong>Resilience</strong> — Circuit Breaker pattern, retries with exponential
                  backoff, fallback mechanisms.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </LessonSection>

      {/* ─────────────────────────── gRPC & Protobuf ─────────────────────────── */}
      <LessonSection title="gRPC and Protocol Buffers (Protobuf)" icon={ArrowRightLeft}>
        <p>
          <strong>gRPC</strong> (Google Remote Procedure Call) is an open-source, high-performance
          RPC framework by Google. It communicates over <strong>HTTP/2</strong> and uses{" "}
          <strong>Protocol Buffers (protobuf)</strong> for serialisation.
        </p>
        <p>
          <strong>Protobuf</strong> is a language-neutral, platform-neutral binary serialisation
          format developed by Google. Compared to JSON (used by REST), protobuf gives:
        </p>
        <ul>
          <li>
            <strong>Faster serialisation</strong> — binary format is much quicker to encode/decode
            than text-based JSON.
          </li>
          <li>
            <strong>Smaller message sizes</strong> — binary payloads are significantly more compact
            than JSON strings.
          </li>
        </ul>
        <Callout type="trap" title="Exam fact — Protobuf vs JSON">
          Protobuf gives <strong>faster serialisation</strong> and{" "}
          <strong>smaller message sizes</strong> compared to JSON. This is the defining advantage of
          gRPC over REST in performance-critical microservice communication.
        </Callout>

        <Diagram caption="gRPC client/server stub model — .proto defines the contract; protoc generates stubs; client and server communicate over HTTP/2">
          <svg viewBox="0 0 520 200" width="520" height="200" role="img">
            {/* .proto file */}
            <rect x="185" y="10" width="150" height="36" rx="5" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
            <text x="260" y="32" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">
              service.proto
            </text>
            {/* protoc arrow down-left */}
            <line x1="225" y1="46" x2="125" y2="88" stroke="#d97706" strokeWidth="1.5" strokeDasharray="4,2" />
            <text x="148" y="72" fontSize="9" fill="#d97706">
              generates client stub
            </text>
            {/* protoc arrow down-right */}
            <line x1="295" y1="46" x2="395" y2="88" stroke="#d97706" strokeWidth="1.5" strokeDasharray="4,2" />
            <text x="316" y="72" fontSize="9" fill="#d97706">
              generates server skeleton
            </text>
            {/* Client */}
            <rect x="25" y="88" width="170" height="52" rx="6" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="110" y="108" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e3a8a">
              gRPC Client
            </text>
            <text x="110" y="128" textAnchor="middle" fontSize="10" fill="#1e40af">
              uses stub to call methods
            </text>
            {/* Server */}
            <rect x="325" y="88" width="170" height="52" rx="6" fill="#d1fae5" stroke="#059669" strokeWidth="1.5" />
            <text x="410" y="108" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">
              gRPC Server
            </text>
            <text x="410" y="128" textAnchor="middle" fontSize="10" fill="#065f46">
              implements service methods
            </text>
            {/* HTTP/2 arrows */}
            <line x1="195" y1="114" x2="325" y2="114" stroke="#7c3aed" strokeWidth="2" />
            <polygon points="320,109 330,114 320,119" fill="#7c3aed" />
            <polygon points="200,109 190,114 200,119" fill="#7c3aed" />
            <text x="260" y="107" textAnchor="middle" fontSize="10" fill="#7c3aed">
              HTTP/2 + Protobuf (binary)
            </text>
            {/* comparison note */}
            <rect x="25" y="156" width="470" height="34" rx="4" fill="#f8fafc" stroke="#e2e8f0" />
            <text x="260" y="170" textAnchor="middle" fontSize="10" fill="#475569">
              gRPC: HTTP/2 + Protobuf (binary) — faster serialisation &amp; smaller messages vs REST: HTTP/1.1 + JSON
            </text>
            <text x="260" y="184" textAnchor="middle" fontSize="9" fill="#94a3b8">
              gRPC supports streaming (client, server, bi-directional) and strongly typed contracts via .proto files
            </text>
          </svg>
        </Diagram>

        <Accordion type="single" collapsible className="rounded-lg border px-4">
          <AccordionItem value="grpc-how">
            <AccordionTrigger>How gRPC works — the 5 steps</AccordionTrigger>
            <AccordionContent>
              <ol className="list-decimal pl-5 space-y-1">
                <li>
                  Define service and message types in a <code>.proto</code> file.
                </li>
                <li>
                  Compile with <code>protoc</code> to generate client/server code (stubs and
                  skeletons).
                </li>
                <li>Server implements the service methods from the generated interface.</li>
                <li>Client creates a stub and calls remote methods as if they were local.</li>
                <li>
                  All communication happens over <strong>HTTP/2</strong>.
                </li>
              </ol>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="http2">
            <AccordionTrigger>HTTP/2 key features — why gRPC uses it</AccordionTrigger>
            <AccordionContent>
              <ul>
                <li>
                  <strong>Multiplexing</strong> — multiple requests/responses simultaneously over
                  one connection (avoids HTTP/1.1 "one at a time" limit).
                </li>
                <li>
                  <strong>Header Compression</strong> — HPACK reduces header overhead.
                </li>
                <li>
                  <strong>Binary Protocol</strong> — more compact and less error-prone than
                  HTTP/1.1 text.
                </li>
                <li>
                  <strong>Stream Prioritisation</strong> — assign priorities to data streams.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="grpc-vs-rest">
            <AccordionTrigger>gRPC vs REST API — comparison table</AccordionTrigger>
            <AccordionContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="border px-3 py-2 text-left">Feature</th>
                      <th className="border px-3 py-2 text-left">gRPC</th>
                      <th className="border px-3 py-2 text-left">REST</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="even:bg-slate-50">
                      <td className="border px-3 py-1 font-medium">Transport Protocol</td>
                      <td className="border px-3 py-1">HTTP/2</td>
                      <td className="border px-3 py-1">HTTP/1.1</td>
                    </tr>
                    <tr className="even:bg-slate-50">
                      <td className="border px-3 py-1 font-medium">Payload Format</td>
                      <td className="border px-3 py-1">Protobuf (binary)</td>
                      <td className="border px-3 py-1">JSON (text)</td>
                    </tr>
                    <tr className="even:bg-slate-50">
                      <td className="border px-3 py-1 font-medium">Speed</td>
                      <td className="border px-3 py-1">Faster</td>
                      <td className="border px-3 py-1">Slower</td>
                    </tr>
                    <tr className="even:bg-slate-50">
                      <td className="border px-3 py-1 font-medium">Streaming</td>
                      <td className="border px-3 py-1">Supported</td>
                      <td className="border px-3 py-1">Limited</td>
                    </tr>
                    <tr className="even:bg-slate-50">
                      <td className="border px-3 py-1 font-medium">Contract</td>
                      <td className="border px-3 py-1">Strong (proto files)</td>
                      <td className="border px-3 py-1">Weak (OpenAPI)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </LessonSection>

      {/* ─────────────────────────── API Gateway ─────────────────────────── */}
      <LessonSection title="API Gateway Pattern" icon={Server}>
        <p>
          An <strong>API Gateway</strong> is a <strong>single-entry point</strong> for all client
          requests in a microservices architecture. Without it, clients must call many individual
          services — leading to coupling, too many round trips, security issues, and hard-to-manage
          cross-cutting concerns.
        </p>
        <p>Core responsibilities of an API Gateway:</p>
        <ul>
          <li>
            <strong>Request Routing</strong> — forward requests to the correct microservice.
          </li>
          <li>
            <strong>Authentication &amp; Authorisation</strong> — centralise security enforcement.
          </li>
          <li>
            <strong>Aggregation of Responses</strong> — combine multiple service responses into one
            client call.
          </li>
          <li>
            <strong>Rate Limiting &amp; Throttling</strong> — protect services from overload.
          </li>
          <li>
            <strong>Caching, Monitoring &amp; Logging</strong> — cross-cutting observability.
          </li>
          <li>
            <strong>Load Balancing</strong> — distribute requests across service instances.
          </li>
        </ul>
        <Callout type="info" title="Popular API Gateway tools">
          Kong, NGINX, AWS API Gateway, Traefik, Istio, Zuul — and{" "}
          <strong>Spring Cloud Gateway</strong> (modern reactive alternative to Zuul; built on
          Spring WebFlux / Project Reactor; highlighted in slides as the preferred Spring Boot
          option).
        </Callout>
      </LessonSection>

      {/* ─────────────────────────── Service Discovery ─────────────────────────── */}
      <LessonSection title="Dynamic Service Discovery" icon={Cloud}>
        <p>
          <strong>Service Discovery</strong> is a mechanism that allows microservices to{" "}
          <strong>find and communicate with each other dynamically</strong> without needing
          hardcoded IP addresses or hostnames. Since services are deployed dynamically in containers
          or cloud environments with frequently changing IPs and ports, manual configuration is
          impractical.
        </p>
        <p>
          Service Discovery solves this by letting services{" "}
          <strong>register themselves</strong> and <strong>discover others</strong> at runtime
          through a service registry (e.g. <strong>Netflix Eureka</strong>).
        </p>
        <Accordion type="single" collapsible className="rounded-lg border px-4">
          <AccordionItem value="eureka">
            <AccordionTrigger>Netflix Eureka + Spring Cloud Gateway workflow</AccordionTrigger>
            <AccordionContent>
              <ol className="list-decimal pl-5">
                <li>
                  Client sends request to Spring Cloud Gateway (e.g.{" "}
                  <code>/user-service/users/hello</code>).
                </li>
                <li>
                  Gateway performs an <strong>Eureka Discovery Lookup</strong> for
                  "user-service".
                </li>
                <li>
                  Eureka returns the registered instance address (e.g.{" "}
                  <code>localhost:8081</code>).
                </li>
                <li>Gateway proxies the request to that actual instance.</li>
              </ol>
              <p className="mt-2 text-sm text-slate-600">
                Spring Cloud Gateway uses{" "}
                <code>discovery.locator.enabled: true</code> to auto-create routes from Eureka
                registrations.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="discovery-tools">
            <AccordionTrigger>Common service discovery tools</AccordionTrigger>
            <AccordionContent>
              <ul>
                <li>
                  <strong>Eureka</strong> — Netflix OSS-based service registry (Spring Cloud);
                  highlighted in slides.
                </li>
                <li>
                  <strong>Consul</strong> — service discovery + health checking (HashiCorp).
                </li>
                <li>
                  <strong>Zookeeper</strong> — coordination service, also used for discovery.
                </li>
                <li>
                  <strong>Kubernetes DNS</strong> — built-in service discovery via cluster DNS.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </LessonSection>

      {/* ─────────────────────────── Flashcards ─────────────────────────── */}
      <LessonSection title="Flashcards — quick recall" icon={Workflow}>
        <FlashcardDeck
          cards={[
            {
              front: "SOA definition",
              back: "A software design paradigm that organises systems into independent and reusable services, each representing a business process or function.",
            },
            {
              front: "ESB (Enterprise Service Bus)",
              back: "The 'brain' of an SOA system — routes, transforms, and mediates communication between services. A source of SOA architectural complexity.",
            },
            {
              front: "WSDL",
              back: "XML-based standard that provides a standard way to DESCRIBE web services, enabling INTEROPERABILITY between heterogeneous systems.",
            },
            {
              front: "MOM primary purpose",
              back: "To facilitate ASYNCHRONOUS communication between distributed systems (not synchronous/RPC). Examples: Kafka, RabbitMQ.",
            },
            {
              front: "SOA challenge: consistent service security",
              back: "Ensuring uniform authentication, authorisation, and data-protection policies across all independently deployed SOA services is a key challenge — not a benefit.",
            },
            {
              front: "gRPC vs REST — key differences",
              back: "gRPC: HTTP/2 + Protobuf (binary, faster, smaller). REST: HTTP/1.1 + JSON (text, slower, larger). gRPC supports streaming and strong typed contracts.",
            },
            {
              front: "Protobuf advantage over JSON",
              back: "Faster serialisation and smaller message sizes due to compact binary encoding — developed by Google.",
            },
            {
              front: "SOA granularity vs Microservices granularity",
              back: "SOA = coarse-grained, enterprise-level services. Microservices = fine-grained, single business-function services.",
            },
          ]}
        />
      </LessonSection>

      {/* ─────────────────────────── Mini quiz ─────────────────────────── */}
      <MiniQuiz questions={questions.slice(0, 6)} title="Quick check — Week 16" />
    </>
  );
}
