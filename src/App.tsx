import { Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { LessonPage } from "./pages/LessonPage";
import { QuizPage } from "./pages/QuizPage";
import { NotFound } from "./pages/NotFound";

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/lesson/:subjectId/:week" element={<LessonPage />} />
        <Route path="/quiz/:subjectId" element={<QuizPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
