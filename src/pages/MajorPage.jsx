import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import courses from '../data/courses';
import { ArrowLeft, CheckCircle, Circle, User, Link } from 'lucide-react';

function MajorPage() {
  const { year } = useParams();
  const navigate = useNavigate();
  const { state, actions } = useApp();

  const yearCourses = courses.filter(course => course.year === parseInt(year));
  
  const handleBack = () => {
    const history = state.navigationHistory;
    if (history.length > 0) {
      actions.popHistory();
      navigate(history[history.length - 1]);
    } else {
      navigate('/grade');
    }
  };

  const handleCompleteCourse = (course) => {
    const isCompleted = state.completedCourses.some(c => c.code === course.code);
    
    if (isCompleted) {
      actions.uncompleteCourse(course.code);
    } else {
      actions.completeCourse({
        code: course.code,
        name: course.name,
        professor: course.professors[0].name // 첫 번째 교수를 기본으로
      });
    }
  };

  const handlePrerequisiteClick = (prereqCode) => {
    const prereqCourse = courses.find(c => c.code === prereqCode);
    if (prereqCourse) {
      actions.pushHistory(`/major/${year}`);
      navigate(`/major/${prereqCourse.year}`);
    }
  };

  const handleProfessorClick = (courseCode, professorName) => {
    actions.pushHistory(`/major/${year}`);
    navigate(`/evaluation/${courseCode}/${professorName}`);
  };

  const isCompleted = (courseCode) => {
    return state.completedCourses.some(c => c.code === courseCode);
  };

  return (
    <div className="major-container">
      <div className="page-header">
        <button onClick={handleBack} className="back-button">
          <ArrowLeft size={20} />
          이전으로
        </button>
        <h1>{year}학년 전공과목</h1>
      </div>

      <div className="courses-table-container">
        <table className="courses-table">
          <thead>
            <tr>
              <th>과목코드</th>
              <th>과목명</th>
              <th>과목설명</th>
              <th>선수과목</th>
              <th>교수명</th>
              <th>수강완료</th>
            </tr>
          </thead>
          <tbody>
            {yearCourses.map(course => (
              <tr key={course.code}>
                <td className="course-code">{course.code}</td>
                <td className="course-name">{course.name}</td>
                <td className="course-description">{course.description}</td>
                <td className="prerequisites">
                  {course.prerequisites.length > 0 ? (
                    course.prerequisites.map(prereq => (
                      <button
                        key={prereq}
                        onClick={() => handlePrerequisiteClick(prereq)}
                        className="prerequisite-link"
                      >
                        <Link size={14} />
                        {prereq}
                      </button>
                    ))
                  ) : (
                    <span className="no-prerequisites">없음</span>
                  )}
                </td>
                <td className="professors">
                  {course.professors.map((prof, index) => (
                    <button
                      key={index}
                      onClick={() => handleProfessorClick(course.code, prof.name)}
                      className="professor-link"
                    >
                      <User size={14} />
                      {prof.name}
                    </button>
                  ))}
                </td>
                <td className="completion-status">
                  <button
                    onClick={() => handleCompleteCourse(course)}
                    className={`completion-button ${isCompleted(course.code) ? 'completed' : ''}`}
                  >
                    {isCompleted(course.code) ? (
                      <>
                        <CheckCircle size={18} />
                        완료
                      </>
                    ) : (
                      <>
                        <Circle size={18} />
                        미완료
                      </>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MajorPage;