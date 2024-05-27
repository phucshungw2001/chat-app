import React, { useState, useEffect } from "react";
import { db } from "../FireBase/config";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";

const useFirestore = (collections, condition) => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    let collectionRef = query(collection(db, collections), orderBy("createdAt"));
    if (condition) {
      if (!condition.value || condition.value.length === 0) {
        return;
      }
      collectionRef = query(
        collection(db, collections),
        where(condition.fieldName, condition.operator, condition.value),
        orderBy("createdAt")
      );
    }

    const unsub = onSnapshot(collectionRef, (snapshot) => {
      const documents = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setDocuments(documents);
    });

    return () => unsub();
  }, [collections, condition]);

  return documents;
};

export default useFirestore;
