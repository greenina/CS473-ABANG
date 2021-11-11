import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "../Components/Memory/Memory.css"

import MemoryForm from "../Components/Memory/MemoryForm"
import { mockMemory } from "../Data/memory"

function getMemory(id, memoryList) {
    const memory = memoryList[String(id)];
    if (!memory) {
      console.log(`No such memory: ${id}`);
      return mockMemory;
    }
    return memory;
}

async function uploadImageFile(files, storageRef) {
    if (!files) return null;
    const promises = files.map((file) => {
        const ref = storageRef.child(`photos${file.name}`);
        return ref.put(file).then(() => ref.getDownloadURL());
    });

    const downloadURLs = await Promise.all(promises);
    return downloadURLs;
}

const MemoryEdit = ({ memoryRef, storageRef }) => {
    const { id } = useParams();
    const [memory, setMemory] = useState(mockMemory);
    const [pictures, setPictures] = useState([]);
    const [pictureLoading, setPictureLoading] = useState(false)
    const [pictureFiles, setPictureFiles] = useState(false)

    useEffect(() => {
        if(!memoryRef) return;
        memoryRef.doc(id).get().then((snapshot) => {
            setMemory(snapshot.data());
        });
    }, [memoryRef]);

    useEffect( () => {
        async function fetchPicture() {
            const downloadURLs = await uploadImageFile(pictureFiles, storageRef);
            setPictures(pictures => {
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

    const onSubmit = ({ title, date, text, comments }) => {
        const newMemory = {
            ...memory,
            title,
            date,
            text,
            photos: pictures,
            comments,
        };
        memoryRef.child(memory.id).set(newMemory);
    };

    const onSubmitPictures = (selected) => {
        const loadings = selected.map(item => 'loading')
        setPictureLoading(true)
        setPictureFiles(selected)
        setPictures([...pictures, ...loadings])
    };
        
    const removePicture = (pic) => {
        setPictures(pictures.filter((item) => item !== pic));
    };

    return (
        <div className="memory">
            <MemoryForm
                memory={memory}
                onSubmit={onSubmit}
                pictures={pictures}
                removePicture={removePicture}
                onSubmitPictures={onSubmitPictures}
            />
        </div>
    );
};

export default MemoryEdit;