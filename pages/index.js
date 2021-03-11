import fs from "fs/promises";
import path from "path";

import Link from "next/link";

function HomePage(props) {
  const { products } = props;
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  // current working directory will be the base directory
  // and not pages
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

  if (data.products.length === 0) {
    return { notFound: true }; //If no data is found
  }
  return {
    props: {
      products: data.products,
    },
    revalidate: 30, //seconds
  };
}

export default HomePage;
