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
}
