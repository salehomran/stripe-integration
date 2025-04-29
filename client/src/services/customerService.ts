import axios, { AxiosError } from "axios";
import { ICustomer } from "../types/Customer";
import { API_URL, handleRequest } from "./baseService";

export const createCustomer = async (customer: ICustomer) => {
    return handleRequest<ICustomer>(axios.post(`${API_URL}/customers`, customer));
}

export const fetchCustomers = async () => {
    return handleRequest<ICustomer[]>(axios.get(`${API_URL}/customers`));
}

export const fetchCustomerById = async (id: number) => {
    return handleRequest<ICustomer>(axios.get(`${API_URL}/customers/${id}`));
}

export const fetchCustomerByEmail = async (email: string) => {
    try {
        const response = await axios.get(`${API_URL}/customers/email/${email}`);
        return response;
    } catch (error) {
        console.error('Error fetching customer by email:', error);
        if (error instanceof AxiosError) {
            return error.response;
        }
        throw error;
    }
}

