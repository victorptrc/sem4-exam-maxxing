import { ArrowRightLeft, Boxes, CircleDot, HelpCircle, Layers, Network, RotateCcw, Zap } from "lucide-react";
import { Callout } from "@/components/Callout";
import { Diagram } from "@/components/Diagram";
import { FlashcardDeck } from "@/components/Flashcard";
import { LessonSection } from "@/components/LessonLayout";

/**
 * Concept Notes — a growing collection of quick explainers from Victor's
 * study-session questions. Each section answers one "what even is X?"
 * question, with a diagram and the exam traps that go with it.
 * New sections get appended at the top (newest first) as questions come up.
 */
export default function ConceptNotes() {
  return (
    <>
      <Callout type="info" title="What this page is">
        Quick explainers for concepts you asked about while studying — short enough to re-read in
        minutes before quizzing. Newest questions are added at the top as you ask them. (7 June:
        CORBA &amp; ORB, annotation cheat sheet, Spring container/scopes/lifecycle, JPMS &amp;
        ServiceLoader deep-dive, UML lollipop &amp; socket, cohesion vs coupling test. 6 June: AOP
        &amp; @Around, Saga, SOA, ESB, coarse vs fine grained, SOA vs SOAP, Protobuf &amp; gRPC.)
      </Callout>

      {/* ──────────────── Black-box composition ──────────────── */}
      <LessonSection title="Black-box vs white-box, hierarchical vs sequential" icon={Boxes}>
        <p>
          <strong>Black-box composition</strong> = assembling components seeing{" "}
          <strong>only their interfaces</strong>, never the internals — plug provided into
          required. <strong>White-box</strong> = seeing/reaching inside (inheritance, source
          edits) — coupled to implementation details, breaks when internals change. The asteroid
          game is exactly this contrast: components = black-box ✅, inheritance version =
          white-box ⚠️.
        </p>
        <ul>
          <li>
            <strong>Hierarchical composition</strong> — components call <em>each other</em>{" "}
            directly: the callee&apos;s <em>provides</em> interface must be compatible with the
            caller&apos;s <em>requires</em> interface.
          </li>
          <li>
            <strong>Sequential composition</strong> — components don&apos;t know each other; an{" "}
            <strong>external application calls them in order</strong>, typically with{" "}
            <strong>&quot;glue code&quot;</strong> passing results along. (Victor missed this one
            — &quot;glue code + called in order by external app&quot; → sequential.)
          </li>
        </ul>
      </LessonSection>

      {/* ──────────────── CORBA & the ORB ──────────────── */}
      <LessonSection title="CORBA & the ORB — the granddad of gRPC" icon={Network}>
        <p>
          <strong>CORBA = Common Object Request Broker Architecture</strong> — the 1990s standard
          for letting objects on <em>different machines, in different languages</em> call each
          other. The course&apos;s evolution story: <strong>CORBA → component models (EJB/COM) →
          SOA/web services → microservices/gRPC</strong>.
        </p>
        <ul>
          <li>
            <strong>ORB (Object Request Broker)</strong> — the middleman that{" "}
            <strong>manages requests and responses between distributed objects</strong>: takes a
            method call on machine A, ships it over the network, invokes the object on machine B,
            returns the result. Mnemonic: the <em>switchboard operator</em> ☎️ — you never call
            the other object directly.
          </li>
          <li>
            <strong>IDL (Interface Definition Language)</strong> — language-neutral contract file
            from which client/server code is generated per language… exactly what gRPC does with{" "}
            <code>.proto</code> today. CORBA is gRPC&apos;s ancient ancestor.
          </li>
        </ul>
        <Callout type="trap" title="CORBA exam tells">
          &quot;Manages requests/responses between distributed objects&quot; → <strong>ORB</strong>.
          &quot;Language-neutral interface contract&quot; → <strong>IDL</strong>. Parallel worth
          memorizing: IDL : CORBA :: WSDL : SOAP :: .proto : gRPC.
        </Callout>
      </LessonSection>

      {/* ──────────────── Annotation cheat sheet ──────────────── */}
      <LessonSection title="The @ cheat sheet — every annotation in the course" icon={HelpCircle}>
        <Callout type="key" title="What an annotation IS">
          A <strong>label, not code</strong>. <code>@Component</code> does nothing by itself — it
          is a sticky note on the class. <strong>Spring reads the sticky notes at startup</strong>{" "}
          and acts on them. (Java calls them <strong>annotations</strong>; &quot;decorators&quot;
          is the Python/JS word — exams say annotation.)
        </Callout>
        <pre className="mt-2 rounded bg-slate-100 p-3 text-xs overflow-x-auto">{`── "Manage this class" ─────────────────────────────────────────
@Component        "Create me as a bean and manage me"
@Service          same as @Component, clearer name for service classes
@Configuration    "I'm a config class — I define beans"
@Bean             on a METHOD: "my return value is a bean"
@ComponentScan    "search this package for @Component classes"

── "Wire dependencies" ─────────────────────────────────────────
@Autowired        "fill this slot with a matching bean (by TYPE)"
@Qualifier("x")   "...specifically the bean NAMED x" (fixes 2-candidate crash)
@Primary          on a bean: "when in doubt, pick me"
@Scope("prototype")  "new instance each time" (default = singleton)

── Lifecycle ───────────────────────────────────────────────────
@PostConstruct    runs AFTER constructor + injection
@PreDestroy       runs before shutdown (NOT for prototype beans)

── AOP ─────────────────────────────────────────────────────────
@Aspect                          "I'm a cross-cutting module"
@Before / @After                 advice before / after (always)
@AfterReturning / @AfterThrowing advice on success / on exception
@Around                          wraps the call; must call proceed()

── Spring Boot & communication ─────────────────────────────────
@SpringBootApplication  = @Configuration + @EnableAutoConfiguration
                          + @ComponentScan        ← exam question!
@RestController         "I handle HTTP requests, return data"
@RabbitListener(queues) "call me when a message lands in this queue"
@WebService/@WebMethod  "expose me as a SOAP service / operation"
@EnableEurekaServer     "I am the service registry"

── Testing (week 18) ───────────────────────────────────────────
@Test                   JUnit: this method is a test
@Mock / @InjectMocks    Mockito: fake this / inject the fakes into the real thing
@SpringBootTest         boot the WHOLE app context (integration tests)`}</pre>
        <pre className="mt-2 rounded bg-slate-100 p-3 text-xs overflow-x-auto">{`// All of them in one tiny program:
@Configuration
@ComponentScan(basePackages = "dk.sdu.shop")
public class AppConfig {}

@Component
@Primary
public class StripeProcessor implements PaymentProcessor { ... }

@Component
public class OrderService {
    private final PaymentProcessor processor;

    @Autowired                       // by type; @Primary breaks the tie
    public OrderService(PaymentProcessor processor) {
        this.processor = processor;
    }

    @PostConstruct
    void ready() { System.out.println("wired and ready"); }
}`}</pre>
        <Callout type="trap" title="Annotation traps">
          (1) <code>@SpringBootApplication</code> bundles exactly{" "}
          <strong>@Configuration + @EnableAutoConfiguration + @ComponentScan</strong> — distractors
          substitute @RestController or @Bean into the trio. (2) <code>@Autowired</code> matches by{" "}
          <strong>type</strong>, <code>@Qualifier</code> by <strong>name</strong>. (3) Annotations
          do nothing by themselves — the <strong>container</strong> reads and acts on them; no
          Spring = sticky notes nobody reads.
        </Callout>
      </LessonSection>

      {/* ──────────────── Spring container, wiring, scopes & lifecycle ──────────────── */}
      <LessonSection title="Spring — the container, @Autowired, scopes & lifecycle" icon={Zap}>
        <p>
          Spring <strong>automates pure DI</strong>: the container (<code>ApplicationContext</code>)
          is a smart <code>main()</code> that creates all objects (<strong>beans</strong>), injects
          their dependencies, and manages their lifecycle.
        </p>
        <pre className="mt-2 rounded bg-slate-100 p-3 text-xs overflow-x-auto">{`@Configuration
@ComponentScan(basePackages = "dk.sdu.shop")   // "search this package for components"
public class AppConfig {}

@Component                                      // "Spring, manage me as a bean"
public class StripeProcessor implements PaymentProcessor { ... }

@Component
public class OrderService {
    private final PaymentProcessor processor;
    @Autowired                                  // "inject what this constructor needs"
    public OrderService(PaymentProcessor processor) {   // matched BY TYPE
        this.processor = processor;
    }
}`}</pre>
        <Diagram caption="The container at startup: scan → create beans → inject by type. Two candidates for one slot = NoUniqueBeanDefinitionException → fix with @Qualifier or @Primary.">
          <svg viewBox="0 0 520 230" width="520" height="230" role="img">
            {/* Container */}
            <rect x="20" y="20" width="480" height="150" rx="10" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.5" />
            <text x="260" y="42" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">
              ApplicationContext (the container)
            </text>
            {/* beans */}
            <rect x="45" y="60" width="120" height="44" rx="6" fill="#dcfce7" stroke="#22c55e" strokeWidth="1.5" />
            <text x="105" y="79" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#14532d">StripeProcessor</text>
            <text x="105" y="93" textAnchor="middle" fontSize="8" fill="#14532d">@Component</text>
            <rect x="45" y="115" width="120" height="44" rx="6" fill="#dcfce7" stroke="#22c55e" strokeWidth="1.5" />
            <text x="105" y="134" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#14532d">PaypalProcessor</text>
            <text x="105" y="148" textAnchor="middle" fontSize="8" fill="#14532d">@Component</text>
            {/* OrderService */}
            <rect x="330" y="85" width="150" height="50" rx="6" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="405" y="105" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e3a8a">OrderService</text>
            <text x="405" y="120" textAnchor="middle" fontSize="8.5" fill="#1e3a8a">needs PaymentProcessor</text>
            {/* arrows to slot */}
            <line x1="165" y1="82" x2="330" y2="100" stroke="#f59e0b" strokeWidth="2" />
            <line x1="165" y1="137" x2="330" y2="120" stroke="#f59e0b" strokeWidth="2" />
            <text x="250" y="78" textAnchor="middle" fontSize="9" fontWeight="700" fill="#b45309">
              BOTH match by type → 💥
            </text>
            <text x="250" y="148" textAnchor="middle" fontSize="8.5" fill="#b45309">
              NoUniqueBeanDefinitionException
            </text>
            {/* fix bar */}
            <rect x="20" y="185" width="480" height="32" rx="6" fill="#f1f5f9" stroke="#cbd5e1" />
            <text x="260" y="205" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#334155">
              Fix: @Qualifier("paypalProcessor") at the injection point, or @Primary on one bean.
              List&lt;PaymentProcessor&gt; injects ALL — no error.
            </text>
          </svg>
        </Diagram>
        <p>
          <strong>Scopes:</strong> default is <strong>singleton</strong> — ONE shared instance per
          container (not per request!). <code>@Scope("prototype")</code> = a fresh instance per{" "}
          <code>getBean()</code>/injection. Exam scenario: user-specific state (shopping cart) in
          a singleton → all users share one cart → make it prototype (or session-scoped in web
          apps).
        </p>
        <pre className="mt-2 rounded bg-slate-100 p-3 text-xs overflow-x-auto">{`@Component
public class MyLifecycleBean {
    public MyLifecycleBean()  { System.out.println("1. constructor"); }
    // (2. dependencies injected here)
    @PostConstruct
    public void init()        { System.out.println("3. @PostConstruct — after deps injected"); }
    public void useBean()     { System.out.println("4. business method"); }
    @PreDestroy
    public void cleanup()     { System.out.println("5. @PreDestroy — on context.close()"); }
}
// Order is forced by logic: @PostConstruct can't run before the
// constructor — the object wouldn't exist yet.
// NOTE: @PreDestroy is NOT called for prototype-scoped beans.`}</pre>
        <Callout type="trap" title="Spring exam traps">
          (1) Default scope = <strong>singleton</strong>, and singleton means{" "}
          <em>per-container</em>, NOT per-request. (2) <code>@Autowired</code> resolves{" "}
          <strong>by type</strong>; two candidates = exception, fixed by{" "}
          <code>@Qualifier</code>/<code>@Primary</code> — but a <code>List&lt;T&gt;</code> target
          happily takes ALL. (3) Lifecycle order: constructor → inject → @PostConstruct → use →
          @PreDestroy. (4) Prototype beans get no @PreDestroy. (5) @ComponentScan{" "}
          <em>registers</em> beans; it does not inject anything by itself.
        </Callout>
      </LessonSection>

      {/* ──────────────── JPMS & ServiceLoader deep-dive ──────────────── */}
      <LessonSection title="JPMS & ServiceLoader — how plug-ins find each other" icon={Boxes}>
        <p>
          <strong>JPMS (Java 9+ module system):</strong> a module = a JAR with a{" "}
          <code>module-info.java</code> declaring its boundaries. The big win is{" "}
          <strong>strong encapsulation</strong>: packages not <code>exports</code>-ed are
          invisible to other modules — even <code>public</code> classes. The keyword pairs:
        </p>
        <ul>
          <li>
            <code>requires</code> ↔ <code>exports</code> — compile-time <strong>dependencies</strong>{" "}
            (I need that module / I offer this package).
          </li>
          <li>
            <code>uses</code> ↔ <code>provides … with</code> — runtime <strong>services</strong>{" "}
            (I consume the interface / I supply an implementation).
          </li>
          <li>
            <code>requires transitive</code> — whoever requires <em>me</em> automatically gets
            this dependency too.
          </li>
        </ul>
        <pre className="mt-2 rounded bg-slate-100 p-3 text-xs overflow-x-auto">{`// the CONSUMER module (the dictionary app)
module dictionary.app {
    requires dictionary.api;             // compile against the interface
    uses dictionary.api.Dictionary;      // "I consume this service at runtime"
}

// a PROVIDER module (the Danish dictionary plug-in)
module dictionary.danish {
    requires dictionary.api;
    provides dictionary.api.Dictionary   // interface FIRST...
        with dk.danish.DanishDictionary; // ...implementation after WITH
}

// consumer code — knows ONLY the interface:
ServiceLoader<Dictionary> loader = ServiceLoader.load(Dictionary.class);
for (Dictionary d : loader) {            // yields ALL registered providers, lazily
    String def = d.getDefinition(word);
    if (def != null) return def;         // your code decides how to use them
}`}</pre>
        <p>
          <strong>Without JPMS</strong> the same mechanism works via a plain text file in the
          provider JAR — and the naming rule is a favourite trap:
        </p>
        <pre className="mt-2 rounded bg-slate-100 p-3 text-xs overflow-x-auto">{`META-INF/services/dictionary.spi.Dictionary   ← file NAMED after the INTERFACE
dk.general.GeneralDictionary                  ← content = IMPLEMENTATION class names
dk.general.ExtendedDictionary                    (one per line)`}</pre>
        <Diagram caption="Plug-in architecture: the app knows only the interface; each provider JAR announces its own implementation. Drop in a new JAR → discovered at runtime, zero recompilation.">
          <svg viewBox="0 0 520 210" width="520" height="210" role="img">
            {/* App */}
            <rect x="20" y="70" width="130" height="60" rx="6" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="85" y="95" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e3a8a">dictionary.app</text>
            <text x="85" y="111" textAnchor="middle" fontSize="8.5" fill="#1e3a8a">uses Dictionary</text>
            {/* ServiceLoader */}
            <rect x="195" y="70" width="130" height="60" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="260" y="95" textAnchor="middle" fontSize="10" fontWeight="700" fill="#78350f">ServiceLoader</text>
            <text x="260" y="111" textAnchor="middle" fontSize="8.5" fill="#78350f">.load(Dictionary.class)</text>
            <line x1="150" y1="100" x2="195" y2="100" stroke="#3b82f6" strokeWidth="2" />
            {/* Providers */}
            <rect x="370" y="15" width="130" height="50" rx="6" fill="#dcfce7" stroke="#22c55e" strokeWidth="1.5" />
            <text x="435" y="36" textAnchor="middle" fontSize="9" fontWeight="600" fill="#14532d">GeneralDictionary</text>
            <text x="435" y="50" textAnchor="middle" fontSize="8" fill="#14532d">provides … with</text>
            <rect x="370" y="80" width="130" height="50" rx="6" fill="#dcfce7" stroke="#22c55e" strokeWidth="1.5" />
            <text x="435" y="101" textAnchor="middle" fontSize="9" fontWeight="600" fill="#14532d">ExtendedDictionary</text>
            <text x="435" y="115" textAnchor="middle" fontSize="8" fill="#14532d">provides … with</text>
            <rect x="370" y="145" width="130" height="50" rx="6" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="5,3" />
            <text x="435" y="166" textAnchor="middle" fontSize="9" fontWeight="600" fill="#16a34a">DanishDictionary</text>
            <text x="435" y="180" textAnchor="middle" fontSize="8" fill="#16a34a">new JAR — just dropped in!</text>
            <line x1="325" y1="90" x2="370" y2="42" stroke="#22c55e" strokeWidth="1.5" />
            <line x1="325" y1="100" x2="370" y2="103" stroke="#22c55e" strokeWidth="1.5" />
            <line x1="325" y1="112" x2="370" y2="168" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="5,3" />
            <text x="260" y="160" textAnchor="middle" fontSize="8.5" fontStyle="italic" fill="#64748b">
              discovers ALL registered providers, lazily, at runtime
            </text>
          </svg>
        </Diagram>
        <Callout type="trap" title="JPMS / ServiceLoader traps">
          (1) The META-INF/services file is <strong>named after the interface</strong> and{" "}
          <strong>contains implementations</strong> — distractors reverse it. (2){" "}
          <code>provides &lt;interface&gt; with &lt;implementation&gt;</code> — same trap, same
          order. (3) Multiple providers = <strong>normal, all are yielded</strong> — not an error,
          not just the first. (4) <code>uses</code> goes in the <strong>consumer</strong>,{" "}
          <code>provides</code> in the <strong>provider</strong>. (5) Compile-time access comes
          from <code>requires</code>; <code>uses</code> is only about runtime service binding.
        </Callout>
      </LessonSection>

      {/* ──────────── Component interfaces in UML + cohesion vs coupling ──────────── */}
      <LessonSection title="UML lollipop & socket — and the cohesion/coupling test" icon={Network}>
        <p>
          A component exposes a <strong>provided interface</strong> (what it offers — UML{" "}
          <strong>lollipop</strong>: line ending in a filled circle) and declares{" "}
          <strong>required interfaces</strong> (what it needs — UML <strong>socket</strong>: line
          ending in a half-circle). In assembly diagrams the lollipop <em>plugs into</em> the
          socket. Memory hook: <em>you OFFER someone a lollipop</em> = provided.
        </p>
        <Diagram caption="Assembly connector: PaymentComponent PROVIDES PaymentProcessing (lollipop) and REQUIRES ExchangeRateService (socket), which CurrencyComponent provides.">
          <svg viewBox="0 0 520 170" width="520" height="170" role="img">
            {/* Payment component */}
            <rect x="30" y="50" width="150" height="70" rx="6" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="105" y="80" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e3a8a">
              Payment
            </text>
            <text x="105" y="96" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e3a8a">
              Component
            </text>
            {/* Provided lollipop (left side) */}
            <line x1="30" y1="85" x2="-2" y2="85" stroke="#1e3a8a" strokeWidth="1.5" transform="translate(14,0)" />
            <circle cx="8" cy="85" r="6" fill="#1e3a8a" />
            <text x="14" y="40" textAnchor="start" fontSize="9" fill="#1e3a8a">
              provided: PaymentProcessing 🍭
            </text>
            <line x1="20" y1="46" x2="10" y2="76" stroke="#94a3b8" strokeWidth="0.75" strokeDasharray="2,2" />
            {/* Required socket (right side) */}
            <line x1="180" y1="85" x2="230" y2="85" stroke="#1e3a8a" strokeWidth="1.5" />
            <path d="M 244 70 A 15 15 0 0 0 244 100" fill="none" stroke="#1e3a8a" strokeWidth="1.5" />
            <text x="232" y="125" textAnchor="middle" fontSize="9" fill="#1e3a8a">
              required: ExchangeRateService (
            </text>
            {/* Currency component provided lollipop plugging in */}
            <circle cx="244" cy="85" r="6" fill="#14532d" />
            <line x1="244" y1="85" x2="310" y2="85" stroke="#14532d" strokeWidth="1.5" />
            <rect x="310" y="50" width="150" height="70" rx="6" fill="#dcfce7" stroke="#22c55e" strokeWidth="1.5" />
            <text x="385" y="80" textAnchor="middle" fontSize="11" fontWeight="600" fill="#14532d">
              Currency
            </text>
            <text x="385" y="96" textAnchor="middle" fontSize="11" fontWeight="600" fill="#14532d">
              Component
            </text>
            <text x="330" y="40" textAnchor="start" fontSize="9" fill="#14532d">
              its lollipop plugs into the socket
            </text>
            <line x1="328" y1="46" x2="280" y2="78" stroke="#94a3b8" strokeWidth="0.75" strokeDasharray="2,2" />
          </svg>
        </Diagram>
        <Callout type="trap" title="The cohesion-vs-coupling test (Victor missed this once!)">
          <strong>Cohesion</strong> = look <em>INSIDE one component</em>: do its responsibilities
          belong together? One component doing orders + emails + image resizing ={" "}
          <strong>LOW cohesion</strong>. <strong>Coupling</strong> = look{" "}
          <em>BETWEEN components</em>: how entangled they are with each other. Stem describes one
          box doing many unrelated jobs → low cohesion. Stem describes components knowing each
          other&apos;s internals → high coupling. Always want <strong>HIGH cohesion, LOW
          coupling</strong>.
        </Callout>
      </LessonSection>

      {/* ──────────────── AOP, advice types & @Around/proceed() ──────────────── */}
      <LessonSection title="What is AOP — and what does @Around / proceed() mean?" icon={CircleDot}>
        <p>
          <strong>The problem:</strong> logging, security, and transactions are needed in{" "}
          <em>every</em> service method — copy-pasted boilerplate that pollutes business logic.
          These are <strong>cross-cutting concerns</strong>: they &quot;cut across&quot; all
          classes. <strong>AOP (Aspect-Oriented Programming)</strong> rips that repeated code out
          into one separate class and tells the framework <em>where</em> to apply it
          automatically.
        </p>
        <ul>
          <li>
            <strong>Aspect</strong> — the class holding the extracted cross-cutting code (the{" "}
            <em>module</em>).
          </li>
          <li>
            <strong>Join point</strong> — a spot where the aspect <em>could</em> run; in Spring: a
            method execution (a <em>candidate spot</em>).
          </li>
          <li>
            <strong>Pointcut</strong> — the expression selecting <em>which</em> join points (the{" "}
            <em>WHERE filter</em>). Course demo:{" "}
            <code>execution(* dk.sdu.cbs.demo.service.*.*(..))</code> = any return type, any class
            in the service package, any method, any parameters.
          </li>
          <li>
            <strong>Advice</strong> — the code that runs there (the <em>WHAT + WHEN</em>).
          </li>
          <li>
            <strong>Weaving</strong> — linking aspects into the code; Spring weaves at{" "}
            <strong>runtime via proxies</strong>.
          </li>
        </ul>
        <p>
          <strong>The 5 advice types (WHEN):</strong> <code>@Before</code> (before the method),{" "}
          <code>@After</code> (after, no matter what — like finally), <code>@AfterReturning</code>{" "}
          (after a successful return), <code>@AfterThrowing</code> (only on exception), and{" "}
          <code>@Around</code> — which <strong>wraps the entire call</strong>.
        </p>
        <Diagram caption="@Around is a bouncer at the door: the real method only runs if the advice calls proceed(). Cache hit? Return early — the method never executes.">
          <svg viewBox="0 0 520 230" width="520" height="230" role="img">
            {/* Caller */}
            <rect x="20" y="90" width="90" height="46" rx="6" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="65" y="110" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e3a8a">Caller</text>
            <text x="65" y="125" textAnchor="middle" fontSize="8.5" fill="#1e3a8a">getUser(5)</text>
            {/* Around advice box */}
            <rect x="140" y="25" width="240" height="180" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="260" y="45" textAnchor="middle" fontSize="11" fontWeight="700" fill="#78350f">
              @Around advice (the bouncer)
            </text>
            <text x="260" y="68" textAnchor="middle" fontSize="9" fill="#78350f">
              code BEFORE the call (e.g. check cache)
            </text>
            {/* decision */}
            <rect x="175" y="82" width="170" height="34" rx="6" fill="#fff" stroke="#f59e0b" />
            <text x="260" y="98" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#b45309">
              pjp.proceed() ?
            </text>
            <text x="260" y="110" textAnchor="middle" fontSize="8" fill="#b45309">
              the ONLY way the real method runs
            </text>
            <text x="260" y="140" textAnchor="middle" fontSize="9" fill="#78350f">
              code AFTER the call (e.g. store result,
            </text>
            <text x="260" y="153" textAnchor="middle" fontSize="9" fill="#78350f">
              measure time, modify return value)
            </text>
            <text x="260" y="185" textAnchor="middle" fontSize="8.5" fontStyle="italic" fill="#b45309">
              skip proceed() → method never executes (cache hit, security block)
            </text>
            {/* Target method */}
            <rect x="410" y="90" width="90" height="46" rx="6" fill="#dcfce7" stroke="#22c55e" strokeWidth="1.5" />
            <text x="455" y="110" textAnchor="middle" fontSize="10" fontWeight="600" fill="#14532d">Real method</text>
            <text x="455" y="125" textAnchor="middle" fontSize="8.5" fill="#14532d">business logic</text>
            {/* arrows */}
            <line x1="110" y1="113" x2="140" y2="113" stroke="#3b82f6" strokeWidth="2" />
            <line x1="345" y1="99" x2="410" y2="99" stroke="#22c55e" strokeWidth="2" />
            <text x="377" y="92" textAnchor="middle" fontSize="8" fill="#16a34a">proceed()</text>
            <line x1="410" y1="127" x2="345" y2="127" stroke="#22c55e" strokeWidth="2" strokeDasharray="4,2" />
            <text x="377" y="140" textAnchor="middle" fontSize="8" fill="#16a34a">result</text>
          </svg>
        </Diagram>
        <p>
          With the other four advice types the target method <em>always runs</em> — they just
          observe before/after. <code>@Around</code> hands YOU control of the call (as a{" "}
          <code>ProceedingJoinPoint</code>): run code before <em>and</em> after,{" "}
          <strong>skip the method entirely</strong> (caching, security), change arguments, replace
          the return value, or catch exceptions. That is why it is the most powerful advice type —
          and why forgetting <code>proceed()</code> silently breaks everything.
        </p>
        <p>
          <strong>The course demo, traced.</strong> The calculator contains <em>zero</em> logging
          code; the aspect adds it from outside. When <code>main()</code> calls{" "}
          <code>calculator.add(10, 20)</code>, Spring&apos;s <strong>proxy</strong> intercepts:
        </p>
        <pre className="mt-2 rounded bg-slate-100 p-3 text-xs overflow-x-auto">{`@Aspect @Component
public class LoggingAspect {
  @Before("execution(* dk.sdu.cbs.demo.service.*.*(..))")   // pointcut: WHERE
  public void logAllMethodExecutionBefore(JoinPoint jp) {   // advice: WHAT
    System.out.println("Before method: " + jp.getSignature().getName());
  }
}

// Console when main() runs add(10,20) then divide(100,20):
Before method: add                          ← @Before fired via the proxy
After method: add                           ← @After fired
Result: 30                                  ← main() printing the return
Before method: divide
After Returning from divide: result = 5     ← @AfterReturning got the result
Result: 5`}</pre>
        <p>
          And the <code>@Around</code> your teacher left commented out in the same demo — timing{" "}
          <code>divide()</code>, which is impossible with @Before/@After because timing needs code
          on <em>both sides of the same call</em> sharing a variable:
        </p>
        <pre className="mt-2 rounded bg-slate-100 p-3 text-xs overflow-x-auto">{`@Around("execution(* ...ArithmeticCalculator.divide(..))")
public Object aroundDivide(ProceedingJoinPoint jp) throws Throwable {
  long start = System.currentTimeMillis();   // BEFORE
  Object result = jp.proceed();              // ← the real divide() runs HERE
  System.out.println("Divide executed in "
      + (System.currentTimeMillis() - start) + " ms");
  return result;                             // AFTER — could even change this
}`}</pre>
        <p>
          Real-world aspects you have already used: <code>@Transactional</code> (an @Around that
          does beginTransaction → proceed() → commit/rollback), <code>@Cacheable</code> (cache hit
          → return early without proceed()), and security gates (no admin → throw, never call
          proceed()).
        </p>
        <Callout type="trap" title="AOP exam traps">
          (1) The <strong>expression</strong> is the <strong>pointcut</strong>; the annotated{" "}
          <strong>method</strong> is the <strong>advice</strong> — distractors swap them. (2) Only{" "}
          <code>@Around</code> can <strong>prevent</strong> the target method from running —{" "}
          <code>@Before</code> cannot. (3) <code>@Around</code> must call{" "}
          <code>proceed()</code> for the target to execute — nothing happens
          &quot;automatically&quot;. (4) Spring AOP weaves at <strong>runtime via proxies</strong>{" "}
          — which is also why <em>self-invocation</em> (a method calling another method on{" "}
          <code>this</code>) bypasses the aspect.
        </Callout>
      </LessonSection>

      {/* ─────────────────────── What is a Saga? ─────────────────────── */}
      <LessonSection title="What is a Saga?" icon={RotateCcw}>
        <p>
          <strong>The problem first:</strong> in a monolith, &quot;place an order&quot; is one{" "}
          <strong>ACID transaction</strong> — charge payment + reserve stock + create order all
          happen or none do. In microservices each service has its{" "}
          <strong>own private database</strong> (database-per-service), so no single transaction
          can span them, and classic <strong>2PC</strong> would hold locks across services —
          killing the availability and autonomy microservices exist for. So what happens when
          stock reservation fails <em>after</em> the payment already committed?
        </p>
        <p>
          <strong>A Saga = a sequence of local transactions, coordinated by events/messages,
          where failures are undone by compensating transactions for the steps that already
          succeeded.</strong> Each service does its own small local ACID transaction, commits,
          then announces it with an event (Kafka in the course demo).
        </p>
        <Diagram caption="The course saga demo: happy path left-to-right; on failure, compensating events flow BACKWARDS — only through steps that already committed.">
          <svg viewBox="0 0 520 230" width="520" height="230" role="img">
            {/* Happy path boxes */}
            <rect x="20" y="30" width="100" height="46" rx="6" fill="#dcfce7" stroke="#22c55e" strokeWidth="1.5" />
            <text x="70" y="49" textAnchor="middle" fontSize="10" fontWeight="600" fill="#14532d">Order</text>
            <text x="70" y="64" textAnchor="middle" fontSize="8.5" fill="#14532d">create + commit</text>
            <rect x="146" y="30" width="100" height="46" rx="6" fill="#dcfce7" stroke="#22c55e" strokeWidth="1.5" />
            <text x="196" y="49" textAnchor="middle" fontSize="10" fontWeight="600" fill="#14532d">Payment</text>
            <text x="196" y="64" textAnchor="middle" fontSize="8.5" fill="#14532d">charge + commit</text>
            <rect x="272" y="30" width="100" height="46" rx="6" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
            <text x="322" y="49" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7f1d1d">Stock</text>
            <text x="322" y="64" textAnchor="middle" fontSize="8.5" fill="#7f1d1d">✗ insufficient</text>
            <rect x="398" y="30" width="100" height="46" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
            <text x="448" y="49" textAnchor="middle" fontSize="10" fontWeight="600" fill="#94a3b8">Delivery</text>
            <text x="448" y="64" textAnchor="middle" fontSize="8.5" fill="#94a3b8">never reached</text>
            {/* Forward event arrows */}
            <line x1="120" y1="53" x2="146" y2="53" stroke="#22c55e" strokeWidth="2" />
            <text x="133" y="24" textAnchor="middle" fontSize="8" fill="#16a34a">ORDER_CREATED</text>
            <line x1="246" y1="53" x2="272" y2="53" stroke="#22c55e" strokeWidth="2" />
            <text x="259" y="92" textAnchor="middle" fontSize="8" fill="#16a34a">PAYMENT_CREATED</text>
            {/* Compensation arrows, backwards */}
            <line x1="290" y1="120" x2="220" y2="120" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,3" />
            <text x="255" y="112" textAnchor="middle" fontSize="8.5" fontWeight="600" fill="#dc2626">PAYMENT_REVERSED</text>
            <rect x="146" y="135" width="100" height="40" rx="6" fill="#fef2f2" stroke="#ef4444" />
            <text x="196" y="152" textAnchor="middle" fontSize="9" fill="#7f1d1d">refund payment</text>
            <text x="196" y="166" textAnchor="middle" fontSize="8.5" fill="#7f1d1d">(compensating tx)</text>
            <line x1="146" y1="155" x2="90" y2="155" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,3" />
            <text x="118" y="147" textAnchor="middle" fontSize="8.5" fontWeight="600" fill="#dc2626">ORDER_REVERSED</text>
            <rect x="20" y="135" width="100" height="40" rx="6" fill="#fef2f2" stroke="#ef4444" />
            <text x="70" y="152" textAnchor="middle" fontSize="9" fill="#7f1d1d">mark order</text>
            <text x="70" y="166" textAnchor="middle" fontSize="8.5" fill="#7f1d1d">FAILED</text>
            {/* takeaway bar */}
            <rect x="20" y="192" width="478" height="28" rx="6" fill="#f1f5f9" stroke="#cbd5e1" />
            <text x="259" y="210" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#334155">
              Compensation = new transaction that semantically UNDOES a committed step (refund ≠ rollback)
            </text>
          </svg>
        </Diagram>
        <ul>
          <li>
            <strong>Compensating transaction</strong> — you can&apos;t ROLLBACK a commit in another
            service, so you run a <em>new</em> local transaction that semantically undoes it
            (refund the payment, release the stock), flowing <strong>backwards</strong> through the
            chain.
          </li>
          <li>
            Only steps that <strong>already committed</strong> need compensating — a payment
            failure produces a shorter reversal chain than a delivery failure.
          </li>
          <li>
            While events are in flight, services briefly disagree (order CREATED, delivery already
            failed) — that is <strong>eventual consistency</strong>: the system <em>converges</em>{" "}
            to the right state instead of being right at every instant.
          </li>
        </ul>
        <Callout type="trap" title="Saga exam traps">
          <strong>Choreography</strong> = NO central coordinator — services react to each
          other&apos;s events via the broker (the course demo). <strong>Orchestration</strong> = a
          central Saga Orchestrator sends commands (easier to follow, but single point of failure).
          Distractors love to swap these definitions. Also: a saga gives{" "}
          <strong>eventual</strong> consistency, never ACID atomicity/isolation — any option
          claiming &quot;sagas guarantee ACID across services&quot; is wrong; and both styles can
          roll back (compensations are not orchestration-only).
        </Callout>
        <p>
          Memory hook: a saga is a <em>story told in episodes</em> — each episode (local
          transaction) is complete on its own, and if the story goes wrong, you publish{" "}
          <em>retraction episodes</em> in reverse order.
        </p>
      </LessonSection>

      {/* ─────────────────────── What is SOA? ─────────────────────── */}
      <LessonSection title="What is SOA?" icon={Network}>
        <p>
          <strong>SOA = Service-Oriented Architecture</strong> — an architectural style where an
          application is built as a collection of <strong>services</strong>: self-contained
          business functions (e.g. &quot;process payment&quot;, &quot;check inventory&quot;) that
          communicate over a network through <strong>standardized interfaces</strong>, instead of
          one big monolithic program.
        </p>
        <ul>
          <li>
            Each service exposes <strong>what</strong> it does via a contract (classically{" "}
            <strong>WSDL</strong>) and hides <strong>how</strong> it does it.
          </li>
          <li>
            Services are <strong>loosely coupled</strong> — consumers only know the contract.
          </li>
          <li>
            Services are <strong>reusable across the enterprise</strong> — one customer service
            serves many applications.
          </li>
          <li>
            Communication classically flows through an <strong>ESB</strong> (see next section).
          </li>
        </ul>
        <Callout type="trap" title="Mock-exam trap">
          A common SOA <strong>challenge</strong> = &quot;ensuring consistent service{" "}
          <strong>security</strong> across services&quot;. The distractors (easy legacy
          integration, simplified governance, no dependencies) are benefits SOA does{" "}
          <em>not</em> automatically provide. And remember: SOA = <strong>coarse-grained</strong>,
          microservices = <strong>fine-grained</strong>.
        </Callout>
        <p>
          One-liner: <em>&quot;SOA = enterprise-wide, coarse-grained services talking through a
          central ESB; microservices = the same idea taken further — small, independent,
          decentralized.&quot;</em>
        </p>
      </LessonSection>

      {/* ─────────────────── Coarse vs fine grained ─────────────────── */}
      <LessonSection title="Coarse-grained vs fine-grained" icon={Boxes}>
        <p>
          It&apos;s about <strong>how much work one service does</strong> — think chunk size.
          Memory hook: gravel — <strong>coarse</strong> gravel = few big rocks (SOA),{" "}
          <strong>fine</strong> gravel = many small pebbles (microservices).
        </p>
        <Diagram caption="Coarse-grained: one broad service, many operations. Fine-grained: one job per service.">
          <svg viewBox="0 0 520 200" width="520" height="200" role="img">
            {/* Coarse side */}
            <rect x="20" y="20" width="220" height="160" rx="8" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="130" y="44" textAnchor="middle" fontWeight="700" fontSize="13" fill="#1e3a8a">
              Coarse-grained (SOA)
            </text>
            <rect x="40" y="58" width="180" height="104" rx="6" fill="#bfdbfe" stroke="#3b82f6" />
            <text x="130" y="80" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e3a8a">
              CustomerService
            </text>
            <text x="130" y="100" textAnchor="middle" fontSize="10" fill="#1e3a8a">registration</text>
            <text x="130" y="116" textAnchor="middle" fontSize="10" fill="#1e3a8a">billing</text>
            <text x="130" y="132" textAnchor="middle" fontSize="10" fill="#1e3a8a">orders</text>
            <text x="130" y="148" textAnchor="middle" fontSize="10" fill="#1e3a8a">support history</text>
            {/* Fine side */}
            <rect x="280" y="20" width="220" height="160" rx="8" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5" />
            <text x="390" y="44" textAnchor="middle" fontWeight="700" fontSize="13" fill="#14532d">
              Fine-grained (Microservices)
            </text>
            <rect x="296" y="58" width="90" height="40" rx="6" fill="#bbf7d0" stroke="#22c55e" />
            <text x="341" y="82" textAnchor="middle" fontSize="9.5" fill="#14532d">Registration</text>
            <rect x="396" y="58" width="90" height="40" rx="6" fill="#bbf7d0" stroke="#22c55e" />
            <text x="441" y="82" textAnchor="middle" fontSize="9.5" fill="#14532d">Billing</text>
            <rect x="296" y="112" width="90" height="40" rx="6" fill="#bbf7d0" stroke="#22c55e" />
            <text x="341" y="136" textAnchor="middle" fontSize="9.5" fill="#14532d">Orders</text>
            <rect x="396" y="112" width="90" height="40" rx="6" fill="#bbf7d0" stroke="#22c55e" />
            <text x="441" y="136" textAnchor="middle" fontSize="9.5" fill="#14532d">Support</text>
          </svg>
        </Diagram>
        <p>
          Trade-off (exam-worthy): <strong>coarse</strong> = fewer network calls, but harder to
          change or scale one part. <strong>Fine</strong> = flexible and independently scalable,
          but more services to coordinate and operate.
        </p>
      </LessonSection>

      {/* ─────────────────────── What is an ESB? ─────────────────────── */}
      <LessonSection title="What is an ESB?" icon={ArrowRightLeft}>
        <p>
          <strong>ESB = Enterprise Service Bus</strong>: the central middleware backbone that SOA
          services communicate through. Instead of every service calling every other service
          directly (point-to-point spaghetti), everything goes through the bus, which handles:
        </p>
        <ul>
          <li>
            <strong>Routing</strong> — delivering messages to the right service
          </li>
          <li>
            <strong>Transformation</strong> — converting message formats between services
          </li>
          <li>
            <strong>Protocol bridging</strong> — letting services speaking different protocols talk
          </li>
          <li>
            <strong>Orchestration</strong> — coordinating multi-service business processes
          </li>
        </ul>
        <Callout type="trap" title="Three ESB traps">
          (1) The week 16 slides call the service/message bus the{" "}
          <strong>&quot;brain of the system&quot;</strong> — that phrase can appear verbatim. (2)
          ESB is <strong>SOA&apos;s</strong> hallmark; microservices deliberately avoid it
          (&quot;smart endpoints, dumb pipes&quot;) because a central bus is a bottleneck and
          single point of failure. (3) Don&apos;t confuse ESB with an <strong>API Gateway</strong>:
          the gateway sits at the <em>edge</em> routing client requests in; the ESB sits{" "}
          <em>between services</em> mediating all their communication.
        </Callout>
      </LessonSection>

      {/* ─────────────────────── SOA vs SOAP ─────────────────────── */}
      <LessonSection title="SOA vs SOAP — not the same thing" icon={Layers}>
        <p>
          Easy to mix up because of the names, but they are{" "}
          <strong>different categories of thing</strong>:
        </p>
        <ul>
          <li>
            <strong>SOA</strong> = an <strong>architecture style</strong> — a way of{" "}
            <em>structuring</em> a system as reusable services. (Service-Oriented{" "}
            <strong>Architecture</strong> → a design approach.)
          </li>
          <li>
            <strong>SOAP</strong> = a <strong>protocol</strong> — a concrete <em>message format</em>{" "}
            (XML envelope with Header + Body, usually over HTTP) for calling a web service.
            (Simple Object Access <strong>Protocol</strong> → a messaging protocol.)
          </li>
        </ul>
        <p>
          The relationship: SOA is the <em>idea</em>, SOAP is one <em>technology</em> commonly used
          to implement it (classic stack: <strong>SOAP + WSDL + ESB</strong>). But SOA does not
          require SOAP — services could also talk REST or messaging. Analogy:{" "}
          <em>SOA is the city plan, SOAP is one type of road between the buildings.</em>
        </p>
        <Callout type="trap" title="Keyword → answer mapping">
          &quot;Architectural style with coarse-grained services&quot; → <strong>SOA</strong>.
          &quot;XML envelope / WSDL / strict contract&quot; → <strong>SOAP</strong>. SOAP is{" "}
          <strong>XML-based (never JSON)</strong>, W3C-standardized, slower than REST due to XML
          parsing — but supports stateful operations and WS-Security. WSDL describes{" "}
          <strong>SOAP</strong> services; <strong>OpenAPI/Swagger</strong> is the REST equivalent.
        </Callout>
      </LessonSection>

      {/* ─────────────────── Protobuf & gRPC ─────────────────── */}
      <LessonSection title="What are Protobuf & gRPC?" icon={Zap}>
        <p>
          <strong>The problem:</strong> microservices call each other constantly. REST sends JSON —
          but JSON is <strong>text</strong>: bulky, slow to parse, no enforced contract. For
          thousands of internal calls per second that overhead adds up.
        </p>
        <p>
          <strong>Protobuf (Protocol Buffers)</strong> = the <em>data format</em> (by Google). You
          define a language-neutral schema in a <code>.proto</code> file; messages are serialized
          to <strong>compact binary</strong> — smaller and faster than JSON. The field numbers
          (<code>name = 1; age = 2;</code>) are <strong>wire tags</strong>: the network sends
          &quot;field 1 = Bob&quot;, not &quot;name = Bob&quot; — which is why field numbers must{" "}
          <strong>never be changed or reused</strong> once deployed.
        </p>
        <p>
          <strong>gRPC</strong> = the <em>communication framework</em> that uses protobuf. RPC =
          Remote Procedure Call: <strong>calling a function on another machine as if it were
          local</strong>. The <code>protoc</code> compiler generates client/server code in any
          language from the same <code>.proto</code> contract.
        </p>
        <Diagram caption="One .proto contract → generated stubs in any language → binary protobuf over HTTP/2. (Your course demo: Java client calling a Python server.)">
          <svg viewBox="0 0 520 220" width="520" height="220" role="img">
            {/* proto file */}
            <rect x="200" y="15" width="120" height="44" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="260" y="33" textAnchor="middle" fontSize="11" fontWeight="700" fill="#78350f">
              person.proto
            </text>
            <text x="260" y="48" textAnchor="middle" fontSize="9" fill="#78350f">
              the contract (like WSDL!)
            </text>
            {/* protoc arrows */}
            <line x1="225" y1="59" x2="120" y2="100" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="295" y1="59" x2="400" y2="100" stroke="#94a3b8" strokeWidth="1.5" />
            <text x="150" y="78" textAnchor="middle" fontSize="9" fill="#64748b">protoc generates</text>
            <text x="380" y="78" textAnchor="middle" fontSize="9" fill="#64748b">protoc generates</text>
            {/* Java client */}
            <rect x="40" y="100" width="160" height="56" rx="6" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="120" y="122" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e3a8a">
              Java client
            </text>
            <text x="120" y="140" textAnchor="middle" fontSize="9" fill="#1e3a8a">
              calls getPersonInfo(req)
            </text>
            {/* Python server */}
            <rect x="320" y="100" width="160" height="56" rx="6" fill="#dcfce7" stroke="#22c55e" strokeWidth="1.5" />
            <text x="400" y="122" textAnchor="middle" fontSize="11" fontWeight="600" fill="#14532d">
              Python server
            </text>
            <text x="400" y="140" textAnchor="middle" fontSize="9" fill="#14532d">
              implements PersonService
            </text>
            {/* wire */}
            <line x1="200" y1="128" x2="320" y2="128" stroke="#7c3aed" strokeWidth="2.5" />
            <text x="260" y="120" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7c3aed">
              binary protobuf
            </text>
            <text x="260" y="145" textAnchor="middle" fontSize="9" fill="#7c3aed">
              over HTTP/2
            </text>
            {/* takeaway bar */}
            <rect x="40" y="178" width="440" height="30" rx="6" fill="#f1f5f9" stroke="#cbd5e1" />
            <text x="260" y="197" textAnchor="middle" fontSize="10" fontWeight="600" fill="#334155">
              WSDL : SOAP &nbsp;::&nbsp; .proto : gRPC — both are machine-readable contracts
            </text>
          </svg>
        </Diagram>
        <p>
          <strong>Used for:</strong> internal microservice-to-microservice communication where
          performance matters (Google, Netflix, Uber). REST+JSON stays popular for public,
          browser-facing APIs because it is human-readable and universally supported.
        </p>
        <Callout type="trap" title="gRPC exam ammo">
          gRPC runs over <strong>HTTP/2</strong> (multiplexing, streaming) — not HTTP/1.1. Four
          call types: <strong>unary</strong> (1 request → 1 response — the course demo),{" "}
          <strong>server-streaming</strong>, <strong>client-streaming</strong>,{" "}
          <strong>bidirectional</strong> — the <code>stream</code> keyword in the .proto decides.
          Your slides say gRPC = <strong>&quot;Google Remote Procedure Call&quot;</strong>.
        </Callout>
      </LessonSection>

      {/* ─────────────────── Quick-revisit flashcards ─────────────────── */}
      <LessonSection title="Quick-revisit flashcards" icon={HelpCircle}>
        <FlashcardDeck
          cards={[
            {
              front: "AOP vocabulary",
              back: "Aspect = the module of cross-cutting code. Join point = where it could run (method execution). Pointcut = WHERE filter (the expression). Advice = WHAT+WHEN (the method). Weaving = linking it in (Spring: runtime proxies).",
            },
            {
              front: "@Around + proceed()",
              back: "Wraps the whole call; proceed() is the only way the real method runs. Can skip it (cache/security), modify args or return value. Most powerful advice. The bouncer at the door.",
            },
            {
              front: "5 advice types",
              back: "@Before · @After (always, like finally) · @AfterReturning (success only) · @AfterThrowing (exception only) · @Around (wraps; controls execution via proceed()).",
            },
            {
              front: "Saga",
              back: "Sequence of local transactions coordinated by events; failures undone by compensating transactions running backwards through the chain. Needed because database-per-service rules out ACID/2PC across microservices.",
            },
            {
              front: "Compensating transaction",
              back: "A NEW local transaction that semantically undoes a committed step (refund ≠ rollback). Only steps that already committed need one.",
            },
            {
              front: "Choreography vs Orchestration",
              back: "Choreography = no central coordinator, services react to each other's events (course demo). Orchestration = central orchestrator sends commands — simpler flow, single point of failure.",
            },
            {
              front: "SOA",
              back: "Architecture style: app = collection of coarse-grained, reusable, loosely-coupled services with standardized interfaces, classically connected via an ESB.",
            },
            {
              front: "ESB",
              back: "Enterprise Service Bus — central middleware in SOA: routing, transformation, protocol bridging, orchestration. Slides: “brain of the system”. Microservices avoid it.",
            },
            {
              front: "Coarse vs fine grained",
              back: "Chunk size of a service. Coarse = broad business area, many operations (SOA). Fine = one specific job per service (microservices). Gravel: big rocks vs pebbles.",
            },
            {
              front: "SOA vs SOAP",
              back: "SOA = architecture style (the city plan). SOAP = XML messaging protocol (one type of road). Classic SOA used SOAP + WSDL + ESB, but doesn't require SOAP.",
            },
            {
              front: "Protobuf",
              back: "Google's binary serialization format defined in .proto schemas. Smaller + faster than JSON. Field numbers are wire tags — never change/reuse them.",
            },
            {
              front: "gRPC",
              back: "RPC framework using protobuf over HTTP/2. protoc generates stubs in any language from one .proto → cross-language calls (Java client ↔ Python server). Unary / server-stream / client-stream / bidirectional.",
            },
            {
              front: "ESB vs API Gateway",
              back: "Gateway = at the edge, routes external client requests in. ESB = between services, mediates internal communication. Don't swap them on the exam.",
            },
            {
              front: "WSDL : SOAP :: ? : gRPC",
              back: ".proto — both are machine-readable contracts that let clients be generated in any language.",
            },
          ]}
        />
      </LessonSection>
    </>
  );
}
