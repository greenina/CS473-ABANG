import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import closeButton from "../Icons/CloseButtonGreen.png"

import MemoryForm from "../Components/Memory/MemoryForm"
import { mockMemory } from "../Data/memory"

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { db } from "../firebase";
import { ImageList } from "@material-ui/core";

import "../Components/Memory/Memory.css"

const group = "groupB"

async function uploadImageFile(files, storageRef) {
    if (!files) return null;
    const promises = files.map((file) => {
      const ref = storageRef.child(`photos${file.name}`);
      return ref.put(file).then(() => ref.getDownloadURL());
    });

    const downloadURLs = await Promise.all(promises);
    return downloadURLs;
}

const MemoryEdit = ({ bucketRef, memoryRef, storageRef }) => {
    const { bid, id } = useParams();
    const [wish, setWish] = useState(null);
    const [bucket, setBucket] = useState(null);
    const [memory, setMemory] = useState(null);
    const [pictures, setPictures] = useState(null);
    const [urls, setUrl] = useState(null);
    const [pictureLoading, setPictureLoading] = useState(false);
    const [pictureFiles, setPictureFiles] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        bucketRef.doc(bid).get().then(s => setBucket(s.data()))
    }, [bid])

    useEffect(() => {
        if(!memoryRef) return;
        memoryRef.doc(id).get().then((snapshot) => {
            setMemory(snapshot.data());
        });
    }, [memoryRef]);

    useEffect(() => {
        if(!memory) return;
        setPictures(memory.pictures);
    }, [memory]);

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

    const onSubmit = async ({ title, date, text, comments }) => {
        const newMemory = {
            ...memory,
            title,
            date,
            text,
            pictures: pictures,
            comments,
        };
        console.log(newMemory)
        await memoryRef.doc(id).set(newMemory);
        await window.location.replace(`/bucket/${bid}/memory/${id}`)
    };

    const onSubmitPictures = (selected) => {
        const loadings = selected.map(item => 'loading')
        setPictureLoading(true)
        setPictureFiles(selected)
        if(!pictures) setPictures([...loadings])
        else setPictures([...pictures, ...loadings])
    };
        
    const removePicture = (pic) => {
        setPictures(pictures.filter((item) => item !== pic));
    };

    if(!memory) return null;
    if(!bucket) return null

    return (
        <div className="memory">
            <Link to={`/bucket/${bid}/memory/${id}`} className="close-button"><img src={closeButton} width="100%" /></Link>
            <div className="header">Our Bucket list</div>
            <div className="memory-bucket">{ bucket.text }</div>
            <div className="memory-container">
                <MemoryForm
                    id={id}
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
                />
            </div>
        </div>
    );
};

export default MemoryEdit;