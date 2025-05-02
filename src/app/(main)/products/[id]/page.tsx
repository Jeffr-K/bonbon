import ProductDetail from '@/entities/products/x/product-detail.component';
import { Metadata } from 'next';

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: any): Promise<Metadata> {
  return {
    title: `상품 상세 - ${params.id}`,
  };
}

export default function ProductPage({ params }: any) {
  return <ProductDetail productId={params.id} />;
} 