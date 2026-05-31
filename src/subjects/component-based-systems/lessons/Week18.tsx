import {
  Boxes,
  Bug,
  CheckCircle2,
  FlaskConical,
  Layers,
  Network,
  ShieldCheck,
  Target,
  TestTube,
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
import questions from "../questions/week18";

export default function Week18() {
  return (
    <>
      <Callout type="key" title="Big picture">
        Week 18 covers the <strong>full testing landscape</strong> for
        component-based and microservice systems: why testing is always
        incomplete (Turing), the testing pyramid, the precise definitions of{" "}
        <strong>unit, component, and integration testing</strong>, how to write
        good tests (AAA, isolation, mocking), Mockito as a test-double
        framework, and observability with Spring Boot Actuator, Prometheus, and
        Grafana.
      </Callout>

      {/* ─────────────────────────── Incompleteness ─────────────────────────── */}
      <LessonSection title="Why Testing is Always Incomplete" icon={Bug}>
        <p>
          Alan Turing proved that no program can universally decide whether
          another program will terminate — the{" "}
          <strong>halting problem</strong>. The practical consequence:{" "}
          <em>
            "Testing can <strong>demonstrate the presence</strong> of bugs, but
            not their <strong>absence</strong>."
          </em>
        </p>
        <ul>
          <li>
            No test suite can <strong>guarantee</strong> a program runs without
            errors.
          </li>
          <li>
            Well-designed tests come close to adequate — they reduce risk
            without eliminating it entirely.
          </li>
          <li>
            Projects <em>without</em> tests accumulate exponentially growing
            maintenance cost; projects <em>with</em> tests grow nearly linearly.
          </li>
        </ul>
        <Callout type="trap" title="Common exam trap">
          Students sometimes write "100% code coverage proves correctness." It
          does not. Coverage measures which lines ran — not whether all possible
          inputs produce correct outputs. You can have 100% coverage and still
          have bugs.
        </Callout>
      </LessonSection>

      {/* ─────────────────────────── Testing Pyramid ─────────────────────────── */}
      <LessonSection title="The Software Testing Pyramid" icon={Layers}>
        <p>
          The pyramid defines how many tests of each type a healthy suite should
          have. Wider layers = more tests, faster, cheaper. Narrower layers =
          fewer tests, slower, more expensive.
        </p>

        <Diagram caption="The testing pyramid: Unit → Component → Integration → E2E → Manual. Wider = more tests, faster, cheaper; narrower = fewer, slower, costlier.">
          <svg viewBox="0 0 520 270" width="520" height="270" role="img">
            {/* Manual */}
            <polygon points="260,10 310,60 210,60" fill="#16a34a" />
            <text x="260" y="45" textAnchor="middle" fontSize="10" fill="#fff" fontWeight="700">Manual</text>
            {/* E2E */}
            <polygon points="260,10 340,90 180,90" fill="#2563eb" />
            <polygon points="310,60 340,90 180,90 210,60" fill="#2563eb" />
            <text x="260" y="83" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="700">E2E Tests</text>
            {/* Integration */}
            <polygon points="340,90 380,130 140,130 180,90" fill="#d1d5b4" />
            <text x="260" y="117" textAnchor="middle" fontSize="12" fill="#374151" fontWeight="700">Integration Testing</text>
            {/* Component */}
            <polygon points="380,130 420,170 100,170 140,130" fill="#f9a8a8" />
            <text x="260" y="157" textAnchor="middle" fontSize="13" fill="#374151" fontWeight="600">Component Testing</text>
            {/* Unit */}
            <polygon points="420,170 460,210 60,210 100,170" fill="#7ca44d" />
            <text x="260" y="197" textAnchor="middle" fontSize="14" fill="#fff" fontWeight="700">Unit Testing</text>
            {/* base */}
            <rect x="60" y="210" width="400" height="30" rx="4" fill="#5a8a2e" />
            <text x="260" y="231" textAnchor="middle" fontSize="12" fill="#fff">Fast · Isolated · Many</text>
            {/* labels right */}
            <text x="475" y="200" fontSize="10" fill="#6b7280">← Most</text>
            <text x="475" y="105" fontSize="10" fill="#6b7280">← Fewest</text>
          </svg>
        </Diagram>

        <ul>
          <li>
            <strong>Unit Testing</strong> — test a single function/method/class
            in isolation; fastest, most numerous.
          </li>
          <li>
            <strong>Component Testing</strong> — test a whole component (e.g.
            API controller + service layer) with external dependencies mocked.
          </li>
          <li>
            <strong>Integration Testing</strong> — test multiple REAL components
            together (real DB, real message broker).
          </li>
          <li>
            <strong>E2E Tests</strong> — simulate real user journeys through the
            entire live system.
          </li>
          <li>
            <strong>Manual Tests</strong> — exploratory; fewest, most expensive.
          </li>
        </ul>
      </LessonSection>

      {/* ─────────────────────────── Unit Testing ─────────────────────────── */}
      <LessonSection title="Unit Testing" icon={TestTube}>
        <p>
          A <strong>unit</strong> is typically a function, method, or class.
          Unit tests test it <strong>in complete isolation</strong>: all
          collaborators are replaced by test doubles.
        </p>

        <Accordion type="single" collapsible className="rounded-lg border px-4">
          <AccordionItem value="ut-practices">
            <AccordionTrigger>Unit testing best practices (from the slides)</AccordionTrigger>
            <AccordionContent>
              <ul>
                <li>
                  <strong>Test one unit at a time.</strong> If a test calls
                  both <code>calculate_total()</code> and{" "}
                  <code>generate_invoice()</code> and fails, it is unclear which
                  is broken.
                </li>
                <li>
                  <strong>Write independent tests.</strong> Shared state (e.g.{" "}
                  <code>shared_db</code>) means tests depend on each other —
                  violating isolation. Each test must set up its own context.
                </li>
                <li>
                  <strong>Mock external dependencies.</strong> Using a real{" "}
                  <code>EmailService</code> in a unit test sends real emails,
                  is slow, unreliable, and turns the test into integration
                  testing.
                </li>
                <li>
                  <strong>Follow Arrange-Act-Assert (AAA).</strong> No mixing of
                  setup, actions, and assertions.
                </li>
                <li>
                  <strong>Use descriptive names</strong>, e.g.{" "}
                  <code>test_calculate_total_with_valid_input(a, b)</code>.
                </li>
                <li>
                  <strong>Aim for full coverage</strong> including edge cases;
                  avoid over-reliance on unit tests alone.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="first">
            <AccordionTrigger>FIRST principles for good tests</AccordionTrigger>
            <AccordionContent>
              <ul>
                <li><strong>F</strong>ast — run in milliseconds, not seconds.</li>
                <li><strong>I</strong>solated / Independent — no shared state; any order should work.</li>
                <li><strong>R</strong>epeatable — same result every run, any environment.</li>
                <li><strong>S</strong>elf-validating — pass/fail is automatic; no manual inspection.</li>
                <li><strong>T</strong>imely — written close to (or before) the code under test.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Diagram caption="Arrange-Act-Assert: the three mandatory phases of a well-structured test.">
          <svg viewBox="0 0 520 110" width="520" height="110" role="img">
            {/* Arrange */}
            <rect x="10" y="20" width="148" height="70" rx="8" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="84" y="48" textAnchor="middle" fontWeight="700" fontSize="14" fill="#1e3a8a">Arrange</text>
            <text x="84" y="68" textAnchor="middle" fontSize="11" fill="#334155">Set up test context</text>
            <text x="84" y="83" textAnchor="middle" fontSize="10" fill="#64748b">objects, mocks, data</text>
            {/* arrow */}
            <line x1="158" y1="55" x2="182" y2="55" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arr)" />
            <defs>
              <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L0,6 L8,3 z" fill="#94a3b8" />
              </marker>
            </defs>
            {/* Act */}
            <rect x="182" y="20" width="148" height="70" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
            <text x="256" y="48" textAnchor="middle" fontWeight="700" fontSize="14" fill="#14532d">Act</text>
            <text x="256" y="68" textAnchor="middle" fontSize="11" fill="#334155">Call the unit</text>
            <text x="256" y="83" textAnchor="middle" fontSize="10" fill="#64748b">under test</text>
            {/* arrow */}
            <line x1="330" y1="55" x2="354" y2="55" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arr)" />
            {/* Assert */}
            <rect x="354" y="20" width="148" height="70" rx="8" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
            <text x="428" y="48" textAnchor="middle" fontWeight="700" fontSize="14" fill="#78350f">Assert</text>
            <text x="428" y="68" textAnchor="middle" fontSize="11" fill="#334155">Verify the result</text>
            <text x="428" y="83" textAnchor="middle" fontSize="10" fill="#64748b">expected == actual</text>
          </svg>
        </Diagram>
      </LessonSection>

      {/* ─────────────────────────── Test Doubles ─────────────────────────── */}
      <LessonSection title="Test Doubles: Mock, Stub, Fake, Spy, Dummy" icon={FlaskConical}>
        <p>
          A <strong>test double</strong> is any object that stands in for a real
          dependency during testing. There are five types — the mock/stub
          distinction is the most exam-tested.
        </p>

        <div className="overflow-x-auto rounded-lg border">
          <table className="min-w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-2 text-left font-semibold">Type</th>
                <th className="px-4 py-2 text-left font-semibold">What it does</th>
                <th className="px-4 py-2 text-left font-semibold">Example</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2 font-medium">Stub</td>
                <td className="px-4 py-2">Returns canned/hardcoded values; no interaction verification</td>
                <td className="px-4 py-2 font-mono text-xs">when(repo.findById("1")).thenReturn(user)</td>
              </tr>
              <tr className="border-t bg-muted/20">
                <td className="px-4 py-2 font-medium">Mock</td>
                <td className="px-4 py-2">Stub + verifies that specific interactions (calls) occurred</td>
                <td className="px-4 py-2 font-mono text-xs">verify(emailSvc).send("x@y.com")</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-medium">Fake</td>
                <td className="px-4 py-2">Simplified but working implementation; not production-ready</td>
                <td className="px-4 py-2">In-memory HashMap repository</td>
              </tr>
              <tr className="border-t bg-muted/20">
                <td className="px-4 py-2 font-medium">Spy</td>
                <td className="px-4 py-2">Wraps real object; records calls while delegating to real impl</td>
                <td className="px-4 py-2 font-mono text-xs">spy(realService)</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-medium">Dummy</td>
                <td className="px-4 py-2">Passed as argument but never actually used; satisfies signature</td>
                <td className="px-4 py-2">null or empty object passed to constructor</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Callout type="trap" title="Mock vs Stub — the most-tested distinction">
          A <strong>stub</strong> only returns values. A <strong>mock</strong>{" "}
          additionally <em>verifies interactions</em> — it fails the test if an
          expected call was not made. In Mockito,{" "}
          <code>when(...).thenReturn(...)</code> is stubbing;{" "}
          <code>verify(...)</code> is mocking. A single Mockito object can act
          as both a stub and a mock in the same test.
        </Callout>

        <Accordion type="single" collapsible className="rounded-lg border px-4 mt-4">
          <AccordionItem value="mockito">
            <AccordionTrigger>Mockito key features</AccordionTrigger>
            <AccordionContent>
              <ul>
                <li><strong>Mocking</strong> — simulate real objects and their behavior.</li>
                <li><strong>Stubbing</strong> — define what a mock returns when a method is called.</li>
                <li><strong>Verification</strong> — check that a mock was called with specific arguments.</li>
                <li><strong>Argument Capture</strong> — inspect arguments passed to mocked methods.</li>
                <li><strong>BDD API</strong> — <code>given().willReturn()</code> style for readable tests.</li>
              </ul>
              <p className="mt-2 text-sm text-muted-foreground">
                Typical flow: (1) create mock, (2) stub behavior, (3) inject
                mock, (4) call method &amp; assert result, (5) verify
                interaction.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </LessonSection>

      {/* ─────────────────────────── Component Testing ─────────────────────────── */}
      <LessonSection title="Component Testing" icon={Boxes}>
        <p>
          Component testing exercises a{" "}
          <strong>whole component as a unit</strong> — e.g. an API controller
          together with its service layer — verifying that it correctly{" "}
          <strong>handles and routes requests</strong> to underlying services.
          External dependencies (databases, external APIs) are{" "}
          <strong>mocked or stubbed</strong>.
        </p>

        <Diagram caption="Unit vs Component vs Integration test scope — widening circles of what is exercised with real code.">
          <svg viewBox="0 0 520 200" width="520" height="200" role="img">
            {/* Integration outermost */}
            <rect x="10" y="10" width="500" height="180" rx="12" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
            <text x="260" y="180" textAnchor="middle" fontSize="11" fill="#92400e" fontWeight="700">Integration Testing — multiple real components (DB, broker, etc.)</text>
            {/* Component */}
            <rect x="50" y="30" width="420" height="130" rx="10" fill="#fce7f3" stroke="#db2777" strokeWidth="2" />
            <text x="260" y="148" textAnchor="middle" fontSize="11" fill="#9d174d" fontWeight="700">Component Testing — whole component, external deps mocked</text>
            {/* Unit innermost */}
            <rect x="160" y="48" width="200" height="80" rx="8" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
            <text x="260" y="82" textAnchor="middle" fontWeight="700" fontSize="13" fill="#1e3a8a">Unit Testing</text>
            <text x="260" y="100" textAnchor="middle" fontSize="11" fill="#334155">single function/class</text>
            <text x="260" y="116" textAnchor="middle" fontSize="10" fill="#64748b">all deps mocked</text>
          </svg>
        </Diagram>

        <p className="mt-2">
          Key characteristics of component testing (from the slides):
        </p>
        <ul>
          <li>
            <strong>Integrated units</strong> — clusters of units that together
            provide specific functionality are tested together.
          </li>
          <li>
            <strong>Broader scope</strong> — validates interactions between
            units at their interfaces.
          </li>
          <li>
            <strong>Semi-isolated environment</strong> — external dependencies
            may be stubbed; the component runs as a whole.
          </li>
          <li>
            <strong>Objective</strong> — detect interface mismatches, data-flow
            problems, and logic errors that only appear when multiple units
            interact.
          </li>
        </ul>

        <Accordion type="single" collapsible className="rounded-lg border px-4 mt-4">
          <AccordionItem value="ct-vs-ut">
            <AccordionTrigger>Unit Testing vs Component Testing — comparison table</AccordionTrigger>
            <AccordionContent>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-3 py-2 text-left">Aspect</th>
                      <th className="px-3 py-2 text-left">Unit Testing</th>
                      <th className="px-3 py-2 text-left">Component Testing</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t"><td className="px-3 py-1">Scope</td><td className="px-3 py-1">Single method/function</td><td className="px-3 py-1">Whole component/module</td></tr>
                    <tr className="border-t bg-muted/20"><td className="px-3 py-1">Isolation</td><td className="px-3 py-1">Complete (all deps mocked)</td><td className="px-3 py-1">Partial (internal classes tested together)</td></tr>
                    <tr className="border-t"><td className="px-3 py-1">Goal</td><td className="px-3 py-1">Algorithmic correctness</td><td className="px-3 py-1">Component behaves as expected at its contract</td></tr>
                    <tr className="border-t bg-muted/20"><td className="px-3 py-1">Ideal for</td><td className="px-3 py-1">Pure logic, math, utilities</td><td className="px-3 py-1">Services, business logic layers, microservices</td></tr>
                  </tbody>
                </table>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="ct-best">
            <AccordionTrigger>Component testing best practices</AccordionTrigger>
            <AccordionContent>
              <ul>
                <li><strong>Understand component requirements</strong> — define functionality, inputs, outputs, and behavior before writing tests.</li>
                <li><strong>Isolate the component</strong> — stub or mock child components and external services.</li>
                <li><strong>Cover positive and negative scenarios</strong> — e.g. a date picker with valid and invalid dates.</li>
                <li><strong>Perform boundary value testing</strong> — focus on edge values.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </LessonSection>

      {/* ─────────────────────────── Integration Testing ─────────────────────────── */}
      <LessonSection title="Integration Testing" icon={Network}>
        <p>
          Integration testing verifies the interaction between{" "}
          <strong>multiple real components or modules</strong> after they are
          combined. Unlike component testing, external dependencies (databases,
          message brokers) are <strong>real</strong> — typically spun up with
          Testcontainers.
        </p>
        <p>
          Example: a test that registers a user, verifies the record is written
          to a real PostgreSQL database, <em>and</em> a welcome message is
          published to real RabbitMQ — all in a single test flow.
        </p>

        <ul>
          <li><strong>Validate interface contracts</strong> — ensure data passes correctly between components.</li>
          <li><strong>Identify defects in integration points</strong> — wrong data types, null references, unhandled exceptions.</li>
          <li><strong>Check system workflow</strong> — flows that span multiple components (API → service → DB → message queue).</li>
          <li><strong>Uncover dependency issues</strong> — mismatches in format, sequence, or availability assumptions.</li>
        </ul>

        <Accordion type="single" collapsible className="rounded-lg border px-4 mt-4">
          <AccordionItem value="it-vs-ct">
            <AccordionTrigger>Component Testing vs Integration Testing — key differences</AccordionTrigger>
            <AccordionContent>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-3 py-2 text-left">Aspect</th>
                      <th className="px-3 py-2 text-left">Component Testing</th>
                      <th className="px-3 py-2 text-left">Integration Testing</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t"><td className="px-3 py-1">Scope</td><td className="px-3 py-1">Individual component in isolation</td><td className="px-3 py-1">Multiple components or systems</td></tr>
                    <tr className="border-t bg-muted/20"><td className="px-3 py-1 font-semibold">Dependencies</td><td className="px-3 py-1 font-semibold">Mocks, stubs, or fakes</td><td className="px-3 py-1 font-semibold">Real connections (APIs, DBs, brokers)</td></tr>
                    <tr className="border-t"><td className="px-3 py-1">Key focus</td><td className="px-3 py-1">Functionality &amp; behavior of component</td><td className="px-3 py-1">Communication, data flow, and wiring</td></tr>
                    <tr className="border-t bg-muted/20"><td className="px-3 py-1">When performed</td><td className="px-3 py-1">During/after component development</td><td className="px-3 py-1">After successful component testing</td></tr>
                  </tbody>
                </table>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="it-tools">
            <AccordionTrigger>Integration testing tools (Java / C#)</AccordionTrigger>
            <AccordionContent>
              <ul>
                <li><strong>JUnit 5 + Spring Boot Test</strong> — boots full Spring context for integration tests.</li>
                <li><strong>Testcontainers</strong> — spins up Dockerized DBs (PostgreSQL), message brokers (RabbitMQ, Kafka), etc.</li>
                <li><strong>MockMvc</strong> — simulates HTTP requests without starting a real server (in Spring).</li>
                <li><strong>RestAssured</strong> — REST API testing with fluent assertions.</li>
                <li><strong>WireMock</strong> — stubs external HTTP services for integration tests.</li>
                <li><strong>xUnit / NUnit / MSTest + ASP.NET Core TestHost</strong> — for C# integration testing.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Callout type="info" title="Best practices for integration testing">
          <ul>
            <li>Test <strong>interactions between modules</strong>, not internal logic (leave that for unit tests).</li>
            <li>Use <strong>real dependencies</strong> (Testcontainers) where possible — avoid mocks in integration tests.</li>
            <li>Each test should <strong>run independently</strong>: clean up DB and in-memory state with <code>@BeforeEach</code> / <code>@AfterEach</code>.</li>
            <li>Include <strong>failure scenarios</strong>: network latency, downstream unavailability, DB constraint violations.</li>
            <li>Use <strong>meaningful test names</strong> like <code>testUserSignupSavesToDatabaseAndSendsWelcomeEmail</code>.</li>
          </ul>
        </Callout>
      </LessonSection>

      {/* ─────────────────────────── Observability ─────────────────────────── */}
      <LessonSection title="Observability and Monitoring in Microservices" icon={ShieldCheck}>
        <p>
          In microservice architectures, services communicate over networks,
          scale dynamically, and use asynchronous messaging — making it{" "}
          <strong>hard to trace issues or understand system health</strong>{" "}
          without structured observability.
        </p>
        <p>The three pillars of observability:</p>
        <ul>
          <li>
            <strong>Metrics</strong> — numerical measurements over time (request
            rate, latency, CPU, JVM memory). Tools: Prometheus, Micrometer,
            Grafana.
          </li>
          <li>
            <strong>Logs</strong> — structured event records. Tools: ELK Stack
            (Elasticsearch, Logstash, Kibana), Loki.
          </li>
          <li>
            <strong>Traces</strong> — distributed tracing across services (track
            a single request through all microservices). Tools: Jaeger,
            OpenTelemetry, Zipkin.
          </li>
        </ul>

        <Accordion type="single" collapsible className="rounded-lg border px-4 mt-4">
          <AccordionItem value="actuator">
            <AccordionTrigger>Spring Boot Actuator — production-ready endpoints</AccordionTrigger>
            <AccordionContent>
              <p>
                Spring Boot Actuator exposes management endpoints.{" "}
                <code>/actuator/health</code> and <code>/actuator/info</code>{" "}
                are enabled by default and not sensitive.{" "}
                <code>/actuator/metrics</code> is enabled by default but
                sensitive (needs auth). Most others (env, beans, loggers,
                threaddump, httptrace, mappings) are disabled by default and
                sensitive.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="prom-grafana">
            <AccordionTrigger>Prometheus + Micrometer + Grafana stack</AccordionTrigger>
            <AccordionContent>
              <ul>
                <li>
                  <strong>Micrometer</strong> — a metrics collection facade that integrates with Spring Boot to expose application metrics in a vendor-neutral way (like SLF4J for metrics).
                </li>
                <li>
                  <strong>Prometheus</strong> — an open-source monitoring system that <em>scrapes</em> and stores time-series metrics data from <code>/actuator/prometheus</code> endpoints.
                </li>
                <li>
                  <strong>Grafana</strong> — connects to Prometheus as a data source, queries it via PromQL, and creates interactive dashboards and alerts.
                </li>
              </ul>
              <p className="mt-2 text-sm">
                Architecture:{" "}
                <code>Microservice (port :8081...) → /actuator/prometheus → Prometheus (scrapes all) → PromQL → Grafana (dashboards, alerts)</code>
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </LessonSection>

      {/* ─────────────────────────── Flashcards ─────────────────────────── */}
      <LessonSection title="Flashcards — quick recall" icon={Target}>
        <FlashcardDeck
          cards={[
            {
              front: "Component testing (exam definition)",
              back: "Exercises a whole component — including how it routes/handles requests (e.g. an API controller) to underlying services — with external dependencies (database) replaced by mocks or stubs.",
            },
            {
              front: "Integration testing (exam definition)",
              back: "Verifies that multiple REAL components work together — e.g. registration module stores a new user in the ACTUAL database AND sends a welcome email. No mocks for the real infrastructure.",
            },
            {
              front: "Stub vs Mock",
              back: "Stub: returns canned values only. Mock: stub + verifies that specific interactions occurred. `when(...).thenReturn(...)` = stubbing; `verify(...)` = mocking.",
            },
            {
              front: "Arrange-Act-Assert (AAA)",
              back: "Arrange: set up test context and data. Act: call the unit under test. Assert: verify expected outcome. Keeps tests readable and maintainable.",
            },
            {
              front: "FIRST principles",
              back: "Fast, Isolated, Repeatable, Self-validating, Timely.",
            },
            {
              front: "Fake test double",
              back: "A simplified but fully working implementation not suitable for production — e.g. an in-memory HashMap repository instead of a real database.",
            },
            {
              front: "Testing incompleteness (Dijkstra + Turing)",
              back: "'Testing can demonstrate the PRESENCE of bugs, but not their ABSENCE.' It is theoretically impossible to create a perfect test suite (Turing's halting problem).",
            },
            {
              front: "Observability three pillars",
              back: "Metrics (Prometheus/Micrometer/Grafana), Logs (ELK/Loki), Traces (Jaeger/OpenTelemetry/Zipkin).",
            },
          ]}
        />
      </LessonSection>

      {/* ─────────────────────────── Mini quiz ─────────────────────────── */}
      <MiniQuiz questions={questions.slice(0, 6)} title="Quick check — Week 18" />
    </>
  );
}
