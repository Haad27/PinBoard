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
    const handleCredentialLogin = async () => {
        console.log("credential login");
        setLoading(true);
        if (!username || !password) {
            toast.error("please provide your cridentials");
            setLoading(false);
            return;
        }

        const res = await signIn("credentials", {
            redirect: false,
            username,
            password
        });
        setLoading(false);
        if (res?.ok) {
            router.push("/");
        } else {
            toast.error("Invalid credentials");
        }
    };

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
                    
                    <input type="text" placeholder="Username" className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 
                     focus:ring-blue-500" value={username} onChange={(e) => setUsername(e.target.value)} />

                    <input type="password" placeholder="Password" className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 
                     focus:ring-blue-500" value={password} onChange={(e) => SetPassword(e.target.value)} />

                    <button onClick={handleCredentialLogin} className='w-full p-3 bg-blue-500 text-white rounded-lg mb-4 hover:bg-red-600 transition-all duration-300'>
                        {
                            loading ? <ClipLoader color={"#fff"} size={20} />
                                : "Continue"
                        }
                    </button>

                    <div className='flex items-center justify-center space-x-2 mb-4'>
                        <div className='h-px bg-gray-300 w-full'></div>
                        <p className='text-gray-500 text-sm'>OR</p>
                        <div className='h-px bg-gray-300 w-full'></div>
                    </div>

                    <button
                        onClick={() => signIn("github", { callbackUrl: "/" })}
                        className='w-full flex items-center justify-center gap-3 p-3 bg-black text-white rounded-lg font-medium hover:bg-gray-900 transition duration-200'
                    >
                        <img
                            src="/logoo.png"
                            alt="Github"
                            className="w-5 h-5"
                        />
                        <span>Continue with GitHub</span>
                    </button>
                     <button
                        onClick={() => signIn("google", { callbackUrl: "/" })}
                        className='w-full flex items-center justify-center gap-3 p-3 bg-gray-800 border border-gray-700 text-white rounded-lg font-medium hover:bg-gray-700 transition duration-200 mt-2'
                    >
                        <img
                            src="/google.png"
                            alt="Google"
                            className="w-5 h-5"
                        />
                        <span>Continue with Google</span>
                    </button>
                    <p className="text-center text-sm mt-4 text-gray-400">
                        Already have an account?{" "}
                        <Link href="/register" className="text-blue-400 hover:underline">Register</Link>
                        </p>
                    </div>
                </div>
            </>
        );
                   

}

export default page;