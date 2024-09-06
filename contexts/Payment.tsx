import { createContext } from "react";

import { typeContextPaymentMethod } from "@/types/context";

const Payment = createContext<typeContextPaymentMethod | null>(null);

export default Payment;
