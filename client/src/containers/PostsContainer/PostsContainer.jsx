import { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import Posts from '../../screens/PostScreens/Posts/Posts';
import CreatePost from "../../screens/PostScreens/CreatePost/CreatePost"
import {createPost, getAllPosts, deletePost, updatePost} from '../../services/posts'
import './PostsContainer.css'
import PostDetail from '../../screens/PostScreens/PostDetail/PostDetail';
import PostEdit from '../../screens/PostScreens/PostEdit/PostEdit';

function PostsContainer(props) {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState([])
  const history = useHistory();
  const { currentUser } = props;

  useEffect(() => {
    const fetchPosts = async () => {
        const allPosts = await getAllPosts();
        setPosts(allPosts)
    }
    fetchPosts();
  },[])

  const resetPosts = async () => {
    const resetPosts = await getAllPosts();
    setPosts(resetPosts)
  }

  const newPost = async (formData) => {
    try {
      await createPost(formData);
      resetPosts();
      setError(null);
      history.push('/');
    } catch (error) {
      const errorMsgArr = Object.values(error.response.data);
      setError(errorMsgArr)
    }
  }

  const editPost = async (id, formData) => {
    try {
      await updatePost(id, formData);
      resetPosts();
      setError(null);
      history.push(`/${id}`);
    } catch (error) {
      const errorMsgArr = Object.values(error.response.data);
      setError(errorMsgArr)
    }
  }

  const destroyPost = async (id) => {
    await deletePost(id);
    resetPosts();
    history.push('/')
  }

  return (
    <Switch>
      <Route path='/create'>
        <CreatePost
          currentUser={currentUser}
          newPost={newPost}
          error={error}
        />
      </Route>
      <Route path='/:id/edit'>
        <PostEdit
          currentUser={currentUser}
          editPost={editPost}
          error={error}
        />
      </Route>
      <Route path='/:id'>
        <PostDetail
          currentUser={currentUser}
          editPost={editPost}
          destroyPost={destroyPost}
          posts={posts}
        />
      </Route>
      <Route path='/'>
        <Posts
          currentUser={currentUser}
          posts={posts}
        />
      </Route>
    </Switch>
  );
}

export default PostsContainer;