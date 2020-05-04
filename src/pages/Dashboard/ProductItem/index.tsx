import React, { useCallback, useMemo } from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import formatValue from '../../../utils/formatValue';
import { useCart } from '../../../hooks/cart';

import * as Styled from './styles';

interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
}

interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const { addToCart } = useCart();

  const navigation = useNavigation();

  const handleAddToCart = useCallback(() => {
    addToCart(product);

    navigation.navigate('Cart');
  }, [product, addToCart, navigation]);

  const formattedPrice = useMemo(() => formatValue(product.price), [
    product.price,
  ]);

  return (
    <Styled.Product>
      <Styled.ProductImage source={{ uri: product.image_url }} />
      <Styled.ProductTitle>{product.title}</Styled.ProductTitle>
      <Styled.PriceContainer>
        <Styled.ProductPrice>{formattedPrice}</Styled.ProductPrice>
        <Styled.ProductButton
          testID={`add-to-cart-${product.id}`}
          onPress={handleAddToCart}
        >
          <FeatherIcon size={20} name="plus" color="#C4C4C4" />
        </Styled.ProductButton>
      </Styled.PriceContainer>
    </Styled.Product>
  );
};

export default ProductItem;
