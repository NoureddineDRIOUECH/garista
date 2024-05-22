import { useState } from 'react'
import { MdCloudUpload, MdDelete } from 'react-icons/md'
import { AiFillFileImage } from 'react-icons/ai'
import './uploader.css'

function Uploader() {

  const [image, setImage] = useState(null)
  const [fileName, setFileName] = useState("No selected file")
  return (
    <main>
      <form className='form-drag'
      onClick={() => document.querySelector(".input-field").click()}
      >
        <input type="file" accept='image/*' className='input-field' hidden
        onChange={({ target: {files}}) => {
          files[0] && setFileName(files[0].name)
          if(files){
            setImage(URL.createObjectURL(files[0]))
          }
        }}
         />

        {image ?
        <img src={image} width={150} height={150} alt={fileName} />
        :
        <>
        <MdCloudUpload color="black" size={60} />
        <p>Browse Files to upload</p>
        </>
      }

      </form>

      <section className='uploaded-row'>
        <AiFillFileImage color='black' />
        <span className='upload-content'>
          {fileName} -
          <MdDelete
          onClick={() => {
            setFileName("No selected File")
            setImage(null)
          }}
           />
        </span>
      </section>

    </main>
  )
}

export default Uploader
