import { createContext } from "react";

import { typeContextProducts } from "@/types/context";

const Products = createContext<typeContextProducts | null>(null);

export default Products;
