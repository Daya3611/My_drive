"use client"
import React, {MouseEvent, useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { Button } from './ui/button'
import { cn, convertFileToUrl, getFileType } from '@/lib/utils'
import Image from 'next/image'
import Thumbnail from './Thumbnail'
import { MAX_FILE_SIZE } from '../../constants'
import { set } from 'zod'
import { useToast } from '@/hooks/use-toast'
import { uploadFile } from '@/lib/actions/file.actions'
import { usePathname } from 'next/navigation'

interface Props {
  ownerID: string;
  accountId: string;
  className?: string;
}

export default function FileUploader({ownerID, accountId , className}: Props) {
  const path = usePathname();
  const {toast} = useToast();
  const [files, setFiles] = useState<File[]>([])
  const handelRemoveFile = (e: React.MouseEvent<HTMLImageElement>, fileName: string) => {
    e.stopPropagation();
    setFiles((prevFiles) => prevFiles.filter(file => file.name !== fileName));
    // setFiles(files.filter(file => file.name !== fileName));
  }
  const onDrop = useCallback( async (acceptedFiles : File[]) => {
    setFiles(acceptedFiles);

    const uploadPromises = acceptedFiles.map( async (file) => {
      if(file.size > MAX_FILE_SIZE){
       setFiles((prevFiles) => prevFiles.filter(f => f.name !== file.name));

       return toast({
        description: (
          <p className='boady-2 text-white'>
            <span className='font-semibold'>
              {file.name}
            </span>
            is too large. Max file size is 50MB
          </p>
        ), className: 'error-toast'
      })

      }
      return uploadFile({file, ownerId: ownerID, accountId, path}).then((uploadedFile) => {
        if(uploadedFile){

          setFiles((prevFiles) => prevFiles.filter(f => f.name !== file.name));

          toast({
            description: (
              <p className=' felx body-2  text-[#008000]'>
                <span className='font-semibold '>
                  {file.name}
                </span>
                 {" "} <p className='text-black'>uploaded successfully</p> 
              </p>
            ),
            className: 'success-toast'
          })
        }
      })
    })
    await Promise.all(uploadPromises);

  }, [ownerID, accountId, path]);
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} className='cursor-pointer'>
      <input {...getInputProps()} />
      <Button type='button' className={cn('uploader-button' , className)}>
      <Image src='/assets/icons/upload.svg' alt='upload' width={24} height={24}  />
      <p> Upload</p>
      </Button>

      {files.length > 0 && (
        <ul className='uploader-preview-list'>
          <h4 className='h4 text-light-100'>Uploading</h4>

          {/* {files.map(file => (
            <li key={file.name} className='uploader-preview-item'>
              {file.name} - {file.size} bytes
            </li>
          ))} */}

          {files.map((file, index) => {
            const {type, extension} = getFileType(file.name);
            return (
              <li key={`${file.name}-${index}`} className='uploader-preview-item'>
                {/* {file.name} - {file.size} bytes */}
                <div className='flex items-center gap-3'>
                  <Thumbnail 
                  type={type}
                  extension={extension}
                  url={convertFileToUrl(file)}
                  />
                  <div className='preview-item-name'>
                    <p className=''>{file.name}</p>
                    <Image src='/assets/icons/file-loader.gif' width={80} height={26} alt='loader'/>
                    {/* <p className=''>{file.size} bytes</p> */}
                  </div>

                  <Image src='/assets/icons/close.svg' alt='close' width={24} height={24} onClick={(e) => handelRemoveFile(e, file.name)} className='uploader-preview-close' />
                </div>

                

              </li>
            );
          })}

        </ul>
      )}
      
      
    </div>
  )
}


