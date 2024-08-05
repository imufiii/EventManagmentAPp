import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc, query, where, DocumentReference } from "firebase/firestore";
import { FIRESTORE_DB } from '../firebaseConfig';

export interface TaskProps {
  id: string;
  description: string;
  done: boolean;
  date: string;
  time: string;
}


export const loadTasks = async (): Promise<TaskProps[]> => {
  try {
    const snapshot = await getDocs(collection(FIRESTORE_DB, 'tasks'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as TaskProps }));
  } catch (error) {
    
    throw error;
  }
};


export const addTask = async (task: Omit<TaskProps, 'id'>): Promise<DocumentReference> => {
  try {
    const docRef = await addDoc(collection(FIRESTORE_DB, 'tasks'), task);
    
    return docRef;
  } catch (error) {
   
    throw error;
  }
};


export const updateTask = async (task: TaskProps): Promise<void> => {
  try {
    const taskRef = doc(FIRESTORE_DB, 'tasks', task.id);
    await updateDoc(taskRef, { done: task.done });
   
  } catch (error) {
    
    throw error;
  }
};


export const removeTask = async (taskId: string): Promise<void> => {
  try {
    const taskRef = doc(FIRESTORE_DB, 'tasks', taskId);
    await deleteDoc(taskRef);
    alert("Your Have removed the task Succenfully")
  } catch (error) {
    
    throw error;
  }
};
