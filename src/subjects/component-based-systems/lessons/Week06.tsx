import {
  Boxes,
  GitCompareArrows,
  History,
  Layers,
  Network,
  Puzzle,
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
import questions from "../questions/week06";

export default function Week06() {
  return (
    <>
      <Callout type="key" title="Big picture">
        Week 6 sets up the whole course: <strong>what a software component is</strong>, why we
        build systems by <strong>assembling reusable components</strong>, and the core vocabulary
        (interfaces, component model, framework, container, composition) that every later week
        builds on.
      </Callout>

      {/* ─────────────────────────── What is CBSD ─────────────────────────── */}
      <LessonSection title="What is Component-Based Software Development?" icon={Boxes}>
        <p>
          <strong>Component-Based Software Development (CBSD)</strong> — also called CBSE
          (engineering) — builds software by <strong>assembling pre-existing, tested, reusable
          components</strong> rather than writing everything from scratch. Think{" "}
          <strong>LEGO blocks</strong>: standard pieces with well-defined connectors that snap
          together into larger systems.
        </p>
        <p>
          The motivation is the same one driving other engineering fields: just as mechanical or
          electrical engineers pull standard parts from a catalog, software engineering aims for a{" "}
          <strong>catalog of reusable components</strong> with standardized ways to integrate them —
          cutting cost and time-to-market.
        </p>
        <Callout type="info" title="Why industry wants it">
          The pressures: software keeps growing in size &amp; complexity, products become product
          families, time-to-market must shrink, and costs must fall. CBSE is{" "}
          <strong>part of the solution — but not in isolation</strong>.
        </Callout>
      </LessonSection>

      {/* ─────────────────────────── What is a component ─────────────────────────── */}
      <LessonSection title="What exactly is a component?" icon={Puzzle}>
        <p>The classic definitions you should recognise:</p>
        <ul>
          <li>
            <strong>Szyperski</strong>: "a unit of composition with{" "}
            <strong>contractually specified interfaces and context dependencies only</strong>. It
            can be deployed independently and is subject to{" "}
            <strong>composition by third parties</strong>." (The most-cited definition.)
          </li>
          <li>
            <strong>Sparling</strong>: a language-neutral, independently implemented package of
            services, delivered in an encapsulated and replaceable container, accessed via published
            interfaces.
          </li>
          <li>
            <strong>Hopkins</strong>: a physical packaging of executable software with a well-defined
            and published interface.
          </li>
        </ul>
        <p>Pulling them together, a component:</p>
        <ul>
          <li>is an identifiable, <strong>functionally reusable</strong> unit of a larger system;</li>
          <li>is <strong>developed independently</strong>;</li>
          <li>is delivered/deployed in a <strong>context-free</strong> environment;</li>
          <li>interacts with others only through <strong>well-defined interfaces</strong>.</li>
        </ul>

        <Accordion type="single" collapsible className="rounded-lg border px-4">
          <AccordionItem value="obj-vs-comp">
            <AccordionTrigger>Object vs Component — a favourite exam contrast</AccordionTrigger>
            <AccordionContent>
              <p>
                A <strong>component is built using objects</strong> but operates at a higher level. A
                Java Swing <code>JButton</code> is a component; internally it uses objects like{" "}
                <code>ActionListener</code>.
              </p>
              <ul>
                <li><strong>Abstraction:</strong> object = low-level; component = high-level.</li>
                <li><strong>Granularity:</strong> object = fine-grained; component = coarse-grained.</li>
                <li>
                  <strong>Lifecycle:</strong> objects are created/destroyed by{" "}
                  <strong>program logic</strong>; components are managed by a{" "}
                  <strong>component framework</strong>. ← most commonly tested distinction.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Diagram caption="Object vs Component — abstraction, granularity, and who manages the lifecycle">
          <svg viewBox="0 0 520 200" width="520" height="200" role="img">
            <rect x="20" y="20" width="220" height="160" rx="10" fill="#eff6ff" stroke="#3b82f6" />
            <text x="130" y="45" textAnchor="middle" fontWeight="700" fontSize="15" fill="#1e3a8a">Object</text>
            <text x="130" y="80" textAnchor="middle" fontSize="12" fill="#1e293b">Instance of a class</text>
            <text x="130" y="105" textAnchor="middle" fontSize="12" fill="#1e293b">Low-level · fine-grained</text>
            <text x="130" y="130" textAnchor="middle" fontSize="12" fill="#1e293b">data + behaviour</text>
            <text x="130" y="160" textAnchor="middle" fontSize="11" fill="#b91c1c">lifecycle: program logic</text>

            <rect x="280" y="20" width="220" height="160" rx="10" fill="#f5f3ff" stroke="#8b5cf6" />
            <text x="390" y="45" textAnchor="middle" fontWeight="700" fontSize="15" fill="#5b21b6">Component</text>
            <text x="390" y="80" textAnchor="middle" fontSize="12" fill="#1e293b">Reusable functionality</text>
            <text x="390" y="105" textAnchor="middle" fontSize="12" fill="#1e293b">High-level · coarse-grained</text>
            <text x="390" y="130" textAnchor="middle" fontSize="12" fill="#1e293b">encapsulates objects + logic</text>
            <text x="390" y="160" textAnchor="middle" fontSize="11" fill="#15803d">lifecycle: framework</text>
          </svg>
        </Diagram>
      </LessonSection>

      {/* ─────────────────────────── Principles ─────────────────────────── */}
      <LessonSection title="Principles & characteristics of CBSD" icon={Layers}>
        <p>The recurring properties — know the one-line meaning of each:</p>
        <ul>
          <li><strong>Reusability</strong> — assemble from pre-tested components across projects (OAuth2, reCAPTCHA, PayPal SDK).</li>
          <li><strong>Modularity</strong> — break a system into independent components, each with one responsibility.</li>
          <li><strong>Composability</strong> — components combine into bigger systems; components are made of components.</li>
          <li><strong>Encapsulation</strong> — internal implementation hidden; only public interfaces exposed (Stripe API).</li>
          <li><strong>Maintainability</strong> — debug/update/replace one component without breaking the rest.</li>
          <li><strong>Extensibility</strong> — enhance a component without affecting existing functionality (2FA on a login module).</li>
          <li><strong>Interoperability</strong> — work across different platforms/environments (a REST API serving many front-ends).</li>
        </ul>
        <Callout type="trap" title="Benefits to remember">
          Faster development, scalability, cost-effectiveness, improved quality (pre-tested),
          easier maintenance, and <strong>platform independence</strong>. These phrasings show up as
          MCQ options.
        </Callout>
      </LessonSection>

      {/* ─────────────────────────── Componentization ─────────────────────────── */}
      <LessonSection title="Componentization & over-componentization" icon={GitCompareArrows}>
        <p>
          <strong>Componentization</strong> is deciding <em>how many</em> components an application
          should be split into — "the art of balance" between the number of components and the
          system's complexity factors.
        </p>
        <p>
          <strong>Over-componentization</strong> = splitting too finely. It drives up the{" "}
          <strong>cost of integration and interaction effort</strong>. Example: breaking one
          "Notification Component" into separate Like / Comment / Follow notification components.
          There is a <strong>minimum-cost region</strong> — too few or too many components both cost
          more.
        </p>
        <Diagram caption="The trade-off: development/integration effort vs number of components. The sweet spot is the minimum-cost region.">
          <svg viewBox="0 0 460 240" width="460" height="240" role="img">
            <line x1="50" y1="200" x2="430" y2="200" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="50" y1="200" x2="50" y2="20" stroke="#94a3b8" strokeWidth="1.5" />
            <text x="240" y="230" textAnchor="middle" fontSize="11" fill="#64748b">Number of components →</text>
            <text x="20" y="110" textAnchor="middle" fontSize="11" fill="#64748b" transform="rotate(-90 20 110)">Effort / cost →</text>
            {/* cost per reused component: decreasing */}
            <path d="M55,50 Q140,150 425,185" fill="none" stroke="#16a34a" strokeWidth="2.5" />
            <text x="360" y="175" fontSize="10" fill="#16a34a">cost / reused comp.</text>
            {/* integration effort: increasing */}
            <path d="M55,190 Q300,180 420,40" fill="none" stroke="#dc2626" strokeWidth="2.5" />
            <text x="300" y="70" fontSize="10" fill="#dc2626">integration effort</text>
            {/* min cost region */}
            <rect x="200" y="30" width="70" height="170" fill="#fde68a" opacity="0.45" />
            <text x="235" y="22" textAnchor="middle" fontSize="10" fill="#a16207">min-cost region</text>
          </svg>
        </Diagram>
      </LessonSection>

      {/* ─────────────────────────── Model / framework / container ─────────────────────────── */}
      <LessonSection title="Component model, framework & container" icon={Network}>
        <p>These three are constantly confused — keep them straight:</p>
        <ul>
          <li>
            <strong>Component model</strong> — the <em>specification</em>: defines the structure,
            behaviour and interaction <strong>standards</strong> for components (interface
            definition, communication standards, deployment specs). Examples: EJB, COM+/.NET, CORBA
            CCM, Spring.
          </li>
          <li>
            <strong>Component framework</strong> — the <em>implementation</em> of a component model.
            It provides the <strong>runtime environment and infrastructure to execute components</strong>,
            including a container, platform services for inter-component communication, and support
            services.
          </li>
          <li>
            <strong>Component container</strong> — the part of the framework that{" "}
            <strong>manages a component's lifecycle</strong> (creation, initialization, destruction)
            and provides services to it.
          </li>
        </ul>

        <Callout type="trap" title="Horizontal vs Vertical frameworks (exam favourite)">
          <ul>
            <li>
              <strong>Horizontal framework</strong> = <strong>general-purpose, reusable across many
              domains</strong> (e.g. logging, security, UI toolkits). ← This is the wording the mock
              exam rewards.
            </li>
            <li>
              <strong>Vertical framework</strong> = <strong>domain-specific</strong>, built for one
              industry/domain such as healthcare or finance.
            </li>
          </ul>
        </Callout>

        <Accordion type="single" collapsible className="rounded-lg border px-4">
          <AccordionItem value="static-dynamic">
            <AccordionTrigger>Static vs dynamic composition</AccordionTrigger>
            <AccordionContent>
              <ul>
                <li>
                  <strong>Statically composed</strong> — components are wired together at{" "}
                  <strong>build/compile time</strong>; the assembly is fixed before the app runs.
                </li>
                <li>
                  <strong>Dynamically composed</strong> — components are discovered and bound at{" "}
                  <strong>runtime</strong>, allowing the configuration to change while running (e.g.
                  plug-ins loaded on demand).
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="three-props">
            <AccordionTrigger>Three fundamental properties of a component (in a model)</AccordionTrigger>
            <AccordionContent>
              <ol className="list-decimal pl-5">
                <li><strong>Interfaces</strong> — how a component interacts with others.</li>
                <li><strong>Services</strong> — the component's role/purpose; should be robust, reliable, efficient.</li>
                <li><strong>Deployment techniques</strong> — how it is customised &amp; deployed (often only via its interface for black-box components).</li>
              </ol>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </LessonSection>

      {/* ─────────────────────────── Interfaces & composition ─────────────────────────── */}
      <LessonSection title="Interfaces: provides vs requires" icon={Workflow}>
        <p>
          Every component has <strong>two related interfaces</strong>:
        </p>
        <ul>
          <li>
            the <strong>"provides" interface</strong> — the services the component{" "}
            <strong>offers</strong> to others;
          </li>
          <li>
            the <strong>"requires" interface</strong> — the services it <strong>needs</strong> other
            components to provide in order to work.
          </li>
        </ul>
        <Diagram caption="A component exposes a 'provides' interface (right) and declares a 'requires' interface (left).">
          <svg viewBox="0 0 480 200" width="480" height="200" role="img">
            <rect x="180" y="60" width="120" height="80" rx="6" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
            <text x="240" y="105" textAnchor="middle" fontSize="13" fontWeight="700" fill="#075985">Component</text>
            {/* requires (left) */}
            <text x="90" y="50" textAnchor="middle" fontSize="11" fontWeight="700" fill="#b45309">Requires</text>
            <line x1="120" y1="85" x2="180" y2="85" stroke="#b45309" strokeWidth="2" />
            <circle cx="118" cy="85" r="8" fill="none" stroke="#b45309" strokeWidth="2" />
            <line x1="120" y1="115" x2="180" y2="115" stroke="#b45309" strokeWidth="2" />
            <circle cx="118" cy="115" r="8" fill="none" stroke="#b45309" strokeWidth="2" />
            <text x="90" y="160" textAnchor="middle" fontSize="9" fill="#92400e">needs from others</text>
            {/* provides (right) */}
            <text x="390" y="50" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">Provides</text>
            <line x1="300" y1="85" x2="360" y2="85" stroke="#15803d" strokeWidth="2" />
            <circle cx="362" cy="85" r="8" fill="#15803d" />
            <line x1="300" y1="115" x2="360" y2="115" stroke="#15803d" strokeWidth="2" />
            <circle cx="362" cy="115" r="8" fill="#15803d" />
            <text x="390" y="160" textAnchor="middle" fontSize="9" fill="#166534">offers to others</text>
          </svg>
        </Diagram>

        <p className="mt-4">Three ways to compose components:</p>
        <ul>
          <li>
            <strong>Sequential</strong> — an external app calls components in sequence; they don't
            call each other; usually needs some <strong>glue code</strong>.
          </li>
          <li>
            <strong>Hierarchical</strong> — one component calls another directly; the called
            component's <strong>"provides" must match the caller's "requires"</strong>.
          </li>
          <li>
            <strong>Additive</strong> — independent components that don't call each other (e.g.
            embedded or service components).
          </li>
        </ul>
        <Callout type="info" title="Component adaptor">
          When two components have <strong>incompatible interfaces</strong>, an{" "}
          <strong>adaptor</strong> sits between the "requires" and "provides" interfaces to translate
          calls.
        </Callout>
      </LessonSection>

      {/* ─────────────────────────── History / evolution ─────────────────────────── */}
      <LessonSection title="Evolution: CORBA → SOA → Microservices" icon={History}>
        <p>
          CBSD's history runs from modular programming → OOP (1980s) → component models (CORBA,
          COM/DCOM, JavaBeans in the 1990s) → SOA &amp; web components (2000s) → microservices &amp;
          containers (2010s). A clean component-based design is the{" "}
          <strong>foundation for service- and micro-service-oriented architectures</strong>.
        </p>
        <Accordion type="single" collapsible className="rounded-lg border px-4">
          <AccordionItem value="corba">
            <AccordionTrigger>CORBA (now obsolete, but tested as background)</AccordionTrigger>
            <AccordionContent>
              <ul>
                <li>
                  <strong>CORBA</strong> = Common Object Request Broker Architecture, by the{" "}
                  <strong>OMG</strong>. Lets components in different languages/machines communicate
                  over a network — distributed object-oriented computing.
                </li>
                <li>
                  Uses <strong>ORBs (Object Request Brokers)</strong>; client has a{" "}
                  <strong>stub</strong>, server has a <strong>skeleton</strong>; communicates via{" "}
                  <strong>IIOP</strong> over TCP/IP.
                </li>
                <li>Limitations: complexity, performance overhead, declining adoption.</li>
                <li>
                  Replaced by <strong>Web Services (SOAP/REST)</strong>, <strong>gRPC</strong>, and{" "}
                  <strong>Message Queues</strong> (Kafka, RabbitMQ).
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="soa">
            <AccordionTrigger>Shift to SOA → why microservices rose</AccordionTrigger>
            <AccordionContent>
              <p>
                In <strong>SOA</strong>, services became <strong>stand-alone entities external to
                the application</strong>; systems referenced services instead of embedding copies,
                and interoperability improved via standard protocols (SOAP, REST).
              </p>
              <p>
                SOA's limits led to microservices: <strong>scalability bottlenecks</strong> (all
                services scaled together), <strong>coarse-grained services became bloated</strong>,
                high complexity/cost, performance overhead per interaction, and heavy governance.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <p className="mt-4">
          Common component-based architectures to recognise: <strong>microservices</strong>,{" "}
          <strong>SOA</strong>, <strong>plug-in architecture</strong>, and the{" "}
          <strong>MVC pattern</strong>.
        </p>
      </LessonSection>

      {/* ─────────────────────────── Flashcards ─────────────────────────── */}
      <LessonSection title="Flashcards — quick recall">
        <FlashcardDeck
          cards={[
            { front: "Component (Szyperski)", back: "Unit of composition with contractually specified interfaces and context dependencies only; deployable independently; composable by third parties." },
            { front: "Component model vs framework", back: "Model = the specification of standards; framework = the implementation providing runtime + container." },
            { front: "Component container", back: "Part of the framework that manages a component's lifecycle and provides services to it." },
            { front: "Horizontal framework", back: "General-purpose, reusable across many domains." },
            { front: "Vertical framework", back: "Domain-specific, built for one industry/domain." },
            { front: "Provides vs requires interface", back: "Provides = services offered to others; Requires = services it needs from others." },
            { front: "Over-componentization", back: "Splitting too finely → higher integration & interaction cost." },
            { front: "Object lifecycle vs Component lifecycle", back: "Object: managed by program logic. Component: managed by the framework." },
          ]}
        />
      </LessonSection>

      {/* ─────────────────────────── Mini quiz ─────────────────────────── */}
      <MiniQuiz questions={questions.slice(0, 6)} title="Quick check — Week 6" />
    </>
  );
}
