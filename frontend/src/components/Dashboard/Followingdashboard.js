import ShowPost from "../posts/showPost";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as postActions from "../../store/posts";

const FollowingDashboard = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(postActions.fetchPosts());
  }, [dispatch]);

  if (sessionUser) return <Redirect to="/" />;

  // Modify this logic to retrieve posts from the users you are following
  const followingPosts = Object.values(posts).slice(0, 10);

  return (
    <>
      {followingPosts.map((post) => (
        <ShowPost post={post} profile={false} key={post.id} />
      ))}
    </>
  );
};

export default FollowingDashboard;