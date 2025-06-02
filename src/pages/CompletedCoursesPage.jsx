import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Edit3, BookOpen } from 'lucide-react';

function CompletedCoursesPage() {
  const navigate = useNavigate();
  const { state, actions } = useApp();

  const handleBack = () => {
    const history = state.navigationHistory;
    if (history.length > 0) {
      actions.popHistory();
      navigate(history[history.length - 1]);
    } else {
      navigate('/grade');
    }
  };

  const handleWriteEvaluation = (courseCode, professorName) => {
    actions.pushHistory('/completed');
    navigate(`/write-evaluation/${courseCode}/${professorName}`);
  };

  return (
    <div className="completed-courses-container">
      <div className="page-header">
        <button onClick={handleBack} className="back-button">
          <ArrowLeft size={20} />
          이전으로
        </button>
        <h1>수강 완료 과목</h1>
      </div>

      {state.completedCourses.length === 0 ? (
        <div className="empty-state">
          <BookOpen size={64} className="empty-icon" />
          <h2>수강 완료한 과목이 없습니다</h2>
          <p>각 학년 페이지에서 과목을 수강 완료로 표시해주세요.</p>
        </div>
      ) : (
        <div className="completed-table-container">
          <table className="completed-table">
            <thead>
              <tr>
                <th>과목코드</th>
                <th>과목명</th>
                <th>교수명</th>
                <th>강의평 작성</th>
              </tr>
            </thead>
            <tbody>
              {state.completedCourses.map(course => (
                <tr key={`${course.code}_${course.professor}`}>
                  <td className="course-code">{course.code}</td>
                  <td className="course-name">{course.name}</td>
                  <td className="professor-name">{course.professor}</td>
                  <td className="evaluation-action">
                    <button
                      onClick={() => handleWriteEvaluation(course.code, course.professor)}
                      className="write-evaluation-button"
                    >
                      <Edit3 size={16} />
                      강의평 쓰기
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default CompletedCoursesPage;