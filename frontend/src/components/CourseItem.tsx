import { useLocalStorage } from '../hooks/useLocalStorage';

interface Props {
  code: string;
  name: string;
}

export const CourseItem = ({ code, name }: Props) => {
  const [completed, setCompleted] = useLocalStorage<string[]>('completedCourses', []);
  const isCompleted = completed.includes(code);

  const toggleCompleted = () => {
    setCompleted(
      isCompleted ? completed.filter(c => c !== code) : [...completed, code]
    );
  };

  return (
    <div className="border p-2 flex justify-between items-center">
      <span>{name}</span>
      <button
        onClick={toggleCompleted}
        className={`px-2 py-1 rounded ${isCompleted ? 'bg-green-400' : 'bg-gray-200'}`}
      >
        {isCompleted ? '완료' : '미완료'}
      </button>
    </div>
  );
};
