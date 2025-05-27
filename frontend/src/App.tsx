// src/App.tsx
import { ErrorBoundary } from './components/ErrorBoundary';
import { CourseList } from './components/CourseList';

function App() {
  return (
    <ErrorBoundary>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">전공 과목 이수 관리</h1>
        <CourseList />
      </div>
    </ErrorBoundary>
  );
}
