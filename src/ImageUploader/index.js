import {storage} from "../firebase/firebase"

import React, {useState} from 'react'

function ImageUploader(props) {

  const [file, setFile] = useState(null);
  const [url, setURL] = useState("");

  function handleChange(e) {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  }

  function handleUpload(e) {
    e.preventDefault();
    const uploadTask = storage.ref(`/images/${file.name}`).put(file);
    uploadTask.on("state_changed", console.log, console.error, () => {
      storage
        .ref("images")
        .child(file.name)
        .getDownloadURL()
        .then((url) => {
          setFile(null);
          setURL(url);
          props.getUploadUrl(url)
        });
    });
  }

  return (
    <div>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleChange} />
        <button disabled={!file}>upload image</button>
      </form>
      <img style={{
      	height:'30%',
      	width: '25%'
      }} 
      src={url} 
      alt="" />
    </div>
  );
}

export default ImageUploader