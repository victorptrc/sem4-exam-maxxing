import {
  Boxes,
  GitCompareArrows,
  Layers,
  Link2,
  Network,
  Puzzle,
  Unlink,
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
import questions from "../questions/week08";

export default function Week08() {
  return (
    <>
      <Callout type="key" title="Big picture">
        Week 8 is the most exam-heavy week on <strong>design quality</strong>. The central message is
        simple but always tested: <strong>high cohesion + low coupling</strong> is the goal. The
        lecture works through two concrete case studies — the Virtual Store and the POS system — to
        show exactly how tight coupling causes pain and how componentization solves it.
      </Callout>

      {/* ─────────────────────────── Tight vs Loose Coupling ─────────────────────────── */}
      <LessonSection title="Tight coupling — what it is and why it hurts" icon={Unlink}>
        <p>
          <strong>Tight coupling</strong> refers to a scenario where{" "}
          <strong>one class is heavily dependent on the internal details of another class</strong>.
          The result: the system becomes less flexible, harder to maintain, and difficult to modify
          or test.
        </p>
        <p>
          The classic code smell is a class that <em>instantiates</em> its dependency directly
          inside its constructor:
        </p>
        <pre className="rounded-md bg-slate-100 p-3 text-sm overflow-x-auto dark:bg-slate-800">
          {`class OrderService:
    def __init__(self):
        self.payment = PaymentService()   # ← tight coupling`}
        </pre>
        <p className="mt-3">
          If <code>PaymentService</code> changes, <code>OrderService</code> must change too. To
          break this, depend on an <strong>abstraction</strong> and inject the concrete
          implementation from outside:
        </p>
        <pre className="rounded-md bg-slate-100 p-3 text-sm overflow-x-auto dark:bg-slate-800">
          {`class OrderService:
    def __init__(self, payment_service: IPaymentService):
        self.payment = payment_service   # ← loose coupling (DI)`}
        </pre>

        <Callout type="info" title="Dependency depth — the coupling metric">
          <p>
            Coupling is measured by <strong>dependency depth</strong>:
          </p>
          <ul>
            <li>A class with <strong>no dependencies</strong> has depth <strong>0</strong>.</li>
            <li>A class depending only on depth-0 classes has depth <strong>1</strong>.</li>
            <li>A class depending on depth-1 classes has depth <strong>2</strong>. And so on.</li>
          </ul>
          <p>
            <strong>Higher dependency depth = tighter coupling.</strong> In the monolithic Virtual
            Store, the Store class (depends on Inventory, ShoppingCart, Product, and UI) has
            depth <strong>2</strong>. The UI class also has depth 2. Any change to ShoppingCart
            forces recompilation of Store, which then forces recompilation of UI.
          </p>
        </Callout>

        <Diagram caption="Dependency depth in the monolithic Virtual Store. Product = 0; Inventory/ShoppingCart = 1; Store/UI = 2.">
          <svg viewBox="0 0 520 210" width="520" height="210" role="img">
            {/* Product */}
            <rect x="200" y="160" width="120" height="36" rx="5" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
            <text x="260" y="183" textAnchor="middle" fontSize="12" fontWeight="700" fill="#78350f">Product  [0]</text>
            {/* Inventory */}
            <rect x="30" y="95" width="130" height="36" rx="5" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
            <text x="95" y="118" textAnchor="middle" fontSize="12" fontWeight="700" fill="#4c1d95">Inventory  [1]</text>
            {/* ShoppingCart */}
            <rect x="360" y="95" width="130" height="36" rx="5" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
            <text x="425" y="118" textAnchor="middle" fontSize="12" fontWeight="700" fill="#4c1d95">ShoppingCart [1]</text>
            {/* Store */}
            <rect x="150" y="30" width="100" height="36" rx="5" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
            <text x="200" y="53" textAnchor="middle" fontSize="12" fontWeight="700" fill="#991b1b">Store  [2]</text>
            {/* UI */}
            <rect x="270" y="30" width="100" height="36" rx="5" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
            <text x="320" y="53" textAnchor="middle" fontSize="12" fontWeight="700" fill="#991b1b">UI  [2]</text>
            {/* Arrows */}
            <line x1="95" y1="131" x2="230" y2="160" stroke="#7c3aed" strokeWidth="1.5" markerEnd="url(#arr)" />
            <line x1="425" y1="131" x2="290" y2="160" stroke="#7c3aed" strokeWidth="1.5" markerEnd="url(#arr)" />
            <line x1="200" y1="66" x2="120" y2="95" stroke="#dc2626" strokeWidth="1.5" markerEnd="url(#arr)" />
            <line x1="210" y1="66" x2="240" y2="160" stroke="#dc2626" strokeWidth="1.5" markerEnd="url(#arr)" />
            <line x1="230" y1="66" x2="380" y2="95" stroke="#dc2626" strokeWidth="1.5" markerEnd="url(#arr)" />
            <line x1="320" y1="66" x2="280" y2="160" stroke="#dc2626" strokeWidth="1.5" markerEnd="url(#arr)" />
            <defs>
              <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#64748b" />
              </marker>
            </defs>
          </svg>
        </Diagram>
      </LessonSection>

      {/* ─────────────────────────── Componentizing the Virtual Store ─────────────────────────── */}
      <LessonSection title="Componentizing the Virtual Store — 5 rules" icon={Puzzle}>
        <p>
          The monolithic Virtual Store has <strong>UI, Store, ShoppingCart, Inventory,</strong> and{" "}
          <strong>Product</strong> classes all tightly coupled. To add a 25% Christmas discount,
          three classes must be changed and recompiled in cascade — the defining symptom of tight
          coupling.
        </p>
        <p>
          The lecture gives <strong>five rules</strong> for effective componentization:
        </p>
        <ol className="list-decimal pl-6 space-y-1">
          <li>
            <strong>Entity classes as a shared Common Component.</strong> <code>Product</code> is a
            data-carrying object, not a component. Package it in a <strong>Base Library</strong>{" "}
            shared by all.
          </li>
          <li>
            <strong>Group business classes into separate components.</strong> The{" "}
            <code>Inventory</code> class becomes the <em>Inventory Component</em>; the{" "}
            <code>ShoppingCart</code> class becomes the <em>Shopping Cart Component</em>.
          </li>
          <li>
            <strong>Expose business functionality through provided interfaces.</strong> Only the{" "}
            interface (<code>InventoryService</code>, <code>ShoppingCartService</code>) is visible
            from outside the component boundary. Concrete classes are hidden.
          </li>
          <li>
            <strong>Group mutually dependent application classes into an Application
            Component.</strong> <code>UI</code> and <code>Store</code> are mutually dependent; they
            form an Application Component that <em>consumes</em> services but provides none.
          </li>
          <li>
            <strong>Include service interfaces and entities in the Base Library.</strong> Both{" "}
            <code>InventoryService</code> and <code>ShoppingCartService</code> interface definitions
            join <code>Product</code> in the Base Library.
          </li>
        </ol>

        <Callout type="trap" title="Exam trap: which component provides what?">
          The Application Component provides <strong>no</strong> interface — it only consumes.
          Inventory Component provides <code>InventoryService</code>. Shopping Cart Component
          provides <code>ShoppingCartService</code>. The Base Library provides the contract
          definitions. Getting these reversed is a frequent MCQ error.
        </Callout>

        <Diagram caption="Component-based Virtual Store. Application Component consumes two interfaces; both business components depend only on the stable Base Library.">
          <svg viewBox="0 0 500 260" width="500" height="260" role="img">
            {/* Application Component */}
            <rect x="170" y="10" width="160" height="55" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
            <text x="250" y="30" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">Application Component</text>
            <text x="250" y="47" textAnchor="middle" fontSize="10" fill="#1e3a8a">Store + UI</text>
            {/* Inventory Component */}
            <rect x="20" y="130" width="145" height="50" rx="6" fill="#d1fae5" stroke="#059669" strokeWidth="2" />
            <text x="92" y="150" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">Inventory Component</text>
            <text x="92" y="168" textAnchor="middle" fontSize="10" fill="#064e3b">provides InventoryService</text>
            {/* Shopping Cart Component */}
            <rect x="335" y="130" width="145" height="50" rx="6" fill="#d1fae5" stroke="#059669" strokeWidth="2" />
            <text x="407" y="150" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">ShoppingCart Comp.</text>
            <text x="407" y="168" textAnchor="middle" fontSize="10" fill="#064e3b">provides ShoppingCartSvc</text>
            {/* Base Library */}
            <rect x="160" y="205" width="180" height="45" rx="6" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
            <text x="250" y="225" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">Base Library</text>
            <text x="250" y="241" textAnchor="middle" fontSize="10" fill="#78350f">Product + interfaces</text>
            {/* App → Inventory interface */}
            <line x1="200" y1="65" x2="130" y2="130" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="5,3" />
            <text x="145" y="103" fontSize="9" fill="#1e40af">InventoryService</text>
            {/* App → ShoppingCart interface */}
            <line x1="300" y1="65" x2="370" y2="130" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="5,3" />
            <text x="305" y="103" fontSize="9" fill="#1e40af">ShoppingCartSvc</text>
            {/* Inventory → Base */}
            <line x1="92" y1="180" x2="200" y2="205" stroke="#059669" strokeWidth="1.5" strokeDasharray="4,3" />
            {/* ShoppingCart → Base */}
            <line x1="407" y1="180" x2="300" y2="205" stroke="#059669" strokeWidth="1.5" strokeDasharray="4,3" />
            {/* App → Base */}
            <line x1="250" y1="65" x2="250" y2="205" stroke="#d97706" strokeWidth="1.5" strokeDasharray="4,3" />
          </svg>
        </Diagram>

        <Accordion type="single" collapsible className="rounded-lg border px-4">
          <AccordionItem value="discount-example">
            <AccordionTrigger>How the 10% discount is handled in the component model</AccordionTrigger>
            <AccordionContent>
              <p>
                The <code>PromotionalShoppingCart</code> class implements{" "}
                <code>ShoppingCartService</code> and overrides <code>getPrice()</code> to{" "}
                <code>return 0.9 * totalPrice</code>. It is packaged as a new{" "}
                <strong>Promotional Shopping Cart Component</strong>.
              </p>
              <p>
                To activate the discount, swap the Shopping Cart Component with the Promotional one
                in the assembly — the Application Component does not change at all because it only
                knows <code>ShoppingCartService</code>, not the concrete class.
              </p>
              <p>
                At the end of the sale period, swap back to the original component. No recompilation
                of any other component is required either time.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="build-vs-runtime">
            <AccordionTrigger>Build-time vs run-time dependency depth (exam numbers)</AccordionTrigger>
            <AccordionContent>
              <p>Build-time depths (component/library level):</p>
              <ul>
                <li><strong>Base Library</strong> — depth 0 (no dependencies)</li>
                <li><strong>Inventory Component</strong> — depth 1 (depends on Base Library)</li>
                <li><strong>Shopping Cart Component</strong> — depth 1</li>
                <li><strong>Application Component</strong> — depth 1 (build-time: only Base Library)</li>
              </ul>
              <p className="mt-2">Run-time depths:</p>
              <ul>
                <li><strong>Base Library</strong> — 0</li>
                <li><strong>Inventory / Shopping Cart Components</strong> — 1</li>
                <li>
                  <strong>Application Component</strong> — <strong>2</strong> (at runtime it also
                  pulls in Inventory Component and Shopping Cart Component, each of which depends on
                  the Base Library)
                </li>
              </ul>
              <p className="mt-2">
                Compare to the monolith where Store and UI had depth 2 even at build time.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </LessonSection>

      {/* ─────────────────────────── Componentizing a Layered Architecture ─────────────────────────── */}
      <LessonSection title="Componentizing a layered architecture — POS case" icon={Layers}>
        <p>
          The <strong>Restaurant POS</strong> application uses a classic three-layer architecture
          (Presentation → Business → Data) supported by the MVC pattern. Layers are{" "}
          <strong>logical, not physical</strong> — everything compiles into one unit, so any
          functional change forces a full recompile and redeploy.
        </p>
        <p>
          Example: adding a 15% gratuity for groups of 8+ requires changes to{" "}
          <strong>BillBiz</strong> (business), <strong>Bill</strong> (model), <strong>BillDAO</strong>{" "}
          (data), and <strong>PayBillUI</strong> (presentation). All three layers are touched;
          everything must be recompiled.
        </p>
        <p>
          The solution is to componentize <strong>within</strong> the layered design by grouping
          cohesive classes across layers into components:
        </p>
        <ul>
          <li>
            <strong>Business components</strong> (e.g. BillBiz, FoodBiz, OrderBiz, TableBiz) — each
            groups a business object <em>and</em> its DAO (spanning Business + Data layers).
          </li>
          <li>
            <strong>UI components</strong> (e.g. GuestUI, AdminUI, OrderUI, BillUI) — each groups
            the View and Controller objects for a specific use-case cluster (Presentation layer).
          </li>
        </ul>

        <Callout type="info" title="Mapping layers to components — POS table (exam ready)">
          <ul>
            <li><strong>GuestUI</strong> — CheckInUI, CheckOutUI, CheckInCtrlr, CheckOutCtrlr (Presentation)</li>
            <li><strong>AdminUI</strong> — AdminUI, FoodAdminUI, TableAdminUI, FoodAdminCtrlr, TableAdminCtrlr (Presentation)</li>
            <li><strong>BillBiz</strong> — BillBiz, BillDAO (Business &amp; Data)</li>
            <li><strong>FoodBiz</strong> — FoodBiz, FoodDAO (Business &amp; Data)</li>
            <li><strong>OrderBiz</strong> — OrderBiz, OrderDAO (Business &amp; Data)</li>
            <li><strong>TableBiz</strong> — TableBiz, TableDAO (Business &amp; Data)</li>
          </ul>
        </Callout>

        <p>
          With this component design, adding gratuity means creating a new{" "}
          <strong>BillGratuity</strong> component that replaces the original BillBiz component.
          Because both implement the same service interface, only the Bill-related component changes
          — GuestUI, OrderUI, FoodBiz, TableBiz etc. are untouched.
        </p>
      </LessonSection>

      {/* ─────────────────────────── Java Components ─────────────────────────── */}
      <LessonSection title="Component thinking in Java: JARs, interfaces, and assembly" icon={Boxes}>
        <p>
          In Java, a component is physically packaged as a <strong>JAR file</strong> containing one
          or more packages. The AgeCalculator example walks through three stages of increasing
          decoupling:
        </p>
        <ol className="list-decimal pl-6 space-y-1">
          <li>
            <strong>Stage 1 — single JAR.</strong> <code>AgeCalculatorApp</code> directly
            instantiates <code>AgeCalculator</code> in the same JAR. Tight coupling — changing the
            calculator class forces recompilation of the app.
          </li>
          <li>
            <strong>Stage 2 — two JARs + interface JAR.</strong> The interface{" "}
            <code>AgeCalculatorIfce</code> is extracted into its own JAR. App and Calculator both
            depend on the stable interface JAR — breaking build-time tight coupling.
          </li>
          <li>
            <strong>Stage 3 — Glue JAR.</strong> A separate <code>AgeCalculatorGlue</code> JAR
            instantiates the concrete calculator and injects it into the app via{" "}
            <code>setAgeCalculator()</code>. This breaks the <em>runtime</em> dependency — App
            never references the Calculator class directly.
          </li>
        </ol>

        <Accordion type="single" collapsible className="rounded-lg border px-4">
          <AccordionItem value="di-vs-sl">
            <AccordionTrigger>Dependency Injection vs Service Locator</AccordionTrigger>
            <AccordionContent>
              <ul>
                <li>
                  <strong>Dependency Injection (DI / Inversion of Control):</strong> an external
                  Assembler <em>pushes</em> the dependency into the component — the component is
                  passive. Example: Spring Framework wires beans automatically.
                </li>
                <li>
                  <strong>Service Locator:</strong> the component <em>pulls</em> its dependency by
                  querying a central registry. Example: <code>ServiceLocator.get(AgeCalculatorIfce.class)</code>.
                </li>
              </ul>
              <p className="mt-2">
                Both break direct instantiation, but DI is preferred because components do not need
                to know about the registry at all.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="whiteboard">
            <AccordionTrigger>Whiteboard vs Dependency Injection component models</AccordionTrigger>
            <AccordionContent>
              <ul>
                <li>
                  <strong>DI-based model:</strong> the framework (Assembler/container) knows which
                  concrete class to inject. Components declare what they need; the container wires
                  them.
                </li>
                <li>
                  <strong>Whiteboard (publish-and-consume) model:</strong> Component A{" "}
                  <em>publishes</em> Interface X to a <strong>Component Registry</strong>; Component
                  B <em>retrieves</em> Interface X from the registry. Components only know the
                  interface, not each other. OSGi uses this model.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </LessonSection>

      {/* ─────────────────────────── UML Component Diagrams ─────────────────────────── */}
      <LessonSection title="UML 2.0 Component Diagrams" icon={Network}>
        <p>
          UML 2.0 provides dedicated notation for component-based designs. Key elements to know for
          the exam:
        </p>
        <ul>
          <li>
            <strong>Provided interface</strong> — drawn as a <em>lollipop</em> (filled circle) on
            the component boundary, connected by a realization arrow.
          </li>
          <li>
            <strong>Required interface</strong> — drawn as a <em>socket</em> (half-circle) on the
            component boundary, connected by a dependency arrow.
          </li>
          <li>
            <strong>Assembly connector</strong> — links a socket (required) of one component to the
            lollipop (provided) of another, showing that the interfaces are compatible.
          </li>
          <li>
            <strong>Ports</strong> — named interaction points on the component boundary specifying
            which services are provided or required at that port.
          </li>
          <li>
            <strong>Delegation connectors</strong> — link an external port to the internal class or
            sub-component that actually handles the interaction.
          </li>
          <li>
            <strong>Realization</strong> — the relationship between a component and the internal
            classes/sub-components that implement its functionality.
          </li>
        </ul>

        <Diagram caption="UML component diagram: LanguageTranslator requires LanguageIn (socket) and provides LanguageOut (lollipop). Assembly connectors link it to neighbouring components.">
          <svg viewBox="0 0 500 160" width="500" height="160" role="img">
            {/* Left component */}
            <rect x="10" y="55" width="100" height="50" rx="5" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5" />
            <text x="60" y="85" textAnchor="middle" fontSize="10" fill="#334155">«Component»</text>
            <text x="60" y="100" textAnchor="middle" fontSize="10" fontWeight="700" fill="#334155">Source</text>
            {/* Lollipop from Source */}
            <line x1="110" y1="80" x2="135" y2="80" stroke="#64748b" strokeWidth="1.5" />
            <circle cx="138" cy="80" r="5" fill="#475569" />
            {/* Assembly connector */}
            <line x1="143" y1="80" x2="158" y2="80" stroke="#64748b" strokeWidth="1" strokeDasharray="3,2" />
            {/* Socket into LanguageTranslator */}
            <path d="M163,73 A7,7 0 0,0 163,87" fill="none" stroke="#475569" strokeWidth="2" />
            <line x1="163" y1="80" x2="175" y2="80" stroke="#64748b" strokeWidth="1.5" />
            {/* LanguageTranslator */}
            <rect x="175" y="45" width="150" height="70" rx="5" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
            <text x="250" y="70" textAnchor="middle" fontSize="10" fill="#1e40af">«Component»</text>
            <text x="250" y="85" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e3a8a">LanguageTranslator</text>
            <text x="250" y="102" textAnchor="middle" fontSize="9" fill="#3b82f6">LanguageIn (req) → LanguageOut (prov)</text>
            {/* Lollipop from LanguageTranslator */}
            <line x1="325" y1="80" x2="348" y2="80" stroke="#64748b" strokeWidth="1.5" />
            <circle cx="352" cy="80" r="7" fill="#16a34a" />
            {/* Assembly connector to right */}
            <line x1="359" y1="80" x2="375" y2="80" stroke="#64748b" strokeWidth="1" strokeDasharray="3,2" />
            {/* Socket into right component */}
            <path d="M380,73 A7,7 0 0,0 380,87" fill="none" stroke="#475569" strokeWidth="2" />
            <line x1="380" y1="80" x2="390" y2="80" stroke="#64748b" strokeWidth="1.5" />
            {/* Right component */}
            <rect x="390" y="55" width="100" height="50" rx="5" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5" />
            <text x="440" y="85" textAnchor="middle" fontSize="10" fill="#334155">«Component»</text>
            <text x="440" y="100" textAnchor="middle" fontSize="10" fontWeight="700" fill="#334155">Consumer</text>
            {/* Labels */}
            <text x="143" y="72" textAnchor="middle" fontSize="8" fill="#64748b">LanguageIn</text>
            <text x="352" y="72" textAnchor="middle" fontSize="8" fill="#15803d">LanguageOut</text>
            <text x="143" y="128" fontSize="9" fill="#475569">Socket = required interface</text>
            <text x="328" y="128" fontSize="9" fill="#15803d">Lollipop = provided interface</text>
          </svg>
        </Diagram>

        <Callout type="trap" title="Socket vs lollipop — always mixed up">
          In UML: <strong>lollipop (filled circle)</strong> = <em>provided</em> interface.{" "}
          <strong>Socket (open half-circle)</strong> = <em>required</em> interface. Assembly
          connectors link a socket to a lollipop of the same type to show compatibility. This
          appears in almost every exam on this topic.
        </Callout>
      </LessonSection>

      {/* ─────────────────────────── Separation of Concerns / Design Principles ─────────────────────────── */}
      <LessonSection title="Design principles behind the lecture" icon={GitCompareArrows}>
        <p>
          The concrete examples in this lecture illustrate a set of broader design principles that
          the exam often tests in abstract form:
        </p>
        <ul>
          <li>
            <strong>Separation of concerns</strong> — each component is responsible for exactly one
            functional area (billing, ordering, inventory). Changes in one area do not bleed into
            others.
          </li>
          <li>
            <strong>Depend on abstractions, not concretions</strong> — OrderService depends on
            IPaymentService; Application Component depends on InventoryService. Abstractions
            (interfaces) are stable; implementations change.
          </li>
          <li>
            <strong>Black-box reuse</strong> — consumers of a component see only its provided
            interface; the internal implementation is invisible and replaceable. The Promotional
            Shopping Cart replaces the standard one transparently.
          </li>
          <li>
            <strong>Design for replaceability</strong> — a component can be swapped for any other
            that satisfies the same interfaces without changing the rest of the system.
          </li>
          <li>
            <strong>Independent deployment</strong> — in a properly componentized system, a single
            component can be recompiled and redeployed without touching any other component.
          </li>
        </ul>

        <Callout type="tip" title="Why 'more dependencies' can still mean better design">
          The componentized Virtual Store actually has <em>more</em> class-level dependencies than
          the monolith (7 vs 5 classes). It is still superior because every dependency points to a{" "}
          <strong>stable interface</strong>, not a volatile implementation. Interfaces change far
          less frequently than concrete classes — so the system accommodates change far more easily.
        </Callout>
      </LessonSection>

      {/* ─────────────────────────── Flashcards ─────────────────────────── */}
      <LessonSection title="Flashcards — quick recall" icon={Workflow}>
        <FlashcardDeck
          cards={[
            {
              front: "Goal: cohesion and coupling",
              back: "HIGH cohesion (single, clear responsibility per component) + LOW coupling (minimal dependencies between components). This is the primary exam answer.",
            },
            {
              front: "Tight coupling",
              back: "One class is heavily dependent on the internal details of another. Symptom: instantiating a concrete class inside a constructor (self.payment = PaymentService()). Result: change cascades through the system.",
            },
            {
              front: "Dependency depth",
              back: "The transitive depth of a class's dependency chain. Depth-0 = no dependencies. Higher depth = tighter coupling. In the monolith, Store and UI had depth 2; in the componentized design, maximum build-time depth is 1.",
            },
            {
              front: "5 rules for effective componentizing",
              back: "1. Entity classes → Base Library. 2. Business classes → separate components. 3. Expose only via provided interfaces. 4. Mutually dependent app classes → Application Component (no provided interface). 5. Service interfaces + entities → Base Library.",
            },
            {
              front: "Why layers alone are insufficient",
              back: "Layers are logical, not physical. All layers compile into one unit. A cross-layer change (e.g. gratuity touching BillBiz, Bill, BillDAO, PayBillUI) forces a full recompile and redeploy of the whole application.",
            },
            {
              front: "UML: lollipop vs socket",
              back: "Lollipop (filled circle) = PROVIDED interface. Socket (open half-circle) = REQUIRED interface. Assembly connectors link a socket to a lollipop of the same interface type.",
            },
            {
              front: "Dependency Injection vs Service Locator",
              back: "DI: dependency is PUSHED in by an external Assembler/container (Inversion of Control). Service Locator: component PULLS its dependency by querying a registry. DI is preferred because components need no knowledge of the registry.",
            },
            {
              front: "Whiteboard component model",
              back: "Component A PUBLISHES Interface X to a Component Registry. Component B RETRIEVES Interface X from that registry. Neither A nor B knows about each other — maximum decoupling. Used by OSGi.",
            },
          ]}
        />
      </LessonSection>

      {/* ─────────────────────────── Mini quiz ─────────────────────────── */}
      <MiniQuiz questions={questions.slice(0, 6)} title="Quick check — Week 8" />
    </>
  );
}
