import { createContext } from "react";

import { typeContextCart } from "@/types/context";

const Cart = createContext<typeContextCart | null>(null);

export default Cart;
