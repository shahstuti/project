import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Settings from "./pages/Settings";
import Questions from "./pages/Questions";
import FinalScreen from "./pages/FinalScreen";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-6 px-4 sm:py-12 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Logo and heading */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-md">
              <img src="/quiz-app.svg" alt="BrainQuest" className="h-14 w-auto" />
            </div>
          </div>

          {/* Main content card */}
          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in">
            <div className="relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-400 to-accent-400"></div>
              <div className="hidden md:block absolute -top-24 -right-24 w-48 h-48 rounded-full bg-primary-100/50 blur-2xl"></div>
              <div className="hidden md:block absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-accent-100/50 blur-2xl"></div>
              
              {/* Content */}
              <div className="relative p-6 sm:p-10">
                <Routes>
                  <Route path="/" element={
                    <>
                      <h1 className="text-4xl sm:text-5xl font-bold text-primary-700 mb-2 text-center">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-accent-500">
                          BrainQuest
                        </span>
                      </h1>
                      <p className="text-center text-secondary-600 mb-8">Test your knowledge with our interactive quiz</p>
                      <div className="animate-slide-up">
                        <Settings />
                      </div>
                    </>
                  } />
                  <Route path="/questions" element={<Questions />} />
                  <Route path="/score" element={<FinalScreen />} />
                </Routes>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="mt-8 text-center text-secondary-500 text-sm">
            <p>© 2025 BrainQuest Quiz App</p>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
