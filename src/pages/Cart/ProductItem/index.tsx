import React, { useCallback, useMemo } from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';

import formatValue from '../../../utils/formatValue';
import { useCart } from '../../../hooks/cart';

import * as Styled from './styles';

interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
}

interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const { increment, decrement } = useCart();

  const handleIncrement = useCallback(() => {
    increment(product.id);
  }, [increment, product.id]);

  const handleDecrement = useCallback(() => {
    decrement(product.id);
  }, [decrement, product.id]);

  const formattedPrice = useMemo(() => formatValue(product.price), [
    product.price,
  ]);

  const formattedTotalPrice = useMemo(
    () => formatValue(product.price * product.quantity),
    [product.price, product.quantity],
  );

  return (
    <Styled.Product>
      <Styled.ProductImage source={{ uri: product.image_url }} />
      <Styled.ProductTitleContainer>
        <Styled.ProductTitle>{product.title}</Styled.ProductTitle>
        <Styled.ProductPriceContainer>
          <Styled.ProductSinglePrice>
            {formattedPrice}
          </Styled.ProductSinglePrice>

          <Styled.TotalContainer>
            <Styled.ProductQuantity>{`${product.quantity}x`}</Styled.ProductQuantity>

            <Styled.ProductPrice>{formattedTotalPrice}</Styled.ProductPrice>
          </Styled.TotalContainer>
        </Styled.ProductPriceContainer>
      </Styled.ProductTitleContainer>
      <Styled.ActionContainer>
        <Styled.ActionButton
          testID={`increment-${product.id}`}
          onPress={handleIncrement}
        >
          <FeatherIcon name="plus" color="#E83F5B" size={16} />
        </Styled.ActionButton>
        <Styled.ActionButton
          testID={`decrement-${product.id}`}
          onPress={handleDecrement}
        >
          <FeatherIcon name="minus" color="#E83F5B" size={16} />
        </Styled.ActionButton>
      </Styled.ActionContainer>
    </Styled.Product>
  );
};

export default ProductItem;
