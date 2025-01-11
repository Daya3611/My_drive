"use server"
import { createAdminClient } from "../appwrite";
import { InputFile } from "node-appwrite/file";
import { appwriteConfig } from "../appwrite/config";
import { ID, Models, Query } from "node-appwrite";
import { constructFileUrl, getFileType, parseStringify } from "../utils";
// import { handleError } from "./users.actions";
import { revalidatePath } from "next/cache";
import { parse } from "path";
import { getCurrentUser } from "./users.actions";
import { create } from "domain";

const handleError = (error: unknown, message: string) => {
    console.log(error,message);
    throw error;
}
export const uploadFile = async ({file, ownerId, accountId, path}: UploadFileProps) => {
    
    const {storage, databases} = await createAdminClient();

    try{
        const inputFile = InputFile.fromBuffer(file, file.name);

        const bucketFile = await storage.createFile(appwriteConfig.buketId, ID.unique(), inputFile);

        const fileDocument = {
            type: getFileType(bucketFile.name).type,
            name: bucketFile.name,
            url: constructFileUrl(bucketFile.$id),
            extension: getFileType(bucketFile.name).extension,
            size: bucketFile.sizeOriginal,
            owner: ownerId,
            accountId,
            users: [],
            bucketFileId: bucketFile.$id,
        };

        const newfile = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.filesCollectionId,
            ID.unique(),
            fileDocument
        );

        try {
            const newfile = await databases.createDocument(
                appwriteConfig.databaseId,
                appwriteConfig.filesCollectionId,
                ID.unique(),
                fileDocument
            );
        } catch (error: unknown) {
            await storage.deleteFile(appwriteConfig.buketId, bucketFile.$id);
            handleError(error, "Failed to create file document");
        }

        revalidatePath(path);
        return parseStringify(newfile);
    } catch (error) {
        handleError(error, "Failed to send email OTP");
    }
    
};

export const getFile = async () => {
    const { databases } = await createAdminClient();

    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            throw new Error("User not found");
        }

        const queries = createQueries(currentUser);
        console.log({currentUser, queries});
        const files = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.filesCollectionId,
            queries,
        );
        console.log({files});
        return parseStringify(files);
    } catch (error) {
        handleError(error, "Failed to get file");
    }
}


function createQueries(currentUser: Models.Document) {
    const queries = [
        Query.or([
            
            Query.equal('owner', [currentUser.$id]),
            Query.contains('users', [currentUser.email]),
        ])
    ]
    return queries;
}

