import {
  Boxes,
  Crosshair,
  Layers,
  Leaf,
  Network,
  Repeat,
  Scissors,
  ShieldCheck,
  Target,
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
import questions from "../questions/week12";

export default function Week12() {
  return (
    <>
      <Callout type="key" title="Big picture — Week 12">
        This week has two threads. First, Spring Framework continuation: annotation-based
        configuration, the bean lifecycle, Spring Boot, Spring Security, and Spring Actuator.
        Second, a deep-dive into{" "}
        <strong>Aspect-Oriented Programming (AOP)</strong> — the paradigm that separates
        cross-cutting concerns (logging, security, transactions) from business logic by weaving
        advice into join points selected by pointcut expressions.
      </Callout>

      {/* ────────────────────── Spring Framework continuation ────────────────────── */}
      <LessonSection title="Spring Framework — annotation-based configuration" icon={Leaf}>
        <p>
          Spring can be configured entirely through annotations, removing the need for XML
          configuration files. The key annotations from{" "}
          <code>org.springframework.context.annotation</code> are:
        </p>
        <ul>
          <li>
            <code>@Configuration</code> — marks a class as a source of bean definitions for the
            IoC container.
          </li>
          <li>
            <code>@Bean</code> — declares that a method produces a bean to be managed by Spring.
          </li>
          <li>
            <code>@ComponentScan(basePackages = "...")</code> — tells Spring where to scan for
            stereotype-annotated classes.
          </li>
          <li>
            <code>@Scope</code> — configures the bean scope (singleton, prototype, etc.).
          </li>
          <li>
            <code>@Lazy</code> — delays initialisation of a bean until it is first requested.
          </li>
          <li>
            <code>@Primary</code> — gives a bean preference when multiple candidates qualify for
            autowiring.
          </li>
          <li>
            <code>@Conditional</code> — registers a bean only when a condition is met.
          </li>
        </ul>

        <Accordion type="single" collapsible className="rounded-lg border px-4 mt-4">
          <AccordionItem value="stereotypes">
            <AccordionTrigger>Stereotype annotations (org.springframework.stereotype)</AccordionTrigger>
            <AccordionContent>
              <p>All four are auto-detected by component scanning:</p>
              <ul>
                <li>
                  <code>@Component</code> — generic Spring-managed component; base for the other
                  three.
                </li>
                <li>
                  <code>@Repository</code> — data-access layer; encapsulates storage and retrieval
                  behaviour (typically applied to database classes).
                </li>
                <li>
                  <code>@Service</code> — business logic; holds domain operations in the service
                  layer.
                </li>
                <li>
                  <code>@Controller</code> — web layer; handles HTTP requests in the MVC pattern.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="container">
            <AccordionTrigger>AnnotationConfigApplicationContext — the annotation-based container</AccordionTrigger>
            <AccordionContent>
              <p>
                When using annotation-based configuration, the application context is bootstrapped
                with <code>AnnotationConfigApplicationContext</code>:
              </p>
              <pre className="mt-2 rounded bg-slate-900 p-3 text-xs text-slate-100 overflow-x-auto">
{`ConfigurableApplicationContext ctx =
    new AnnotationConfigApplicationContext(AppConfig.class);

NotificationService svc = ctx.getBean(NotificationService.class);
svc.sendNotifications("Hello from Spring DI!");`}
              </pre>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Diagram caption="Spring bean lifecycle: Container started → Instantiated → Dependencies injected → init() → utility → destroy()">
          <svg viewBox="0 0 520 120" width="520" height="120" role="img">
            {/* boxes */}
            {[
              { x: 10,  label: "Container\nStarted",      fill: "#dcfce7", stroke: "#16a34a" },
              { x: 110, label: "Bean\nInstantiated",      fill: "#dbeafe", stroke: "#2563eb" },
              { x: 220, label: "Dependencies\nInjected",  fill: "#dbeafe", stroke: "#2563eb" },
              { x: 330, label: "Custom\ninit()",          fill: "#fef9c3", stroke: "#ca8a04" },
              { x: 430, label: "Custom\ndestroy()",       fill: "#fee2e2", stroke: "#dc2626" },
            ].map(({ x, label, fill, stroke }, i) => (
              <g key={i}>
                <rect x={x} y={20} width={88} height={50} rx={6} fill={fill} stroke={stroke} strokeWidth={1.5} />
                {label.split("\n").map((line, li) => (
                  <text
                    key={li}
                    x={x + 44}
                    y={42 + li * 16}
                    textAnchor="middle"
                    fontSize={10}
                    fontWeight={600}
                    fill="#1e293b"
                  >
                    {line}
                  </text>
                ))}
                {i < 4 && (
                  <path
                    d={`M${x + 88},45 L${x + 100},45`}
                    stroke="#64748b"
                    strokeWidth={1.5}
                    markerEnd="url(#arr)"
                  />
                )}
              </g>
            ))}
            <defs>
              <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#64748b" />
              </marker>
            </defs>
          </svg>
        </Diagram>
      </LessonSection>

      {/* ────────────────────── Spring Boot ────────────────────── */}
      <LessonSection title="Spring Boot" icon={Boxes}>
        <p>
          <strong>Spring Boot</strong> is a framework built on top of Spring Framework for{" "}
          <strong>rapid application development</strong>. It eliminates boilerplate by providing:
        </p>
        <ul>
          <li>
            <strong>Auto-Configuration</strong> — automatically configures Spring components based
            on classpath dependencies (e.g. adding <code>spring-boot-starter-web</code> sets up an
            embedded Tomcat).
          </li>
          <li>
            <strong>Spring Boot Starters</strong> — pre-defined dependency bundles for common
            functionalities (<code>spring-boot-starter-web</code>,{" "}
            <code>spring-boot-starter-data-jpa</code>, etc.).
          </li>
          <li>
            <strong>Embedded Server Support</strong> — no separate Tomcat installation needed; the
            server is bundled in the JAR.
          </li>
          <li>
            <strong>Spring Boot Actuator</strong> — production monitoring endpoints
            (<code>/health</code>, <code>/metrics</code>, <code>/env</code>,{" "}
            <code>/loggers</code>, <code>/threaddump</code>).
          </li>
        </ul>
        <p className="mt-2">
          The entry point is annotated with <code>@SpringBootApplication</code>, which combines{" "}
          <code>@Configuration</code> + <code>@ComponentScan</code> +{" "}
          <code>@EnableAutoConfiguration</code>:
        </p>
        <pre className="mt-2 rounded bg-slate-900 p-3 text-xs text-slate-100 overflow-x-auto">
{`@SpringBootApplication
public class MyApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}`}
        </pre>

        <Callout type="trap" title="Spring Boot is NOT a replacement for Spring Framework">
          Spring Boot is built <strong>on top of</strong> Spring Framework — it is an opinionated
          launcher that eliminates configuration overhead. All Spring Framework features (IoC, AOP,
          Security, MVC) are still present and fully accessible.
        </Callout>
      </LessonSection>

      {/* ────────────────────── Spring Security ────────────────────── */}
      <LessonSection title="Spring Security" icon={ShieldCheck}>
        <p>
          Spring Security is a powerful, highly customisable{" "}
          <strong>authentication and access-control framework</strong>. Its two core mandates:
        </p>
        <ul>
          <li>
            <strong>Authentication</strong> — "Who are you?" (identity verification).
          </li>
          <li>
            <strong>Authorisation</strong> — "What are you allowed to do?" (permissions).
          </li>
        </ul>
        <p>
          It also provides protection against common exploits: CSRF (Cross-Site Request Forgery),
          Session Fixation, and Clickjacking.
        </p>
        <p>
          Architecturally, Spring Security is a{" "}
          <strong>Chain of Responsibility</strong> — every HTTP request must pass through a
          gauntlet of security filters before reaching the Controller. Key pieces:
        </p>
        <ul>
          <li>
            <strong>DelegatingFilterProxy</strong> — bridges the Servlet container and Spring's
            ApplicationContext.
          </li>
          <li>
            <strong>FilterChainProxy</strong> — manages a list of SecurityFilterChain beans.
          </li>
          <li>
            Key filters: <code>UsernamePasswordAuthenticationFilter</code>,{" "}
            <code>BasicAuthenticationFilter</code>, <code>FilterSecurityInterceptor</code>.
          </li>
        </ul>

        <Accordion type="single" collapsible className="rounded-lg border px-4 mt-4">
          <AccordionItem value="authz-strategies">
            <AccordionTrigger>Authorisation strategies</AccordionTrigger>
            <AccordionContent>
              <ul>
                <li>
                  <strong>URL-Based Security</strong> — map security constraints to URL patterns
                  (e.g. <code>/admin/**</code> requires <code>ROLE_ADMIN</code>).
                </li>
                <li>
                  <strong>Method-Level Security</strong> — annotations like{" "}
                  <code>@PreAuthorize</code>, <code>@PostAuthorize</code>, <code>@Secured</code>{" "}
                  directly on methods.
                </li>
                <li>
                  <strong>RBAC</strong> (Role-Based Access Control) — broad roles.
                </li>
                <li>
                  <strong>ABAC</strong> (Attribute-Based Access Control) — granular logic, e.g.
                  "Only the owner can edit this post".
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </LessonSection>

      {/* ────────────────────── AOP Introduction ────────────────────── */}
      <LessonSection title="Aspect-Oriented Programming (AOP)" icon={Scissors}>
        <p>
          <strong>AOP</strong> is a programming paradigm that aims to increase modularity by
          allowing the{" "}
          <strong>separation of cross-cutting concerns</strong> from the main business logic.
        </p>
        <p>
          <strong>Cross-cutting concerns</strong> are aspects of a program that affect multiple
          components and cannot be cleanly separated by conventional decomposition:
          <strong> logging</strong>, <strong>security</strong>,{" "}
          <strong>transaction management</strong>, and <strong>performance monitoring</strong>.
        </p>
        <p>
          Without AOP, these concerns are scattered (code duplication) and tangled (mixed with
          business logic) across the entire codebase. AOP extracts them into reusable{" "}
          <strong>aspects</strong>.
        </p>
        <Callout type="info" title="Real-world analogy">
          Think of a large building: electricity, air conditioning, and water run through every
          floor. They are cross-cutting concerns — just like logging runs through every layer of
          a software system.
        </Callout>
      </LessonSection>

      {/* ────────────────────── AOP Key Concepts ────────────────────── */}
      <LessonSection title="AOP core vocabulary" icon={Target}>
        <p>
          There are five terms you must distinguish precisely. They are the most commonly tested
          area of AOP:
        </p>

        <Diagram caption="The 5 AOP concepts and how they relate: Aspect contains Advice; Pointcut selects Join Points; Weaving links them all to the target code.">
          <svg viewBox="0 0 520 220" width="520" height="220" role="img">
            {/* Outer Aspect box */}
            <rect x="10" y="10" width="500" height="200" rx="10" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" strokeDasharray="6 3" />
            <text x="30" y="32" fontWeight="700" fontSize="13" fill="#15803d">Aspect (@Aspect class)</text>

            {/* Advice box */}
            <rect x="30" y="45" width="130" height="60" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
            <text x="95" y="68" textAnchor="middle" fontWeight="700" fontSize="11" fill="#1e40af">Advice</text>
            <text x="95" y="84" textAnchor="middle" fontSize="9" fill="#1e293b">@Before / @After</text>
            <text x="95" y="97" textAnchor="middle" fontSize="9" fill="#1e293b">@Around / @AfterReturning</text>

            {/* Pointcut box */}
            <rect x="200" y="45" width="130" height="60" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
            <text x="265" y="68" textAnchor="middle" fontWeight="700" fontSize="11" fill="#92400e">Pointcut</text>
            <text x="265" y="84" textAnchor="middle" fontSize="9" fill="#1e293b">Expression that</text>
            <text x="265" y="97" textAnchor="middle" fontSize="9" fill="#1e293b">selects Join Points</text>

            {/* Weaving box */}
            <rect x="370" y="45" width="120" height="60" rx="6" fill="#fce7f3" stroke="#db2777" strokeWidth="1.5" />
            <text x="430" y="68" textAnchor="middle" fontWeight="700" fontSize="11" fill="#9d174d">Weaving</text>
            <text x="430" y="84" textAnchor="middle" fontSize="9" fill="#1e293b">Compile-time</text>
            <text x="430" y="97" textAnchor="middle" fontSize="9" fill="#1e293b">Load-time · Runtime</text>

            {/* Join Point box (bottom) */}
            <rect x="115" y="140" width="280" height="55" rx="6" fill="#f3e8ff" stroke="#7c3aed" strokeWidth="1.5" />
            <text x="255" y="162" textAnchor="middle" fontWeight="700" fontSize="11" fill="#5b21b6">Join Point</text>
            <text x="255" y="178" textAnchor="middle" fontSize="9" fill="#1e293b">Specific execution moment in the program</text>
            <text x="255" y="191" textAnchor="middle" fontSize="9" fill="#1e293b">(e.g. method call, constructor, field access)</text>

            {/* arrows */}
            <line x1="160" y1="105" x2="200" y2="105" stroke="#64748b" strokeWidth="1" markerEnd="url(#arr2)" />
            <line x1="265" y1="105" x2="265" y2="140" stroke="#64748b" strokeWidth="1" markerEnd="url(#arr2)" />
            <line x1="430" y1="105" x2="310" y2="155" stroke="#64748b" strokeWidth="1" strokeDasharray="4 2" />
            <defs>
              <marker id="arr2" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#64748b" />
              </marker>
            </defs>
          </svg>
        </Diagram>

        <ul className="mt-4">
          <li>
            <strong>Aspect</strong> — a modular unit of cross-cutting concern. Declared with{" "}
            <code>@Aspect</code>. Analogy: security cameras throughout a shopping mall.
          </li>
          <li>
            <strong>Join Point</strong> — a specific point in program execution where an aspect
            can be applied. In Spring AOP this is always a <em>method execution</em>. Analogy:
            customer entering, ordering, or paying in a restaurant.
          </li>
          <li>
            <strong>Advice</strong> — the action an aspect performs at a join point. Defines{" "}
            <em>what</em> to do and <em>when</em>.
          </li>
          <li>
            <strong>Pointcut</strong> — an expression that selects which join points trigger
            advice. Analogy: "Apply the VIP greeting only when the customer is in the Penthouse
            Suite."
          </li>
          <li>
            <strong>Weaving</strong> — the process of applying aspects to the target code
            (compile-time, load-time, or runtime).
          </li>
        </ul>

        <Callout type="trap" title="Advice vs Join Point — the most-confused pair">
          A <strong>join point</strong> is the <em>location</em> (execution moment) in the
          program. <strong>Advice</strong> is the <em>action</em> run at that location.
          A <strong>pointcut</strong> is the <em>rule</em> that says which join points are
          eligible. The three are distinct — do not mix up join point and advice.
        </Callout>
      </LessonSection>

      {/* ────────────────────── Advice types ────────────────────── */}
      <LessonSection title="The 5 advice types" icon={Crosshair}>
        <p>
          Advice defines <strong>what action to take</strong> at a pointcut. There are five types:
        </p>

        <div className="mt-2 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800">
                <th className="border border-slate-300 dark:border-slate-600 px-3 py-2 text-left">Type</th>
                <th className="border border-slate-300 dark:border-slate-600 px-3 py-2 text-left">Annotation</th>
                <th className="border border-slate-300 dark:border-slate-600 px-3 py-2 text-left">Executes when?</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Before", "@Before", "Before method execution"],
                ["After (finally)", "@After", "After method execution — always, even if an exception is thrown"],
                ["After Returning", "@AfterReturning", "Only after successful (non-exception) return"],
                ["After Throwing", "@AfterThrowing", "Only when the method throws an exception"],
                ["Around", "@Around", "Surrounds the entire method — most powerful; controls whether proceed() is called"],
              ].map(([type, ann, when], i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white dark:bg-slate-900" : "bg-slate-50 dark:bg-slate-800/50"}>
                  <td className="border border-slate-300 dark:border-slate-600 px-3 py-2 font-semibold">{type}</td>
                  <td className="border border-slate-300 dark:border-slate-600 px-3 py-2"><code>{ann}</code></td>
                  <td className="border border-slate-300 dark:border-slate-600 px-3 py-2">{when}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4">Example — <code>@Before</code> and <code>@AfterReturning</code> in one aspect:</p>
        <pre className="mt-1 rounded bg-slate-900 p-3 text-xs text-slate-100 overflow-x-auto">
{`@Aspect
@Component
public class LoggingAspect {

    @Before("execution(* com.example.service.*.*(..))")
    public void logBefore(JoinPoint jp) {
        System.out.println("Before: " + jp.getSignature().getName());
    }

    @AfterReturning(
        pointcut = "execution(* com.example.service.*.*(..))",
        returning = "result")
    public void logAfterReturning(Object result) {
        System.out.println("Method returned: " + result);
    }
}`}
        </pre>

        <Diagram caption="The 5 advice types positioned around a method call — @Before enters first, @Around wraps all, @After(finally) always exits last.">
          <svg viewBox="0 0 520 240" width="520" height="240" role="img">
            {/* method box */}
            <rect x="185" y="90" width="150" height="60" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
            <text x="260" y="118" textAnchor="middle" fontWeight="700" fontSize="13" fill="#1e40af">Target Method</text>
            <text x="260" y="135" textAnchor="middle" fontSize="10" fill="#1e293b">join point</text>

            {/* @Before — top */}
            <rect x="185" y="20" width="150" height="32" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
            <text x="260" y="41" textAnchor="middle" fontSize="11" fontWeight="700" fill="#166534">@Before</text>
            <line x1="260" y1="52" x2="260" y2="90" stroke="#16a34a" strokeWidth="1.5" markerEnd="url(#ga)" />

            {/* @After — bottom */}
            <rect x="185" y="188" width="150" height="32" rx="6" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
            <text x="260" y="209" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">@After (finally)</text>
            <line x1="260" y1="150" x2="260" y2="188" stroke="#d97706" strokeWidth="1.5" markerEnd="url(#ga)" />

            {/* @AfterReturning — right */}
            <rect x="365" y="88" width="140" height="32" rx="6" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
            <text x="435" y="109" textAnchor="middle" fontSize="10" fontWeight="700" fill="#075985">@AfterReturning</text>
            <line x1="335" y1="115" x2="365" y2="104" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="4 2" markerEnd="url(#ga)" />

            {/* @AfterThrowing — left */}
            <rect x="15" y="88" width="135" height="32" rx="6" fill="#fce7f3" stroke="#db2777" strokeWidth="1.5" />
            <text x="82" y="109" textAnchor="middle" fontSize="10" fontWeight="700" fill="#9d174d">@AfterThrowing</text>
            <line x1="185" y1="115" x2="150" y2="104" stroke="#db2777" strokeWidth="1.5" strokeDasharray="4 2" markerEnd="url(#ga)" />

            {/* @Around — outer bracket */}
            <rect x="4" y="10" width="512" height="220" rx="12" fill="none" stroke="#7c3aed" strokeWidth="2" strokeDasharray="8 4" />
            <text x="10" y="8" fontSize="10" fontWeight="700" fill="#7c3aed">@Around (wraps everything — calls proceed() to invoke the method)</text>

            <defs>
              <marker id="ga" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#64748b" />
              </marker>
            </defs>
          </svg>
        </Diagram>
      </LessonSection>

      {/* ────────────────────── Pointcuts ────────────────────── */}
      <LessonSection title="Pointcut expressions" icon={Workflow}>
        <p>
          A <strong>pointcut</strong> is an expression that selects which join points trigger
          advice. The most common designator in Spring AOP is <code>execution()</code>:
        </p>
        <pre className="mt-2 rounded bg-slate-900 p-3 text-xs text-slate-100 overflow-x-auto">
{`// matches ALL methods in ALL classes in com.example.service
@Pointcut("execution(* com.example.service.*.*(..))")
public void serviceMethods() {}

// Anatomy:
// execution( ReturnType  Package.Class.Method( Params ) )
//            *           com.example.service.*.*  (..)
// * = any return type
// com.example.service.* = any class in that package
// .* = any method name
// (..) = any number/type of parameters`}
        </pre>

        <Accordion type="single" collapsible className="rounded-lg border px-4 mt-4">
          <AccordionItem value="pointcut-examples">
            <AccordionTrigger>More pointcut expression examples</AccordionTrigger>
            <AccordionContent>
              <ul>
                <li>
                  <code>execution(public * *(..))</code> — all public methods anywhere.
                </li>
                <li>
                  <code>execution(* com.example.dao.*.*(..))</code> — all methods in the DAO
                  package.
                </li>
                <li>
                  <code>execution(* set*(..))</code> — all methods whose name starts with
                  "set".
                </li>
                <li>
                  <code>@annotation(org.springframework.transaction.annotation.Transactional)</code>{" "}
                  — all methods annotated with <code>@Transactional</code>.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </LessonSection>

      {/* ────────────────────── Weaving ────────────────────── */}
      <LessonSection title="Weaving & Spring AOP proxies" icon={Repeat}>
        <p>
          <strong>Weaving</strong> is the process of applying aspects to the target code so that
          advice runs automatically at the selected join points — without modifying the original
          source.
        </p>
        <p>There are three weaving moments:</p>
        <ul>
          <li>
            <strong>Compile-time weaving</strong> — aspects are woven during compilation (AspectJ
            compiler). Fastest at runtime; requires a special build step.
          </li>
          <li>
            <strong>Load-time weaving (LTW)</strong> — aspects are woven as classes are loaded by
            the JVM using a Java agent. No source-code modification needed.
          </li>
          <li>
            <strong>Runtime weaving (proxy-based)</strong> — Spring AOP's default. A proxy object
            wraps the target bean and intercepts calls.
          </li>
        </ul>

        <Diagram caption="Runtime proxy-based weaving: caller talks to a proxy, which applies advice before/after delegating to the real bean.">
          <svg viewBox="0 0 520 140" width="520" height="140" role="img">
            {/* Caller */}
            <rect x="10" y="45" width="90" height="50" rx="6" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5" />
            <text x="55" y="68" textAnchor="middle" fontWeight="700" fontSize="11" fill="#334155">Caller</text>
            <text x="55" y="84" textAnchor="middle" fontSize="9" fill="#64748b">e.g. Controller</text>

            {/* arrow to proxy */}
            <line x1="100" y1="70" x2="160" y2="70" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#pb)" />
            <text x="130" y="63" textAnchor="middle" fontSize="8" fill="#64748b">method call</text>

            {/* Proxy */}
            <rect x="160" y="20" width="160" height="100" rx="8" fill="#fef9c3" stroke="#ca8a04" strokeWidth="2" />
            <text x="240" y="45" textAnchor="middle" fontWeight="700" fontSize="11" fill="#92400e">Spring Proxy</text>
            <text x="240" y="62" textAnchor="middle" fontSize="9" fill="#1e293b">JDK Dynamic (interface)</text>
            <text x="240" y="75" textAnchor="middle" fontSize="9" fill="#1e293b">or CGLIB (concrete class)</text>
            <text x="240" y="92" textAnchor="middle" fontSize="9" fill="#b45309">runs @Before advice</text>
            <text x="240" y="105" textAnchor="middle" fontSize="9" fill="#b45309">runs @After advice</text>

            {/* arrow to real bean */}
            <line x1="320" y1="70" x2="380" y2="70" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#pb)" />
            <text x="350" y="63" textAnchor="middle" fontSize="8" fill="#64748b">proceed()</text>

            {/* Real bean */}
            <rect x="380" y="45" width="125" height="50" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
            <text x="442" y="68" textAnchor="middle" fontWeight="700" fontSize="11" fill="#1e40af">Real Bean</text>
            <text x="442" y="84" textAnchor="middle" fontSize="9" fill="#1e293b">business logic</text>

            <defs>
              <marker id="pb" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#64748b" />
              </marker>
            </defs>
          </svg>
        </Diagram>

        <Callout type="trap" title="Spring AOP proxy selection rule">
          If the target bean <strong>implements at least one interface</strong>, Spring AOP creates
          a <strong>JDK dynamic proxy</strong> (implements the same interface). If the bean is a{" "}
          <strong>concrete class with no interface</strong>, Spring AOP uses{" "}
          <strong>CGLIB</strong> to generate a runtime subclass. This means you can only call
          advised methods through the proxy — calling a method on <code>this</code> inside the
          bean bypasses the proxy and skips advice entirely.
        </Callout>
      </LessonSection>

      {/* ────────────────────── AOP in Java ────────────────────── */}
      <LessonSection title="AOP frameworks & language comparison" icon={Network}>
        <p>Java's AOP ecosystem has three main tools:</p>
        <ul>
          <li>
            <strong>AspectJ</strong> — the most popular and complete AOP framework for Java;
            supports compile-time and load-time weaving; full join-point model.
          </li>
          <li>
            <strong>Spring AOP</strong> — integrated with the Spring Framework; runtime
            proxy-based; limited to method-execution join points on Spring-managed beans; simpler
            to use than AspectJ.
          </li>
          <li>
            <strong>JBoss AOP</strong> — less commonly used today.
          </li>
        </ul>

        <div className="mt-3 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800">
                <th className="border border-slate-300 dark:border-slate-600 px-3 py-2 text-left">Feature</th>
                <th className="border border-slate-300 dark:border-slate-600 px-3 py-2 text-left">Java (AspectJ / Spring AOP)</th>
                <th className="border border-slate-300 dark:border-slate-600 px-3 py-2 text-left">C# (PostSharp / Castle)</th>
                <th className="border border-slate-300 dark:border-slate-600 px-3 py-2 text-left">Python (Decorators)</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Weaving type", "Compile-time, Load-time, Runtime", "Compile-time (PostSharp), Runtime (Castle)", "Runtime (decorators, metaclasses)"],
                ["Performance", "High (compile-time weaving)", "High (PostSharp), Medium (runtime)", "Medium-Low (runtime overhead)"],
                ["Ease of use", "Moderate (AspectJ complex; Spring AOP simpler)", "Easier (PostSharp integrates well)", "Easy (dynamic features)"],
                ["Maturity", "Very Mature", "Mature", "Less Mature"],
              ].map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white dark:bg-slate-900" : "bg-slate-50 dark:bg-slate-800/50"}>
                  {row.map((cell, j) => (
                    <td key={j} className={`border border-slate-300 dark:border-slate-600 px-3 py-2 ${j === 0 ? "font-semibold" : ""}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </LessonSection>

      {/* ────────────────────── Flashcards ────────────────────── */}
      <LessonSection title="Flashcards — quick recall" icon={Layers}>
        <FlashcardDeck
          cards={[
            {
              front: "AOP definition",
              back: "A programming paradigm that increases modularity by allowing the separation of cross-cutting concerns (logging, security, transactions) from business logic.",
            },
            {
              front: "Aspect vs Advice",
              back: "An Aspect is the modular unit (the @Aspect class) that encapsulates a cross-cutting concern. Advice is the specific action the aspect performs at a join point — e.g. @Before, @Around.",
            },
            {
              front: "Join Point vs Pointcut",
              back: "A join point is the specific execution moment (e.g. a method call). A pointcut is the expression/rule that selects which join points will trigger advice.",
            },
            {
              front: "5 advice types",
              back: "@Before · @After (always/finally) · @AfterReturning (success only) · @AfterThrowing (exception only) · @Around (most powerful — wraps the join point; must call proceed()).",
            },
            {
              front: "Weaving types",
              back: "Compile-time (AspectJ compiler) · Load-time (LTW via Java agent) · Runtime / proxy-based (Spring AOP default — JDK dynamic proxy or CGLIB).",
            },
            {
              front: "JDK proxy vs CGLIB",
              back: "If the bean implements an interface → JDK dynamic proxy. If it is a concrete class with no interface → CGLIB subclass proxy.",
            },
            {
              front: "@SpringBootApplication",
              back: "Meta-annotation combining @Configuration + @ComponentScan + @EnableAutoConfiguration. Enables auto-config, component scanning, and bean definitions in one annotation.",
            },
            {
              front: "Spring Security — authentication vs authorisation",
              back: "Authentication = 'Who are you?' (identity). Authorisation = 'What are you allowed to do?' (permissions/access control).",
            },
          ]}
        />
      </LessonSection>

      {/* ────────────────────── Mini quiz ────────────────────── */}
      <MiniQuiz questions={questions.slice(0, 6)} title="Quick check — Week 12" />
    </>
  );
}
