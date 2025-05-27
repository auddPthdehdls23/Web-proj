// src/components/CourseList.tsx
import { CourseItem } from './CourseItem';
import courses from '../data/courses.json'; // 미리 정의된 JSON 사용

export const CourseList = () => {
  return (
    <div className="grid gap-2">
      {courses.map(course => (
        <CourseItem key={course.code} code={course.code} name={course.name} />
      ))}
    </div>
  );
};
