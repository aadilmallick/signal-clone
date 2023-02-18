import React, { useEffect, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import uuid from "react-native-uuid";
// * for some reason you always have to import auth to be on the safe side instead of using getAuth()
import { auth } from "../firebase.config";
const storage = getStorage();

export const useUpload = (folder) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [isCancelled, setIsCancelled] = useState(false);

  /**
   *
   * @param {File} file
   * @returns string
   */
  const uploadFile = async (file) => {
    setIsLoading(true);
    try {
      console.log(auth.currentUser);
      if (!auth.currentUser) {
        throw Error("user not authorized");
      }
      const uploadPath = `${folder}/${auth.currentUser.uid}/${file.name}`;
      const storageRef = ref(storage, uploadPath);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      if (!isCancelled) {
        setIsLoading(false);
      }

      return url;
    } catch (e) {
      console.log(e);
      if (!isCancelled) {
        setIsError(e.message);
        setIsLoading(false);
      }
    }
  };

  /**
   *
   * @param {string} uri: the file data name you get from the image picker
   * @returns {string} the download url stored in firebase storage
   */
  const uploadImageBlob = async (uri) => {
    setIsLoading(true);
    try {
      const blob = await createBlob(uri);
      //   console.log("blob data", blob.data);
      const uploadPath = `${folder}/${blob.data.name}`;
      const storageRef = ref(storage, uploadPath);
      await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(storageRef);
      blob.close();
      return url;
    } catch (e) {
      console.error(e);
    } finally {
      if (!isCancelled) {
        setIsLoading(false);
      }
    }
  };

  /**
   *
   * @param {*} uri
   * @returns {Blob}
   */
  async function createBlob(uri) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
    return blob;
  }

  useEffect(() => {
    setIsCancelled(false);
    return () => setIsCancelled(true);
  }, []);

  return { isLoading, isError, uploadFile, uploadImageBlob };
};
