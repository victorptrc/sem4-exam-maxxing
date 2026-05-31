import {
  Activity,
  CheckCircle2,
  Gauge,
  Layers,
  TestTube,
  TrendingUp,
  Zap,
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
import questions from "../questions/week19";

export default function Week19() {
  return (
    <>
      <Callout type="key" title="Big picture">
        Week 19 closes the testing arc: <strong>End-to-End testing</strong>,{" "}
        <strong>Manual testing</strong>, and — the heaviest exam focus —{" "}
        <strong>Performance Testing</strong>, particularly the critical distinction between{" "}
        <strong>Load testing</strong> (expected load) and{" "}
        <strong>Stress testing</strong> (finding the breaking point).
      </Callout>

      {/* ─────────────────────────── Test Pyramid recap ─────────────────────────── */}
      <LessonSection title="The Testing Pyramid" icon={Layers}>
        <p>
          The pyramid orders test types by <strong>quantity, cost, and speed</strong>. Write many
          cheap fast tests at the bottom; few expensive slow tests at the top.
        </p>
        <ul>
          <li>
            <strong>Unit Testing</strong> — base; most tests; fast; isolates one function/method.
          </li>
          <li>
            <strong>Component Testing</strong> — tests a component in isolation (previous weeks).
          </li>
          <li>
            <strong>Integration Testing</strong> — tests interactions between components/services.
          </li>
          <li>
            <strong>End-to-End Tests</strong> — validates the whole stack as a user would see it.
          </li>
          <li>
            <strong>Manual Tests</strong> — tip of the pyramid; requires human judgment; fewest in number.
          </li>
        </ul>

        <Diagram caption="The five-layer test pyramid — widest at the base (unit tests, most numerous) and narrowest at the top (manual tests, fewest).">
          <svg viewBox="0 0 520 260" width="520" height="260" role="img" aria-label="Test pyramid with five layers">
            {/* Manual — top */}
            <polygon points="260,10 210,55 310,55" fill="#16a34a" />
            <text x="260" y="42" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">Manual</text>
            {/* E2E */}
            <polygon points="260,10 185,95 335,95" fill="#2563eb" opacity="0.85" />
            <text x="260" y="82" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">End-to-End</text>
            {/* Integration */}
            <polygon points="260,10 155,140 365,140" fill="#a3a300" opacity="0.7" />
            <text x="260" y="127" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e293b">Integration</text>
            {/* Component */}
            <polygon points="260,10 120,190 400,190" fill="#f87171" opacity="0.7" />
            <text x="260" y="177" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e293b">Component Testing</text>
            {/* Unit — base */}
            <polygon points="260,10 80,245 440,245" fill="#86efac" opacity="0.8" />
            <text x="260" y="232" textAnchor="middle" fontSize="13" fontWeight="700" fill="#14532d">Unit Testing</text>
            {/* labels */}
            <text x="455" y="245" fontSize="9" fill="#64748b">Many · Fast · Cheap</text>
            <text x="455" y="55"  fontSize="9" fill="#64748b">Few · Slow · Expensive</text>
          </svg>
        </Diagram>

        <Callout type="trap" title="Exam trap — pyramid proportions">
          The exam often asks which layer should have the <strong>most</strong> tests and which
          should have the <strong>fewest</strong>. Answer: <strong>Unit</strong> = most;{" "}
          <strong>Manual</strong> = fewest. Never invert this.
        </Callout>
      </LessonSection>

      {/* ─────────────────────────── E2E Testing ─────────────────────────── */}
      <LessonSection title="End-to-End (E2E) Testing" icon={CheckCircle2}>
        <p>
          E2E testing verifies that an application behaves correctly{" "}
          <strong>from the user interaction (start) to the final output or data flow (end)</strong>.
          It exercises the full stack: UI → API → services → database.
        </p>

        <p className="font-semibold mt-3">Purposes:</p>
        <ul>
          <li>Validate the <strong>complete functionality</strong> of the application.</li>
          <li>Ensure <strong>all subsystems integrate correctly</strong> (UI, backend, services, DBs).</li>
          <li>Catch bugs that unit, component, or integration tests might miss.</li>
          <li>
            Mimic <strong>user behaviour and flows</strong>: logging in, submitting forms, completing
            a checkout.
          </li>
        </ul>

        <p className="font-semibold mt-3">When to use E2E tests:</p>
        <ul>
          <li>Before major releases.</li>
          <li>After completing a new feature or user flow.</li>
          <li>During CI/CD pipelines to prevent <strong>regressions</strong>.</li>
          <li>
            For <strong>critical paths</strong> like login, registration, checkout, or payments.
          </li>
        </ul>

        <Accordion type="single" collapsible className="rounded-lg border px-4 mt-4">
          <AccordionItem value="e2e-pros-cons">
            <AccordionTrigger>Pros vs Cons of E2E testing</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold text-green-700 mb-1">Pros</p>
                  <ul>
                    <li>Simulates real user behaviour.</li>
                    <li>Validates the entire stack.</li>
                    <li>Catches unexpected integration bugs.</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-red-700 mb-1">Cons</p>
                  <ul>
                    <li>Slower than unit or integration tests.</li>
                    <li>More brittle — UI changes can break tests.</li>
                    <li>Requires maintenance and setup.</li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="e2e-tools">
            <AccordionTrigger>Popular E2E testing tools</AccordionTrigger>
            <AccordionContent>
              <p className="font-semibold mb-1">Web Applications:</p>
              <ul>
                <li><strong>Cypress</strong> — fast, JS-based; great for React/Vue/Angular.</li>
                <li><strong>Playwright</strong> — Microsoft; cross-browser (Chromium, Firefox, WebKit); headless.</li>
                <li><strong>Selenium</strong> — classic browser automation; supports Java, Python, C#, JS; cross-browser. (Highlighted in lecture.)</li>
                <li><strong>TestCafe</strong> — Node.js-based; no plugins needed.</li>
                <li><strong>Puppeteer</strong> — headless Chrome; maintained by Google.</li>
              </ul>
              <p className="font-semibold mt-2 mb-1">Mobile Applications:</p>
              <ul>
                <li><strong>Appium</strong> — cross-platform iOS/Android; WebDriver protocol.</li>
                <li><strong>Detox</strong> — React Native; good performance.</li>
                <li><strong>Espresso</strong> — Android-specific; Google/Android Studio.</li>
                <li><strong>XCUITest</strong> — native iOS framework; Apple/Xcode.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="e2e-best-practices">
            <AccordionTrigger>Rules for good E2E testing</AccordionTrigger>
            <AccordionContent>
              <ul>
                <li><strong>Define Clear Objectives</strong> — know what workflows you are testing.</li>
                <li><strong>Prioritize Critical Paths</strong> — focus on the highest-user-impact flows.</li>
                <li><strong>Use Realistic Test Data</strong> — simulate real-world data.</li>
                <li><strong>Automate Strategically</strong> — balance automation with manual testing for usability.</li>
                <li><strong>Maintain Test Environment</strong> — align it closely with production.</li>
                <li><strong>Keep tests isolated</strong> — reset state or use fresh data per test to avoid flakiness.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </LessonSection>

      {/* ─────────────────────────── Manual Testing ─────────────────────────── */}
      <LessonSection title="Manual Testing" icon={TestTube}>
        <p>
          Manual testing is the <strong>process of executing test cases manually, without using
          any automation tool</strong>. It sits at the very tip of the pyramid — used sparingly
          but invaluably for human-judgment scenarios.
        </p>

        <p className="font-semibold mt-3">Best used when:</p>
        <ul>
          <li>You need to validate <strong>visual and UX aspects</strong> of an application.</li>
          <li>
            You are in the <strong>early prototyping phase</strong> with frequent UI changes where
            automation would constantly break.
          </li>
          <li>Doing <strong>exploratory, ad hoc, or usability testing</strong>.</li>
          <li>
            Scenarios are complex and require <strong>human judgment or empathy</strong> (e.g.
            accessibility testing).
          </li>
        </ul>

        <Accordion type="single" collapsible className="rounded-lg border px-4 mt-4">
          <AccordionItem value="manual-pros-cons">
            <AccordionTrigger>Advantages vs Disadvantages of manual testing</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold text-green-700 mb-1">Advantages</p>
                  <ul>
                    <li>Human insight and intuition.</li>
                    <li>Flexibility in testing.</li>
                    <li>Lower initial cost.</li>
                    <li>Immediate feedback loop.</li>
                    <li>Better for UI and visual testing.</li>
                    <li>Effective in unstable or rapidly changing codebases.</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-red-700 mb-1">Disadvantages</p>
                  <ul>
                    <li>Not scalable.</li>
                    <li>Repetitive and tedious.</li>
                    <li>No CI/CD integration.</li>
                    <li>Hard to reproduce results.</li>
                    <li>Limited test coverage.</li>
                    <li><strong>Costly over time and time-consuming/slow.</strong> (highlighted in lecture)</li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </LessonSection>

      {/* ─────────────────────────── Performance Testing ─────────────────────────── */}
      <LessonSection title="Performance Testing" icon={Gauge}>
        <p>
          <strong>Performance testing</strong> is a{" "}
          <strong>non-functional testing</strong> technique used to determine how a software
          application performs under <strong>expected and peak workloads</strong>.
        </p>

        <p className="font-semibold mt-3">What can go wrong without it?</p>
        <ul>
          <li>Slow response times → poor user experience.</li>
          <li>System crashes under heavy usage.</li>
          <li>Revenue loss due to downtime.</li>
          <li>Negative brand perception.</li>
          <li>Violation of SLAs (Service Level Agreements).</li>
        </ul>

        <p className="font-semibold mt-3">Core objectives:</p>
        <ul>
          <li><strong>Response Time</strong> — how quickly the system responds to a request.</li>
          <li><strong>Throughput</strong> — number of transactions per second.</li>
          <li><strong>Scalability</strong> — ability to grow and handle increased load.</li>
          <li><strong>Stability</strong> — does not crash under stress or over time.</li>
          <li><strong>Resource Usage</strong> — CPU, memory, disk, and network utilisation under load.</li>
        </ul>
      </LessonSection>

      {/* ─────────────────────────── Load vs Stress ─────────────────────────── */}
      <LessonSection title="Load Testing vs Stress Testing" icon={TrendingUp}>
        <p>
          This is the <strong>most-tested distinction</strong> in the performance testing section.
          Know it cold.
        </p>

        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100">
                <th className="border px-3 py-2 text-left">Type</th>
                <th className="border px-3 py-2 text-left">What it does</th>
                <th className="border px-3 py-2 text-left">Focus areas (highlighted in lecture)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-3 py-2 font-semibold">Load Testing</td>
                <td className="border px-3 py-2">Tests the system under <strong>expected</strong> user load to identify performance bottlenecks.</td>
                <td className="border px-3 py-2 text-amber-700 font-medium">Response time, throughput, and system behaviour under typical conditions.</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="border px-3 py-2 font-semibold">Stress Testing</td>
                <td className="border px-3 py-2">Pushes the system <strong>beyond normal limits</strong> to find the breaking point.</td>
                <td className="border px-3 py-2 text-amber-700 font-medium">Stability, recovery, and maximum capacity.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Callout type="trap" title="The breaking-point scenario (mock exam)">
          A system handles 1,000–4,999 users fine but becomes <strong>unresponsive above 5,000
          users</strong>. That unresponsive state is the system reaching its <em>breaking point</em>
          — which means the test that revealed it was <strong>stress testing</strong>, not load
          testing. Load testing stays within the expected range; stress testing intentionally goes
          beyond it.
        </Callout>

        <Diagram caption="Load vs Stress testing — response time rises gradually under load, then spikes sharply at the breaking point found by stress testing.">
          <svg viewBox="0 0 520 220" width="520" height="220" role="img" aria-label="Load vs stress graph showing response time vs number of users">
            {/* axes */}
            <line x1="55" y1="185" x2="500" y2="185" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="55" y1="185" x2="55"  y2="15"  stroke="#94a3b8" strokeWidth="1.5" />
            <text x="275" y="210" textAnchor="middle" fontSize="11" fill="#64748b">Number of concurrent users →</text>
            <text x="18" y="100" textAnchor="middle" fontSize="11" fill="#64748b" transform="rotate(-90 18 100)">Response time →</text>

            {/* load-testing zone (expected load) */}
            <rect x="55" y="15" width="220" height="170" fill="#dcfce7" opacity="0.5" />
            <text x="165" y="30" textAnchor="middle" fontSize="10" fill="#15803d" fontWeight="700">Load testing zone</text>
            <text x="165" y="42" textAnchor="middle" fontSize="9" fill="#15803d">(expected load)</text>

            {/* stress-testing zone (beyond normal) */}
            <rect x="275" y="15" width="225" height="170" fill="#fee2e2" opacity="0.45" />
            <text x="387" y="30" textAnchor="middle" fontSize="10" fill="#b91c1c" fontWeight="700">Stress testing zone</text>
            <text x="387" y="42" textAnchor="middle" fontSize="9" fill="#b91c1c">(beyond normal limits)</text>

            {/* response time curve */}
            <path d="M55,170 C120,165 200,158 275,140 C310,128 340,80 380,30" fill="none" stroke="#2563eb" strokeWidth="2.5" />

            {/* breaking point marker */}
            <line x1="275" y1="15" x2="275" y2="185" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="5,3" />
            <text x="278" y="175" fontSize="9" fill="#dc2626">breaking point</text>

            {/* axis tick labels */}
            <text x="55"  y="198" textAnchor="middle" fontSize="9" fill="#64748b">0</text>
            <text x="165" y="198" textAnchor="middle" fontSize="9" fill="#64748b">2,500</text>
            <text x="275" y="198" textAnchor="middle" fontSize="9" fill="#dc2626" fontWeight="700">5,000</text>
            <text x="387" y="198" textAnchor="middle" fontSize="9" fill="#64748b">7,500+</text>

            {/* curve label */}
            <text x="395" y="25" fontSize="10" fill="#2563eb">response time</text>
          </svg>
        </Diagram>
      </LessonSection>

      {/* ─────────────────────────── Other performance test types ─────────────────────────── */}
      <LessonSection title="Other Performance Testing Types" icon={Activity}>
        <p>The slides list six types in total — know each one-liner:</p>

        <Accordion type="single" collapsible className="rounded-lg border px-4">
          <AccordionItem value="spike">
            <AccordionTrigger>Spike Testing</AccordionTrigger>
            <AccordionContent>
              <p>
                Sudden <strong>increase/decrease</strong> in load to evaluate behaviour during spikes
                — e.g. a flash-sale traffic burst. Unlike load testing (steady ramp) or stress
                testing (gradual beyond-limit increase), spike testing is abrupt.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="endurance">
            <AccordionTrigger>Endurance Testing (Soak Testing)</AccordionTrigger>
            <AccordionContent>
              <p>
                Run under <strong>constant load for a long time</strong> to detect memory leaks or
                stability issues that only surface after extended operation. E.g. running 2,000
                simulated users for 48 hours.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="scalability">
            <AccordionTrigger>Scalability Testing</AccordionTrigger>
            <AccordionContent>
              <p>
                Determines how well the system <strong>scales</strong> with increased users or data
                volume — assessing whether adding resources improves performance proportionally.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="volume">
            <AccordionTrigger>Volume Testing (Flood Testing)</AccordionTrigger>
            <AccordionContent>
              <p>
                Checks system performance when a <strong>large volume of data</strong> is present
                in the database or files — distinct from user-count-focused load/stress tests.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </LessonSection>

      {/* ─────────────────────────── JMeter ─────────────────────────── */}
      <LessonSection title="Apache JMeter & Performance Testing Tools" icon={Zap}>
        <p>
          <strong>Apache JMeter</strong> is the highlighted tool in the lecture — an{" "}
          <strong>open-source load testing tool</strong> by the Apache Software Foundation,
          XML/GUI-based, designed for web apps, APIs, and database testing.
        </p>

        <p className="font-semibold mt-3">JMeter Test Plan core components:</p>
        <ul>
          <li><strong>Thread Group</strong> — simulates virtual users.</li>
          <li><strong>Samplers</strong> — define requests (e.g. HTTP, JDBC).</li>
          <li><strong>Listeners</strong> — collect results and generate reports.</li>
          <li><strong>Assertions</strong> — validate responses.</li>
          <li><strong>Timers &amp; Controllers</strong> — add logic and pauses.</li>
          <li><strong>Config Elements</strong> — set variables, headers, etc.</li>
        </ul>

        <Accordion type="single" collapsible className="rounded-lg border px-4 mt-4">
          <AccordionItem value="perf-tools">
            <AccordionTrigger>Other popular performance testing tools</AccordionTrigger>
            <AccordionContent>
              <ul>
                <li><strong>Locust</strong> — Python; programmable user behaviour.</li>
                <li><strong>Gatling</strong> — Scala DSL; high concurrency; CI integration.</li>
                <li><strong>k6</strong> — JavaScript; APIs/microservices; DevOps use.</li>
                <li><strong>Artillery</strong> — YAML+JS; quick API testing.</li>
                <li><strong>Blazemeter</strong> — enterprise-scale cloud testing.</li>
                <li><strong>VS Load Test</strong> — .NET stack; Visual Studio.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </LessonSection>

      {/* ─────────────────────────── Other test types ─────────────────────────── */}
      <LessonSection title="Regression, Smoke & Acceptance Testing" icon={CheckCircle2}>
        <ul>
          <li>
            <strong>Regression testing</strong> — re-runs existing tests after code changes to ensure
            previously working functionality has <em>not been broken</em>. E2E tests in CI/CD
            pipelines serve this purpose.
          </li>
          <li>
            <strong>Smoke testing (sanity testing)</strong> — a small, fast subset of tests run
            immediately after a new build to verify the most critical functionality works before
            investing in a full test run. &ldquo;Does the app even start?&rdquo;
          </li>
          <li>
            <strong>Acceptance testing (UAT)</strong> — validates that the system meets{" "}
            <strong>business requirements</strong> and is ready to be delivered to the customer.
            Performed by the client or QA team against agreed criteria.
          </li>
        </ul>
      </LessonSection>

      {/* ─────────────────────────── Flashcards ─────────────────────────── */}
      <LessonSection title="Flashcards — quick recall">
        <FlashcardDeck
          cards={[
            {
              front: "Test pyramid — base to tip",
              back: "Unit Testing → Component Testing → Integration Testing → E2E Tests → Manual Tests. Most at the base (cheap, fast); fewest at the tip (expensive, slow).",
            },
            {
              front: "Load testing vs Stress testing",
              back: "Load = expected/normal user load (focus: response time, throughput). Stress = beyond normal limits (focus: stability, recovery, breaking point).",
            },
            {
              front: "Stress testing — key scenario",
              back: "System becomes unresponsive above 5,000 users → that is the breaking point found by stress testing. Load testing would not push that far.",
            },
            {
              front: "Spike testing",
              back: "Sudden increase/decrease in load to evaluate behaviour during bursts (e.g. flash-sale traffic).",
            },
            {
              front: "Endurance / soak testing",
              back: "Run under constant load for a long time to detect memory leaks or stability degradation.",
            },
            {
              front: "E2E testing — purpose",
              back: "Validates the full stack from user interaction to final output; catches bugs unit/integration tests miss; use for critical paths (login, checkout, payments).",
            },
            {
              front: "Manual testing — best use",
              back: "Visual/UX validation, early prototyping, exploratory testing, scenarios requiring human judgment (e.g. accessibility).",
            },
            {
              front: "Performance testing — type",
              back: "Non-functional testing — measures response time, throughput, scalability, stability, and resource usage under expected and peak workloads.",
            },
          ]}
        />
      </LessonSection>

      {/* ─────────────────────────── Mini quiz ─────────────────────────── */}
      <MiniQuiz questions={questions.slice(0, 6)} title="Quick check — Week 19" />
    </>
  );
}
