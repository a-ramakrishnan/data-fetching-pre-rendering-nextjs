import { useEffect, useState } from "react";
import useSWR from "swr";

function LastSales(props) {
  const [sales, setSales] = useState(props.sales);
  // const [loading, setloading] = useState(false);

  const { data, error } = useSWR(
    "https://ecommerce-43f45.firebaseio.com/sales.json"
  );

  useEffect(() => {
    console.log("Inside UseEffect");
    if (data) {
      const transformedSales = [];
      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      setSales(transformedSales);
    }
  }, [data]);
  /*useEffect(() => {
    setloading(true);
    fetch("https://ecommerce-43f45.firebaseio.com/sales.json")
      .then((response) => response.json())
      .then((data) => {
        const transformedSales = [];

        for (const key in data) {
          transformedSales.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
          });
        }
        setSales(transformedSales);
        setloading(false);
      });
  }, []);
*/
  if (error) {
    return <p>Failed to Load</p>;
  }
  if (!data && !sales) {
    return <p>Loading.....</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - {sale.volume}
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  return fetch("https://ecommerce-43f45.firebaseio.com/sales.json")
    .then((response) => response.json())
    .then((data) => {
      const transformedSales = [];

      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      return {
        props: { sales: transformedSales },
        revalidate: 10,
      };
    });
}

export default LastSales;
