import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AppContext = createContext();

// 초기 상태
const initialState = {
  user: null,
  completedCourses: [],
  evaluations: {},
  navigationHistory: []
};

// 액션 타입
const actionTypes = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  COMPLETE_COURSE: 'COMPLETE_COURSE',
  UNCOMPLETE_COURSE: 'UNCOMPLETE_COURSE',
  ADD_EVALUATION: 'ADD_EVALUATION',
  PUSH_HISTORY: 'PUSH_HISTORY',
  POP_HISTORY: 'POP_HISTORY',
  CLEAR_HISTORY: 'CLEAR_HISTORY'
};

// 리듀서
function appReducer(state, action) {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        user: { studentId: action.payload }
      };
    
    case actionTypes.LOGOUT:
      return {
        ...initialState
      };
    
    case actionTypes.COMPLETE_COURSE:
      const newCompleted = [...state.completedCourses];
      if (!newCompleted.find(c => c.code === action.payload.code)) {
        newCompleted.push(action.payload);
      }
      return {
        ...state,
        completedCourses: newCompleted
      };
    
    case actionTypes.UNCOMPLETE_COURSE:
      return {
        ...state,
        completedCourses: state.completedCourses.filter(c => c.code !== action.payload)
      };
    
    case actionTypes.ADD_EVALUATION:
      const { courseCode, professorName, evaluation } = action.payload;
      const key = `${courseCode}_${professorName}`;
      return {
        ...state,
        evaluations: {
          ...state.evaluations,
          [key]: [...(state.evaluations[key] || []), evaluation]
        }
      };
    
    case actionTypes.PUSH_HISTORY:
      return {
        ...state,
        navigationHistory: [...state.navigationHistory, action.payload]
      };
    
    case actionTypes.POP_HISTORY:
      const newHistory = [...state.navigationHistory];
      newHistory.pop();
      return {
        ...state,
        navigationHistory: newHistory
      };
    
    case actionTypes.CLEAR_HISTORY:
      return {
        ...state,
        navigationHistory: []
      };
    
    default:
      return state;
  }
}

// Context Provider
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // 액션 함수들
  const actions = {
    login: (studentId) => dispatch({ type: actionTypes.LOGIN, payload: studentId }),
    logout: () => dispatch({ type: actionTypes.LOGOUT }),
    completeCourse: (course) => dispatch({ type: actionTypes.COMPLETE_COURSE, payload: course }),
    uncompleteCourse: (courseCode) => dispatch({ type: actionTypes.UNCOMPLETE_COURSE, payload: courseCode }),
    addEvaluation: (courseCode, professorName, evaluation) => 
      dispatch({ type: actionTypes.ADD_EVALUATION, payload: { courseCode, professorName, evaluation } }),
    pushHistory: (path) => dispatch({ type: actionTypes.PUSH_HISTORY, payload: path }),
    popHistory: () => dispatch({ type: actionTypes.POP_HISTORY }),
    clearHistory: () => dispatch({ type: actionTypes.CLEAR_HISTORY })
  };

  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  );
}

// 커스텀 훅
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}