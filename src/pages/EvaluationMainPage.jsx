import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import courses from '../data/courses';
import { ArrowLeft, Search, BookOpen } from 'lucide-react';

function EvaluationMainPage() {
  const navigate = useNavigate();
  const { state, actions } = useApp();
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedProfessor, setProfessor] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [availableProfessors, setAvailableProfessors] = useState([]);

  // 과목 선택 시 해당 과목의 교수 목록 업데이트
  useEffect(() => {
    if (selectedCourse) {
      const course = courses.find(c => c.code === selectedCourse);
      if (course) {
        setAvailableProfessors(course.professors);
        setProfessor(''); // 교수 선택 초기화
      }
    } else {
      setAvailableProfessors([]);
      setProfessor('');
    }
  }, [selectedCourse]);

  const handleBack = () => {
    const history = state.navigationHistory;
    if (history.length > 0) {
      actions.popHistory();
      navigate(history[history.length - 1]);
    } else {
      navigate('/grade');
    }
  };

  const handleSearch = () => {
    if (selectedCourse && selectedProfessor) {
      actions.pushHistory('/evaluation');
      navigate(`/evaluation/${selectedCourse}/${selectedProfessor}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // 검색어로 과목 필터링
  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCourseName = (courseCode) => {
    const course = courses.find(c => c.code === courseCode);
    return course ? course.name : courseCode;
  };

  return (
    <div className="evaluation-main-container">
      <div className="page-header">
        <button onClick={handleBack} className="back-button">
          <ArrowLeft size={20} />
          이전으로
        </button>
        <h1>강의평가 시스템</h1>
      </div>

      <div className="search-section">
        <div className="search-header">
          <BookOpen size={24} />
          <h2>강의평 검색</h2>
        </div>

        <div className="search-form">
          {/* 검색바 */}
          <div className="search-input-group">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="과목명 또는 과목코드로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              className="search-input"
            />
          </div>

          {/* 과목 선택 */}
          <div className="select-group">
            <label>과목 선택:</label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="course-select"
            >
              <option value="">-- 과목을 선택하세요 --</option>
              {filteredCourses.map(course => (
                <option key={course.code} value={course.code}>
                  {course.code} - {course.name}
                </option>
              ))}
            </select>
          </div>

          {/* 교수 선택 */}
          <div className="select-group">
            <label>교수 선택:</label>
            <select
              value={selectedProfessor}
              onChange={(e) => setProfessor(e.target.value)}
              className="professor-select"
              disabled={!selectedCourse}
            >
              <option value="">-- 교수를 선택하세요 --</option>
              {availableProfessors.map((prof, index) => (
                <option key={index} value={prof.name}>
                  {prof.name}
                </option>
              ))}
            </select>
          </div>

          {/* 검색 버튼 */}
          <button
            onClick={handleSearch}
            disabled={!selectedCourse || !selectedProfessor}
            className="search-button"
          >
            강의평 보기
          </button>
        </div>

        {/* 선택된 정보 표시 */}
        {selectedCourse && selectedProfessor && (
          <div className="selected-info">
            <h3>선택된 강의</h3>
            <p>
              <strong>과목:</strong> {selectedCourse} - {getCourseName(selectedCourse)}
            </p>
            <p>
              <strong>교수:</strong> {selectedProfessor}
            </p>
          </div>
        )}
      </div>

      {/* 최근 강의평 목록 (옵션) */}
      <div className="recent-evaluations">
        <h3>최근 작성된 강의평</h3>
        {Object.keys(state.evaluations).length === 0 ? (
          <p className="no-evaluations">아직 작성된 강의평이 없습니다.</p>
        ) : (
          <div className="recent-list">
            {Object.entries(state.evaluations).slice(-5).map(([key, evaluations]) => {
              const [courseCode, professorName] = key.split('_');
              return (
                <div key={key} className="recent-item">
                  <button
                    onClick={() => {
                      actions.pushHistory('/evaluation');
                      navigate(`/evaluation/${courseCode}/${professorName}`);
                    }}
                    className="recent-link"
                  >
                    {courseCode} - {getCourseName(courseCode)} ({professorName})
                    <span className="evaluation-count">
                      {evaluations.length}개의 평가
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default EvaluationMainPage;