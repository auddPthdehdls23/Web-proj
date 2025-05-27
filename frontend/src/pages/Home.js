import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleGradeClick = (grade) => {
    navigate(`/grade/${grade}`);
  };

  return (
    <div>
      <h1>컴퓨터공학부 전공 강의 웹사이트</h1>
      <h2>학년 선택</h2>
      {[1, 2, 3, 4].map((grade) => (
        <button key={grade} onClick={() => handleGradeClick(grade)}>
          {grade}학년
        </button>
      ))}
      <br />
      <button onClick={() => navigate('/my-subjects')}>내가 수강한 과목</button>
    </div>
  );
};

export default Home;
