import React from 'react'
import { Input } from '../../components/ui/input'

const ChangePassword = () => {
    return (
        <div className="card mt-4 mb-4 flex justify-center bg-white">
            {/* <div className=" p-4"> */}
        <div className='p-5  m-5 rounded-[15px] w-[350px] '>
            <h1 className='border-b-2'>Security</h1>
            <div className='w-full  py-10'>
                 <label >Current Password:</label>
                <Input className='my-3' placeholder='write password' />
                <label >New Password:</label>
                <Input className='my-3' placeholder='write password' />
                <label >Re-type New Password:</label>
                <Input className='my-3' placeholder='write password' />
                    <button className='bg-blue-500 text-white px-5 py-2 rounded-md mt-5'>Change password</button>
            </div>
        </div>
        </div>
        // </div>
    )
}

export default ChangePassword
