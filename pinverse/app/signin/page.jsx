"use client"
import { signIn, useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import Link from "next/link";       
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

const page = () => {
 const{data:session} = useSession();
    const router =useRouter();

    const [username, setUsername] = useState("");
    const [password, SetPassword] = useState("");
    const [loading, setLoading] = useState(false);


    useEffect(()=>{
        if(session){
            router.push("/");
        }
    },[session,router])
    const handleCredentialLogin= async ()=> {
    console.log("credential login")
    setLoading(true);
    if(!username || !password){
        toast.error("please provide your cridentials");
        setLoading(false);
        return;
    }
}

const res = await signIn("credentials",{
        redirect:false,
        username,
        password
    }) ;
    setLoading(false);
    if(res?.ok){
        router.push("/");
    } else {
        toast.error("Invalid credentials");
    }
    }

      return (
        <>
            <div className='min-h-screen flex justify-center items-center bg-gray-100 fix top-0 left-0 w-full'>
                <div className='bg-white p-8 rounded-lg shadow-lg max-w-sm w-full'>
                    <div className='flex justify-center mb-4'>
                        <img
                            src="logoo.jpg" alt="Pinterest Svg" height={150} width={150} className="w-42 h-32 mx-auto"
                        />
                    </div>

                    <h2 className='text-center text-xl font-semibold mb-1'>
                        Login to see more
                    </h2>
                    <p className='text-center text-grey-500 mb-6'>
                        Access PinBoard best idea with a free account
                    </p>
                    
                    </div>
                </div>
            </>
        )
                   

}
