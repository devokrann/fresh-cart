import { createContext } from "react";

import { typeContextAddresses } from "@/types/context";

const Addresses = createContext<typeContextAddresses | null>(null);

export default Addresses;
