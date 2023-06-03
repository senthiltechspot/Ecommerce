import AlertDetailsProvider from "./AlertContext";
import CartProvider from "./CartContext";
import CategoryProvider from "./CategoryContext";
import ProductProvider from "./ProductContext";

const IndexProvider = ({ children }) => {
  return (
    <AlertDetailsProvider>
      <CartProvider>
        <CategoryProvider>
          <ProductProvider>{children}</ProductProvider>
        </CategoryProvider>
      </CartProvider>
    </AlertDetailsProvider>
  );
};
export default IndexProvider;
