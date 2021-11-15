import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import MemoryForm from "../Components/Memory/MemoryForm"
import { mockMemory } from "../Data/memory"

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { db } from "../firebase";
import { ImageList } from "@material-ui/core";

import { arrayUnion, updateDoc } from "firebase/firestore"

async function uploadImageFile(files, storageRef) {
    if (!files) return null;
    const promises = files.map((file) => {
      const ref = storageRef.child(`photos${file.name}`);
      return ref.put(file).then(() => ref.getDownloadURL());
    });

    const downloadURLs = await Promise.all(promises);
    return downloadURLs;



    // if (!files) return null;
    // const promises = files.map((file) => {
    //     console.log(file)
    //     const ref = storageRef.child(`photos${file.name}`);
    //     console.log(ref)
    //     const storage = getStorage();
    //     const metadata = {
    //         contentType: 'image/jpeg'
    //     };
    //     // const imgRef = ref(storage, 'images/' + file.name);
    //     const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    //     uploadTask.on('state_changed',
    //         (snapshot) => {
    //         // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    //         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //         console.log('Upload is ' + progress + '% done');
    //         switch (snapshot.state) {
    //             case 'paused':
    //             console.log('Upload is paused');
    //             break;
    //             case 'running':
    //             console.log('Upload is running');
    //             break;
    //         }
    //         }, 
    //         (error) => {
    //         // A full list of error codes is available at
    //         // https://firebase.google.com/docs/storage/web/handle-errors
    //         switch (error.code) {
    //             case 'storage/unauthorized':
    //             // User doesn't have permission to access the object
    //             break;
    //             case 'storage/canceled':
    //             // User canceled the upload
    //             break;
        
    //             // ...
        
    //             case 'storage/unknown':
    //             // Unknown error occurred, inspect error.serverResponse
    //             break;
    //         }
    //         }, 
    //         () => {
    //         // Upload completed successfully, now we can get the download URL
    //         return getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //             console.log('File available at', downloadURL);
    //         });
    //     })


        // console.log(ref)
        // return ref.set(file).then(() => ref.getDownloadURL());
    // });

    // const downloadURLs = await Promise.all(promises);
    // return downloadURLs;
}

const MemoryAdd = ({ bucketRef, memoryRef, storageRef }) => {
    const { bid } = useParams();
    const [newId, setNewId] = useState(null);
    const [wish, setWish] = useState(null);
    const [memory, setMemory] = useState({
        text: "", title: "", date: "", pictures: []
    });
    const [pictures, setPictures] = useState([]);
    const [urls, setUrl] = useState(null);
    const [pictureLoading, setPictureLoading] = useState(false);
    const [pictureFiles, setPictureFiles] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        async function fetchPicture() {
            const downloadURLs = await uploadImageFile(pictureFiles, storageRef);
            setPictures(pictures => {
                if(!pictures) return null;
                const oldPictures = pictures.slice(0, pictures.length - pictureFiles.length)
                return [...oldPictures, ...downloadURLs]
            });
            setPictureLoading(false)
            setPictureFiles([])
        }
    
        if (pictureLoading === true) {
            fetchPicture()
        }
    }, [pictureLoading, pictureFiles, storageRef])

    const handleChange = (e) => {
        console.log(e.target.files)
        if(e.target.files) {
            setPictures(e.target.files);
        }
    }

    const handleUpload = () => {
        const promises = []
        if(!pictures) return
        console.log(pictures)
        for(var i=0; i<pictures.length; i++) {
            const image = pictures[i]
            const uploadTask = db.ref(`images/${image.name}`).put(image);
            promises.push(uploadTask)
            uploadTask.on(
                "state_changed", 
                (snapshot) => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgress(progress);
                },
                (error) => {
                    console.log(error);
                },
                async () => {
                    await db.ref("pictures").child(image.name)
                        .getDownloadURL().then((urls) => {
                            setUrl((prevState) => [...prevState, urls]);
                        })
                }
            )
        }

        Promise.all(promises).then(() => alert("done"))
            .catch((err) => console.log(err))
    }

    const onSubmit = ({ title, date, text, comments }) => {
        const newMemory = {
            ...memory,
            title,
            date,
            text,
            pictures: pictures,
            // comments,
        };
        console.log(newMemory, memoryRef)
        memoryRef.add(newMemory).then(snapshot => {
            updateDoc(bucketRef.doc(bid), {memories: arrayUnion(snapshot)})
            setNewId(snapshot.id)
            console.log(snapshot)
        })
    };

    const onSubmitPictures = (selected) => {
        const loadings = selected.map(item => 'loading')
        setPictureLoading(true)
        setPictureFiles(selected)
        console.log(selected, pictures)
        setPictures([...pictures, ...loadings])
    };
        
    const removePicture = (pic) => {
        setPictures(pictures.filter((item) => item !== pic));
    };

    if(!memory) return null;

    return (
        <div className="memory">
            <MemoryForm
                wish={wish}
                memory={memory}
                onSubmit={onSubmit}
                pictures={pictures}
                urls={urls}
                progress={progress}
                removePicture={removePicture}
                onSubmitPictures={onSubmitPictures}
                handleChange={handleChange}
                handleUpload={handleUpload}
                newId={newId}
            />
        </div>
    );
};

export default MemoryAdd;