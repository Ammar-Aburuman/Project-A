import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useAddTransaction = () => {

    const transactionCollectionRef = collection(db,"transactions")
    const {userID} = useGetUserInfo();


    const addTransaction = async ({
        descrption,
        transactionAmount,
        transactionType,
    }) => {
        await addDoc(transactionCollectionRef, {
            userID,
            descrption,
            transactionAmount,
            transactionType,
            createdAt: serverTimestamp(),
        });
    };
    return {addTransaction};
}