/* eslint-disable no-unused-vars */
import { Client, ID, Databases,Query } from "appwrite";
import conf from "../conf/conf";

export class Service{
    client = new Client()
    databases;
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
            this.databases = new Databases(this.client)
    }

    async addInvoiceInfo({paymentDue,description,paymentTerms,clientName,status,clientEmail,total,UserID,clientAddressCountry,clientAddressCity,clientAddressStreet,senderAddressCountry,senderAddressPostCode,senderAddressCity,senderAddressStreet,items}){
        try{
           const invoiceRes =  await this.databases.createDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,ID.unique(),
                {paymentDue,description,paymentTerms,clientName,status,clientEmail,total,UserID,clientAddressCountry,clientAddressCity,clientAddressStreet,senderAddressCountry,senderAddressPostCode,senderAddressCity,senderAddressStreet,items}

            )
            return invoiceRes
          
        }catch(error){
            console.log("Error creating account", error)
            throw error;
        }
    }

    async updateInvoiceInfo({paymentDue,description,paymentTerms,clientName,status,clientEmail,total},userId){
        try{
          const invoiceRes =   await this.databases.updateDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,userId,
                {paymentDue,description,paymentTerms,clientName,status,clientEmail,total}
            )
            return invoiceRes
          
        }catch(error){
            console.log("Error creating account", error)
            throw error;
        }
    }


    async deleteInvoice({documentId}){
        try{
            await this.databases.deleteDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,documentId
            )
            return true
          
        }catch(error){
            console.log("Error creating account", error)
            return false
        }
    }
    async getInvoice(id){
        try{
           const allInvoice = await this.databases.listDocuments(conf.appwriteDatabaseId,conf.appwriteCollectionId,
                [
                    Query.equal('UserID',[id] )
                ]
            )

            return allInvoice
          
        }catch(error){
            console.log("Error creating account", error)
            throw error;
        }
    }

    
    

    async deleteInvoice(fileId){
        try{
            await this.bucket.deleteFile(conf.appwriteBucketId, fileId 
            )
          return true
        }catch(error){
            console.log("Error creating account", error)
            throw error;
        }
    }
}

const service  = new Service
export default service