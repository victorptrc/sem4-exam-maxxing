# Exam Maxxing

An interactive, extensible exam-prep app — first subject: the SDU **Component-Based
Systems** course. One
visual lesson per week + a 312-question practice quiz (15 official mock-exam
questions plus 20–26 per week). Built with Vite + React + TypeScript + Tailwind +
shadcn-style components. Fully client-side — no backend.

## Run it

```bash
cd study-app
npm install      # first time only
npm run dev      # open the printed http://localhost:5173 URL
```

Build a static version (deployable to any static host, e.g. Vercel/Netlify):

```bash
npm run build    # outputs to dist/
npm run preview  # preview the production build
```

It uses a hash router, so the built `dist/` also works when opened directly.

## How to study

1. Open the **Dashboard** → pick a week → read the lesson (expand the accordions,
   flip the flashcards, do the in-lesson quick check).
2. Use **Practice by week** to drill one topic, **Full exam** for an all-weeks
   shuffle, and **Mock exam** for the 15 official questions.
3. Best scores are saved in your browser (localStorage). Aim for 80%+ on the
   mock + full exam.

## Project structure

```
src/
  components/        reusable engine (subject-agnostic)
    ui/              shadcn-style primitives (button, card, accordion, tabs, …)
    Flashcard, Callout, Diagram, MiniQuiz, LessonLayout, quiz/*
  pages/             Dashboard, LessonPage, QuizPage
  lib/               questionBank, storage (localStorage), utils
  subjects/
    types.ts         Question / WeekMeta / Subject types
    index.ts         the subject REGISTRY
    component-based-systems/
      meta.ts        subject info + week titles/summaries
      lessons/WeekNN.tsx     one interactive lesson per week
      questions/weekNN.ts    one question array per week (+ mock.ts)
```

## Add another subject (it's data-driven)

1. Create `src/subjects/<your-subject>/` with a `meta.ts`, `lessons/*.tsx`, and
   `questions/*.ts` (copy the shape of `component-based-systems`).
2. Build a `Subject` in its `index.ts`.
3. Register it in `src/subjects/index.ts`.

The engine (components, quiz, routing, dashboard) is reused unchanged. A lesson is
just a component that composes `LessonSection`, `Callout`, `Diagram`,
`FlashcardDeck`, `Accordion`, and `MiniQuiz`; a question is
`{ week, topic, question, options[4], answer, explanation }`.

> Course materials live in `_materials/` (extracted lecture PDFs) — used only to
> author the content; not bundled into the app.
