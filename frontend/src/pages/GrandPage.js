import { useParams } from "react-router-dom";
import subjects from '../data/subjects.json';
import { useEffect, useState } from 'react';

const GrandPage = () => {
  const { year } = useParams();
  const [mySubjects, setMySubjects] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("mySubjects") || "[]");
    setMySubjects(saved);
  }, []);

  const handleTakeCourse = (subjectCode) => {
    const updated = [...new Set([...mySubjects, subjectCode])];
    setMySubjects(updated);
    localStorage.setItem("mySubjects", JSON.stringify(updated));
    alert("수강 완료되었습니다!");
  };

  const filtered = subjects.filter(sub => sub.year.toString() === year);

  return (
    <div>
      <h2>{year}학년 전공 과목</h2>
      <ul>
        {filtered.map(sub => (
          <li key={sub.code}>
            {sub.name} ({sub.required ? "전공필수" : "전공선택"})
            <button onClick={() => handleTakeCourse(sub.code)}>수강 완료</button>
          </li>
        ))}
      </ul>
      <button onClick={() => window.history.back()}>이전으로</button>
    </div>
  );
};

export default GrandPage;
