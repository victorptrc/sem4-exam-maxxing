import {
  Box,
  Boxes,
  GitBranch,
  Layers,
  Lock,
  Network,
  Package,
  Share2,
  ShieldCheck,
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
import questions from "../questions/week09";

export default function Week09() {
  return (
    <>
      <Callout type="key" title="Big picture">
        Week 9 covers the <strong>Java Platform Module System (JPMS)</strong> — introduced in Java 9
        as "Project Jigsaw" — and the <strong>Service Provider Interface (SPI)</strong> pattern that
        enables pluggable, loosely coupled architectures. Together they enforce{" "}
        <strong>strong encapsulation</strong>, <strong>reliable configuration</strong>, and make
        custom minimal runtimes possible via <code>jlink</code>.
      </Callout>

      {/* ─────────────────────────── SPI & Service Locator ─────────────────────────── */}
      <LessonSection title="Service Provider Interface (SPI) & Service Locator" icon={Share2}>
        <p>
          <strong>Service Provider Interface (SPI)</strong> is a mechanism that enables{" "}
          <strong>dynamic discovery and loading of service implementations at runtime</strong>. It
          defines a set of interfaces and classes that a provider must implement to plug into a
          framework or application — decoupling the interface from its implementation.
        </p>
        <ul>
          <li>
            <strong>ServiceLoader</strong> (Java 6+) is the built-in utility: it reads{" "}
            <code>META-INF/services/&lt;interface-name&gt;</code> files to find implementations and
            loads them dynamically — <em>without hardcoding dependencies</em>.
          </li>
          <li>
            With JPMS (Java 9+) the <code>META-INF/services</code> file is replaced by the{" "}
            <code>provides … with</code> and <code>uses</code> directives in{" "}
            <code>module-info.java</code>.
          </li>
        </ul>

        <Callout type="info" title="Why ServiceLoader?">
          <strong>Dynamic Service Discovery</strong> — load implementations without modifying core
          code. <strong>Loose Coupling</strong> — service definitions are separate from
          implementations. <strong>Pluggable Architectures</strong> — add new providers without
          changing existing code. No need for third-party DI frameworks.
        </Callout>

        <p className="mt-4">
          The <strong>Service Locator design pattern</strong> (a creational pattern) complements SPI:
          a central <code>ServiceLocator</code> object returns service instances on demand. Discovery
          strategies include:
        </p>
        <ul>
          <li><strong>Manual Registration</strong> — static registry of known implementations.</li>
          <li><strong>Reflection-Based Discovery</strong> — scans packages for implementors.</li>
          <li><strong>Java ServiceLoader (SPI)</strong> — reads provider configuration files.</li>
          <li><strong>Configuration-Based</strong> — loads from JSON, XML, or a database.</li>
        </ul>

        <Accordion type="single" collapsible className="rounded-lg border px-4">
          <AccordionItem value="serviceloader-limits">
            <AccordionTrigger>Limitations of ServiceLoader (exam trap)</AccordionTrigger>
            <AccordionContent>
              <ul>
                <li><strong>No exception for missing services</strong> — returns an empty iterator; always check <code>hasNext()</code>.</li>
                <li><strong>Performance issues</strong> — uses reflection and classpath scanning; cache loaded services.</li>
                <li><strong>No constructor injection</strong> — always calls the default constructor; use factory methods for complex deps.</li>
                <li><strong>Cannot load from external sources</strong> — only classpath-based discovery.</li>
                <li><strong>No DI support</strong> — cannot inject dependencies; use Spring or Guice for that.</li>
                <li><strong>No prioritization</strong> — loads services in random order; sort manually.</li>
                <li><strong>No unloading</strong> — services remain in memory once loaded.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="serviceloader-vs-jpms">
            <AccordionTrigger>ServiceLoader limitations → why component frameworks are needed</AccordionTrigger>
            <AccordionContent>
              <p>
                ServiceLoader has <strong>limited lifecycle management</strong> (no initialization /
                destruction hooks), <strong>no AOP support</strong> (cannot intercept method calls
                for logging, security, or transactions), and requires manual{" "}
                <code>META-INF/services</code> configuration. These gaps motivate full component
                frameworks like <strong>Spring</strong> (next week).
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </LessonSection>

      {/* ─────────────────────────── Why JPMS was needed ─────────────────────────── */}
      <LessonSection title="Problems before Java 9 — why JPMS was needed" icon={Layers}>
        <p>Before Java 9, four systemic problems plagued large Java applications:</p>
        <ul>
          <li>
            <strong>Classpath Hell / JAR Hell</strong> — if two JARs contained the same class or
            package, the classloader picked the <em>first one found</em>, causing unpredictable
            behavior. No versioning support on the classpath.
          </li>
          <li>
            <strong>No Encapsulation at JAR level</strong> — all <code>public</code> classes in any
            package were accessible to every other JAR, exposing internal implementation details
            even when not intended for external use.
          </li>
          <li>
            <strong>Large, Monolithic JDK</strong> — the JDK was one monolithic JAR; unused
            libraries (e.g. <code>java.sql</code> in a non-database app) could not be stripped.
            Embedded and cloud applications needed a smaller runtime.
          </li>
          <li>
            <strong>Difficult Dependency Management</strong> — libraries were unaware of their own
            dependencies; developers resolved them manually. No standard way to verify all required
            JARs were present — missing JARs only caused failures <em>at runtime</em>.
          </li>
        </ul>

        <Callout type="trap" title="Classpath vs Module path — the most-tested difference">
          On the <strong>classpath</strong>: all public classes are globally accessible, duplicate
          packages cause silent first-match resolution, and missing JARs fail only at runtime. On the{" "}
          <strong>module path</strong>: access is controlled by <code>exports</code>, split packages
          (same package in two modules) are <strong>forbidden</strong>, and missing required modules
          cause a <strong>startup-time error</strong> — not a runtime surprise.
        </Callout>

        <Diagram caption="Classpath (pre-Java 9) vs Module Path (Java 9+): encapsulation and dependency checking">
          <svg viewBox="0 0 520 210" width="520" height="210" role="img">
            <rect x="10" y="10" width="230" height="190" rx="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
            <text x="125" y="34" textAnchor="middle" fontWeight="700" fontSize="13" fill="#991b1b">Classpath (pre-Java 9)</text>
            <rect x="25" y="45" width="90" height="36" rx="4" fill="#fecaca" stroke="#dc2626" />
            <text x="70" y="68" textAnchor="middle" fontSize="11" fill="#7f1d1d">JAR A</text>
            <rect x="128" y="45" width="90" height="36" rx="4" fill="#fecaca" stroke="#dc2626" />
            <text x="173" y="68" textAnchor="middle" fontSize="11" fill="#7f1d1d">JAR B</text>
            <text x="125" y="106" textAnchor="middle" fontSize="10" fill="#b91c1c">All public classes visible</text>
            <text x="125" y="122" textAnchor="middle" fontSize="10" fill="#b91c1c">to everyone</text>
            <text x="125" y="144" textAnchor="middle" fontSize="10" fill="#b91c1c">Split packages: silent</text>
            <text x="125" y="160" textAnchor="middle" fontSize="10" fill="#b91c1c">first-match wins</text>
            <text x="125" y="188" textAnchor="middle" fontSize="10" fill="#b91c1c">Missing JAR: runtime crash</text>
            <rect x="280" y="10" width="230" height="190" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
            <text x="395" y="34" textAnchor="middle" fontWeight="700" fontSize="13" fill="#166534">Module Path (Java 9+)</text>
            <rect x="293" y="45" width="90" height="36" rx="4" fill="#bbf7d0" stroke="#16a34a" />
            <text x="338" y="62" textAnchor="middle" fontSize="11" fill="#14532d">Module A</text>
            <text x="338" y="75" textAnchor="middle" fontSize="9" fill="#166534">exports pkg.api</text>
            <rect x="397" y="45" width="90" height="36" rx="4" fill="#bbf7d0" stroke="#16a34a" />
            <text x="442" y="62" textAnchor="middle" fontSize="11" fill="#14532d">Module B</text>
            <text x="442" y="75" textAnchor="middle" fontSize="9" fill="#166534">requires A</text>
            <text x="395" y="106" textAnchor="middle" fontSize="10" fill="#15803d">Only exported packages</text>
            <text x="395" y="122" textAnchor="middle" fontSize="10" fill="#15803d">accessible</text>
            <text x="395" y="144" textAnchor="middle" fontSize="10" fill="#15803d">Split packages: forbidden</text>
            <text x="395" y="160" textAnchor="middle" fontSize="10" fill="#15803d">(startup error)</text>
            <text x="395" y="188" textAnchor="middle" fontSize="10" fill="#15803d">Missing module: startup error</text>
          </svg>
        </Diagram>
      </LessonSection>

      {/* ─────────────────────────── What is JPMS ─────────────────────────── */}
      <LessonSection title="What is JPMS? Three tenets of modularity" icon={Package}>
        <p>
          <strong>JPMS (Java Platform Module System)</strong>, introduced in <strong>Java 9</strong>{" "}
          under Project Jigsaw, is a framework designed to modularize Java applications and the JDK
          itself. A <strong>module</strong> is a higher-level aggregation unit above packages:
        </p>
        <pre className="text-sm bg-slate-100 dark:bg-slate-800 rounded p-3 mt-2 leading-relaxed">
          <code>{`my.module/
  ├─ module-info.java
  └─ com/example/mypackage/
       ├─ MyClass.java
       └─ AnotherClass.java`}</code>
        </pre>
        <p className="mt-4">JPMS enforces three tenets of modularity:</p>
        <ul>
          <li>
            <strong>Strong Encapsulation</strong> — only packages explicitly <code>exports</code>-ed
            are accessible to other modules.
          </li>
          <li>
            <strong>Well-Defined Interfaces</strong> — module boundaries are declared, not inferred.
          </li>
          <li>
            <strong>Explicit Dependencies</strong> — every required module is named with{" "}
            <code>requires</code>, checked at startup before any code runs.
          </li>
        </ul>

        <Callout type="info" title="Module vs Component (exam distinction)">
          <strong>Modules</strong> handle code organization and dependency management.{" "}
          <strong>Components</strong> focus on UI and behavior within an application. A module can
          contain multiple components, but a component is not necessarily a module. In Java: module
          = <code>module-info.java</code>; component = e.g. a Swing <code>JButton</code>.
        </Callout>
      </LessonSection>

      {/* ─────────────────────────── module-info.java directives ─────────────────────────── */}
      <LessonSection title="module-info.java — all directives explained" icon={ShieldCheck}>
        <p>
          Every named module <strong>must</strong> have a <code>module-info.java</code> at its root.
          It is a normal Java source file compiled into a <em>module descriptor</em>. All six
          directives together:
        </p>

        <pre className="text-sm bg-slate-900 text-slate-100 rounded-lg p-4 overflow-x-auto mt-3 leading-relaxed">
          <code>{`module com.example.app {

    // requires — compile + runtime dependency on another module
    requires java.sql;
    requires com.example.payment;

    // requires transitive — re-exports the dep to modules that
    // require THIS module (use when your public API exposes its types)
    requires transitive com.example.base;

    // exports — makes a package readable by ALL modules
    exports com.example.app.api;

    // exports … to — qualified export to specific modules only
    exports com.example.app.internal to com.example.plugin;

    // opens … to — runtime deep reflection (e.g. for Hibernate/Spring)
    opens com.example.app.model to com.example.framework;

    // uses — declares this module is a ServiceLoader consumer
    uses com.example.payment.PaymentService;

    // provides … with — registers this module as a service provider
    provides com.example.payment.PaymentService
        with com.example.app.impl.PayPalPaymentService;
}`}</code>
        </pre>

        <Accordion type="single" collapsible className="rounded-lg border px-4 mt-4">
          <AccordionItem value="requires-transitive">
            <AccordionTrigger>
              <code>requires</code> vs <code>requires transitive</code>
            </AccordionTrigger>
            <AccordionContent>
              <p>
                <code>requires X</code> — this module depends on X, but callers of this module do{" "}
                <em>not</em> automatically read X.
              </p>
              <p className="mt-2">
                <code>requires transitive X</code> — this module depends on X{" "}
                <strong>and</strong> any module that reads this module implicitly also reads X. Use
                when your public API returns or accepts types defined in X, so callers do not need
                to repeat the <code>requires</code>.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="exports-to">
            <AccordionTrigger>
              <code>exports</code> vs <code>exports … to</code> (qualified exports)
            </AccordionTrigger>
            <AccordionContent>
              <p>
                <code>exports pkg</code> — makes the package readable by <em>all</em> modules on
                the module path.
              </p>
              <p className="mt-2">
                <code>exports pkg to com.example.trusted</code> — a{" "}
                <strong>qualified export</strong>: only the named module(s) can read this package.
                Used to share internals between sibling modules while hiding them from the outside
                world.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="opens-directive">
            <AccordionTrigger>
              <code>opens</code> — reflection access vs <code>exports</code>
            </AccordionTrigger>
            <AccordionContent>
              <p>
                <code>exports pkg</code> gives compile-time and runtime access to{" "}
                <strong>public types only</strong>.
              </p>
              <p className="mt-2">
                <code>opens pkg</code> (or <code>opens pkg to module</code>) grants runtime-only{" "}
                <strong>deep reflection</strong> — including private fields and methods — without
                exposing them for normal compile-time use. Required by frameworks like Hibernate,
                Jackson, and Spring that inspect object internals via reflection.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="uses-provides">
            <AccordionTrigger>
              <code>uses</code> and <code>provides … with</code> — JPMS service binding
            </AccordionTrigger>
            <AccordionContent>
              <p>
                <code>uses com.example.Svc</code> — declares this module is a{" "}
                <strong>consumer</strong>; the JVM makes any providers available via{" "}
                <code>ServiceLoader.load(Svc.class)</code>.
              </p>
              <p className="mt-2">
                <code>provides com.example.Svc with com.example.impl.SvcImpl</code> — declares this
                module is a <strong>provider</strong>. Replaces the old{" "}
                <code>META-INF/services</code> file entirely, so no manual registration is needed.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Callout type="trap" title="Strong encapsulation: public ≠ accessible across modules">
          A <code>public</code> class in a <strong>non-exported package</strong> is inaccessible to
          other modules even though it is <code>public</code> in Java terms. The modifier{" "}
          <code>public</code> alone no longer guarantees cross-module accessibility — you must also{" "}
          <code>exports</code> the package containing it. This is the single most-tested trap in
          JPMS questions.
        </Callout>
      </LessonSection>

      {/* ─────────────────────────── Named / Automatic / Unnamed ─────────────────────────── */}
      <LessonSection title="Named, Automatic, and Unnamed modules" icon={GitBranch}>
        <p>JPMS defines three module types to aid gradual migration of legacy code:</p>
        <ul>
          <li>
            <strong>Named module</strong> — has a <code>module-info.java</code>; placed on the
            module path; full JPMS rules apply (encapsulation + explicit deps).
          </li>
          <li>
            <strong>Automatic module</strong> — a regular JAR placed on the <em>module path</em>{" "}
            without a <code>module-info.java</code>. JPMS derives a module name from the JAR
            filename. It <strong>exports all its packages</strong> and{" "}
            <strong>reads every other module</strong> — a bridge for third-party libraries not yet
            migrated to JPMS.
          </li>
          <li>
            <strong>Unnamed module</strong> — everything on the <em>classpath</em>. Can read all
            named and automatic modules, but <strong>no named module can require it</strong>. This
            preserves classpath backward-compatibility.
          </li>
        </ul>

        <Diagram caption="Module graph: named modules with explicit requires arrows, and an automatic module bridging a legacy JAR">
          <svg viewBox="0 0 520 230" width="520" height="230" role="img">
            <defs>
              <marker id="arr9" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L0,6 L8,3 z" fill="#0284c7" />
              </marker>
            </defs>
            {/* com.example.app */}
            <rect x="170" y="10" width="180" height="52" rx="6" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
            <text x="260" y="32" textAnchor="middle" fontWeight="700" fontSize="12" fill="#0c4a6e">com.example.app</text>
            <text x="260" y="50" textAnchor="middle" fontSize="10" fill="#0369a1">Named module</text>
            {/* com.example.payment */}
            <rect x="20" y="130" width="180" height="52" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
            <text x="110" y="152" textAnchor="middle" fontWeight="700" fontSize="12" fill="#14532d">com.example.payment</text>
            <text x="110" y="170" textAnchor="middle" fontSize="10" fill="#166534">Named module</text>
            {/* legacy-util (automatic) */}
            <rect x="320" y="130" width="180" height="52" rx="6" fill="#fefce8" stroke="#ca8a04" strokeWidth="2" strokeDasharray="6 3" />
            <text x="410" y="152" textAnchor="middle" fontWeight="700" fontSize="12" fill="#713f12">legacy-util.jar</text>
            <text x="410" y="170" textAnchor="middle" fontSize="10" fill="#92400e">Automatic module</text>
            {/* java.sql */}
            <rect x="170" y="185" width="180" height="40" rx="6" fill="#f5f3ff" stroke="#8b5cf6" strokeWidth="2" />
            <text x="260" y="202" textAnchor="middle" fontWeight="700" fontSize="12" fill="#5b21b6">java.sql</text>
            <text x="260" y="218" textAnchor="middle" fontSize="10" fill="#6d28d9">JDK named module</text>
            {/* app -> payment */}
            <line x1="215" y1="62" x2="155" y2="130" stroke="#0284c7" strokeWidth="1.8" markerEnd="url(#arr9)" />
            <text x="168" y="102" fontSize="9" fill="#0284c7" textAnchor="middle">requires</text>
            {/* app -> legacy */}
            <line x1="305" y1="62" x2="365" y2="130" stroke="#0284c7" strokeWidth="1.8" markerEnd="url(#arr9)" />
            <text x="352" y="102" fontSize="9" fill="#0284c7" textAnchor="middle">requires</text>
            {/* app -> java.sql */}
            <line x1="260" y1="62" x2="260" y2="185" stroke="#0284c7" strokeWidth="1.8" markerEnd="url(#arr9)" />
            <text x="278" y="130" fontSize="9" fill="#0284c7">requires</text>
          </svg>
        </Diagram>
      </LessonSection>

      {/* ─────────────────────────── jlink & Modular JDK ─────────────────────────── */}
      <LessonSection title="Modular JDK & jlink — smaller custom runtimes" icon={Box}>
        <p>
          The JDK itself is now split into named modules (e.g. <code>java.base</code>,{" "}
          <code>java.sql</code>, <code>java.logging</code>, <code>java.desktop</code>). Run{" "}
          <code>java --list-modules</code> to inspect them all.
        </p>
        <p className="mt-3">
          <strong>jlink</strong> assembles a <strong>custom minimal JRE</strong> containing only the
          modules your application actually needs:
        </p>
        <pre className="text-sm bg-slate-900 text-slate-100 rounded-lg p-4 overflow-x-auto mt-2 leading-relaxed">
          <code>{`jlink --module-path $JAVA_HOME/jmods \\
      --add-modules java.base,java.logging,java.rmi \\
      --output my-custom-jdk`}</code>
        </pre>
        <p className="mt-3">
          The output is a self-contained runtime image with only those modules, dramatically reducing
          size for embedded and cloud deployments.
        </p>

        <Callout type="info" title="JPMS benefits — exam checklist">
          <ul>
            <li><strong>Modularity</strong> — break large apps into named, manageable modules.</li>
            <li><strong>Strong Encapsulation</strong> — only <code>exports</code>-ed packages are accessible.</li>
            <li><strong>Reliable Configuration</strong> — missing or duplicate modules fail at <em>startup</em>, not at runtime.</li>
            <li><strong>Better Dependency Management</strong> — explicit <code>requires</code> declarations.</li>
            <li><strong>Smaller Runtime</strong> — use <code>jlink</code> to ship only needed modules.</li>
            <li><strong>Compile-time Dependency Checks</strong> — verifies required modules exist before any code runs.</li>
          </ul>
        </Callout>

        <Accordion type="single" collapsible className="rounded-lg border px-4 mt-2">
          <AccordionItem value="module-vs-component">
            <AccordionTrigger>Module vs Component — how they differ</AccordionTrigger>
            <AccordionContent>
              <ul>
                <li>
                  <strong>Modules</strong> handle <em>code organization and dependency management</em>
                  — they are a JVM/build-time construct.
                </li>
                <li>
                  <strong>Components</strong> focus on <em>UI and runtime behavior within an
                  application</em> — they are a design/architectural construct.
                </li>
                <li>
                  A module can contain multiple components, but a component is <em>not</em>{" "}
                  necessarily a module.
                </li>
                <li>
                  Java: module = <code>module-info.java</code>; component = e.g. Swing{" "}
                  <code>JButton</code>. JavaScript: module = ES module (<code>import/export</code>);
                  component = React or Angular <code>@Component</code>.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </LessonSection>

      {/* ─────────────────────────── Flashcards ─────────────────────────── */}
      <LessonSection title="Flashcards — quick recall">
        <FlashcardDeck
          cards={[
            {
              front: "What is JPMS and when was it introduced?",
              back: "Java Platform Module System (Project Jigsaw), introduced in Java 9. Modularizes Java applications and the JDK itself, enforcing strong encapsulation and explicit dependencies.",
            },
            {
              front: "What does module-info.java declare?",
              back: "Module name + all directives: requires (dependencies), exports (public packages), opens (reflection), uses (service consumers), provides…with (service providers).",
            },
            {
              front: "requires vs requires transitive",
              back: "requires X: this module needs X. requires transitive X: this module needs X AND any module requiring this module also reads X implicitly — use when your API exposes types from X.",
            },
            {
              front: "exports vs opens",
              back: "exports pkg: compile + runtime access to public types. opens pkg: runtime-only deep reflection (including private members) — for frameworks like Hibernate or Spring.",
            },
            {
              front: "Named / Automatic / Unnamed module",
              back: "Named: has module-info.java on module path. Automatic: regular JAR on module path without module-info — exports all, reads all. Unnamed: everything on the classpath — backward-compatible.",
            },
            {
              front: "uses and provides…with in JPMS",
              back: "uses Svc: this module consumes the service via ServiceLoader. provides Svc with Impl: this module is a provider. Replaces META-INF/services registration.",
            },
            {
              front: "What is Classpath Hell / JAR Hell?",
              back: "Two JARs contain the same class/package: classloader silently picks the first one found → unpredictable behavior. No versioning on classpath. JPMS forbids split packages entirely.",
            },
            {
              front: "What does jlink do?",
              back: "jlink assembles a custom minimal JRE containing only the modules your application requires, reducing deployment size for cloud and embedded environments.",
            },
          ]}
        />
      </LessonSection>

      {/* ─────────────────────────── Mini quiz ─────────────────────────── */}
      <MiniQuiz questions={questions.slice(0, 6)} title="Quick check — Week 9" />
    </>
  );
}
