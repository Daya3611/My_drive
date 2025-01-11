"use client"

import React, { useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

  import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "@/components/ui/input-otp"
import Image from 'next/image';
import { Button } from './ui/button';
import { sendEmailOTP, verifySecret } from '@/lib/actions/users.actions';
import { useRouter } from 'next/navigation';

  
  
function OTPModal({accountId, email}:{accountId: string, email: string}) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(true);
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            // await login({ email, password });
            const sessionId = await verifySecret({accountId, password});

            if(sessionId){
                router.push("/");
            }
            // setIsOpen(false);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    const handelResend = async () => {
        await sendEmailOTP({ email });



    }

  return (
    <div>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen} >
            {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
            <AlertDialogContent className='shad-alert-dialog'>
                <AlertDialogHeader className='relative flex justify-center'>
                <AlertDialogTitle className='h2 text-center'>Enter Your OTP
                    <Image src="/assets/icons/close-dark.svg" alt="close" width={20} height={20} onClick={() => setIsOpen(false)} className="otp-close-button" />
                </AlertDialogTitle>
                <AlertDialogDescription className='subtitle-2 text-center text-light-100'>
                    We sent an OTP to your <span className='pl-1 text-brand'>{email}</span> email address. Please enter the OTP to continue.
                </AlertDialogDescription>
                </AlertDialogHeader>

                    <InputOTP maxLength={6} value={password} onChange={setPassword}>
                        <InputOTPGroup className='shad-otp'>
                            <InputOTPSlot index={0} className='shad-otp-slot'/>
                            <InputOTPSlot index={1} className='shad-otp-slot'/>
                            <InputOTPSlot index={2} className='shad-otp-slot'/>
                            <InputOTPSlot index={3} className='shad-otp-slot'/>
                            <InputOTPSlot index={4} className='shad-otp-slot'/>
                            <InputOTPSlot index={5} className='shad-otp-slot'/>
                            {/* <InputOTPSeparator /> */}
                        </InputOTPGroup>
                    </InputOTP>

                <AlertDialogFooter>
                    <div className='flex w-full flex-col gap-4'>
                        <AlertDialogAction onClick={handleSubmit} className='shad-submit-btn h-12' type='button'>Submit
                            {isLoading && (
                                <Image src="/assets/icons/loader.svg" alt="Loader" width={24} height={24} className='ml-2 animate-spin' />
                            )}
                        </AlertDialogAction>
                        {/* <AlertDialogCancel >Cancel</AlertDialogCancel> */}
                        <div className='flex subtitle-2 mt-2 text-center items-center justify-center text-light-100'>
                            <p className=''>Not receive the OTP ?</p>
                            <Button onClick={handelResend}
                            variant="link"
                            type="button"
                            className='pl-1 text-brand'>Resend OTP</Button>
                        </div>

                    </div>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    </div>
  )
}

export default OTPModal
