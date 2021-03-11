function UserProfilePage(props) {
  return <h1>{props.username}</h1>;
}

export async function getServerSideProps(context) {
  const { params, req, res } = context;
  //res and req are default node js objects

  return {
    props: {
      username: "Ramki",
    },
  };
}
export default UserProfilePage;
