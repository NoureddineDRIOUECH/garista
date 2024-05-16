import { useState, useEffect } from 'react';
import { MdCloudUpload } from 'react-icons/md';
import { APIURL } from '../../lib/ApiKey';
import './uploader.css';

function Uploader({ onChange, getvalue, initalData }) {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No selected file");
  
  // If getvalue is provided, it means we are updating, so set the image and file name
  useEffect(() => {
    if (initalData) {
      if(image == null)
        {
          setImage(`${APIURL}/public/storage/${getvalue}`);
        }
      // setFileName(getvalue); // Assuming getvalue contains the file name
    }
  }, [getvalue]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileName(file.name);
    setImage(URL.createObjectURL(file));
    onChange(file);  // Pass the File object to the parent component
  };

  return (
    <main>
      <form className='form-drag' onClick={() => document.querySelector(".input-field").click()}>
        <input type="file" accept='image/*' className='input-field' hidden onChange={handleFileChange} />
        
        {image ? (
          <img src={image} width={150} height={150} alt={fileName} />
        ) : (
          <>
            <MdCloudUpload color="black" size={60} />
            <p>Browse Files to upload</p>
          </>
        )}
      </form>
    </main>
  );
}

export default Uploader;
