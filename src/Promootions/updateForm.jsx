import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
    DialogFooter,
  } from "@/components/ui/dialog";
  import { Input } from "@/components/ui/input"
  import {Button} from "@/components/ui/button"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState } from "react";
import ImageUploading from 'react-images-uploading';
import { MdCloudUpload, MdDelete } from 'react-icons/md'
import { AiFillFileImage } from 'react-icons/ai'
import Uploader from "./uploader";
import { getBannerById } from "../../actions/Banner/Banner";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Spinner from 'react-spinner-material';
import { APIURL } from "../../lib/ApiKey";
import { axiosInstance } from "../../axiosInstance";

export default function UpdateForm({updateFormState, setUpdateFormState, id, handleUpdate,}) {

  console.log("The Id => ",id);
        const [banner, setBanner] = useState([])
        const [loading, setLoading] = useState(false)
        const { control, handleSubmit, register, formState: { errors }, setError } = useForm();
        const [file, setFile] = useState(null);
        const [isChecked, setIsChecked] = useState(true)
        const [fileName, setFileName] = useState("No selected file")
        const maxNumber = 3;
        const [name, setName] = useState()
        const toastMessage =  'Banner updated.';



        useEffect(() => {
            const fetchCat = async () =>{
                setLoading(true)
                try {
                    const bannerDates = await getBannerById(id); // Call the fetchCategorie function to get the data
                    if(bannerDates)
                    {
                        console.log("The Categories of Update => ",bannerDates);
                        bannerDates.map((item) => {
                             setBanner(item)
                             setName(item.title)
                        })
                        setLoading(false)
                    }
                  } catch (error) {
                    console.error('Error fetching image URLs:', error);
                  }
            }
        
            // setFileName("")
            // setBanner([])
            fetchCat();

        }, [])

        const handleImageUpdate = async (newImage) => {
          try {
            setFile(newImage)
              const formData = new FormData();
              formData.append('image', newImage);
              const response = await axiosInstance.post(`/api/banners/${id}/update-image`, formData, {
                  headers: {
                      'Content-Type': 'multipart/form-data',
                  },
              });
              if(response)
              {
                console.log("The Response Data => ",response.data);
              }
          } catch (error) {
              console.error('Error updating image:', error);
          }
      };
      const handleDelete = () => {
        setFile(null);
        setFileName("");
      };

      console.log("The Selected File => ",file);
  return (
    <Dialog open={updateFormState} onOpenChange={setUpdateFormState} className=" p-8 shadow-lg h-[45rem] w-[65rem] rounded-xl">
          <DialogContent style={{ padding: '2rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', height: '45rem', width: '35rem', maxWidth: '80rem', borderRadius: '1rem' }}>
            <DialogHeader className="flex justify-center">
                    <h2 className="text-2xl font-bold mb-4 text-center">Update Promotions</h2>
                    {
                      loading
                      ?
                      <div className='justify-center items-center flex h-[50vh]'>
                      <Spinner size={100} spinnerColor={"#28509E"} spinnerWidth={1} visible={true} style={{borderColor: "#28509E", borderWidth: 2}}/>
                    </div>
                      :
                    <div className='flex items-start gap-10 p-10 justify-center'>
                        <div className='w-full '>
                        <div className={`flex flex-col justify-center items-center border-[2px] border-dashed h-[250px] cursor-pointer rounded-[5px] w-full ${errors.file  ? 'border-red-500 ' : 'border-black'}`} onClick={() => document.querySelector(".input-field").click()}>
                        <input
                              type="file"
                              accept='image/*'
                              // className={`input-field`}
                              className='input-field h-full w-full'
                              {...register('image', { required: 'Please select a file.' })}
                              onChange={(e) => handleImageUpdate(e.target.files[0])}
                              hidden
                          />

                          {file ? (
                              <img src={URL.createObjectURL(file)} width={150} height={150} alt={fileName} />
                          ) : (
                              <>
                                <img src={`${APIURL}/storage/${banner.image}`} className="row-span-3 h-[13rem] w-[15rem]  object-cover" />
                              </>
                          )}

                      </div>

                      {
                          file ?
                          <section className='uploaded-row'>
                              <AiFillFileImage color='black' />
                              <span className='upload-content'>
                              {fileName} -
                              <MdDelete onClick={handleDelete} />
                              </span>
                          </section>
                          :
                          <></>
                      }

                            <div className=''>
                                <Input value={name} onChange={(e) => setName(e.target.value)}  type="text" placeholder="Title" className='mt-5 mb-5' />

                            </div>
                        </div>

                    </div>
                    }
                    <div className='float-right flex gap-2 justify-end'>
                        <Button type="submit" onClick={() => handleUpdate({
                          id: id,
                          title: name,
                          toastMessage
                          })}>Save</Button>
                    </div>
                </DialogHeader>
                <DialogFooter className="flex justify-center items-center">
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}
