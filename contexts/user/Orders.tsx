import { typeContextOrders } from "@/types/context";
import { createContext } from "react";

const Orders = createContext<typeContextOrders | null>(null);

export default Orders;
