import Card from '@/components/Card';
import Sort from '@/components/Sort';
import { getFile } from '@/lib/actions/file.actions';
import { Models } from 'node-appwrite';
import React from 'react'

interface SearchParamProps {
    params: {
        type: string;
    }
}

const Page = async({params}: SearchParamProps) =>{
    const type = (await params)?.type as string || "";
    const files = await getFile();
    console.log(files);

  return (
    <div className='page-container'>
      <section className='w-full'>
        <h1 className='h1 capitalize'>{type}</h1>

        <div className='total-size-section'>
            <p className='body-1'>
                Total: <span className='h5'>00 MB</span>
            </p>

            <div className='sort-container'>
              <p className='body-1 hidden sm:block text-light-200'>Short By: <Sort/></p>
            </div>
        </div>
      </section>

      {/* render the files */}

      {files &&  (
        <section>
          {files.documents.map((files: Models.Document) => (
            <div className='' key={files.$id}>
              {/* <h1 className='h'>{files.name}</h1> */}
              {/* <h1 className='h'>{files.owner.fullName}</h1> */}
              <Card key={files.$id} files={files}/>
            </div>
          ))}
        </section>
      )}
      {!files && (
        <div className='empty-list'>
          <p className='body-1'>No files found</p>
        </div>
      )}

    </div>
  )
}


export default Page