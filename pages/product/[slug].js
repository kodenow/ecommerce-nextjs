import { client, urlFor } from "@/lib/client";
import { useState } from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { Product } from "@/components";

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product;

  const [index, setIndex] = useState(0);

  return (
    <div>
      <div className="product-details-container">
        <div>
          <div className="image-container">
            <img
              src={urlFor(image && image[index])}
              alt="Product_Image"
              className="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item)}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details:</h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onclick="">
                <AiOutlineMinus />
              </span>
              <span className="num" onclick="">
                0
              </span>
              <span className="plus" onclick="">
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button className="add-to-cart">Add to Cart</button>
            <button className="buy-now">Buy Now</button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* 
If a page has Dynamic Routes and uses getStaticProps, 
it needs to define a list of paths to be statically generated.

When you export a function called getStaticPaths (Static Site Generation) from a page
 that uses dynamic routes, Next.js will statically pre-render all the paths 
 specified by getStaticPaths.
*/
export const getStaticPaths = async () => {
  // Query to fetch data from Sanity.io project, specifically fetching products with their slugs
  const query = `*[_type == "product"]{
      slug{
        current
      }
    }`;

  const products = await client.fetch(query);

  // Map over products data and create an array of objects with dynamic paths
  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current, // Set the slug as a parameter for each product
    },
  }));

  // Return an object with paths and fallback fields
  return {
    paths, // Array of objects specifying dynamic paths
    fallback: "blocking", // Next.js will wait for data to be fetched before serving the static page
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  //[0]: This part of the query specifies that only the first matching document should be returned. Since the slug is expected to be unique, this ensures that only one document is returned.
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: { products, product },
  };
};

export default ProductDetails;
