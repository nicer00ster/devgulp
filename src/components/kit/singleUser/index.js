function SingleUser(props) {
  const { author } = props.author;
  return <div>{author.name}</div>;
}

export default SingleUser;
