import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';

// 페이지 컴포넌트들
import LoginPage from './pages/LoginPage';
import GradePage from './pages/GradePage';
import MajorPage from './pages/MajorPage';
import CompletedCoursesPage from './pages/CompletedCoursesPage';
import EvaluationMainPage from './pages/EvaluationMainPage';
import EvaluationDetailPage from './pages/EvaluationDetailPage';
import WriteEvaluationPage from './pages/WriteEvaluationPage';

// 스타일
import './App.css';

// 보호된 라우트 컴포넌트
function ProtectedRoute({ children }) {
  const { state } = useApp();
  return state.user ? children : <Navigate to="/login" replace />;
}

// 라우터 컴포넌트
function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/grade" element={
          <ProtectedRoute>
            <GradePage />
          </ProtectedRoute>
        } />
        <Route path="/major/:year" element={
          <ProtectedRoute>
            <MajorPage />
          </ProtectedRoute>
        } />
        <Route path="/completed" element={
          <ProtectedRoute>
            <CompletedCoursesPage />
          </ProtectedRoute>
        } />
        <Route path="/evaluation" element={
          <ProtectedRoute>
            <EvaluationMainPage />
          </ProtectedRoute>
        } />
        <Route path="/evaluation/:courseCode/:professorName" element={
          <ProtectedRoute>
            <EvaluationDetailPage />
          </ProtectedRoute>
        } />
        <Route path="/write-evaluation/:courseCode/:professorName" element={
          <ProtectedRoute>
            <WriteEvaluationPage />
          </ProtectedRoute>
        } />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

// 메인 App 컴포넌트
function App() {
  return (
    <AppProvider>
      <div className="app">
        <AppRouter />
      </div>
    </AppProvider>
  );
}

export default App;