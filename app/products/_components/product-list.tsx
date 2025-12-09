import { Product } from "@prisma/client";


const ProductList = ( {products}: {products: Product[]}) => {
    return (
        <div>
            
            <ul>
                {products.map(product => (
                    <li key={product.id}>{product.name}</li>
                ))}
            </ul>
        </div>
    );
};  

export default ProductList;