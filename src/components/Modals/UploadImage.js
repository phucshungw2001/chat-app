import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../../FireBase/config";

const UploadImage = (files, onProgress, onError, onSuccess) => {
  if (!files || files.length === 0) return;

  const uploadedURLs = []; // Array to store download URLs of uploaded images

  const uploadNextImage = (index) => {
    if (index >= files.length) {
      // All images have been uploaded, invoke onSuccess with array of URLs
      onSuccess(uploadedURLs);
      return;
    }

    const file = files[index];
    const storageRef = ref(storage, `images/${file.name}-${Date.now()}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress(progress);
      },
      (error) => {
        onError(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          uploadedURLs.push(downloadURL);
          // Upload next image in the array
          uploadNextImage(index + 1);
        });
      }
    );
  };

  // Start uploading the first image
  uploadNextImage(0);
};

export default UploadImage;
