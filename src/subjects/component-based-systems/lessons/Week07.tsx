import {
  Box,
  Code,
  Cog,
  FileCode,
  GitBranch,
  Layers,
  Package,
  Puzzle,
  Server,
  Terminal,
  Wrench,
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
import questions from "../questions/week07";

export default function Week07() {
  return (
    <>
      <Callout type="key" title="Big picture">
        Week 7 introduces the <strong>Java ecosystem</strong> and its role in component-based
        development, then dives deep into <strong>Apache Maven</strong> — the standard build and
        dependency-management tool for Java — before closing with{" "}
        <strong>component thinking in Java</strong>: how JAR files, packages, and interfaces map
        directly onto CBSE principles.
      </Callout>

      {/* ─────────────────────────── Java & the JVM ─────────────────────────── */}
      <LessonSection title="Java & the JVM — write once, run anywhere" icon={Server}>
        <p>
          <strong>Java</strong> is an object-oriented, <strong>platform-independent</strong>{" "}
          programming language. Its famous promise — <strong>Write Once, Run Anywhere (WORA)</strong>{" "}
          — is delivered by the <strong>Java Virtual Machine (JVM)</strong>: the Java compiler (
          <code>javac</code>) turns <code>.java</code> source files into{" "}
          <strong>bytecode</strong> stored in <code>.class</code> files, and the JVM on each target
          platform executes that bytecode. Bytecode is an intermediate, platform-independent
          representation; it cannot be executed directly by hardware — the JVM is required.
        </p>
        <p>
          Java is chosen for enterprise and component-based systems because of automatic garbage
          collection, strong typing, extensive standard libraries, multithreading support, and its
          very large ecosystem. It is the first choice of high-frequency trading platforms in the
          financial sector.
        </p>

        <Diagram caption="The Java compilation pipeline: .java → javac → bytecode (.class) → JVM executes on any platform.">
          <svg viewBox="0 0 510 160" width="510" height="160" role="img">
            <defs>
              <marker id="arr7a" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#64748b" />
              </marker>
            </defs>
            {/* Source */}
            <rect x="10" y="50" width="105" height="52" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
            <text x="62" y="72" textAnchor="middle" fontSize="11" fontWeight="700" fill="#78350f">Java Source</text>
            <text x="62" y="90" textAnchor="middle" fontSize="10" fill="#78350f">(.java)</text>
            {/* arrow → javac */}
            <line x1="115" y1="76" x2="155" y2="76" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arr7a)" />
            <text x="135" y="68" textAnchor="middle" fontSize="9" fill="#475569">javac</text>
            {/* Bytecode */}
            <rect x="155" y="50" width="105" height="52" rx="6" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
            <text x="207" y="72" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0c4a6e">Bytecode</text>
            <text x="207" y="90" textAnchor="middle" fontSize="10" fill="#0c4a6e">(.class)</text>
            {/* arrow down */}
            <line x1="207" y1="102" x2="207" y2="125" stroke="#64748b" strokeWidth="1.5" />
            {/* horizontal line to three JVMs */}
            <line x1="65" y1="125" x2="445" y2="125" stroke="#64748b" strokeWidth="1.5" />
            {/* arrows down to JVMs */}
            <line x1="65" y1="125" x2="65" y2="133" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arr7a)" />
            <line x1="255" y1="125" x2="255" y2="133" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arr7a)" />
            <line x1="445" y1="125" x2="445" y2="133" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arr7a)" />
            {/* JVM boxes */}
            <rect x="20" y="135" width="90" height="22" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
            <text x="65" y="150" textAnchor="middle" fontSize="10" fill="#14532d">JVM / Windows</text>
            <rect x="210" y="135" width="90" height="22" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
            <text x="255" y="150" textAnchor="middle" fontSize="10" fill="#14532d">JVM / Linux</text>
            <rect x="400" y="135" width="90" height="22" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
            <text x="445" y="150" textAnchor="middle" fontSize="10" fill="#14532d">JVM / Mac</text>
          </svg>
        </Diagram>

        <Accordion type="single" collapsible className="rounded-lg border px-4">
          <AccordionItem value="jvm-parts">
            <AccordionTrigger>JVM internals: Class Loader, Runtime Areas, Execution Engine</AccordionTrigger>
            <AccordionContent>
              <ul>
                <li>
                  <strong>Class Loader</strong> — three levels: Bootstrap (core Java classes from{" "}
                  <code>rt.jar</code>), Extension (ext directories), Application (user-defined
                  classes).
                </li>
                <li>
                  <strong>Runtime Data Areas</strong> — <em>Method Area / MetaSpace</em> (class
                  metadata); <em>Heap</em> (objects, managed by GC); <em>Stack</em> (local
                  variables, method frames per thread); <em>PC Register</em> (current instruction);{" "}
                  <em>Native Method Stack</em> (non-Java calls).
                </li>
                <li>
                  <strong>Execution Engine</strong> — <em>Interpreter</em> (bytecode line-by-line,
                  flexible but slower); <em>JIT Compiler</em> (compiles hot code paths to native
                  machine code for better performance); <em>Garbage Collector</em> (frees unused
                  objects automatically).
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="jre-jdk">
            <AccordionTrigger>JRE vs JDK — which do you need?</AccordionTrigger>
            <AccordionContent>
              <ul>
                <li>
                  <strong>JRE (Java Runtime Environment)</strong> — for <em>running</em> Java
                  applications. Contains: JVM + core class libraries + support files. Targeted at
                  end users.
                </li>
                <li>
                  <strong>JDK (Java Development Kit)</strong> — for <em>developing</em> Java
                  applications. Contains: JRE + compiler (<code>javac</code>) + debugger (
                  <code>jdb</code>) + jar tool + other development utilities. Targeted at developers.
                  If you write Java, install the JDK.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </LessonSection>

      {/* ─────────────────────────── Java essentials for CBSD ─────────────────────────── */}
      <LessonSection title="Java essentials for component-based systems" icon={Code}>
        <p>
          Coming from C#, the core OOP concepts are familiar — but several conventions and details
          differ and matter for the exam:
        </p>
        <ul>
          <li>
            <strong>Packages</strong> — Java's equivalent of C# namespaces. Convention:{" "}
            <strong>all lowercase with dot notation</strong>, typically following reverse-domain
            naming: <code>com.example.app</code>. C# uses PascalCase hierarchies (
            <code>Company.Project.Module</code>).
          </li>
          <li>
            <strong>Access modifiers</strong> — Java has <code>public</code>,{" "}
            <code>protected</code>, <strong>package-private</strong> (default — no keyword), and{" "}
            <code>private</code>. C# adds <code>internal</code>; Java uses package-private instead.
            Best practice: use the most restrictive modifier necessary; fields should be{" "}
            <code>private</code> with explicit getter/setter methods.
          </li>
          <li>
            <strong>Interfaces</strong> — PascalCase, <em>no</em> "I" prefix (Java uses{" "}
            <code>PaymentService</code>, not <code>IPaymentService</code>). Interfaces are central
            to component thinking: code to the interface, not the implementation.
          </li>
          <li>
            <strong>POJO / JavaBean</strong> — a Plain Old Java Object with private fields and
            explicit <code>getSomething()</code> / <code>setSomething()</code> getter-setter methods
            (unlike C#'s <code>{"{ get; set; }"}</code> auto-properties).
          </li>
          <li>
            <strong>Naming conventions summary</strong>: classes → PascalCase; methods &amp;
            variables → camelCase; constants → <code>UPPER_CASE_WITH_UNDERSCORES</code>; packages
            → lowercase dots; interfaces → PascalCase (no I prefix); exceptions → PascalCase +{" "}
            <code>Exception</code> suffix.
          </li>
        </ul>

        <Callout type="trap" title="Java interface naming vs C# — exam trap">
          In Java, <strong>interfaces do NOT use an "I" prefix</strong>. Write{" "}
          <code>interface PaymentService</code>, not <code>IPaymentService</code>. C# conventions
          prefix with "I"; Java does not. This distinction appears in MCQ option sets.
        </Callout>

        <Accordion type="single" collapsible className="rounded-lg border px-4">
          <AccordionItem value="access-table">
            <AccordionTrigger>Access modifier visibility — four levels in Java</AccordionTrigger>
            <AccordionContent>
              <ul>
                <li><strong>public</strong> — visible everywhere (same class, same package, subclasses, outside package).</li>
                <li><strong>protected</strong> — visible within the class, within the package, and to subclasses in other packages. Not visible to unrelated outside-package classes.</li>
                <li><strong>default (package-private, no modifier)</strong> — visible within the class and within the same package only. Subclasses in a different package cannot see it.</li>
                <li><strong>private</strong> — visible within the class only. Not accessible even from the same package.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="inheritance-java">
            <AccordionTrigger>Inheritance, interfaces, and abstract classes in Java</AccordionTrigger>
            <AccordionContent>
              <ul>
                <li>Java does <strong>not support multiple class inheritance</strong> — a class can extend only one class (same as C#).</li>
                <li>Multiple inheritance of <em>type/behaviour</em> is achieved through <strong>interfaces</strong> — a class can implement many interfaces simultaneously.</li>
                <li><strong>Abstract classes</strong> are partially implemented; use the <code>abstract</code> keyword; can mix abstract (unimplemented) and concrete (implemented) methods.</li>
                <li><strong>Interfaces</strong> (prior to Java 8) are fully abstract contracts. From Java 8+, they may include <code>default</code> and <code>static</code> methods.</li>
                <li>Method overriding uses the <code>@Override</code> annotation. To prevent overriding, mark a method <code>final</code>.</li>
                <li>Java has no <code>sealed</code> keyword for classes (unlike C#); apply <code>final</code> to a class to prevent any subclassing.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </LessonSection>

      {/* ─────────────────────────── Maven intro ─────────────────────────── */}
      <LessonSection title="What is Maven and why use it?" icon={Package}>
        <p>
          <strong>Apache Maven</strong> is a <strong>build automation and project management
          tool</strong> primarily used for Java projects. It addresses two growing pains as projects
          scale:
        </p>
        <ul>
          <li>
            <strong>Dependency management becomes messy</strong> — manually tracking library JARs,
            versions, and their transitive dependencies is error-prone and time-consuming.
          </li>
          <li>
            <strong>Build lifecycles need to be automated</strong> — repeatable, scripted builds
            that compile, test, package, and deploy in the correct order every time.
          </li>
        </ul>
        <p>
          Key benefits: centralised dependency management; standardised project structure;
          easy IDE integration (IntelliJ IDEA, Eclipse); automatic resolution of transitive
          dependencies; useful report and documentation generation.
        </p>
        <Callout type="info" title="Ecosystem comparison — every language has its equivalent">
          Java uses <strong>Maven / Gradle</strong> with <strong>Maven Central</strong>; JavaScript
          uses NPM with the NPM Registry; Python uses pip/Poetry with PyPI; .NET (C#) uses NuGet
          with the NuGet Gallery; Ruby uses Bundler with RubyGems. The pattern is always:
          dependency management tool + component repository.
        </Callout>
      </LessonSection>

      {/* ─────────────────────────── pom.xml & coordinates ─────────────────────────── */}
      <LessonSection title="The pom.xml — Maven's heart" icon={FileCode}>
        <p>
          Every Maven project has a <strong>pom.xml</strong> (Project Object Model) at its root.
          It is an XML file containing <strong>project coordinates</strong>, dependencies, build
          configuration, plugins, and repository references.
        </p>
        <p>
          The three <strong>Maven coordinates (GAV)</strong> uniquely identify any artifact in any
          repository:
        </p>
        <ul>
          <li>
            <strong><code>groupId</code></strong> — the group or organisation, usually a reversed
            domain name (e.g. <code>org.springframework</code>).
          </li>
          <li>
            <strong><code>artifactId</code></strong> — the unique name of this artifact within the
            group (e.g. <code>spring-core</code>).
          </li>
          <li>
            <strong><code>version</code></strong> — the release version (e.g. <code>5.3.9</code>).
            A <code>-SNAPSHOT</code> suffix indicates the artifact is still in active development.
          </li>
        </ul>
        <p>Other important pom.xml elements:</p>
        <ul>
          <li><code>{"<packaging>"}</code> — output format: <code>jar</code>, <code>war</code>, or <code>pom</code> (for parent/aggregator projects).</li>
          <li><code>{"<dependencies>"}</code> — lists dependencies by coordinates and scope.</li>
          <li><code>{"<build>"}</code> — plugin configuration for compilation and packaging.</li>
          <li><code>{"<repositories>"}</code> — custom remote repositories for dependency resolution.</li>
          <li><code>{"<dependencyManagement>"}</code> — in a parent POM, centralises version declarations for child modules without adding the dependency to the child's classpath directly.</li>
          <li><code>{"<modules>"}</code> — lists sub-modules in a multi-module project.</li>
        </ul>

        <Callout type="trap" title="SNAPSHOT vs release — a common MCQ distractor">
          A version ending in <code>-SNAPSHOT</code> (e.g. <code>1.0-SNAPSHOT</code>) is{" "}
          <strong>still in development</strong> and Maven may re-download it on every build. A
          release version (e.g. <code>1.0.0</code>) is immutable once published to Maven Central.
          Exams use this distinction as a distractor.
        </Callout>

        <Diagram caption="pom.xml key sections: coordinates identify the artifact; dependencies declare what is needed; build/plugins control how it is built.">
          <svg viewBox="0 0 510 220" width="510" height="220" role="img">
            {/* outer box */}
            <rect x="10" y="10" width="490" height="200" rx="8" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
            <text x="255" y="30" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e293b">pom.xml</text>
            {/* coordinates */}
            <rect x="25" y="40" width="210" height="85" rx="6" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="130" y="58" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1d4ed8">Maven Coordinates (GAV)</text>
            <text x="35" y="76" fontSize="10" fill="#1e293b">groupId: com.example</text>
            <text x="35" y="93" fontSize="10" fill="#1e293b">artifactId: my-app</text>
            <text x="35" y="110" fontSize="10" fill="#1e293b">version: 1.0-SNAPSHOT</text>
            <text x="35" y="120" fontSize="9" fill="#64748b">→ globally unique identifier</text>
            {/* dependencies */}
            <rect x="25" y="135" width="210" height="65" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
            <text x="130" y="153" textAnchor="middle" fontSize="11" fontWeight="700" fill="#166534">{"<dependencies>"}</text>
            <text x="35" y="170" fontSize="10" fill="#1e293b">scope: compile / test / provided</text>
            <text x="35" y="187" fontSize="9" fill="#64748b">transitive deps auto-resolved</text>
            {/* build */}
            <rect x="250" y="40" width="245" height="160" rx="6" fill="#fdf4ff" stroke="#a855f7" strokeWidth="1.5" />
            <text x="372" y="58" textAnchor="middle" fontSize="11" fontWeight="700" fill="#6b21a8">{"<build> & other sections"}</text>
            <text x="260" y="76" fontSize="10" fill="#1e293b">packaging: jar / war / pom</text>
            <text x="260" y="93" fontSize="10" fill="#1e293b">{"<repositories>"}: remote repos</text>
            <text x="260" y="110" fontSize="10" fill="#1e293b">{"<dependencyManagement>"}</text>
            <text x="260" y="124" fontSize="9" fill="#64748b">  centralises versions (parent POM)</text>
            <text x="260" y="141" fontSize="10" fill="#1e293b">{"<modules>"}: sub-module list</text>
            <text x="260" y="158" fontSize="10" fill="#1e293b">{"<profiles>"}: env-specific config</text>
            <text x="260" y="190" fontSize="9" fill="#64748b">{"<pluginRepositories>"}: plugin sources</text>
          </svg>
        </Diagram>

        <Accordion type="single" collapsible className="rounded-lg border px-4">
          <AccordionItem value="dep-scopes">
            <AccordionTrigger>Dependency scopes — compile, test, provided, runtime, system</AccordionTrigger>
            <AccordionContent>
              <ul>
                <li>
                  <strong>compile</strong> (default) — available at compile time, test time, and
                  runtime. Included in the packaged artifact.
                </li>
                <li>
                  <strong>test</strong> — only available during test compilation and execution. Not
                  included in the final artifact (e.g. JUnit, Mockito).
                </li>
                <li>
                  <strong>provided</strong> — available at compile time but <em>provided</em> by the
                  runtime environment (e.g. the Servlet API from an application server). Not packaged
                  in the artifact.
                </li>
                <li>
                  <strong>runtime</strong> — not needed at compile time but required at runtime (e.g.
                  a JDBC driver implementation). Not on the compilation classpath.
                </li>
                <li>
                  <strong>system</strong> — like provided, but you supply the JAR path explicitly via
                  <code>{"<systemPath>"}</code>. Not recommended for portable projects.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="transitive">
            <AccordionTrigger>Transitive dependencies — what they are and why they matter</AccordionTrigger>
            <AccordionContent>
              <p>
                If your project depends on Library A, and Library A depends on Library B, Maven
                automatically downloads Library B as a <strong>transitive dependency</strong> — you
                do not have to declare it yourself. This is one of Maven's biggest advantages over
                manually managing JARs. When two transitive paths bring in different versions of the
                same library, Maven uses the <strong>"nearest definition" rule</strong>: the version
                closest to the root of the dependency tree wins.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </LessonSection>

      {/* ─────────────────────────── Maven lifecycle & repos ─────────────────────────── */}
      <LessonSection title="Maven build lifecycle & repositories" icon={Cog}>
        <p>
          Maven defines three built-in lifecycles. The <strong>default lifecycle</strong> is the
          one examined — it covers the complete build process from validation to deployment:
        </p>
        <ul>
          <li><strong>validate</strong> — checks the project is correct and all required information is available.</li>
          <li><strong>compile</strong> — compiles the source code of the project.</li>
          <li><strong>test</strong> — runs unit tests using a testing framework (e.g. JUnit); does not require the app to be packaged first.</li>
          <li><strong>package</strong> — packages the compiled code into a distributable format (JAR, WAR, etc.).</li>
          <li><strong>verify</strong> — runs integration checks to verify the package is valid and meets quality criteria.</li>
          <li><strong>install</strong> — installs the package into the <strong>local repository</strong> (<code>~/.m2</code>) so other local projects can use it as a dependency.</li>
          <li><strong>deploy</strong> — copies the final package to a <strong>remote repository</strong> for sharing with other developers or CI systems.</li>
        </ul>
        <p>
          The other two lifecycles: <strong>clean</strong> (removes the <code>target/</code>{" "}
          build directory) and <strong>site</strong> (generates project documentation HTML).
        </p>

        <Callout type="trap" title="Phase ordering and cumulation — examined every year">
          Running <code>mvn package</code> <strong>automatically executes all prior phases</strong>:
          validate → compile → test → package. You never call individual phases one by one. Running{" "}
          <code>mvn install</code> runs all phases up through install. The phase{" "}
          <strong>verify</strong> sits <em>between package and install</em> — a commonly tested
          ordering detail.
        </Callout>

        <p className="mt-4"><strong>Maven repositories</strong> — three types:</p>
        <ul>
          <li>
            <strong>Local repository</strong> — a cache directory on your machine (default:{" "}
            <code>~/.m2/repository</code>). Maven checks here first before going online.
          </li>
          <li>
            <strong>Central repository (Maven Central)</strong> — the default public repository at
            mvnrepository.com. Searched automatically if the artifact is not in local cache.
          </li>
          <li>
            <strong>Remote repository</strong> — custom repositories hosted by your organisation or
            a third-party service (Nexus, Artifactory). Declared in <code>{"<repositories>"}</code>
            in pom.xml.
          </li>
        </ul>

        <Accordion type="single" collapsible className="rounded-lg border px-4">
          <AccordionItem value="archetypes-plugins">
            <AccordionTrigger>Maven archetypes, plugins, and goals</AccordionTrigger>
            <AccordionContent>
              <p>
                <strong>Archetypes</strong> are project templates. Common ones:{" "}
                <code>maven-archetype-quickstart</code> (simple Java app),{" "}
                <code>maven-archetype-webapp</code> (basic web app),{" "}
                <code>maven-archetype-j2ee-simple</code> (J2EE app). Generate with{" "}
                <code>mvn archetype:generate -DgroupId=... -DartifactId=... -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false</code>.
              </p>
              <p>
                <strong>Plugins</strong> extend Maven's capabilities. Each plugin provides one or
                more <strong>goals</strong> — individual tasks (e.g. <code>compiler:compile</code>,{" "}
                <code>surefire:test</code>, <code>jar:jar</code>). Lifecycle phases bind to plugin
                goals automatically. You can add the <code>exec-maven-plugin</code> to run a
                specific main class; add the <code>maven-assembly-plugin</code> to build fat JARs.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </LessonSection>

      {/* ─────────────────────────── Multi-module Maven ─────────────────────────── */}
      <LessonSection title="Multi-module Maven projects" icon={GitBranch}>
        <p>
          A <strong>multi-module project</strong> has a single parent Maven project that manages
          several sub-modules, each building its own JAR or WAR. The parent <code>pom.xml</code>{" "}
          uses <code>{"<packaging>pom</packaging>"}</code> and declares all child modules in a{" "}
          <code>{"<modules>"}</code> block. Each module has its own <code>pom.xml</code> that
          references the parent.
        </p>
        <p>
          The course's <strong>calculator example</strong> illustrates three layers every
          component-based Java system should have:
        </p>
        <ul>
          <li>
            <strong>calculator-core</strong> — encapsulates pure domain logic; standalone and
            dependency-free; can be reused in any other project without modification.
          </li>
          <li>
            <strong>calculator-service</strong> — exposes a service layer over the core; may add
            validation or additional business rules; acts as an intermediary between the core
            and external consumers.
          </li>
          <li>
            <strong>calculator-app</strong> — the application entry-point; consumes the service
            layer; manages user interaction (command-line interface or UI).
          </li>
        </ul>
        <p>Rationale for multi-module projects — directly maps to CBSE principles:</p>
        <ul>
          <li><strong>Encapsulation</strong> — each module is independent, reusable, and replaceable.</li>
          <li><strong>Separation of concerns</strong> — clear boundaries between domain, service, and application layers.</li>
          <li><strong>Dependency management</strong> — the parent <code>{"<dependencyManagement>"}</code> centralises version numbers for all modules, preventing version drift.</li>
          <li><strong>Dependency Inversion Principle</strong> — lower-level modules (services) must not depend on higher-level (application) modules.</li>
          <li><strong>Efficient builds</strong> — one <code>mvn install</code> at the root builds all modules in topological order.</li>
        </ul>
      </LessonSection>

      {/* ─────────────────────────── Component thinking in Java ─────────────────────────── */}
      <LessonSection title="Component thinking in Java — JARs, packages & interfaces" icon={Puzzle}>
        <p>
          In Java, a <strong>component is typically distributed as a JAR file</strong>. The JAR
          bundles compiled <code>.class</code> files and a package hierarchy into a single
          deployable unit. The <strong>package</strong> provides the namespace boundary and access
          control; <strong>interfaces</strong> provide the contractual boundary.
        </p>
        <p>
          The central principle is to{" "}
          <strong>program to interfaces, not to implementations</strong>:
        </p>
        <ul>
          <li>
            Define an interface (e.g. <code>AgeCalculatorIfce</code>) in its own JAR/module — this
            becomes the "provides" interface that other components depend upon.
          </li>
          <li>
            The concrete implementation class (<code>AgeCalculator</code>) lives in a separate JAR
            and <code>implements</code> the interface. The consumer only knows the interface.
          </li>
          <li>
            A <strong>glue module</strong> (or DI framework) wires the interface to a concrete
            implementation at runtime — this decouples consumers from producers and makes
            components replaceable.
          </li>
        </ul>

        <Callout type="info" title="Inheritance-based vs Component-based design (Asteroid game)">
          The slides contrast two designs for a game:{" "}
          <strong>Inheritance-based</strong> — one <code>GameObject</code> base class, subclassed
          into <code>Asteroid</code>, <code>Spaceship</code>, etc. Clear hierarchy but rigid and
          hard to adapt as requirements change.{" "}
          <strong>Component-based</strong> — a <code>GameObject</code> entity is a plain container;
          behaviour comes from assembling interchangeable components (
          <code>PositionComponent</code>, <code>VelocityComponent</code>,{" "}
          <code>CollisionComponent</code>, <code>HealthComponent</code>) dynamically. Highly
          flexible but more complex architecture. Component-based design embodies{" "}
          <em>composition over inheritance</em>.
        </Callout>

        <p>
          Two main approaches to <strong>automated component assembly</strong>:
        </p>
        <ul>
          <li>
            <strong>Dependency Injection (DI) component model</strong> — a framework (e.g. Spring)
            injects dependencies automatically using annotations or XML configuration; components
            do not look up their dependencies.
          </li>
          <li>
            <strong>Whiteboard / publish-and-consume model</strong> — components publish their
            interface implementations to a <em>Component Registry</em>; other components retrieve
            needed interfaces from the registry and consume them, without direct coupling to the
            implementation.
          </li>
        </ul>

        <Diagram caption="Programming to interfaces: the App depends only on the interface JAR; a Glue/DI module wires the concrete implementation at runtime — loose coupling achieved.">
          <svg viewBox="0 0 510 170" width="510" height="170" role="img">
            <defs>
              <marker id="arr7b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#64748b" />
              </marker>
            </defs>
            {/* Interface JAR (top centre) */}
            <rect x="180" y="8" width="150" height="52" rx="6" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
            <text x="255" y="29" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1d4ed8">CalculatorIfce.jar</text>
            <text x="255" y="48" textAnchor="middle" fontSize="10" fill="#1e293b">«interface» AgeCalculatorIfce</text>
            {/* Implementation JAR (bottom left) */}
            <rect x="10" y="100" width="150" height="55" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
            <text x="85" y="120" textAnchor="middle" fontSize="11" fontWeight="700" fill="#166534">AgeCalculator.jar</text>
            <text x="85" y="138" textAnchor="middle" fontSize="10" fill="#1e293b">class AgeCalculator</text>
            <text x="85" y="152" textAnchor="middle" fontSize="9" fill="#64748b">implements interface</text>
            {/* App JAR (bottom right) */}
            <rect x="350" y="100" width="150" height="55" rx="6" fill="#fdf4ff" stroke="#a855f7" strokeWidth="1.5" />
            <text x="425" y="120" textAnchor="middle" fontSize="11" fontWeight="700" fill="#6b21a8">CalculatorApp.jar</text>
            <text x="425" y="138" textAnchor="middle" fontSize="10" fill="#1e293b">AgeCalculatorApp</text>
            <text x="425" y="152" textAnchor="middle" fontSize="9" fill="#64748b">depends on interface only</text>
            {/* impl → interface (dashed) */}
            <line x1="85" y1="100" x2="215" y2="60" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#arr7b)" />
            {/* app → interface (dashed) */}
            <line x1="425" y1="100" x2="300" y2="60" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#arr7b)" />
            {/* Glue label */}
            <text x="255" y="92" textAnchor="middle" fontSize="10" fontWeight="700" fill="#b45309">Glue / DI wires at runtime</text>
            <line x1="160" y1="128" x2="350" y2="128" stroke="#b45309" strokeWidth="1.5" strokeDasharray="3 3" markerEnd="url(#arr7b)" />
          </svg>
        </Diagram>
      </LessonSection>

      {/* ─────────────────────────── Flashcards ─────────────────────────── */}
      <LessonSection title="Flashcards — quick recall">
        <FlashcardDeck
          cards={[
            {
              front: "Maven coordinates (GAV)",
              back: "groupId (organisation/domain), artifactId (unique project name), version. Together they uniquely identify any artifact in any Maven repository.",
            },
            {
              front: "pom.xml",
              back: "Project Object Model — XML file at the project root. Contains coordinates, dependencies, build config, plugins, and repository declarations.",
            },
            {
              front: "Maven default lifecycle phases (in order)",
              back: "validate → compile → test → package → verify → install → deploy. Running a later phase automatically runs all prior phases first.",
            },
            {
              front: "Dependency scope: provided",
              back: "Available at compile time but supplied by the runtime environment (e.g. Servlet API from an app server). NOT packaged in the final artifact.",
            },
            {
              front: "Transitive dependencies",
              back: "Dependencies of your dependencies. Maven resolves them automatically — you only declare direct dependencies and Maven fetches the rest.",
            },
            {
              front: "Local / Central / Remote repository",
              back: "Local: ~/.m2 cache on your machine (checked first). Central: Maven Central public repo. Remote: custom team/org repo declared in pom.xml.",
            },
            {
              front: "Java package naming vs C# namespace naming",
              back: "Java: all lowercase with dots, reverse-domain (com.example.app). C#: PascalCase with dots (Company.Project.Module).",
            },
            {
              front: "Programming to interfaces in Java",
              back: "Write code that depends on interface types, not concrete classes. Enables loose coupling, replaceability, and testability — the core of component thinking.",
            },
          ]}
        />
      </LessonSection>

      {/* ─────────────────────────── Mini quiz ─────────────────────────── */}
      <MiniQuiz questions={questions.slice(0, 6)} title="Quick check — Week 7" />
    </>
  );
}
