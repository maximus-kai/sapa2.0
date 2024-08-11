'use server'
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

interface TransactionData{
    text: string;
    amount: number;
}

interface TransactionResult{
    data?: TransactionData;
    error?:string
}

async function addTransaction(formData:FormData):Promise<TransactionResult>  {
        const textValue = formData.get('text');
        const amountValue = formData.get('amount');
        // check for input
        if(!textValue || textValue === '' || !amountValue) {
        return { error: 'text or amount is missing' };
    }
    // Ensure text is a  string
    const text: string = textValue.toString();
    // Ensure amount is a number 
    const amount: number = parseFloat(amountValue.toString());

    // get logged user
    const {userId} = auth();
      
    // check for user 
    if (!userId) {
        return {error: 'user not found'}
    }

    // pack transaction details into one object
    // const TransactionData: TransactionData = {
    //     text : text,
    //     amount : amount
    // };
    try {
        const TransactionData: TransactionData = await db.transaction.create({
            data: {
                text:text,
                amount:amount,
                userId:userId
            }
        });
        revalidatePath('/');
    return { data: TransactionData };
        
    } catch (error) {
       return {error: 'transaction not added'} 
    }


    
} 
export default addTransaction;