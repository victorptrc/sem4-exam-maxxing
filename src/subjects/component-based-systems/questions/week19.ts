import type { Question } from "../../types";

const questions: Question[] = [
  // ── Test Pyramid ──────────────────────────────────────────────────────────
  {
    week: 19,
    topic: "Test pyramid",
    question:
      "In the software testing pyramid taught in this course, which layer sits at the BASE (widest part) of the pyramid?",
    options: [
      "End-to-End Tests",
      "Integration Testing",
      "Component Testing",
      "Unit Testing",
    ],
    answer: 3,
    explanation:
      "The pyramid has Unit Testing at the base (most tests, cheapest, fastest), then Component Testing, then Integration Testing, with End-to-End Tests (and Manual Tests) at the narrow top. More tests should live lower in the pyramid.",
  },
  {
    week: 19,
    topic: "Test pyramid",
    question:
      "In the five-layer testing pyramid shown in the lectures (Unit → Component → Integration → E2E → Manual), where does End-to-End testing appear?",
    options: [
      "At the base — it is the most numerous type of test",
      "Second from the bottom, just above unit tests",
      "Second from the top, just below manual tests",
      "At the very top, above manual tests",
    ],
    answer: 2,
    explanation:
      "E2E sits second from the top — above Integration testing and below Manual Tests. It is expensive and slow, so it should be used sparingly compared with unit and component tests.",
  },
  {
    week: 19,
    topic: "Test pyramid",
    question:
      "Which statement about the test pyramid is correct regarding cost and speed?",
    options: [
      "Tests at the top of the pyramid are cheaper and faster than those at the bottom",
      "Tests at the bottom of the pyramid are cheaper, faster, and should be written in greater numbers",
      "Manual tests at the top are the most reliable and should dominate the test suite",
      "All layers of the pyramid have equal cost and execution speed",
    ],
    answer: 1,
    explanation:
      "The pyramid shape communicates that lower-level tests (unit, component) are cheap and fast — so you write many of them. Higher-level tests (E2E, manual) are slow and brittle — so you write few of them.",
  },

  // ── E2E Testing ───────────────────────────────────────────────────────────
  {
    week: 19,
    topic: "E2E testing",
    question: "End-to-End (E2E) testing is best described as:",
    options: [
      "Testing a single function or method in isolation",
      "Verifying that an application behaves as expected from user interaction (start) to final output or data flow (end)",
      "Testing only the database layer of an application",
      "Running performance tests to find the system breaking point",
    ],
    answer: 1,
    explanation:
      "E2E testing validates complete functionality across the entire stack — UI, backend, services, databases — mimicking real user workflows from start to finish.",
  },
  {
    week: 19,
    topic: "E2E testing",
    question:
      "Which of the following is NOT listed as a purpose of E2E testing?",
    options: [
      "Catch bugs that unit, component, or integration tests might miss",
      "Validate the complete functionality of the application",
      "Measure CPU and memory utilisation under sustained load",
      "Mimic user behavior such as logging in, submitting forms, or completing a checkout",
    ],
    answer: 2,
    explanation:
      "Measuring CPU/memory under sustained load is a goal of performance/endurance testing, not E2E testing. E2E tests focus on correct functional behaviour across the whole stack.",
  },
  {
    week: 19,
    topic: "E2E testing",
    question:
      "A team wants to run automated tests before every major release to guard against regressions on the login, checkout, and payment flows. Which testing type is MOST appropriate?",
    options: [
      "Unit testing — fast and cheap",
      "End-to-End testing — validates critical user paths across the full stack",
      "Volume testing — ensures the database handles large data sets",
      "Stress testing — pushes the system beyond capacity",
    ],
    answer: 1,
    explanation:
      "The slides state that E2E tests should be used for critical paths like login, registration, checkout, and payments, and during CI/CD pipelines to prevent regressions.",
  },
  {
    week: 19,
    topic: "E2E testing — tools",
    question:
      "Which E2E testing tool is highlighted in the slides as a classic browser automation tool that supports multiple languages (Java, Python, C#, JS) and works across browsers?",
    options: ["Cypress", "Playwright", "Selenium", "Puppeteer"],
    answer: 2,
    explanation:
      "Selenium is described (and highlighted in yellow) as the classic multi-language browser automation tool. Cypress is JS-only; Playwright is Microsoft's multi-browser tool; Puppeteer is headless Chrome only.",
  },
  {
    week: 19,
    topic: "E2E testing",
    question:
      "Which is a known DISADVANTAGE of End-to-End testing compared with unit or integration tests?",
    options: [
      "It only tests one layer of the stack",
      "It cannot simulate real user behaviour",
      "It is slower and more brittle — UI changes can break tests",
      "It requires no setup or maintenance",
    ],
    answer: 2,
    explanation:
      "The slides list the cons of E2E testing as: slower than unit/integration tests, more brittle (UI changes can break tests), and requiring more maintenance and setup.",
  },

  // ── Manual Testing ────────────────────────────────────────────────────────
  {
    week: 19,
    topic: "Manual testing",
    question: "Manual testing is defined in the lectures as:",
    options: [
      "Running automated scripts without human review",
      "The process of executing test cases manually, without using any automation tool",
      "Performance testing conducted by a human operator",
      "Testing only the UI layer using browser developer tools",
    ],
    answer: 1,
    explanation:
      "Manual testing is literally executing test cases by hand, without automation. It sits at the very top of the extended pyramid, above E2E tests.",
  },
  {
    week: 19,
    topic: "Manual testing",
    question:
      "Which scenario is BEST suited to manual testing rather than automated testing?",
    options: [
      "Running 500 regression tests nightly in a CI/CD pipeline",
      "Checking that an API returns the correct JSON structure",
      "Validating the visual layout and UX feel of a new checkout page with frequent UI changes",
      "Load-testing an API with 1,000 concurrent virtual users",
    ],
    answer: 2,
    explanation:
      "Manual testing excels at visual/UX validation, early prototyping with frequent UI changes, and exploratory or usability testing — scenarios requiring human judgment. Automated tools are better for repetitive, regression, and load tests.",
  },
  {
    week: 19,
    topic: "Manual testing",
    question:
      "Which is listed as a DISADVANTAGE of manual testing in the lectures?",
    options: [
      "It provides human insight and intuition",
      "It has a lower initial cost",
      "It is costly over time and time-consuming / slow",
      "It is effective in rapidly changing codebases",
    ],
    answer: 2,
    explanation:
      "The slides highlight (in yellow) that manual testing is 'Costly Over Time and Time-Consuming/Slow'. Other listed disadvantages include: not scalable, no CI/CD integration, hard to reproduce, and limited test coverage.",
  },

  // ── Performance Testing — general ─────────────────────────────────────────
  {
    week: 19,
    topic: "Performance testing",
    question: "Performance testing is classified as which type of testing?",
    options: [
      "Functional testing",
      "Regression testing",
      "Non-functional testing",
      "Acceptance testing",
    ],
    answer: 2,
    explanation:
      "The slides state explicitly: 'Performance testing is a non-functional testing technique used to determine how a software application performs under expected and peak workloads.'",
  },
  {
    week: 19,
    topic: "Performance testing — objectives",
    question:
      "Which of the following is NOT one of the five core objectives of performance testing listed in the lectures?",
    options: [
      "Response Time — measure how quickly the system responds to a request",
      "Throughput — evaluate the number of transactions the system can handle per second",
      "Code Coverage — track which lines of code are exercised by the test suite",
      "Stability — ensure the system does not crash under stress or over time",
    ],
    answer: 2,
    explanation:
      "The five objectives are: Response Time, Throughput, Scalability, Stability, and Resource Usage. Code Coverage is a unit/integration testing metric, not a performance testing objective.",
  },

  // ── Load vs Stress Testing (KEY EXAM AREA) ────────────────────────────────
  {
    week: 19,
    topic: "Load vs stress testing",
    question:
      "What is the key distinction between load testing and stress testing?",
    options: [
      "Load testing pushes the system beyond its limits to find the breaking point; stress testing checks behaviour under expected user load",
      "Load testing checks behaviour under expected (normal) user load; stress testing pushes the system beyond normal limits to find the breaking point",
      "They are synonyms — both terms describe the same performance testing technique",
      "Load testing is manual; stress testing is always automated",
    ],
    answer: 1,
    explanation:
      "Load testing = expected/typical conditions (focus: response time, throughput, normal behaviour). Stress testing = beyond normal limits (focus: stability, recovery, maximum capacity / breaking point). This distinction is a core exam topic.",
  },
  {
    week: 19,
    topic: "Load vs stress testing — scenario",
    question:
      "During performance testing of an e-commerce platform, testers gradually increase concurrent users. The system handles 1,000–4,999 users with acceptable response times, but becomes completely unresponsive when user count exceeds 5,000. What type of performance test produced this finding?",
    options: [
      "Load testing — because user load was gradually increased",
      "Spike testing — because there was a sudden change in users",
      "Stress testing — because the system was pushed beyond its normal capacity until it broke",
      "Endurance testing — because the test ran for a long duration",
    ],
    answer: 2,
    explanation:
      "Finding the point at which the system becomes unresponsive (the breaking point) is the definition of stress testing. Stress testing pushes beyond normal limits to determine maximum capacity and how/whether the system recovers. Load testing stays within the normal operating range.",
  },
  {
    week: 19,
    topic: "Load vs stress testing — scenario",
    question:
      "A team runs a performance test simulating 2,000 concurrent users — the expected peak during a holiday sale — and measures response times and throughput to ensure SLAs are met. This is an example of:",
    options: [
      "Stress testing",
      "Spike testing",
      "Load testing",
      "Endurance (soak) testing",
    ],
    answer: 2,
    explanation:
      "Load testing checks system behaviour under expected (normal/peak) user load with focus on response time, throughput, and system behaviour under typical conditions. The team is staying within the anticipated operating range.",
  },
  {
    week: 19,
    topic: "Load testing — focus areas",
    question:
      "The slides highlight (in yellow) the focus areas of Load Testing as:",
    options: [
      "Stability, recovery, and maximum capacity",
      "Response time, throughput, and system behaviour under typical conditions",
      "Memory leaks and long-term stability",
      "Sudden spikes and burst traffic",
    ],
    answer: 1,
    explanation:
      "The slides explicitly highlight load testing focus areas in yellow: 'Response time, throughput, and system behavior under typical conditions'. Stability/recovery/maximum capacity are the stress testing focus areas.",
  },
  {
    week: 19,
    topic: "Stress testing — focus areas",
    question:
      "The slides highlight (in yellow) the focus areas of Stress Testing as:",
    options: [
      "Response time, throughput, and system behaviour under typical conditions",
      "Memory leaks detected over a long run",
      "Stability, recovery, and maximum capacity",
      "Visual layout and UX validation",
    ],
    answer: 2,
    explanation:
      "Stress testing focus areas (highlighted in yellow in the slides) are: 'Stability, recovery, and maximum capacity.' The goal is to push beyond normal limits and find the breaking point.",
  },

  // ── Spike, Endurance, Volume Testing ─────────────────────────────────────
  {
    week: 19,
    topic: "Spike testing",
    question:
      "Which type of performance testing evaluates system behaviour during sudden increases or decreases in load — for example a flash-sale traffic burst?",
    options: [
      "Load testing",
      "Spike testing",
      "Endurance (soak) testing",
      "Volume testing",
    ],
    answer: 1,
    explanation:
      "Spike testing applies a sudden increase/decrease in load to evaluate how the system handles burst traffic. This differs from load testing (steady expected load) and stress testing (gradual ramp beyond limits).",
  },
  {
    week: 19,
    topic: "Endurance / soak testing",
    question:
      "A system is run under a constant moderate load for 48 hours to detect memory leaks and stability issues that only appear over time. This is:",
    options: [
      "Stress testing",
      "Volume testing",
      "Spike testing",
      "Endurance (soak) testing",
    ],
    answer: 3,
    explanation:
      "Endurance testing (also called soak testing) runs the system under constant load for an extended period to detect memory leaks or degradation that only surface over time.",
  },
  {
    week: 19,
    topic: "Volume testing",
    question:
      "Which performance testing type checks system performance when a large volume of data is present in the database or files?",
    options: [
      "Spike testing",
      "Scalability testing",
      "Volume testing",
      "Load testing",
    ],
    answer: 2,
    explanation:
      "Volume testing checks system performance with a large volume of data in the database or files — distinct from load testing, which focuses on concurrent users/requests.",
  },

  // ── Regression / Acceptance / Smoke ───────────────────────────────────────
  {
    week: 19,
    topic: "Regression testing",
    question: "Regression testing is best described as:",
    options: [
      "Testing new features before they are merged into the codebase",
      "Re-running existing tests after changes to ensure previously working functionality has not been broken",
      "Testing the system at loads far beyond normal to find the breaking point",
      "Manually walking through UI flows to check visual design",
    ],
    answer: 1,
    explanation:
      "Regression testing re-runs the existing test suite after code changes to catch unintended breakages. The slides mention using E2E tests during CI/CD pipelines specifically to prevent regressions.",
  },
  {
    week: 19,
    topic: "Smoke / sanity testing",
    question:
      "A very small set of tests is run immediately after a new build to verify that the most critical functionality works before more thorough testing begins. This is called:",
    options: [
      "Stress testing",
      "Smoke (sanity) testing",
      "Endurance testing",
      "Spike testing",
    ],
    answer: 1,
    explanation:
      "Smoke testing (sanity testing) is a lightweight 'does it even start and do the basics?' check run after a new build, before investing time in a full test suite.",
  },
  {
    week: 19,
    topic: "Acceptance testing",
    question:
      "Which type of testing validates that a system meets business requirements and is ready to be delivered to the customer?",
    options: [
      "Unit testing",
      "Spike testing",
      "Acceptance testing",
      "Volume testing",
    ],
    answer: 2,
    explanation:
      "Acceptance testing (User Acceptance Testing, UAT) confirms the system satisfies business/user requirements before release. It is distinct from technical tests (unit, integration) and from performance tests.",
  },

  // ── JMeter tooling ────────────────────────────────────────────────────────
  {
    week: 19,
    topic: "Performance testing tools",
    question:
      "Apache JMeter is highlighted in the lecture as a popular performance testing tool. Which of the following BEST describes JMeter?",
    options: [
      "A mobile app testing framework that uses WebDriver protocol",
      "An open-source load testing tool by Apache Software Foundation, XML/GUI-based, for web apps, APIs, and DB testing",
      "A JavaScript-based E2E testing tool focused on React/Vue/Angular front-ends",
      "A headless Chrome automation library maintained by Google",
    ],
    answer: 1,
    explanation:
      "JMeter is described as: open-source load testing tool, developed by Apache Software Foundation, configured via XML with GUI+CLI, best for web apps, APIs, and DB testing. Headless Chrome = Puppeteer; JS E2E = Cypress.",
  },
  {
    week: 19,
    topic: "Performance testing tools",
    question:
      "In a JMeter Test Plan, which core component simulates virtual users sending requests to the system under test?",
    options: [
      "Listeners — they collect results and generate reports",
      "Assertions — they validate responses",
      "Thread Group — it simulates virtual users",
      "Config Elements — they set variables and headers",
    ],
    answer: 2,
    explanation:
      "The Thread Group is the JMeter component that simulates virtual users. Samplers define the actual requests (HTTP, JDBC); Listeners collect results; Assertions validate responses; Config Elements set up variables and headers.",
  },
];

export default questions;
