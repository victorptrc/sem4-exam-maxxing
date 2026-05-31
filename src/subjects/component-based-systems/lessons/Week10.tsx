import {
  Boxes,
  Layers,
  Network,
  Plug,
  Syringe,
  TestTube,
  Wrench,
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
import questions from "../questions/week10";

export default function Week10() {
  return (
    <>
      <Callout type="key" title="Big picture">
        Week 10 is the highest-yield DI week on the mock exam. Master{" "}
        <strong>what DI is</strong>, its <strong>primary benefit</strong> (improved code
        readability &amp; maintainability), <strong>why it helps large apps</strong>{" "}
        (automates cumbersome manual dependency management), the <strong>four injection
        types</strong>, the <strong>composition root</strong>, and why{" "}
        <strong>Service Locator is an anti-pattern</strong>. EJB, JavaBeans, LSP, and the
        Decorator pattern round out the lecture.
      </Callout>

      {/* ─────────────────────── Horizontal vs Vertical ─────────────────────── */}
      <LessonSection title="Horizontal vs Vertical Component Frameworks" icon={Layers}>
        <p>
          The lecture opens by revisiting the horizontal/vertical distinction — know the
          examples by heart for MCQs.
        </p>
        <ul>
          <li>
            <strong>Horizontal framework</strong> — provides reusable components applicable{" "}
            <strong>across different domains or application areas</strong>. Components are
            loosely coupled and need minimal customisation per system.{" "}
            <em>Examples: Java EE, .NET, Spring, Angular, React.</em>
          </li>
          <li>
            <strong>Vertical framework</strong> — domain-specific; specialised for a
            particular business process or sector. Less flexible, tightly coupled with
            domain logic, optimised for specific tasks.{" "}
            <em>Example: Apache OFBiz — used for ERP and CRM applications.</em>
          </li>
        </ul>
        <Callout type="info" title="Static vs dynamic composition (recap)">
          <ul>
            <li>
              <strong>Static</strong> — components integrated at <strong>compile/build time</strong>;
              changes require recompilation and redeployment (e.g.{" "}
              <code>private static final PaymentGateway gw = new PayPalPaymentGateway()</code>).
            </li>
            <li>
              <strong>Dynamic</strong> — components loaded, replaced, or reconfigured at{" "}
              <strong>runtime</strong> using dependency injection, plugins, or dynamic service
              discovery (e.g. Eclipse plugins, Netflix API-driven services).
            </li>
          </ul>
        </Callout>

        <Accordion type="single" collapsible className="rounded-lg border px-4">
          <AccordionItem value="composition-categories">
            <AccordionTrigger>Black-box / White-box / Gray-box composition</AccordionTrigger>
            <AccordionContent>
              <ul>
                <li>
                  <strong>Black-box</strong> — internal logic hidden; interaction only via{" "}
                  <strong>well-defined APIs</strong>. Loosely coupled &amp; highly reusable.
                  Examples: microservices (REST/gRPC), SaaS APIs (PayPal, Stripe).
                </li>
                <li>
                  <strong>White-box</strong> — internal logic <strong>visible and
                  modifiable</strong>; developers can extend/modify at a deeper level.
                  Examples: Eclipse plugins, Unity game engine.
                </li>
                <li>
                  <strong>Gray-box</strong> — a mix: limited internal details partially
                  visible and <strong>configurable via metadata, config files, or extension
                  points</strong>. Examples: Spring Boot (application.yml), Apache Kafka,
                  RabbitMQ.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="composition-system">
            <AccordionTrigger>What makes a composition system?</AccordionTrigger>
            <AccordionContent>
              <p>A composition system always has three elements:</p>
              <ol className="list-decimal pl-5">
                <li>
                  <strong>Component Model</strong> — defines how components interact,
                  communicate, and are composed (e.g. EJB, Spring Component Model, OSGi).
                </li>
                <li>
                  <strong>Composition Technique</strong> — the mechanism used to wire
                  components together (e.g. DI, plugin loading).
                </li>
                <li>
                  <strong>Composition Language</strong> — language for programming-in-the-large
                  architecture (e.g. configuration DSLs, annotation processors).
                </li>
              </ol>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </LessonSection>

      {/* ─────────────────────── Inversion of Control ─────────────────────── */}
      <LessonSection title="Inversion of Control (IoC)" icon={Workflow}>
        <p>
          <strong>Inversion of Control (IoC)</strong> is a design principle where the{" "}
          <strong>control flow of a program is inverted</strong>: custom-written code
          receives the flow of control from an external source (e.g. a framework) rather
          than calling the framework itself. The classic Hollywood principle:{" "}
          <em>"Don't call me, I'll call you."</em>
        </p>
        <p>
          <strong>Purpose:</strong> achieve loose coupling and enhance modularity, making
          code more <strong>maintainable, testable, and extensible</strong>.
        </p>

        <Diagram caption="IoC: the Assembler wires AgeCalculatorApp to the AgeCalculator implementation via AgeCalculatorIfce — the app never calls the framework directly.">
          <svg viewBox="0 0 520 190" width="520" height="190" role="img">
            {/* AgeCalculatorApp */}
            <rect x="10" y="70" width="130" height="50" rx="6" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="75" y="99" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e3a8a">AgeCalculatorApp</text>

            {/* Interface */}
            <rect x="195" y="50" width="130" height="50" rx="6" fill="#f5f3ff" stroke="#8b5cf6" strokeWidth="1.5" />
            <text x="260" y="71" textAnchor="middle" fontSize="9" fill="#6d28d9">«Interface»</text>
            <text x="260" y="88" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">AgeCalculatorIfce</text>

            {/* AgeCalculator */}
            <rect x="195" y="130" width="130" height="50" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
            <text x="260" y="159" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">AgeCalculator</text>

            {/* Assembler */}
            <rect x="380" y="70" width="130" height="50" rx="6" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
            <text x="445" y="99" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">Assembler</text>

            {/* App → Interface (uses) */}
            <line x1="140" y1="95" x2="195" y2="80" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="5,3" />
            {/* Assembler → Interface */}
            <line x1="380" y1="85" x2="325" y2="75" stroke="#d97706" strokeWidth="1.5" strokeDasharray="5,3" />
            {/* Assembler → AgeCalculator (creates) */}
            <line x1="380" y1="105" x2="325" y2="150" stroke="#d97706" strokeWidth="1.5" strokeDasharray="5,3" />
            {/* AgeCalculator → Interface (implements) */}
            <line x1="260" y1="130" x2="260" y2="100" stroke="#16a34a" strokeWidth="1.5" />
            <polygon points="260,100 255,110 265,110" fill="#16a34a" />

            <text x="260" y="20" textAnchor="middle" fontSize="10" fill="#64748b">Assembler wires the graph — App depends only on the interface</text>
          </svg>
        </Diagram>
      </LessonSection>

      {/* ─────────────────────── Dependency Injection ─────────────────────── */}
      <LessonSection title="Dependency Injection (DI)" icon={Syringe}>
        <p>
          <strong>Definition (from the book):</strong>{" "}
          <em>"Dependency Injection is a set of software design principles and patterns that
          enables you to develop loosely coupled code."</em>
        </p>
        <ul>
          <li>
            <strong>Dependency</strong> — an object that another object (the client) relies on.
          </li>
          <li>
            <strong>Injection</strong> — the process of providing that dependency to the client
            from outside, rather than having the client create it with <code>new</code>.
          </li>
        </ul>

        <Callout type="trap" title="Exam traps — what DI is NOT about">
          DI is <strong>not</strong> primarily about performance, memory usage, or faster
          compilation. The exam-correct benefit is{" "}
          <strong>improved code readability and maintainability</strong> (and loose coupling /
          testability). Similarly, DI is beneficial for large-scale apps because it{" "}
          <strong>automates dependency management</strong> — manually managing dependencies in
          large apps becomes cumbersome.
        </Callout>

        <Diagram caption="Tight coupling (left) vs Dependency Injection (right) — the Car no longer creates its own Engine.">
          <svg viewBox="0 0 520 200" width="520" height="200" role="img">
            {/* ── TIGHT COUPLING ── */}
            <rect x="10" y="10" width="230" height="175" rx="8" fill="#fff1f2" stroke="#f87171" strokeWidth="1.5" />
            <text x="125" y="30" textAnchor="middle" fontWeight="700" fontSize="12" fill="#b91c1c">Tight Coupling</text>

            <rect x="30" y="45" width="90" height="38" rx="5" fill="#fecaca" stroke="#ef4444" />
            <text x="75" y="69" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7f1d1d">Car</text>

            <rect x="140" y="45" width="90" height="38" rx="5" fill="#fecaca" stroke="#ef4444" />
            <text x="185" y="69" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7f1d1d">Engine</text>

            {/* Arrow: Car → new Engine() */}
            <line x1="120" y1="64" x2="140" y2="64" stroke="#dc2626" strokeWidth="2" markerEnd="url(#arr-red)" />
            <text x="125" y="115" textAnchor="middle" fontSize="10" fill="#b91c1c">Car uses</text>
            <text x="125" y="130" textAnchor="middle" fontSize="10" fill="#b91c1c">new Engine()</text>
            <text x="125" y="155" textAnchor="middle" fontSize="9" fill="#991b1b">Hard to test · not flexible</text>
            <text x="125" y="170" textAnchor="middle" fontSize="9" fill="#991b1b">Cannot swap implementation</text>

            {/* ── DEPENDENCY INJECTION ── */}
            <rect x="280" y="10" width="230" height="175" rx="8" fill="#f0fdf4" stroke="#4ade80" strokeWidth="1.5" />
            <text x="395" y="30" textAnchor="middle" fontWeight="700" fontSize="12" fill="#15803d">With DI</text>

            <rect x="300" y="45" width="80" height="38" rx="5" fill="#bbf7d0" stroke="#16a34a" />
            <text x="340" y="69" textAnchor="middle" fontSize="11" fontWeight="700" fill="#14532d">Car</text>

            <rect x="420" y="45" width="80" height="38" rx="5" fill="#bbf7d0" stroke="#16a34a" />
            <text x="460" y="62" textAnchor="middle" fontSize="10" fill="#14532d">«interface»</text>
            <text x="460" y="77" textAnchor="middle" fontSize="11" fontWeight="700" fill="#14532d">IEngine</text>

            {/* Arrow: Car → IEngine */}
            <line x1="380" y1="64" x2="420" y2="64" stroke="#16a34a" strokeWidth="2" strokeDasharray="4,3" />

            <text x="395" y="115" textAnchor="middle" fontSize="10" fill="#15803d">dependency passed in</text>
            <text x="395" y="130" textAnchor="middle" fontSize="10" fill="#15803d">via constructor</text>
            <text x="395" y="155" textAnchor="middle" fontSize="9" fill="#166534">Easy to test · swap impl.</text>
            <text x="395" y="170" textAnchor="middle" fontSize="9" fill="#166534">Loosely coupled</text>

            <defs>
              <marker id="arr-red" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L0,6 L8,3 z" fill="#dc2626" />
              </marker>
            </defs>
          </svg>
        </Diagram>

        {/* ── Four injection types ── */}
        <h3 className="mt-6 text-base font-semibold">Four injection types</h3>
        <Accordion type="single" collapsible className="rounded-lg border px-4">
          <AccordionItem value="constructor">
            <AccordionTrigger>1. Constructor Injection</AccordionTrigger>
            <AccordionContent>
              <p>
                Dependencies are passed through the class constructor.{" "}
                <strong>Best for mandatory dependencies</strong>; prevents the object from
                being created in an invalid state. Preferred style in Spring and ASP.NET Core.
              </p>
              <pre className="mt-2 rounded bg-slate-100 p-3 text-xs">
{`public class Car {
  private final Engine engine;

  public Car(Engine engine) {   // DI via constructor
    this.engine = engine;
  }
}`}
              </pre>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="setter">
            <AccordionTrigger>2. Setter (Property) Injection</AccordionTrigger>
            <AccordionContent>
              <p>
                Dependencies are provided through setter methods after construction.{" "}
                <strong>Best for optional dependencies</strong>. Risk: object may be partially
                initialised if setters are never called.
              </p>
              <pre className="mt-2 rounded bg-slate-100 p-3 text-xs">
{`public void setEngine(Engine engine) {
  this.engine = engine;
}`}
              </pre>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="interface-inj">
            <AccordionTrigger>3. Interface Injection</AccordionTrigger>
            <AccordionContent>
              <p>
                The client implements an interface that exposes an inject method. Less common
                in Java/C#; more common in certain frameworks like Spring/ASP.NET.
              </p>
              <pre className="mt-2 rounded bg-slate-100 p-3 text-xs">
{`interface EngineProvider {
  void injectEngine(Engine engine);
}
class Car implements EngineProvider {
  public void injectEngine(Engine engine) {
    this.engine = engine;
  }
}`}
              </pre>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="framework-inj">
            <AccordionTrigger>4. DI in Frameworks (Spring / ASP.NET Core)</AccordionTrigger>
            <AccordionContent>
              <p>
                Frameworks automate injection using annotations or code-based configuration.
                In Spring, <code>@Component</code> + <code>@Autowired</code>; the
                ApplicationContext (IoC container) wires everything.
                In ASP.NET Core, services are registered in <code>ConfigureServices</code> via
                <code>IServiceCollection</code> with scopes: <strong>Transient</strong> (new
                each request), <strong>Scoped</strong> (once per HTTP request),{" "}
                <strong>Singleton</strong> (one for app lifetime).
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </LessonSection>

      {/* ─────────────────────── Service Locator & DIP ─────────────────────── */}
      <LessonSection title="Service Locator (anti-pattern) & Dependency Inversion Principle" icon={Network}>
        <p>
          <strong>Service Locator</strong> lets a class call a central registry to pull its
          own dependencies. It is considered an <strong>anti-pattern</strong> compared to DI
          because:
        </p>
        <ul>
          <li>Dependencies are <strong>implicit</strong> — hidden inside the class body.</li>
          <li>Hard to unit-test — you can't easily replace dependencies with mocks.</li>
          <li>
            Creates a hidden coupling to the locator itself (WhiteBoard component model,
            but no clear build or runtime dependency visibility).
          </li>
        </ul>
        <p className="mt-4">
          <strong>Dependency Inversion Principle (DIP)</strong> is the design principle
          underpinning DI:
        </p>
        <ul>
          <li>
            <strong>High-level modules must not depend on low-level modules.</strong> Both
            should depend on <strong>abstractions (interfaces)</strong>.
          </li>
          <li>
            Abstractions should not depend on details; details should depend on abstractions.
          </li>
        </ul>
        <Callout type="trap" title="Service Locator vs DI — the exam distinction">
          Both Service Locator and DI solve the same problem (getting dependencies), but DI{" "}
          <strong>pushes</strong> dependencies in from outside (explicit), while Service
          Locator has classes <strong>pull</strong> them from a global registry (implicit).
          The exam rewards knowing that Service Locator is the anti-pattern.
        </Callout>

        <Diagram caption="Composition Root wiring: a single Assembler/Startup creates all concrete objects and injects them — nothing inside the application creates its own dependencies.">
          <svg viewBox="0 0 520 180" width="520" height="180" role="img">
            {/* Composition Root box */}
            <rect x="180" y="10" width="160" height="40" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="2" />
            <text x="260" y="34" textAnchor="middle" fontSize="12" fontWeight="700" fill="#713f12">Composition Root</text>

            {/* Services */}
            <rect x="10" y="100" width="120" height="40" rx="5" fill="#eff6ff" stroke="#3b82f6" />
            <text x="70" y="124" textAnchor="middle" fontSize="11" fill="#1e3a8a">IPaymentService</text>

            <rect x="200" y="100" width="120" height="40" rx="5" fill="#f5f3ff" stroke="#8b5cf6" />
            <text x="260" y="124" textAnchor="middle" fontSize="11" fill="#5b21b6">PaymentProcessor</text>

            <rect x="390" y="100" width="120" height="40" rx="5" fill="#f0fdf4" stroke="#16a34a" />
            <text x="450" y="117" textAnchor="middle" fontSize="11" fill="#15803d">StripeGateway</text>
            <text x="450" y="133" textAnchor="middle" fontSize="9" fill="#15803d">implements IPayment</text>

            {/* Root → each */}
            <line x1="230" y1="50" x2="70" y2="100" stroke="#ca8a04" strokeWidth="1.5" strokeDasharray="4,3" />
            <line x1="260" y1="50" x2="260" y2="100" stroke="#ca8a04" strokeWidth="1.5" strokeDasharray="4,3" />
            <line x1="290" y1="50" x2="450" y2="100" stroke="#ca8a04" strokeWidth="1.5" strokeDasharray="4,3" />

            <text x="260" y="168" textAnchor="middle" fontSize="10" fill="#64748b">Root injects StripeGateway into PaymentProcessor at startup</text>
          </svg>
        </Diagram>
      </LessonSection>

      {/* ─────────────────────── EJB ─────────────────────── */}
      <LessonSection title="Enterprise JavaBeans (EJB)" icon={Boxes}>
        <p>
          <strong>EJB</strong> is a server-side component architecture for building scalable,
          distributed, and transactional enterprise applications in Java. EJBs run inside an{" "}
          <strong>EJB container</strong> that manages lifecycle, security, transactions, and
          provides <strong>dependency injection</strong>, pooling, and concurrency control.
        </p>

        <h3 className="mt-4 text-base font-semibold">Types of EJBs</h3>
        <ul>
          <li>
            <strong>Stateless Session Bean</strong> — business logic, no client-specific
            state retained between calls. Annotated <code>@Stateless</code>.
          </li>
          <li>
            <strong>Stateful Session Bean</strong> — maintains state across calls for one
            client session. Annotated <code>@Stateful</code>.
          </li>
          <li>
            <strong>Message-Driven Bean (MDB)</strong> — asynchronous processing via
            JMS; used for event-driven systems and notifications.
          </li>
          <li>
            <strong>Entity Bean (deprecated)</strong> — represented database entities;
            replaced by JPA (Java Persistence API).
          </li>
        </ul>

        <h3 className="mt-4 text-base font-semibold">What is a JavaBean?</h3>
        <p>A JavaBean is a POJO with three additional constraints:</p>
        <ol className="list-decimal pl-5">
          <li><strong>No-argument constructor</strong></li>
          <li><strong>Encapsulation</strong> — private fields + public getters/setters</li>
          <li><strong>Serializable</strong> — implements <code>java.io.Serializable</code></li>
        </ol>

        <Accordion type="single" collapsible className="rounded-lg border px-4 mt-4">
          <AccordionItem value="ejb-problems">
            <AccordionTrigger>Problems with EJB — why Spring rose</AccordionTrigger>
            <AccordionContent>
              <ul>
                <li>
                  <strong>Heavyweight</strong> — requires a full Jakarta EE-compliant
                  application server (GlassFish, JBoss/WildFly, WebLogic); overkill for
                  small projects.
                </li>
                <li>
                  <strong>Performance overhead</strong> — slow startup, container
                  management overhead, pooling and lifecycle costs.
                </li>
                <li>
                  <strong>Limited flexibility</strong> — difficult to integrate with
                  non-Jakarta EE technologies; not suitable for microservices.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="ejb-example">
            <AccordionTrigger>Bank transfer via EJB — worked example</AccordionTrigger>
            <AccordionContent>
              <ol className="list-decimal pl-5">
                <li>
                  <strong>Initiate Transfer:</strong> a <em>stateless</em> session bean
                  handles initial validation from the web interface.
                </li>
                <li>
                  <strong>Process Transfer:</strong> a <em>stateful</em> session bean
                  manages the transaction state (source/destination accounts, amount).
                </li>
                <li>
                  <strong>Update Accounts:</strong> the stateful bean interacts with
                  entity beans to update balances.
                </li>
                <li>
                  <strong>Asynchronous Notification:</strong> a <em>message-driven bean</em>{" "}
                  sends confirmation to the customer via JMS.
                </li>
              </ol>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </LessonSection>

      {/* ─────────────────────── LSP & Decorator ─────────────────────── */}
      <LessonSection title="Software Design Patterns: LSP & Decorator" icon={Wrench}>
        <h3 className="text-base font-semibold">Liskov Substitution Principle (LSP)</h3>
        <p>
          <em>"Objects of a superclass should be replaceable with objects of a subclass
          without altering the correctness of the program."</em>
        </p>
        <p>
          Formal: if S is a subtype of T, objects of type T may be replaced with objects of
          type S without altering correctness. Key rules:
        </p>
        <ul>
          <li>
            <strong>Behavioural consistency</strong> — subclasses must honour the behaviour
            expected by the superclass.
          </li>
          <li>
            <strong>Preconditions/postconditions</strong> — subclasses must not strengthen
            preconditions or weaken postconditions.
          </li>
          <li>
            <strong>No new exceptions</strong> — subclasses must not throw exceptions not
            declared by the superclass.
          </li>
        </ul>
        <p className="mt-2">
          Classic violation: <code>Penguin extends Bird</code> where <code>fly()</code>
          throws <code>UnsupportedOperationException</code>. Fix: separate{" "}
          <code>FlyingBird</code> and <code>Bird</code> hierarchies.
        </p>

        <h3 className="mt-6 text-base font-semibold">Decorator Design Pattern</h3>
        <p>
          The Decorator pattern adds behaviour to an object dynamically by wrapping it in
          another object that holds the original as a dependency (constructor injection).
          Each decorator receives the component and enhances it without modifying its
          source code.
        </p>
        <p className="mt-2">
          Coffee example: <code>SimpleCoffee</code> (base) → wrapped in{" "}
          <code>MilkDecorator(coffee)</code> → wrapped in{" "}
          <code>SugarDecorator(coffee)</code>. Each decorator injects the previous one and
          adds cost/description. This is DI in action within a structural pattern.
        </p>

        <Callout type="info" title="Decorator + DI connection">
          Each decorator <strong>receives a dependency (the wrapped component) and enhances
          it</strong> — this is the Dependency Injection principle applied within a
          structural design pattern. The slides make this connection explicit.
        </Callout>
      </LessonSection>

      {/* ─────────────────────── Spring Framework intro ─────────────────────── */}
      <LessonSection title="Introduction to the Spring Framework" icon={Plug}>
        <p>
          Spring is the most widely used horizontal component framework for Java. Its core
          feature is an <strong>IoC container (ApplicationContext)</strong> that manages
          beans and wires dependencies automatically.
        </p>
        <ul>
          <li>
            <code>@Component</code> — marks a class as a Spring-managed bean.
          </li>
          <li>
            <code>@Autowired</code> — tells Spring to inject a dependency (constructor
            injection preferred).
          </li>
          <li>
            <code>@SpringBootApplication</code> — bootstraps the ApplicationContext in
            Spring Boot.
          </li>
        </ul>

        <Accordion type="single" collapsible className="rounded-lg border px-4 mt-4">
          <AccordionItem value="spring-vs-dotnet">
            <AccordionTrigger>Spring DI vs ASP.NET Core DI — comparison table</AccordionTrigger>
            <AccordionContent>
              <div className="overflow-x-auto">
                <table className="text-xs w-full border-collapse">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="border px-2 py-1 text-left">Feature</th>
                      <th className="border px-2 py-1 text-left">ASP.NET Core</th>
                      <th className="border px-2 py-1 text-left">Spring</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border px-2 py-1">Config style</td><td className="border px-2 py-1">Code-based (IServiceCollection)</td><td className="border px-2 py-1">Annotation / XML / Java config</td></tr>
                    <tr><td className="border px-2 py-1">Preferred injection</td><td className="border px-2 py-1">Constructor</td><td className="border px-2 py-1">Constructor (@Autowired)</td></tr>
                    <tr><td className="border px-2 py-1">Scopes</td><td className="border px-2 py-1">Transient · Scoped · Singleton</td><td className="border px-2 py-1">Singleton · Prototype</td></tr>
                    <tr><td className="border px-2 py-1">AOP</td><td className="border px-2 py-1">Requires external lib</td><td className="border px-2 py-1">Built-in (@Aspect)</td></tr>
                    <tr><td className="border px-2 py-1">Third-party DI</td><td className="border px-2 py-1">Autofac, Ninject, Unity</td><td className="border px-2 py-1">Usually not needed</td></tr>
                  </tbody>
                </table>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="why-di-framework">
            <AccordionTrigger>Why use a DI framework at all?</AccordionTrigger>
            <AccordionContent>
              <ul>
                <li>
                  <strong>Difficult to manage large applications</strong> — manually managing
                  dependencies becomes cumbersome (the exam-answer reason).
                </li>
                <li>
                  <strong>Scope management</strong> — managing object scopes (singleton,
                  prototype) manually is error-prone.
                </li>
                <li>
                  <strong>Lifecycle management</strong> — without a framework, developers
                  must manually track lifecycles, risking memory leaks.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </LessonSection>

      {/* ─────────────────────── Testability ─────────────────────── */}
      <LessonSection title="Testability — why DI enables unit testing" icon={TestTube}>
        <p>
          One of DI's concrete benefits is <strong>improved testability</strong>. When a
          class creates its own dependencies with <code>new</code>, you cannot replace them
          with test doubles (mocks/fakes). With constructor injection, you simply pass a
          mock object in the test:
        </p>
        <pre className="mt-2 rounded bg-slate-100 p-3 text-xs">
{`// Production code
Car car = new Car(new PetrolEngine());

// Test code — inject a mock engine
Engine mockEngine = new MockEngine();
Car car = new Car(mockEngine);
car.start();
// assert mockEngine.startWasCalled()`}
        </pre>
        <p className="mt-2">
          This is why the Dependency Inversion Principle matters: by depending on the{" "}
          <code>IEngine</code> interface instead of the concrete <code>PetrolEngine</code>,
          any implementation (including test doubles) can be substituted.
        </p>
      </LessonSection>

      {/* ─────────────────────── Flashcards ─────────────────────── */}
      <LessonSection title="Flashcards — quick recall">
        <FlashcardDeck
          cards={[
            {
              front: "DI definition",
              back: "A set of software design principles and patterns that enables you to develop loosely coupled code.",
            },
            {
              front: "Primary benefit of DI",
              back: "Improved code readability and maintainability (NOT performance).",
            },
            {
              front: "Why DI frameworks help large apps",
              back: "They AUTOMATE dependency management, which becomes cumbersome to handle manually in large applications.",
            },
            {
              front: "Inversion of Control (IoC)",
              back: "Design principle where the framework calls your code, not the other way around. 'Don't call me, I'll call you.'",
            },
            {
              front: "Constructor vs setter injection",
              back: "Constructor = mandatory deps, prevents invalid state. Setter = optional deps, risk of partial initialisation.",
            },
            {
              front: "Service Locator — why an anti-pattern",
              back: "Classes PULL their own dependencies from a registry — hidden and hard to test. DI PUSHES deps in from outside — explicit and testable.",
            },
            {
              front: "Composition Root",
              back: "The single location at startup where the entire object graph is wired. All dependency resolution happens there.",
            },
            {
              front: "Dependency Inversion Principle",
              back: "High-level and low-level modules both depend on abstractions (interfaces), not on each other's concrete implementations.",
            },
          ]}
        />
      </LessonSection>

      {/* ─────────────────────── Mini quiz ─────────────────────── */}
      <MiniQuiz questions={questions.slice(0, 6)} title="Quick check — Week 10" />
    </>
  );
}
