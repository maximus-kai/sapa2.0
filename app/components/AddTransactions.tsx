"use client"
import React from 'react'
import addTransaction from '../actions/addTransaction'
import { toast } from 'react-toastify'
import { useRef } from 'react'

const AddTransactions = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const clientAction = async (formData: FormData) => {
        const result = await addTransaction(formData);
        if (result.error) {
            toast.error(result.error);
        }
        else {
            toast.success(`you have added: ${result.data?.amount} with the description of: ${result.data?.text}`);
            formRef.current?.reset();
        }
    }
    return (<section>
        <h3>Add Transactions</h3>
        <form ref={formRef} action={clientAction}>
            <div className="form-control">
                <label htmlFor="text">Text</label>
                <input type="text" id='text' name='text' placeholder='Enter Text...' />
            </div>
            <div className="form-control">
                <label htmlFor="text">Amount</label>
                <input type="number" id='amount' name='amount' placeholder='Enter Amount...' step={0.01} />
            </div>
            <button className="btn"> Add Transction</button>
        </form>
    </section>
    )
}

export default AddTransactions;