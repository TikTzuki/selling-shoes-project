import { Image } from '@material-ui/icons';
import React from 'react'

const UploadFile = () => {
  const [file, setFile] = React.useState("");

  // Handles file upload event and updates state
  function handleUpload(event) {
    setFile(event.target.files[0]);
    console.log(file);
    // Add code here to upload file to server
    // ...
  }
  return (
    <div id="upload-box">
      <input type="file" onChange={handleUpload} />
      <p>Filename: {file.name}</p>
      <p>File type: {file.type}</p>
      <p>File size: {file.size} bytes</p>
      {file && <ImageThumb image={file} />}
    </div>
  );
}
const ImageThumb = (props) => {
  return <img src={URL.createObjectURL(props.image)} className={props.className} alt={props.image.name} />;
};
export default ImageThumb
