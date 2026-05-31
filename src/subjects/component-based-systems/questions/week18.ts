import type { Question } from "../../types";

const questions: Question[] = [
  // ── Testing pyramid & scope ──────────────────────────────────────────────
  {
    week: 18,
    topic: "Testing pyramid",
    question:
      "In the software testing pyramid (as taught in this course), what is the correct order from bottom to top?",
    options: [
      "Unit Testing → Integration Testing → Component Testing → E2E → Manual Tests",
      "Unit Testing → Component Testing → Integration Testing → E2E → Manual Tests",
      "Component Testing → Unit Testing → Integration Testing → E2E → Manual Tests",
      "Unit Testing → E2E → Component Testing → Integration Testing → Manual Tests",
    ],
    answer: 1,
    explanation:
      "The pyramid from base to peak: Unit Testing (widest/cheapest), Component Testing, Integration Testing, End-to-End Tests, Manual Tests. Component testing sits directly above unit testing.",
  },
  // ── Unit testing definition ──────────────────────────────────────────────
  {
    week: 18,
    topic: "Unit testing",
    question: "Which statement best describes unit testing?",
    options: [
      "Testing the interaction between the database and the application server using real connections",
      "Testing an individual function, method, or class in complete isolation from its dependencies",
      "Testing a whole microservice including its HTTP routing and business logic together",
      "Testing the entire user journey from the browser through to the database",
    ],
    answer: 1,
    explanation:
      "Unit testing isolates a single function, method, or class and tests its internal logic correctness. Dependencies are replaced with test doubles so nothing external is exercised.",
  },
  // ── Component testing definition ─────────────────────────────────────────
  {
    week: 18,
    topic: "Component testing",
    question:
      "A team wants to test that their REST API controller correctly handles an HTTP POST request and routes it to the underlying service layer, using a mock database. Which level of testing is this?",
    options: [
      "Unit testing, because only the controller class is under test",
      "Integration testing, because a real database is involved",
      "Component testing, because the whole component (API + routing + service) is exercised with external dependencies mocked",
      "End-to-end testing, because an HTTP request is made",
    ],
    answer: 2,
    explanation:
      "Component testing exercises a whole component — including how it routes/handles requests — with external dependencies (database) replaced by mocks or stubs. It is broader than unit testing but narrower than integration testing, which would use a real database.",
  },
  // ── Integration testing definition ───────────────────────────────────────
  {
    week: 18,
    topic: "Integration testing",
    question:
      "A test registers a new user and then verifies that: (1) the user record is saved in the real PostgreSQL database, and (2) a welcome email message is published to the real RabbitMQ broker. Which test level is this?",
    options: [
      "Unit testing, because a single use-case is tested",
      "Component testing, because the registration module is isolated",
      "Integration testing, because multiple real components work together end-to-end",
      "E2E testing, because the browser triggers the flow",
    ],
    answer: 2,
    explanation:
      "Integration testing verifies that multiple REAL components work together — here the registration module, the actual database, and the actual message broker all interact. No mocks replace these real dependencies, which is what distinguishes integration from component testing.",
  },
  // ── Component vs integration distinction ─────────────────────────────────
  {
    week: 18,
    topic: "Component vs integration testing",
    question:
      "What is the key difference between component testing and integration testing regarding external dependencies?",
    options: [
      "Component testing uses real databases; integration testing mocks them",
      "Component testing mocks/stubs external dependencies; integration testing involves real connections to dependencies like APIs and databases",
      "They are identical — both always use real external services",
      "Integration testing is performed before component testing in the development lifecycle",
    ],
    answer: 1,
    explanation:
      "The slides explicitly highlight this in the comparison table: in component testing external dependencies are replaced with mocks, stubs, or fakes; in integration testing real connections to databases, APIs, and services are used (or spun up via Testcontainers).",
  },
  // ── Arrange-Act-Assert ───────────────────────────────────────────────────
  {
    week: 18,
    topic: "Arrange-Act-Assert",
    question:
      "A developer writes a test with no separation of setup, action, and verification. The slides recommend refactoring it to follow which pattern?",
    options: [
      "Given-When-Then (BDD style only)",
      "Arrange-Act-Assert (AAA)",
      "Setup-Execute-Teardown",
      "Prepare-Run-Validate",
    ],
    answer: 1,
    explanation:
      "The slides show a 'what's wrong with this?' example and fix it by explicitly adding // Arrange, // Act, // Assert comments. The AAA pattern makes tests easier to read, debug, and extend.",
  },
  // ── Incompleteness of testing ─────────────────────────────────────────────
  {
    week: 18,
    topic: "Testing incompleteness",
    question:
      "The slide on testing incompleteness quotes: 'Testing can ___ the presence of bugs, but not their ___.'",
    options: [
      "eliminate / existence",
      "demonstrate / absence",
      "prove / occurrence",
      "guarantee / source",
    ],
    answer: 1,
    explanation:
      "Dijkstra's famous quote: 'Testing can demonstrate the PRESENCE of bugs, but not their ABSENCE.' No test suite can guarantee a bug-free program — a theoretical consequence of Turing's halting problem.",
  },
  // ── Mock vs stub ─────────────────────────────────────────────────────────
  {
    week: 18,
    topic: "Test doubles — mock vs stub",
    question:
      "In a unit test, an EmailService is replaced with a test double. The test uses `when(emailService.send(...)).thenReturn(true)` and later calls `verify(emailService).send(...)`. What roles does this double play?",
    options: [
      "It acts only as a stub — returning canned values",
      "It acts only as a mock — verifying interactions",
      "It acts as both a stub (canned return value) and a mock (interaction verification)",
      "It acts as a fake — providing a lightweight working implementation",
    ],
    answer: 2,
    explanation:
      "A stub provides pre-programmed return values (canned responses). A mock additionally verifies that specific interactions (calls) occurred. Mockito's `when(...).thenReturn(...)` stubs behavior; `verify(...)` is the mock assertion. The same object can serve both roles.",
  },
  // ── Mockito purpose ──────────────────────────────────────────────────────
  {
    week: 18,
    topic: "Mockito",
    question:
      "Why does the lecture recommend using Mockito when testing a service that depends on a database repository?",
    options: [
      "Because the real database is faster than an in-memory mock",
      "Because real repositories might be slow, unstable, or cause side effects — Mockito creates controlled mock versions",
      "Because Mockito automatically generates the test data needed for integration tests",
      "Because Mockito replaces the need to write assertions",
    ],
    answer: 1,
    explanation:
      "Real dependencies can be slow (real DB), unstable (third-party API), or produce side effects (modifying real data). Mockito solves this by creating mock versions that simulate behavior in a controlled way — keeping the test fast, isolated, and repeatable.",
  },
  // ── Test doubles taxonomy ────────────────────────────────────────────────
  {
    week: 18,
    topic: "Test doubles — types",
    question:
      "Which test double type provides a simplified but fully working implementation of a dependency (e.g. an in-memory HashMap repository instead of a real database)?",
    options: [
      "Mock — it records interactions for later verification",
      "Stub — it returns hardcoded values with no real logic",
      "Dummy — it is passed but never actually used",
      "Fake — it has a working implementation, just not production-suitable",
    ],
    answer: 3,
    explanation:
      "A fake has a real but simplified working implementation (e.g. a HashMap-based in-memory repository). A stub just returns canned values. A mock verifies interactions. A dummy is passed as a placeholder argument but never actually invoked.",
  },
  // ── Independent tests ────────────────────────────────────────────────────
  {
    week: 18,
    topic: "Unit testing best practices",
    question:
      "Two tests share a `shared_db` object. When run in sequence, the second test passes only because the first test created the required data. What is the fundamental problem?",
    options: [
      "The tests are too slow because they hit a database",
      "The tests are not isolated — they share state, so one test's result depends on another",
      "The tests use too many assertions per test case",
      "The tests lack meaningful names",
    ],
    answer: 1,
    explanation:
      "Sharing state between tests violates the Isolated/Independent principle. If test order changes or one test fails, others break. Each test must set up its own context (e.g. its own `setup_test_db()` call) and clean up after itself.",
  },
  // ── One unit at a time ───────────────────────────────────────────────────
  {
    week: 18,
    topic: "Unit testing best practices",
    question:
      "A test calls `calculate_total()` and `generate_invoice()` in the same test body and asserts on the invoice total. If it fails, what is the main problem?",
    options: [
      "The test uses too many mock objects",
      "It is unclear which function is broken because the test exercises more than one unit",
      "The assertion style is wrong — it should use AAA",
      "The test name is not descriptive enough",
    ],
    answer: 1,
    explanation:
      "Unit tests should test one unit at a time. When a compound test fails it is ambiguous which function caused the failure. The fix is separate tests: one for calculate_total, one for generate_invoice.",
  },
  // ── What to unit test vs integration test ────────────────────────────────
  {
    week: 18,
    topic: "What to test",
    question:
      "According to the Khorikov quadrant (complexity vs. number of collaborators), which type of code is best covered by integration tests rather than unit tests?",
    options: [
      "Domain model and algorithms — high complexity, few collaborators",
      "Trivial code — low complexity, few collaborators",
      "Controllers — low complexity but many collaborators",
      "Overcomplicated code — high complexity and many collaborators",
    ],
    answer: 2,
    explanation:
      "Controllers have low algorithmic complexity but coordinate many collaborators (repository, service, message broker). They are ideal candidates for integration tests that verify the wiring. Domain models/algorithms (high complexity, few collaborators) are best covered by unit tests.",
  },
  // ── Observability pillars ─────────────────────────────────────────────────
  {
    week: 18,
    topic: "Observability in microservices",
    question:
      "Which three pillars of observability are used to monitor microservices, as shown in the recommended tooling stack?",
    options: [
      "Metrics, Logs, Traces",
      "Health checks, Alerts, Dashboards",
      "CPU usage, Memory usage, Disk I/O",
      "Unit tests, Integration tests, E2E tests",
    ],
    answer: 0,
    explanation:
      "The three pillars of observability: Metrics (Prometheus/Micrometer/Grafana), Logs (ELK Stack / Loki), and Traces (Jaeger/OpenTelemetry/Zipkin). Spring Boot Actuator and Micrometer provide instrumentation to feed these pillars.",
  },
  // ── Spring Boot Actuator ─────────────────────────────────────────────────
  {
    week: 18,
    topic: "Observability — Spring Boot Actuator",
    question:
      "Which Spring Boot Actuator endpoint is enabled by default and shows application health info WITHOUT requiring authentication?",
    options: [
      "/actuator/env — displays environment properties",
      "/actuator/beans — shows all Spring beans",
      "/actuator/health — shows application health info",
      "/actuator/metrics — shows JVM memory and CPU metrics",
    ],
    answer: 2,
    explanation:
      "/actuator/health is enabled by default and is not sensitive (no auth needed for basic info). /actuator/metrics is also enabled by default but IS sensitive (needs auth). /actuator/env and /actuator/beans are not enabled by default and are sensitive.",
  },
  // ── Prometheus vs Grafana ────────────────────────────────────────────────
  {
    week: 18,
    topic: "Observability tools",
    question:
      "In the recommended monitoring stack, Prometheus scrapes metrics from services. What is Grafana's role?",
    options: [
      "Grafana stores the time-series metrics data",
      "Grafana instruments the application to produce metrics",
      "Grafana queries Prometheus via PromQL and creates interactive dashboards and alerts",
      "Grafana replaces the need for Spring Boot Actuator",
    ],
    answer: 2,
    explanation:
      "Prometheus scrapes and stores time-series metrics. Grafana connects to Prometheus as a data source, queries it with PromQL, and renders interactive dashboards and alerts. The architecture is: Microservice /actuator/prometheus → Prometheus → (PromQL) → Grafana.",
  },
  // ── Component testing characteristics ───────────────────────────────────
  {
    week: 18,
    topic: "Component testing characteristics",
    question:
      "Which characteristic best describes the 'semi-isolated environment' of component testing?",
    options: [
      "All real production dependencies (database, external APIs) are used exactly as in production",
      "Every single class is tested in complete isolation with all dependencies mocked",
      "Some external dependencies may be stubbed or simulated, but the component itself is tested as a whole",
      "Only the UI layer is tested against a real backend",
    ],
    answer: 2,
    explanation:
      "Component testing uses a semi-isolated environment: the component under test runs with its internal logic intact (integrated units, broader scope), but external dependencies (databases, external APIs) are stubbed or mocked. This distinguishes it from full integration testing.",
  },
  // ── Integration testing best practice — real environments ────────────────
  {
    week: 18,
    topic: "Integration testing best practices",
    question:
      "The slide 'Automate With Real Environments' recommends which approach for integration tests?",
    options: [
      "Use mocks for all external services to keep integration tests as fast as unit tests",
      "Use Testcontainers to spin up Dockerized databases and message brokers, preferring real dependencies",
      "Run integration tests only in production to use real data",
      "Share a single database instance across all integration tests for consistency",
    ],
    answer: 1,
    explanation:
      "The slides state: 'Avoid mocks for integration testing — use real dependencies where possible.' Testcontainers spins up isolated Dockerized instances of PostgreSQL, RabbitMQ, etc., giving real behavior while keeping tests reproducible and isolated.",
  },
  // ── Testcontainers ───────────────────────────────────────────────────────
  {
    week: 18,
    topic: "Integration testing tools",
    question:
      "In a Spring Boot integration test, `@Testcontainers` is used together with a `PostgreSQLContainer`. What does this achieve?",
    options: [
      "It mocks all database calls so no real database is needed",
      "It automatically generates test data for all database tables",
      "It spins up a real Dockerized PostgreSQL instance that starts automatically before any test runs",
      "It connects the test to the production database for realistic data",
    ],
    answer: 2,
    explanation:
      "Testcontainers (with @Testcontainers and @Container) starts lightweight, isolated Docker containers (PostgreSQL, RabbitMQ, etc.) automatically before tests run. This gives real infrastructure behavior without connecting to shared dev/production services.",
  },
  // ── Mock external deps in unit test ──────────────────────────────────────
  {
    week: 18,
    topic: "Unit testing best practices",
    question:
      "A unit test for `NotificationService.notifyUser()` creates a real `EmailService` instance. The slides flag this as wrong. Why?",
    options: [
      "The real EmailService is too complex to instantiate in a test",
      "Using a real EmailService sends actual emails (side effects), is slow and unreliable, and turns the test into something closer to integration testing",
      "The real EmailService cannot be imported in test code",
      "JUnit 5 does not support real class instances in test methods",
    ],
    answer: 1,
    explanation:
      "The slide explicitly marks this with three problems: sends real emails (side effects), slow and unreliable, 'Not unit testing — closer to integration.' The fix is to mock the EmailService with Mockito so the unit test is fast, side-effect-free, and truly isolated.",
  },
  // ── Halting problem / incompleteness ─────────────────────────────────────
  {
    week: 18,
    topic: "Testing incompleteness",
    question:
      "Why is it theoretically impossible to create a perfect test suite that guarantees software is completely bug-free?",
    options: [
      "Developers never have enough time to write all possible tests",
      "Turing's halting problem proves no program can universally determine whether another program will terminate correctly or contain bugs",
      "Test frameworks themselves contain bugs that invalidate results",
      "100% code coverage is practically impossible to achieve",
    ],
    answer: 1,
    explanation:
      "Turing's halting problem is the theoretical reason for testing incompleteness: it is impossible to write a general program that decides for all programs whether they behave correctly. Testing can demonstrate the presence of bugs but never prove their total absence.",
  },
  // ── Spy test double ──────────────────────────────────────────────────────
  {
    week: 18,
    topic: "Test doubles — spy",
    question:
      "A test double wraps a real object but records all method calls so the test can verify them afterward, while still delegating to the real implementation. What type of test double is this?",
    options: [
      "Fake — a simplified but working implementation",
      "Stub — returns hardcoded values",
      "Dummy — a placeholder passed but never used",
      "Spy — wraps a real object and records interactions",
    ],
    answer: 3,
    explanation:
      "A spy wraps a real (or partial) implementation and records interactions (calls, arguments), allowing the test to verify which methods were called while still delegating to the real implementation unless explicitly overridden.",
  },
  // ── Component testing scope diagram ──────────────────────────────────────
  {
    week: 18,
    topic: "Component testing",
    question:
      "The 'Component Testing' slide shows a diagram with an API and a web/application server enclosed in a red boundary, with the database endpoint outside it and shown with a dashed line. What does this represent?",
    options: [
      "The production firewall separating the microservice from the internet",
      "The scope of a unit test — one class under test",
      "The component boundary: the API and server logic are tested together as a whole; the database outside the boundary is mocked or stubbed",
      "The boundary between front-end React components and the back-end",
    ],
    answer: 2,
    explanation:
      "The red boundary in the component testing diagram encloses the API and web/application server — showing that component testing exercises the whole component including routing and business logic together. The database endpoint outside the boundary is replaced by a stub/mock.",
  },
  // ── Integration test isolation ────────────────────────────────────────────
  {
    week: 18,
    topic: "Integration testing best practices",
    question:
      "The slide 'Isolate and Clean Up State' recommends that each integration test should run independently. What practical steps implement this?",
    options: [
      "Use a single shared database transaction rolled back at the end of the full test suite",
      "Clean up the database after each test and clear in-memory state (queues, caches) using @BeforeEach / @AfterEach or container resets",
      "Disable all tests that modify state so only read-only tests run",
      "Run each test in a separate JVM process",
    ],
    answer: 1,
    explanation:
      "The slide states: each test should run independently — clean up DB after each test, clear in-memory states (queues, caches). Use @BeforeEach / @AfterEach or reset containers between tests so that no test's side-effects contaminate another.",
  },
];

export default questions;
