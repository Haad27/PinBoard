"use client";
import { signIn, useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
const Register = () => {

    const{data:session} = useSession();
    const router =useRouter()

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, SetPassword] = useState("");
    const [image, setImage] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [loading, setLoading] = useState(false);


    useEffect(()=>{
        if(session){
            router.push("/");
        }
    },[session,router])

    const handleImage = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImage(file);
            setImagePreview(reader.result);
        }
    }

    const handleUserRegister = async () => {
        setLoading(true);
        if(!username || !email || !password || !image){
            toast.error("please provde complete details");
            setLoading(false);
            return;
            
        }
        try {
          const formData = new FormData();
          formData.append("username", username);
          formData.append("email", email);
          formData.append("password", password);
          formData.append("image", image);
          await axios.post("http://localhost:3000/api/auth/register", formData, { headers: { "Content-Type": "multipart/form-data" } });
          setUsername("");
          setEmail("");
          SetPassword("");
          setImagePreview("");
          setImage("");
          setLoading(false);
          router.push("/signin");
        } catch (error) {
          toast.error("Registration failed, try again");
          setLoading(false);
          console.error(error);
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
                        Wellcome to PinBoard
                    </h2>
                    <p className='text-center text-grey-500 mb-6'>
                        Find new ideas to try
                    </p>
                    <input type="text" placeholder="Username" className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 
                     focus:ring-blue-500" value={username} onChange={(e) => setUsername(e.target.value)} />

                    <input type="email" placeholder="Email Address" className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 
                     focus:ring-blue-500" value={email} onChange={(e) => setEmail(e.target.value)} />

                    <input type="password" placeholder="Password" className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 
                     focus:ring-blue-500" value={password} onChange={(e) => SetPassword(e.target.value)} />
                    <div className='w-fill p-3 rounded-lg focus:outline-none flex item-center space-x-4'>
                        <img src={imagePreview ? imagePreview : "/avatar.png"} alt='User Avatar' width={100} height={100} className='w-12 h-12 rounded-full' />
                        <label className={`${imagePreview ? "bg-green-600" : "bg-gray-600"} w-full text-white px-4 py-2 rounded cursor-pointer`} >
                            Choose Avatar
                            <input type='file' className='hidden' onChange={handleImage} />
                        </label>
                    </div>

                    <button onClick={handleUserRegister} className='w-full p-3 bg-blue-500 text-white rounded-lg mb-4 hover:bg-red-600 transition-all duration-300'>
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
                        className='w-full flex items-center justify-center gap-3 p-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition duration-200'
                    >
                        <img
                            src="/google.png"
                            alt="Google"
                            className="w-5 h-5"
                        />
                        <span>Continue with Google</span>
                    </button>
                    <p className="text-center text-sm mt-4">
                        Already have an account?{" "}
                        <Link href="/signin" className="text-blue-600 hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </>

    )

}

export default Register