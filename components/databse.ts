import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  doc,
} from "firebase/firestore";
import { FIRESTORE_DB } from "../firebaseConfig";

export interface TaskProps {
  id: string;
  description: string;
  done: boolean;
  date: string;
  time: string;
}

const TASK_COLLECTION = "tasks";

export const loadTasks = async (): Promise<TaskProps[]> => {
  const taskCollection = collection(FIRESTORE_DB, TASK_COLLECTION);
  const taskSnapshot = await getDocs(taskCollection);
  const tasks: TaskProps[] = taskSnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as TaskProps)
  );
  return tasks;
};

export const addTask = async (task: Omit<TaskProps, "id">): Promise<any> => {
  const taskCollection = collection(FIRESTORE_DB, TASK_COLLECTION);
  const docRef = await addDoc(taskCollection, task);
  return docRef;
};

export const updateTask = async (task: TaskProps): Promise<void> => {
  const taskDoc = doc(FIRESTORE_DB, TASK_COLLECTION, task.id);
  await updateDoc(taskDoc, {
    description: task.description,
    done: task.done,
    date: task.date,
    time: task.time,
  });
};

export const removeTask = async (id: string): Promise<void> => {
  const taskDoc = doc(FIRESTORE_DB, TASK_COLLECTION, id);
  await deleteDoc(taskDoc);
};
