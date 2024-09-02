import { typeContextWishlist } from "@/types/context";
import { createContext } from "react";

const Wishlist = createContext<typeContextWishlist | null>(null);

export default Wishlist;
