import ShowPost from "../posts/showPost";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as postActions from "../../store/posts";

const ForYouDashboard = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(postActions.fetchPosts());
  }, [dispatch]);

  if (sessionUser) return <Redirect to="/" />;

  const forYouPosts = Object.values(posts).slice(0, 10);

  return (
    <>
      {forYouPosts.map((post) => (
        <ShowPost post={post} profile={false} key={post.id} />
      ))}
    </>
  );
};

export default ForYouDashboard;
