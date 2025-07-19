import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductDecriptions from "../Components/ProductDecriptions";

function Description() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`/details/client/${id}`)
        .then(res => res.json())
        .then(data => {
          setProduct(data);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <ProductDecriptions
      productName={product.productName}
      description={product.description}
      price={product.price}
      img={product.images?.[0]}
      benefits={product.benefits}
      howtouse={product.howtouse}
      ingredients={product.ingredients}
      totalStock={product.totalStock}
    />
  );
}

export default Description; 