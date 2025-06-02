import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { User, Lock } from 'lucide-react';

function LoginPage() {
  const [studentId, setStudentId] = useState('');
  const [error, setError] = useState('');
  const { actions } = useApp();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // 8자리 숫자 검증
    if (!/^\d{9}$/.test(studentId)) {
      setError('학번은 9자리 숫자여야 합니다.');
      return;
    }

    // 로그인 처리
    actions.login(studentId);
    actions.clearHistory();
    navigate('/grade');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <User size={48} className="login-icon" />
          <h1>컴퓨터공학부 강의평가 시스템</h1>
          <p>학번을 입력하여 로그인하세요</p>
        </div>
        
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <Lock size={20} className="input-icon" />
            <input
              type="text"
              value={studentId}
              onChange={(e) => {
                setStudentId(e.target.value);
                setError('');
              }}
              placeholder="학번 9자리 입력"
              maxLength={9}
              className="login-input"
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button type="submit" className="login-button">
            로그인
          </button>
        </form>
        
        <div className="login-footer">
          <p>예시: 202012345</p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;