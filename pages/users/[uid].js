function UserIDPage(props) {
  return <h1>{props.id}</h1>;
}

export default UserIDPage;

export async function getServerSideProps(context) {
  const { params } = context;
  return {
    props: {
      id: params.uid,
    },
  };
}
