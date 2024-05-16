import React from 'react';
import { Input } from '../../components/ui/input';

const FormContact = () => {
    return (
        <div className='p-5 border m-5 rounded-md bg-white'>
            <div>
                <h1 className='border-b-2' style={{ alignSelf: 'flex-start' }}>Contact</h1>
                <div className='flex flex-col space-y-5 mt-5 justify-center items-center'>
                    <Input className='border border-gray-300 rounded-md py-2 px-4 w-full lg:w-[16rem]' placeholder='Phone' />
                    <Input className='border border-gray-300 rounded-md py-2 px-4 w-full lg:w-[16rem]' placeholder='Email' />
                    <Input className='border border-gray-300 rounded-md py-2 px-4 w-full lg:w-[16rem]' placeholder='Website' />
                </div>
            </div>
        </div>
    );
}

export default FormContact;
