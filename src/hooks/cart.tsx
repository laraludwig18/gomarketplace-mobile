import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
}

interface CartContext {
  products: Product[];
  addToCart(item: Product): void;
  increment(id: string): void;
  decrement(id: string): void;
}

const CartContext = createContext<CartContext | null>(null);

const CartProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const cartProducts = await AsyncStorage.getItem(
        '@GoMarketPlace:cartProducts',
      );

      if (cartProducts) {
        setProducts(JSON.parse(cartProducts));
      }
    }

    loadProducts();
  }, []);

  useEffect(() => {
    async function saveProductsAsyncStorage(): Promise<void> {
      await AsyncStorage.setItem(
        '@GoMarketPlace:cartProducts',
        JSON.stringify(products),
      );
    }

    saveProductsAsyncStorage();
  }, [products]);

  const increment = useCallback(async id => {
    setProducts(oldProducts =>
      oldProducts.map(product =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product,
      ),
    );
  }, []);

  const addToCart = useCallback(
    async item => {
      const existentProduct = products.find(product => product.id === item.id);

      if (existentProduct) {
        increment(item.id);
        return;
      }

      setProducts(oldProducts => [...oldProducts, { ...item, quantity: 1 }]);
    },
    [increment, products],
  );

  const decrement = useCallback(
    async id => {
      const foundProduct = products.find(product => product.id === id);

      if (foundProduct) {
        if (foundProduct?.quantity > 1) {
          setProducts(oldProducts =>
            oldProducts.map(product =>
              product.id === id
                ? { ...product, quantity: product.quantity - 1 }
                : product,
            ),
          );

          return;
        }

        const newProducts = products.filter(product => product.id !== id);
        setProducts(newProducts);
      }
    },
    [products],
  );

  const value = React.useMemo(
    () => ({ addToCart, increment, decrement, products }),
    [products, addToCart, increment, decrement],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

function useCart(): CartContext {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(`useCart must be used within a CartProvider`);
  }

  return context;
}

export { CartProvider, useCart };
