import { client, urlFor } from "@/lib/client";

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product;

  return (
    <div>
      <div className="product-details-container">
        <div>
          <div className="image-container">
            <img src={urlFor(image && image[0])} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  // Query to fetch data from Sanity.io project, specifically fetching products with their slugs
  const query = `*[_type == "product"]{
      slug{
        current
      }
    }`;

  // Fetch products data using the Sanity.io client and wait for the response
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
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: { products, product },
  };
};

export default ProductDetails;
