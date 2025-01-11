import Link from "next/link";
import { Models } from "node-appwrite";
import React from "react";
import Thumbnail from "./Thumbnail";
import { convertFileSize } from "@/lib/utils";
import FormattedDateTime from "./FormattedDateTime";
import ActionsDropwon from "./ActionsDropwon";

const Card = ({ files }: { files: Models.Document }) => {
  return (
    <div className="py-3">
      <Link href={files.url} target="_blank" className="file-card">
        <div className="flex justify-between">
          <Thumbnail
            type={files.type}
            extension={files.extension}
            className="!size-20"
            url={files.url}
            imageClassName="!size-11"
          />

          <div className="flex flex-col items-center justify-between">
            <ActionsDropwon files={files}/>
            <p className="body-1">{convertFileSize(files.size)}</p>
          </div>
          </div>
          <div className="file-card-details ">
            <p className="subtitle-2 line-clamp-1">{files.name}</p>
            <FormattedDateTime date={files.$createdAt} className="body-2 text-light-100" />
            <p className="captions line-clamp-1 text-light-200">By: {files.owner.fullName}</p>
          </div>
        
      </Link>
    </div>
  );
};

export default Card;
