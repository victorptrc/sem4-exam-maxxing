import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";
import { LessonPage } from "./pages/LessonPage";
import { QuizPage } from "./pages/QuizPage";
import { Stats } from "./pages/Stats";
import { NotFound } from "./pages/NotFound";

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/subject/:subjectId" element={<Dashboard />} />
        <Route path="/lesson/:subjectId/:week" element={<LessonPage />} />
        <Route path="/quiz/:subjectId" element={<QuizPage />} />
        <Route path="/stats/:subjectId" element={<Stats />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
