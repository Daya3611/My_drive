import Image from 'next/image'
import React from 'react'

function Layout({children}:{children:React.ReactNode}) {
  return (
    <div className='flex min-h-screen'>
        <section className='bg-brand p-10  w-1/2 items-center justify-center hidden lg:flex xl:w-2/5'>
            <div className='flex max-h-[800px] max-w-[430px] flex-col justify-center items-center space-y-12'>
                <Image src='/assets/icons/logo-full.svg' alt='logo' width={100} height={100} />

                <div className='space-y-5 text-white'>
                    <h1 className='h1'>Manage Your Files the best way</h1>
                    <p className='body-1'>
                        This is a place where you can store all your documents, images, videos and other files.
                    </p>
                </div>
                <div>
                  <Image src='/assets/images/files.png' alt='Illustration' width={342} height={342} className='transition-all hover:rotate-2 hover:scale-105' />
                </div>
            </div>
        </section>

        <section className='flex flex-1 flex-col items-center justify-center bg-white p-4 py-10 lg:justify-center lg:p-10 lg:py-0'>
            <div className='mb-16 lg:hidden'>
            <Image src="/assets/icons/logo-full-brand.svg" alt="logo" width={224} height={82} className="h-auto w-[200px] lg:w-[250px]" />
            </div>
            <div className='flex flex-col items-center justify-center w-full'>
            {children}
            </div>
        </section>

      
    </div>
  )
}

export default Layout