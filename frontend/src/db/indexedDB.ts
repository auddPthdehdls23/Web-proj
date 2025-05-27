import { openDB } from 'idb';

const dbPromise = openDB('course-db', 1, {
  upgrade(db) {
    db.createObjectStore('courses', { keyPath: 'code' });
  }
});

export const saveCourse = async (course: any) => {
  const db = await dbPromise;
  await db.put('courses', course);
};

export const getAllCourses = async () => {
  const db = await dbPromise;
  return db.getAll('courses');
};
