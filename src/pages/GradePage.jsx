import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { BookOpen, CheckSquare, LogOut, ArrowLeft, MessageSquare } from 'lucide-react';

function GradePage() {
  const navigate = useNavigate();
  const { state, actions } = useApp();

  const handleGradeSelect = (year) => {
    actions.pushHistory('/grade');
    navigate(`/major/${year}`);
  };

  const handleCompletedCourses = () => {
    actions.pushHistory('/grade');
    navigate('/completed');
  };

  const handleEvaluation = () => {
    actions.pushHistory('/grade');
    navigate('/evaluation');
  };

  const handleLogout = () => {
    actions.logout();
    navigate('/login');
  };

  const handleBack = () => {
    navigate('/login');
  };

  return (
    <div className="grade-container">
      <div className="page-header">
        <button onClick={handleBack} className="back-button">
          <ArrowLeft size={20} />
          이전으로
        </button>
        <h1>학년별 전공과목</h1>
        <div className="user-info">
          학번: {state.user?.studentId}
        </div>
      </div>

      <div className="grade-grid">
        {[1, 2, 3, 4].map(year => (
          <div key={year} className="grade-card" onClick={() => handleGradeSelect(year)}>
            <BookOpen size={48} className="grade-icon" />
            <h2>{year}학년</h2>
            <p>{year}학년 전공과목 보기</p>
          </div>
        ))}
      </div>

      <div className="action-buttons">
        <button onClick={handleCompletedCourses} className="action-button completed">
          <CheckSquare size={20} />
          수강 과목 확인하기
        </button>
        
        <button onClick={handleEvaluation} className="action-button evaluation">
          <MessageSquare size={20} />
          강의평가 시스템
        </button>
        
        <button onClick={handleLogout} className="action-button logout">
          <LogOut size={20} />
          로그아웃
        </button>
      </div>
    </div>
  );
}

export default GradePage;