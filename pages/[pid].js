import { Fragment } from "react";
import fs from "fs/promises";
import path from "path";

function ProductDetails(props) {
  const { loadedProduct } = props;

  // if (!loadedProduct) {
  //   return <p>Loading.....</p>;
  // }
  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <h2>{loadedProduct.description}</h2>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const { params } = context;

  const productId = params.pid;

  const data = await getData();

  if (data.products.length === 0) {
    return { notFound: true }; //If no data is found
  }

  const product = data.products.find((product) => product.id === productId);

  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      loadedProduct: product,
    },
    revalidate: 30, //seconds
  };
}

async function getData() {
  const filePath = path.join(process.cwd(), "dummy-backend.json");
  //console.log(filePath);
  let jsonData = await fs.readFile(filePath);

  if (!jsonData) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }
  const data = JSON.parse(jsonData);

  return data;
}

export async function getStaticPaths() {
  const data = await getData();

  const ids = data.products.map((product) => product.id);

  const params = ids.map((id) => ({ params: { pid: id } }));

  return {
    paths: params,
    fallback: "blocking",
  };
}

export default ProductDetails;
