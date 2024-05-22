import { useState } from 'react'
import { MdCloudUpload, MdDelete } from 'react-icons/md'
import { AiFillFileImage } from 'react-icons/ai'
import {Label} from "@/components/ui/label"
import './uploader.css'

function Uploader({ onChange }) {

  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No selected file");
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileName(file.name);
    setImage(URL.createObjectURL(file));
    onChange(file);  // Pass the File object to the parent component
  };

  return (
    <main >
      <form className="form-drag" onClick={() => document.querySelector('.input-field').click()}>
        <input type="file" accept="image/*" className="input-field" hidden onChange={handleFileChange} />

        {image? (
          <img src={image} width={150} height={150} alt={fileName} />
        ) : (
          <>
            <MdCloudUpload color="black" size={60} />
            <p>Browse Files to upload</p>
          </>
        )}
      </form>
    </main>
  )
}

export default Uploader