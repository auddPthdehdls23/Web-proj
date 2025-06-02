import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import courses from '../data/courses';
import { ArrowLeft, Star, User, Calendar, Edit3 } from 'lucide-react';

function EvaluationDetailPage() {
  const { courseCode, professorName } = useParams();
  const navigate = useNavigate();
  const { state, actions } = useApp();

  const course = courses.find(c => c.code === courseCode);
  const evaluationKey = `${courseCode}_${professorName}`;
  const evaluations = state.evaluations[evaluationKey] || [];

  const handleBack = () => {
    const history = state.navigationHistory;
    if (history.length > 0) {
      actions.popHistory();
      navigate(history[history.length - 1]);
    } else {
      navigate('/evaluation');
    }
  };

  const handleWriteEvaluation = () => {
    actions.pushHistory(`/evaluation/${courseCode}/${professorName}`);
    navigate(`/write-evaluation/${courseCode}/${professorName}`);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        className={index < rating ? 'star-filled' : 'star-empty'}
      />
    ));
  };

  const calculateAverageRating = () => {
    if (evaluations.length === 0) return 0;
    const total = evaluations.reduce((sum, evaluation) => sum + evaluation.rating, 0);
    return (total / evaluations.length).toFixed(1);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="evaluation-detail-container">
      <div className="page-header">
        <button onClick={handleBack} className="back-button">
          <ArrowLeft size={20} />
          이전으로
        </button>
        <h1>강의평가</h1>
      </div>

      {/* 강의 정보 */}
      <div className="course-info-card">
        <div className="course-header">
          <div className="course-details">
            <h2>{courseCode} - {course?.name}</h2>
            <div className="professor-info">
              <User size={18} />
              <span>{professorName} 교수</span>
            </div>
            {course && (
              <div className="course-meta">
                <span className="year-info">{course.year}학년</span>
                <span className="description">{course.description}</span>
              </div>
            )}
          </div>
          <div className="rating-summary">
            <div className="average-rating">
              <span className="rating-number">{calculateAverageRating()}</span>
              <div className="rating-stars">
                {renderStars(Math.round(calculateAverageRating()))}
              </div>
              <span className="rating-count">({evaluations.length}개 평가)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 강의평 작성 버튼 */}
      <div className="write-evaluation-section">
        <button onClick={handleWriteEvaluation} className="write-button">
          <Edit3 size={18} />
          강의평 작성하기
        </button>
      </div>

      {/* 강의평 목록 */}
      <div className="evaluations-section">
        <h3>강의평 목록</h3>
        
        {evaluations.length === 0 ? (
          <div className="no-evaluations">
            <p>아직 작성된 강의평이 없습니다.</p>
            <p>첫 번째 강의평을 작성해보세요!</p>
          </div>
        ) : (
          <div className="evaluations-list">
            {evaluations.map((evaluation, index) => (
              <div key={index} className="evaluation-card">
                <div className="evaluation-header">
                  <div className="rating-info">
                    <div className="stars">
                      {renderStars(evaluation.rating)}
                    </div>
                    <span className="rating-text">{evaluation.rating}/5</span>
                  </div>
                  <div className="evaluation-date">
                    <Calendar size={14} />
                    {formatDate(evaluation.date)}
                  </div>
                </div>
                
                <div className="evaluation-content">
                  <div className="evaluation-section">
                    <h4>수업 내용</h4>
                    <p>{evaluation.content}</p>
                  </div>
                  
                  <div className="evaluation-section">
                    <h4>과제 및 시험</h4>
                    <p>{evaluation.assignment}</p>
                  </div>
                  
                  <div className="evaluation-section">
                    <h4>추천 여부</h4>
                    <p className={`recommendation ${evaluation.recommend ? 'positive' : 'negative'}`}>
                      {evaluation.recommend ? '👍 추천함' : '👎 추천하지 않음'}
                    </p>
                  </div>
                  
                  {evaluation.additionalComments && (
                    <div className="evaluation-section">
                      <h4>추가 의견</h4>
                      <p>{evaluation.additionalComments}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default EvaluationDetailPage;