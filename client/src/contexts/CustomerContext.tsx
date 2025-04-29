import { createContext, useEffect, useState } from "react";
import { ICustomer } from "../types/Customer";

export const CustomerContext = createContext<
    {
        customer: ICustomer | null;
        setCustomer: (customer: ICustomer | null) => void;
    }
>({customer: null, setCustomer: () => {}});

export const CustomerProvider = ({children}: {children: React.ReactNode}) => {
    const [customer, setCustomer] = useState<ICustomer | null>(() => {
        const customer = localStorage.getItem('customer');
        return customer ? JSON.parse(customer) : null;
    });

    useEffect(() => {
        if (customer) {
            localStorage.setItem('customer', JSON.stringify(customer));
        }
    }, [customer]);

    return ( <CustomerContext.Provider value={{customer, setCustomer}}>{children}</CustomerContext.Provider> );
}