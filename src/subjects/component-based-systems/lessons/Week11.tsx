import {
  Boxes,
  Cog,
  Crosshair,
  Layers,
  Leaf,
  Network,
  Puzzle,
  Scissors,
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
import questions from "../questions/week11";

export default function Week11() {
  return (
    <>
      <Callout type="key" title="Big picture">
        Week 11 introduces two of Spring's most exam-tested pillars:{" "}
        <strong>the IoC/DI container</strong> (beans, scopes, lifecycle,
        BeanFactory vs ApplicationContext, configuration styles) and{" "}
        <strong>Aspect-Oriented Programming (AOP)</strong> — the vocabulary of
        aspect, join point, pointcut, advice, weaving, and target object. Nail
        the exact one-line definition of each AOP term; the mock exam tests them
        directly.
      </Callout>

      {/* ─── What is Spring ─────────────────────────────────────────────── */}
      <LessonSection title="What is the Spring Framework?" icon={Leaf}>
        <p>
          Spring is a <strong>powerful, lightweight framework</strong> for Java
          application development. About{" "}
          <strong>60 % of Java developers</strong> use it as their primary
          framework. It is <strong>modular</strong> — you pull in only the
          modules you need (Core Container, Data Access, Web MVC, AOP, etc.).
        </p>
        <ul>
          <li>
            <strong>IoC / DI Container</strong> — manages the lifecycle and
            configuration of application components (beans).
          </li>
          <li>
            <strong>AOP</strong> — separates cross-cutting concerns such as
            logging and transaction management.
          </li>
          <li>
            <strong>Data Access</strong> — simplifies JDBC and ORM integrations.
          </li>
          <li>
            <strong>Transaction Management</strong> — declarative transactions
            via annotations.
          </li>
          <li>
            <strong>Web MVC</strong> — full-featured web framework.
          </li>
          <li>
            <strong>Security</strong> — comprehensive security services for Java
            EE enterprise applications.
          </li>
        </ul>

        <Callout type="info" title="A brief history">
          <ul>
            <li>
              <strong>Early 2000s</strong> — Rod Johnson created Spring as an
              alternative to the complex, heavyweight EJB framework.
            </li>
            <li>
              <strong>2003</strong> — Core release with IoC and Dependency
              Injection.
            </li>
            <li>
              <strong>2006</strong> — Spring 2.0 added AOP support.
            </li>
            <li>
              <strong>2009</strong> — Spring 3.0 added annotations and SpEL.
            </li>
            <li>
              <strong>2014</strong> — Spring Boot introduced auto-configuration
              and embedded servers.
            </li>
            <li>
              <strong>2024</strong> — Spring Framework 6.2 with extended
              enterprise support.
            </li>
          </ul>
        </Callout>

        <Accordion type="single" collapsible className="rounded-lg border px-4">
          <AccordionItem value="why-spring">
            <AccordionTrigger>
              Why Spring? — Problems with manual DI
            </AccordionTrigger>
            <AccordionContent>
              <p>Three issues with managing dependencies by hand:</p>
              <ul>
                <li>
                  <strong>Tight coupling &amp; maintenance overhead</strong> —
                  changing a concrete class requires updating every caller.
                </li>
                <li>
                  <strong>
                    Difficult dependency management in large projects
                  </strong>{" "}
                  — manually wiring dozens of objects becomes unmanageable.
                </li>
                <li>
                  <strong>Issues with component lifecycle handling</strong> —
                  initialising and destroying objects correctly across the app is
                  error-prone.
                </li>
              </ul>
              <p>
                Spring's IoC container solves all three by taking over object
                creation, wiring, and destruction.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="benefits">
            <AccordionTrigger>Benefits of using Spring</AccordionTrigger>
            <AccordionContent>
              <ul>
                <li>
                  <strong>Development speed</strong> — minimal boilerplate code.
                </li>
                <li>
                  <strong>Testability</strong> — built-in tools for mocking and
                  testing components.
                </li>
                <li>
                  <strong>Scalability</strong> — suitable from small to
                  enterprise-level applications.
                </li>
                <li>
                  <strong>Community support</strong> — large, active community
                  with extensive documentation.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </LessonSection>

      {/* ─── IoC Container & Beans ──────────────────────────────────────── */}
      <LessonSection title="The IoC Container and Spring Beans" icon={Boxes}>
        <p>
          The heart of Spring is its{" "}
          <strong>Inversion of Control (IoC) container</strong>. Instead of your
          code creating objects with <code>new</code>, the container reads
          configuration metadata and creates, wires, and destroys objects for
          you. Any object managed this way is called a{" "}
          <strong>Spring Bean</strong>.
        </p>

        <Diagram caption="How the Spring IoC container creates beans: it reads metadata (XML, annotations, or Java config) and produces ready-to-use managed objects.">
          <svg viewBox="0 0 520 200" width="520" height="200" role="img">
            {/* Metadata box */}
            <rect
              x="20"
              y="60"
              width="130"
              height="80"
              rx="8"
              fill="#fef9c3"
              stroke="#ca8a04"
              strokeWidth="1.5"
            />
            <text
              x="85"
              y="88"
              textAnchor="middle"
              fontWeight="700"
              fontSize="13"
              fill="#92400e"
            >
              Metadata
            </text>
            <text
              x="85"
              y="108"
              textAnchor="middle"
              fontSize="11"
              fill="#78350f"
            >
              XML / Annotations
            </text>
            <text
              x="85"
              y="124"
              textAnchor="middle"
              fontSize="11"
              fill="#78350f"
            >
              / Java @Config
            </text>

            {/* Arrow: metadata → container */}
            <line
              x1="150"
              y1="100"
              x2="208"
              y2="100"
              stroke="#64748b"
              strokeWidth="1.5"
              markerEnd="url(#arr)"
            />

            {/* Spring Container */}
            <rect
              x="210"
              y="40"
              width="140"
              height="120"
              rx="10"
              fill="#dcfce7"
              stroke="#16a34a"
              strokeWidth="2"
            />
            <text
              x="280"
              y="72"
              textAnchor="middle"
              fontWeight="700"
              fontSize="13"
              fill="#14532d"
            >
              Spring IoC
            </text>
            <text
              x="280"
              y="90"
              textAnchor="middle"
              fontWeight="700"
              fontSize="13"
              fill="#14532d"
            >
              Container
            </text>
            <text
              x="280"
              y="114"
              textAnchor="middle"
              fontSize="11"
              fill="#166534"
            >
              creates &amp; wires
            </text>
            <text
              x="280"
              y="130"
              textAnchor="middle"
              fontSize="11"
              fill="#166534"
            >
              beans
            </text>

            {/* Arrow: container → beans */}
            <line
              x1="350"
              y1="100"
              x2="408"
              y2="100"
              stroke="#64748b"
              strokeWidth="1.5"
              markerEnd="url(#arr)"
            />

            {/* Beans */}
            <rect
              x="410"
              y="60"
              width="90"
              height="80"
              rx="8"
              fill="#eff6ff"
              stroke="#3b82f6"
              strokeWidth="1.5"
            />
            <text
              x="455"
              y="88"
              textAnchor="middle"
              fontWeight="700"
              fontSize="13"
              fill="#1e3a8a"
            >
              Beans
            </text>
            <text
              x="455"
              y="108"
              textAnchor="middle"
              fontSize="11"
              fill="#1e3a8a"
            >
              (managed
            </text>
            <text
              x="455"
              y="124"
              textAnchor="middle"
              fontSize="11"
              fill="#1e3a8a"
            >
              objects)
            </text>

            <defs>
              <marker
                id="arr"
                markerWidth="7"
                markerHeight="7"
                refX="6"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 7 3.5, 0 7" fill="#64748b" />
              </marker>
            </defs>
          </svg>
        </Diagram>

        <p>The Spring Container provides four main services:</p>
        <ul>
          <li>
            <strong>Bean Management</strong> — creating and managing the
            lifecycle of beans.
          </li>
          <li>
            <strong>Dependency Injection</strong> — injecting dependencies
            automatically.
          </li>
          <li>
            <strong>Lifecycle Management</strong> — initialising and destroying
            beans at the right time.
          </li>
          <li>
            <strong>AOP Support</strong> — applying cross-cutting concerns like
            logging and security.
          </li>
        </ul>

        <Callout type="trap" title="Three ways to define a bean — all testable">
          <ol className="list-decimal pl-5 space-y-1">
            <li>
              <strong>XML</strong> —{" "}
              <code>
                {"<bean id=\"myBean\" class=\"com.example.MyBean\"/>"}
              </code>{" "}
              in <code>beans.xml</code>.
            </li>
            <li>
              <strong>Annotation-based</strong> — put{" "}
              <code>@Component</code> / <code>@Service</code> /{" "}
              <code>@Repository</code> on the class and enable component
              scanning.
            </li>
            <li>
              <strong>Java @Configuration</strong> — a{" "}
              <code>@Configuration</code> class with{" "}
              <code>@Bean</code>-annotated factory methods (gives maximum control
              over bean creation).
            </li>
          </ol>
        </Callout>
      </LessonSection>

      {/* ─── Stereotype annotations ─────────────────────────────────────── */}
      <LessonSection title="Stereotype Annotations" icon={Layers}>
        <p>
          All four live in the{" "}
          <code>org.springframework.stereotype</code> package. They mark classes
          for auto-detection via classpath scanning:
        </p>
        <ul>
          <li>
            <code>@Component</code> — generic stereotype; indicates an
            auto-detected component.
          </li>
          <li>
            <code>@Service</code> — indicates a class that holds{" "}
            <strong>business logic</strong> (service layer).
          </li>
          <li>
            <code>@Repository</code> — indicates a{" "}
            <strong>data-access object</strong>; encapsulates storage, retrieval
            and search behaviour (typically a DB DAO). Spring also translates
            persistence exceptions for it.
          </li>
          <li>
            <code>@Controller</code> — indicates a{" "}
            <strong>web MVC controller</strong> that handles HTTP requests.
          </li>
        </ul>

        <Accordion type="single" collapsible className="rounded-lg border px-4">
          <AccordionItem value="autowired">
            <AccordionTrigger>@Autowired — wiring beans together</AccordionTrigger>
            <AccordionContent>
              <p>
                <code>@Autowired</code> tells Spring to inject the matching bean
                automatically — on a constructor, setter, or field. If there are
                multiple candidates, use{" "}
                <code>@Primary</code> or <code>@Qualifier</code> to disambiguate.
              </p>
              <pre className="mt-2 rounded bg-slate-100 p-3 text-xs overflow-x-auto">
{`@Service
public class NotificationService {
    private final Notifier notifier;

    @Autowired
    public NotificationService(Notifier notifier) {
        this.notifier = notifier;
    }
}`}
              </pre>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="config-annotations">
            <AccordionTrigger>
              @Configuration + @ComponentScan example
            </AccordionTrigger>
            <AccordionContent>
              <pre className="rounded bg-slate-100 p-3 text-xs overflow-x-auto">
{`@Configuration
@ComponentScan(basePackages = "dk.sdu.cbs.example")
public class AppConfig {
    // All @Component / @Service / @Repository classes
    // in that package are picked up automatically.
}`}
              </pre>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </LessonSection>

      {/* ─── Bean scopes ────────────────────────────────────────────────── */}
      <LessonSection title="Bean Scopes" icon={Cog}>
        <p>
          Scope controls <strong>how many instances</strong> of a bean the
          container creates:
        </p>
        <ul>
          <li>
            <strong>Singleton</strong> (default) — one instance shared across
            the entire container. E.g., database connection pools, configuration
            classes.
          </li>
          <li>
            <strong>Prototype</strong> — a new instance every time the bean is
            requested from the container.
          </li>
          <li>
            <strong>Request</strong> — one instance per HTTP request (web
            apps). E.g., controllers, request-specific services.
          </li>
          <li>
            <strong>Session</strong> — one instance per HTTP session. E.g.,
            shopping cart, user session data.
          </li>
        </ul>

        <pre className="rounded bg-slate-100 p-3 text-xs overflow-x-auto mt-2">
{`@Component
@Scope("singleton")          // default — can be omitted
public class MySingletonBean { }

@Component
@Scope("prototype")
public class MyPrototypeBean { }`}
        </pre>

        <Callout type="trap" title="Default scope trap">
          If no <code>@Scope</code> annotation is present, Spring uses{" "}
          <strong>singleton</strong> by default. Many exam questions rely on
          students forgetting this.
        </Callout>
      </LessonSection>

      {/* ─── BeanFactory vs ApplicationContext ──────────────────────────── */}
      <LessonSection
        title="BeanFactory vs ApplicationContext"
        icon={Network}
      >
        <p>Spring provides two container types — know the differences:</p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100">
                <th className="border px-3 py-2 text-left">Feature</th>
                <th className="border px-3 py-2 text-left">BeanFactory</th>
                <th className="border px-3 py-2 text-left">
                  ApplicationContext
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-3 py-2 font-medium">Bean loading</td>
                <td className="border px-3 py-2">Lazy (on demand)</td>
                <td className="border px-3 py-2">Eager (at startup)</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="border px-3 py-2 font-medium">
                  Event handling
                </td>
                <td className="border px-3 py-2">Not supported</td>
                <td className="border px-3 py-2">Supported</td>
              </tr>
              <tr>
                <td className="border px-3 py-2 font-medium">
                  Internationalisation (i18n)
                </td>
                <td className="border px-3 py-2">Not supported</td>
                <td className="border px-3 py-2">Supported</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="border px-3 py-2 font-medium">AOP support</td>
                <td className="border px-3 py-2">Requires extra config</td>
                <td className="border px-3 py-2">Built-in</td>
              </tr>
              <tr>
                <td className="border px-3 py-2 font-medium">
                  Web application
                </td>
                <td className="border px-3 py-2">Not suitable</td>
                <td className="border px-3 py-2">
                  Specialised contexts available
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <Callout type="trap" title="Exam note — always prefer ApplicationContext">
          BeanFactory is <strong>not recommended</strong> for modern applications.
          Use <code>ApplicationContext</code> (or one of its implementations)
          instead. The exam often presents BeanFactory's limitations as traps.
        </Callout>

        <Accordion type="single" collapsible className="rounded-lg border px-4 mt-4">
          <AccordionItem value="ctx-impls">
            <AccordionTrigger>
              Four ApplicationContext implementations to know
            </AccordionTrigger>
            <AccordionContent>
              <ul>
                <li>
                  <code>ClassPathXmlApplicationContext</code> — loads XML config
                  from the classpath (ideal when config is packaged in the JAR).
                </li>
                <li>
                  <code>FileSystemXmlApplicationContext</code> — loads XML
                  config from the file system (useful for externalised config).
                </li>
                <li>
                  <code>AnnotationConfigApplicationContext</code> — loads from{" "}
                  <code>@Configuration</code> classes; the preferred choice for
                  modern annotation-driven Spring apps.
                </li>
                <li>
                  <code>WebApplicationContext</code> — specialised context for
                  Spring MVC that integrates with the servlet context.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </LessonSection>

      {/* ─── Bean lifecycle ─────────────────────────────────────────────── */}
      <LessonSection title="Bean Lifecycle" icon={Workflow}>
        <p>The container manages each bean through a predictable sequence:</p>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Container Started</li>
          <li>
            <strong>Bean Instantiated</strong>
          </li>
          <li>
            <strong>Dependencies Injected</strong>
          </li>
          <li>
            Custom <strong>init()</strong> / <code>@PostConstruct</code> method
            runs
          </li>
          <li>Bean is in use (custom utility methods available)</li>
          <li>
            Custom <strong>destroy()</strong> / <code>@PreDestroy</code> method
            runs
          </li>
        </ol>

        <pre className="rounded bg-slate-100 p-3 text-xs overflow-x-auto mt-3">
{`@Component
public class ShoppingCart {

    @PostConstruct
    public void init() {
        // Runs after DI — set defaults, load prefs, etc.
        System.out.println("ShoppingCart initialised");
    }

    @PreDestroy
    public void cleanup() {
        // Runs before bean is destroyed — release resources
        System.out.println("ShoppingCart cleaned up");
    }
}`}
        </pre>
      </LessonSection>

      {/* ─── Spring Boot ────────────────────────────────────────────────── */}
      <LessonSection title="Spring Boot" icon={Boxes}>
        <p>
          <strong>Spring Boot</strong> is a framework built{" "}
          <em>on top of</em> Spring Framework for rapid application development.
          It does not replace the IoC container — it supercharges the developer
          experience:
        </p>
        <ul>
          <li>
            <strong>Auto-Configuration</strong> — automatically configures
            Spring components based on classpath dependencies (e.g. if
            spring-boot-starter-web is present, an embedded Tomcat is set up).
          </li>
          <li>
            <strong>Spring Boot Starters</strong> — pre-defined dependency sets
            for common functionalities (e.g.{" "}
            <code>spring-boot-starter-data-jpa</code>).
          </li>
          <li>
            <strong>Embedded Server</strong> — no need for an external Tomcat;
            runs with a built-in server.
          </li>
          <li>
            <strong>Spring Boot Actuator</strong> — monitoring and health-check
            endpoints (e.g. <code>/actuator/health</code>).
          </li>
        </ul>

        <pre className="rounded bg-slate-100 p-3 text-xs overflow-x-auto mt-3">
{`@SpringBootApplication  // = @Configuration + @ComponentScan + @EnableAutoConfiguration
public class MyApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}`}
        </pre>
      </LessonSection>

      {/* ─── AOP introduction ───────────────────────────────────────────── */}
      <LessonSection title="Aspect-Oriented Programming (AOP)" icon={Scissors}>
        <p>
          <strong>AOP</strong> complements OOP by providing a way to modularise{" "}
          <strong>cross-cutting concerns</strong> — behaviour that cuts across
          many unrelated classes (logging, security, transaction management).
          Without AOP, this code is duplicated everywhere; AOP extracts it into
          a single <strong>aspect</strong>.
        </p>

        <Callout type="trap" title="The five AOP terms the exam tests — learn the exact wording">
          <ul className="space-y-1">
            <li>
              <strong>ASPECT</strong> — a module that{" "}
              <em>encapsulates a cross-cutting concern</em> (e.g. a logging
              aspect). Annotated with <code>@Aspect</code>.
            </li>
            <li>
              <strong>JOIN POINT</strong> — a{" "}
              <em>point during program execution</em> (e.g. method call,
              exception throw) where an aspect <em>can</em> be applied.
            </li>
            <li>
              <strong>POINTCUT</strong> — an{" "}
              <em>expression that selects join points</em> where the advice will
              run.
            </li>
            <li>
              <strong>ADVICE</strong> — the{" "}
              <strong>
                actual action taken by an aspect at a join point
              </strong>{" "}
              (the code that runs — @Before, @After, @Around, etc.).
            </li>
            <li>
              <strong>WEAVING</strong> — the{" "}
              <em>
                process of linking aspects into application code
              </em>{" "}
              to create an advised object (Spring does this at runtime via
              proxies).
            </li>
          </ul>
        </Callout>

        <p className="mt-2">Two further terms to know:</p>
        <ul>
          <li>
            <strong>Target object</strong> — the object whose methods are being
            advised/intercepted by one or more aspects.
          </li>
          <li>
            <strong>Proxy</strong> — the object Spring creates to wrap the
            target and apply the advice without modifying the target's source
            code.
          </li>
        </ul>

        <Diagram caption="AOP timeline: on a method call (join point), the pointcut expression fires and Spring executes the advice before/after the actual method on the target object.">
          <svg viewBox="0 0 520 220" width="520" height="220" role="img">
            {/* Timeline line */}
            <line
              x1="30"
              y1="110"
              x2="490"
              y2="110"
              stroke="#94a3b8"
              strokeWidth="2"
            />
            {/* Arrow head on timeline */}
            <polygon points="490,106 500,110 490,114" fill="#94a3b8" />
            <text
              x="505"
              y="114"
              fontSize="10"
              fill="#64748b"
            >
              time
            </text>

            {/* Join point marker */}
            <circle cx="200" cy="110" r="7" fill="#8b5cf6" />
            <text
              x="200"
              y="86"
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill="#7c3aed"
            >
              JOIN POINT
            </text>
            <text
              x="200"
              y="99"
              textAnchor="middle"
              fontSize="10"
              fill="#7c3aed"
            >
              method call
            </text>

            {/* Before advice */}
            <rect
              x="80"
              y="125"
              width="90"
              height="40"
              rx="6"
              fill="#fce7f3"
              stroke="#db2777"
              strokeWidth="1.5"
            />
            <text
              x="125"
              y="143"
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill="#9d174d"
            >
              @Before
            </text>
            <text
              x="125"
              y="157"
              textAnchor="middle"
              fontSize="10"
              fill="#9d174d"
            >
              ADVICE
            </text>
            <line
              x1="170"
              y1="145"
              x2="193"
              y2="117"
              stroke="#db2777"
              strokeWidth="1"
              strokeDasharray="4"
            />

            {/* Target method box */}
            <rect
              x="225"
              y="85"
              width="100"
              height="50"
              rx="6"
              fill="#dcfce7"
              stroke="#16a34a"
              strokeWidth="1.5"
            />
            <text
              x="275"
              y="107"
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill="#14532d"
            >
              Target
            </text>
            <text
              x="275"
              y="123"
              textAnchor="middle"
              fontSize="11"
              fill="#14532d"
            >
              method()
            </text>

            {/* After advice */}
            <rect
              x="355"
              y="125"
              width="90"
              height="40"
              rx="6"
              fill="#fce7f3"
              stroke="#db2777"
              strokeWidth="1.5"
            />
            <text
              x="400"
              y="143"
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill="#9d174d"
            >
              @After
            </text>
            <text
              x="400"
              y="157"
              textAnchor="middle"
              fontSize="10"
              fill="#9d174d"
            >
              ADVICE
            </text>
            <line
              x1="355"
              y1="145"
              x2="327"
              y2="117"
              stroke="#db2777"
              strokeWidth="1"
              strokeDasharray="4"
            />

            {/* Pointcut label */}
            <rect
              x="155"
              y="175"
              width="140"
              height="32"
              rx="6"
              fill="#fff7ed"
              stroke="#ea580c"
              strokeWidth="1.5"
            />
            <text
              x="225"
              y="188"
              textAnchor="middle"
              fontSize="10"
              fontWeight="700"
              fill="#c2410c"
            >
              POINTCUT selects
            </text>
            <text
              x="225"
              y="200"
              textAnchor="middle"
              fontSize="10"
              fill="#c2410c"
            >
              this join point
            </text>
            <line
              x1="225"
              y1="175"
              x2="209"
              y2="117"
              stroke="#ea580c"
              strokeWidth="1"
              strokeDasharray="4"
            />
          </svg>
        </Diagram>

        <Accordion type="single" collapsible className="rounded-lg border px-4 mt-2">
          <AccordionItem value="advice-types">
            <AccordionTrigger>Advice types — @Before, @After, @Around…</AccordionTrigger>
            <AccordionContent>
              <ul>
                <li>
                  <code>@Before</code> — runs before the target method
                  executes. Common use: logging, security checks.
                </li>
                <li>
                  <code>@AfterReturning</code> — runs after the method returns
                  successfully.
                </li>
                <li>
                  <code>@AfterThrowing</code> — runs if the method throws an
                  exception.
                </li>
                <li>
                  <code>@After</code> — runs after the method, regardless of
                  outcome (like a finally block).
                </li>
                <li>
                  <code>@Around</code> — the most powerful — wraps the entire
                  method call, letting you control whether it even runs.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="weaving-types">
            <AccordionTrigger>Compile-time vs runtime weaving</AccordionTrigger>
            <AccordionContent>
              <ul>
                <li>
                  <strong>Runtime weaving</strong> (Spring AOP default) — Spring
                  creates a dynamic proxy at runtime that wraps the target bean.
                  Simple and no build-tool changes needed; limited to
                  Spring-managed beans and method join points.
                </li>
                <li>
                  <strong>Compile-time weaving</strong> (full AspectJ) — aspects
                  are woven at compile time; supports field access and
                  constructor join points too.
                </li>
                <li>
                  <strong>Load-time weaving</strong> — weaving happens as
                  classes are loaded by the JVM.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="crosscutting-examples">
            <AccordionTrigger>
              Classic cross-cutting concerns (exam examples)
            </AccordionTrigger>
            <AccordionContent>
              <ul>
                <li>
                  <strong>Logging</strong> — log every method call in the
                  service layer without touching each class.
                </li>
                <li>
                  <strong>Security</strong> — check authentication/authorisation
                  before any sensitive method.
                </li>
                <li>
                  <strong>Transaction management</strong> — open and commit/roll
                  back a DB transaction around service methods
                  (<code>@Transactional</code>).
                </li>
                <li>
                  <strong>Caching</strong> — cache method return values
                  transparently (<code>@Cacheable</code>).
                </li>
                <li>
                  <strong>Performance monitoring</strong> — measure execution
                  time of methods.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </LessonSection>

      {/* ─── AOP diagram: aspect terminology ────────────────────────────── */}
      <LessonSection title="AOP Terminology at a Glance" icon={Target}>
        <Diagram caption="The five core AOP concepts and how they relate: an Aspect contains Pointcuts and Advice; the Pointcut selects Join Points on the Target; Weaving links them all together.">
          <svg viewBox="0 0 520 240" width="520" height="240" role="img">
            {/* Aspect outer box */}
            <rect
              x="10"
              y="10"
              width="500"
              height="220"
              rx="12"
              fill="#f5f3ff"
              stroke="#8b5cf6"
              strokeWidth="2"
              strokeDasharray="6 3"
            />
            <text
              x="260"
              y="32"
              textAnchor="middle"
              fontWeight="700"
              fontSize="14"
              fill="#5b21b6"
            >
              ASPECT (encapsulates cross-cutting concern)
            </text>

            {/* Pointcut */}
            <rect
              x="30"
              y="50"
              width="140"
              height="60"
              rx="8"
              fill="#fff7ed"
              stroke="#ea580c"
              strokeWidth="1.5"
            />
            <text
              x="100"
              y="76"
              textAnchor="middle"
              fontWeight="700"
              fontSize="12"
              fill="#c2410c"
            >
              POINTCUT
            </text>
            <text
              x="100"
              y="93"
              textAnchor="middle"
              fontSize="10"
              fill="#9a3412"
            >
              selects join points
            </text>

            {/* Advice */}
            <rect
              x="190"
              y="50"
              width="140"
              height="60"
              rx="8"
              fill="#fce7f3"
              stroke="#db2777"
              strokeWidth="1.5"
            />
            <text
              x="260"
              y="76"
              textAnchor="middle"
              fontWeight="700"
              fontSize="12"
              fill="#9d174d"
            >
              ADVICE
            </text>
            <text
              x="260"
              y="93"
              textAnchor="middle"
              fontSize="10"
              fill="#9d174d"
            >
              actual action at JP
            </text>

            {/* Target */}
            <rect
              x="350"
              y="50"
              width="140"
              height="60"
              rx="8"
              fill="#dcfce7"
              stroke="#16a34a"
              strokeWidth="1.5"
            />
            <text
              x="420"
              y="76"
              textAnchor="middle"
              fontWeight="700"
              fontSize="12"
              fill="#14532d"
            >
              TARGET
            </text>
            <text
              x="420"
              y="93"
              textAnchor="middle"
              fontSize="10"
              fill="#14532d"
            >
              advised object
            </text>

            {/* Join Point */}
            <rect
              x="150"
              y="145"
              width="130"
              height="55"
              rx="8"
              fill="#eff6ff"
              stroke="#3b82f6"
              strokeWidth="1.5"
            />
            <text
              x="215"
              y="168"
              textAnchor="middle"
              fontWeight="700"
              fontSize="12"
              fill="#1e3a8a"
            >
              JOIN POINT
            </text>
            <text
              x="215"
              y="185"
              textAnchor="middle"
              fontSize="10"
              fill="#1e3a8a"
            >
              point in execution
            </text>

            {/* Weaving label */}
            <rect
              x="350"
              y="155"
              width="130"
              height="40"
              rx="8"
              fill="#fef9c3"
              stroke="#ca8a04"
              strokeWidth="1.5"
            />
            <text
              x="415"
              y="172"
              textAnchor="middle"
              fontWeight="700"
              fontSize="12"
              fill="#92400e"
            >
              WEAVING
            </text>
            <text
              x="415"
              y="187"
              textAnchor="middle"
              fontSize="10"
              fill="#78350f"
            >
              links aspects → code
            </text>

            {/* Connector lines */}
            <line
              x1="100"
              y1="110"
              x2="185"
              y2="145"
              stroke="#ea580c"
              strokeWidth="1"
              strokeDasharray="4"
            />
            <line
              x1="260"
              y1="110"
              x2="240"
              y2="145"
              stroke="#db2777"
              strokeWidth="1"
              strokeDasharray="4"
            />
            <line
              x1="420"
              y1="110"
              x2="415"
              y2="155"
              stroke="#16a34a"
              strokeWidth="1"
              strokeDasharray="4"
            />
          </svg>
        </Diagram>
      </LessonSection>

      {/* ─── Flashcards ─────────────────────────────────────────────────── */}
      <LessonSection title="Flashcards — quick recall" icon={Puzzle}>
        <FlashcardDeck
          cards={[
            {
              front: "Spring Bean",
              back: "A component/object whose lifecycle (creation, initialisation, destruction) is managed by the Spring IoC container.",
            },
            {
              front: "BeanFactory vs ApplicationContext",
              back: "BeanFactory: lazy loading, no AOP/event/i18n support — not recommended for modern apps. ApplicationContext: eager loading, built-in AOP, events, i18n — preferred.",
            },
            {
              front: "Singleton vs Prototype scope",
              back: "Singleton: one shared instance per container (default). Prototype: new instance every time the bean is requested.",
            },
            {
              front: "ADVICE (AOP)",
              back: "The actual action taken by an aspect at a join point — the code that runs (@Before, @After, @Around, etc.).",
            },
            {
              front: "POINTCUT (AOP)",
              back: "An expression that selects the set of join points where an aspect's advice will execute.",
            },
            {
              front: "JOIN POINT (AOP)",
              back: "A point during program execution (e.g., method call, exception throw) where an aspect can be applied.",
            },
            {
              front: "ASPECT (AOP)",
              back: "A module that encapsulates a cross-cutting concern (e.g., logging, security, transactions). Annotated with @Aspect.",
            },
            {
              front: "WEAVING (AOP)",
              back: "The process of linking aspects into application code to create an advised object. Spring does this at runtime via proxies.",
            },
          ]}
        />
      </LessonSection>

      {/* ─── Mini quiz ──────────────────────────────────────────────────── */}
      <MiniQuiz questions={questions.slice(0, 6)} title="Quick check — Week 11" />
    </>
  );
}
