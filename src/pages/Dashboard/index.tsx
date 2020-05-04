import React, { useState, useEffect } from 'react';

import { View } from 'react-native';

import api from '../../services/api';

import ProductItem from './ProductItem';
import FloatingCart from '../../components/FloatingCart';

import { Container, ProductContainer, ProductList } from './styles';

interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
}

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const { data } = await api.get<Product[]>('products');

      setProducts(data);
    }

    loadProducts();
  }, []);

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

export default Dashboard;
