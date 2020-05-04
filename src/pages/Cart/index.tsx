import React from 'react';
import { View } from 'react-native';

import { useCart } from '../../hooks/cart';

import ProductItem from './ProductItem';
import FloatingCart from '../../components/FloatingCart';

import { Container, ProductContainer, ProductList } from './styles';

const Cart: React.FC = () => {
  const { products } = useCart();

  return (
    <Container>
      <ProductContainer>
        <ProductList
          data={products}
          keyExtractor={item => item.id}
          ListFooterComponent={<View />}
          ListFooterComponentStyle={{ height: 80 }}
          renderItem={({ item }) => <ProductItem product={item} />}
        />
      </ProductContainer>
      <FloatingCart />
    </Container>
  );
};

export default Cart;
