import { collection, addDoc, updateDoc, deleteDoc, getDocs, doc } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebaseConfig";

export interface TaskProps {
  id: string;
  description: string;
  done: boolean;
  date: string;
  time: string;
}


const getUserCollection = (userId: string) => collection(FIRESTORE_DB, `users/${userId}/tasks`);


export const loadTasks = async (userId: string): Promise<TaskProps[]> => {
  const taskCollection = getUserCollection(userId);
  const taskSnapshot = await getDocs(taskCollection);
  const tasks: TaskProps[] = taskSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  } as TaskProps));
  return tasks;
};


export const addTask = async (userId: string, task: Omit<TaskProps, "id">): Promise<any> => {
  const taskCollection = getUserCollection(userId);
  const docRef = await addDoc(taskCollection, task);
  return docRef;
};


export const updateTask = async (userId: string, task: TaskProps): Promise<void> => {
  const taskDoc = doc(FIRESTORE_DB, `users/${userId}/tasks`, task.id);
  await updateDoc(taskDoc, {
    description: task.description,
    done: task.done,
    date: task.date,
    time: task.time,
  });
};


export const removeTask = async (userId: string, id: string): Promise<void> => {
  const taskDoc = doc(FIRESTORE_DB, `users/${userId}/tasks`, id);
  await deleteDoc(taskDoc);
};
