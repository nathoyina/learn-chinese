import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScenarioList from "./components/ScenarioList";
import ConversationPlayer from "./components/ConversationPlayer";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <Routes>
          <Route path="/" element={<ScenarioList />} />
          <Route path="/practice/:scenarioId" element={<ConversationPlayer />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
