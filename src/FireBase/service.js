import { db } from "./config";
import {
  getDocs,
  collection,
  query,
  where,
  addDoc,
  serverTimestamp,
  doc,
  deleteDoc,
  updateDoc 
} from "firebase/firestore";

export const addDocument = async (collectionName, data) => {
  try {
    await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: serverTimestamp(),
    });
    console.log("Document added successfully!");
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

export const deleteDocument = async (collectionName, documentId) => {
  try {
    const documentRef = doc(db, collectionName, documentId);

    await deleteDoc(documentRef);
    console.log("Document successfully deleted!");
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};

export const updateDocument = async (collectionName, documentId, data) => {
  try {
    const documentRef = doc(db, collectionName, documentId);

    await updateDoc(documentRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
    console.log("Document successfully updated!");
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

export const generateKeywords = (displayName) => {
  // liet ke tat cac hoan vi. vd: name = ["David", "Van", "Teo"]
  // => ["David", "Van", "Teo"], ["David", "Teo", "Van"], ["Teo", "David", "Van"],...
  const name = displayName.split(" ").filter((word) => word);

  const length = name.length;
  let flagArray = [];
  let result = [];
  let stringArray = [];

  /**
   * khoi tao mang flag false
   * dung de danh dau xem gia tri
   * tai vi tri nay da duoc su dung
   * hay chua
   **/
  for (let i = 0; i < length; i++) {
    flagArray[i] = false;
  }

  const createKeywords = (name) => {
    const arrName = [];
    let curName = "";
    name.split("").forEach((letter) => {
      curName += letter;
      arrName.push(curName);
    });
    return arrName;
  };

  function findPermutation(k) {
    for (let i = 0; i < length; i++) {
      if (!flagArray[i]) {
        flagArray[i] = true;
        result[k] = name[i];

        if (k === length - 1) {
          stringArray.push(result.join(" "));
        }

        findPermutation(k + 1);
        flagArray[i] = false;
      }
    }
  }

  findPermutation(0);

  const keywords = stringArray.reduce((acc, cur) => {
    const words = createKeywords(cur);
    return [...acc, ...words];
  }, []);

  return keywords;
};
