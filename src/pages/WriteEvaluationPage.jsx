import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import courses from '../data/courses';
import { ArrowLeft, Star, Save, User } from 'lucide-react';

function WriteEvaluationPage() {
  const { courseCode, professorName } = useParams();
  const navigate = useNavigate();
  const { state, actions } = useApp();
  
  const [evaluation, setEvaluation] = useState({
    rating: 0,
    content: '',
    assignment: '',
    recommend: true,
    additionalComments: ''
  });

  const course = courses.find(c => c.code === courseCode);

  const handleBack = () => {
    const history = state.navigationHistory;
    if (history.length > 0) {
      actions.popHistory();
      navigate(history[history.length - 1]);
    } else {
      navigate(`/evaluation/${courseCode}/${professorName}`);
    }
  };

  const handleRatingClick = (rating) => {
    setEvaluation(prev => ({ ...prev, rating }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (evaluation.rating === 0) {
      alert('평점을 선택해주세요.');
      return;
    }
    
    if (!evaluation.content.trim()) {
      alert('수업 내용에 대한 평가를 작성해주세요.');
      return;
    }
    
    if (!evaluation.assignment.trim()) {
      alert('과제 및 시험에 대한 평가를 작성해주세요.');
      return;
    }

    // 강의평 저장
    const newEvaluation = {
      ...evaluation,
      date: new Date().toISOString(),
      studentId: state.user.studentId
    };

    actions.addEvaluation(courseCode, professorName, newEvaluation);
    
    alert('강의평이 성공적으로 저장되었습니다!');
    navigate(`/evaluation/${courseCode}/${professorName}`);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={24}
        className={`star-rating ${index < rating ? 'star-filled' : 'star-empty'}`}
        onClick={() => handleRatingClick(index + 1)}
      />
    ));
  };

  return (
    <div className="write-evaluation-container">
      <div className="page-header">
        <button onClick={handleBack} className="back-button">
          <ArrowLeft size={20} />
          이전으로
        </button>
        <h1>강의평 작성</h1>
      </div>

      {/* 강의 정보 */}
      <div className="course-info-card">
        <h2>{courseCode} - {course?.name}</h2>
        <div className="professor-info">
          <User size={18} />
          <span>{professorName} 교수</span>
        </div>
        {course && (
          <p className="course-description">{course.description}</p>
        )}
      </div>

      {/* 강의평 작성 폼 */}
      <form onSubmit={handleSubmit} className="evaluation-form">
        {/* 평점 */}
        <div className="form-section">
          <label className="form-label">
            전체 평점 <span className="required">*</span>
          </label>
          <div className="rating-input">
            {renderStars(evaluation.rating)}
            <span className="rating-text">
              {evaluation.rating > 0 ? `${evaluation.rating}/5` : '평점을 선택하세요'}
            </span>
          </div>
        </div>

        {/* 수업 내용 */}
        <div className="form-section">
          <label className="form-label">
            수업 내용에 대한 평가 <span className="required">*</span>
          </label>
          <textarea
            value={evaluation.content}
            onChange={(e) => setEvaluation(prev => ({ ...prev, content: e.target.value }))}
            placeholder="수업의 질, 교수님의 강의 스타일, 수업 진행 방식 등에 대해 자세히 작성해주세요."
            className="form-textarea"
            rows={4}
          />
        </div>

        {/* 과제 및 시험 */}
        <div className="form-section">
          <label className="form-label">
            과제 및 시험에 대한 평가 <span className="required">*</span>
          </label>
          <textarea
            value={evaluation.assignment}
            onChange={(e) => setEvaluation(prev => ({ ...prev, assignment: e.target.value }))}
            placeholder="과제의 양과 난이도, 시험 유형, 채점 기준 등에 대해 작성해주세요."
            className="form-textarea"
            rows={4}
          />
        </div>

        {/* 추천 여부 */}
        <div className="form-section">
          <label className="form-label">이 강의를 다른 학생들에게 추천하시겠습니까?</label>
          <div className="recommendation-options">
            <label className="radio-option">
              <input
                type="radio"
                name="recommend"
                checked={evaluation.recommend === true}
                onChange={() => setEvaluation(prev => ({ ...prev, recommend: true }))}
              />
              <span className="radio-text positive">👍 추천함</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="recommend"
                checked={evaluation.recommend === false}
                onChange={() => setEvaluation(prev => ({ ...prev, recommend: false }))}
              />
              <span className="radio-text negative">👎 추천하지 않음</span>
            </label>
          </div>
        </div>

        {/* 추가 의견 */}
        <div className="form-section">
          <label className="form-label">추가 의견 (선택사항)</label>
          <textarea
            value={evaluation.additionalComments}
            onChange={(e) => setEvaluation(prev => ({ ...prev, additionalComments: e.target.value }))}
            placeholder="기타 의견이나 조언이 있으시면 자유롭게 작성해주세요."
            className="form-textarea"
            rows={3}
          />
        </div>

        {/* 제출 버튼 */}
        <div className="form-actions">
          <button type="submit" className="submit-button">
            <Save size={18} />
            강의평 저장
          </button>
        </div>
      </form>
    </div>
  );
}

export default WriteEvaluationPage;