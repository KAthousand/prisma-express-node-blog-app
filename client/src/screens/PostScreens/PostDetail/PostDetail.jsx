import {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import CommentCard from '../../../components/CommentCard/CommentCard';
import CreateComment from '../../../components/CreateComment/CreateComment';
import { getOnePost } from '../../../services/posts';
import "./PostDetail.css"

function PostDetail(props) {
  const [post, setPost] = useState(null);
  const { id } = useParams()
  const { destroyPost, currentUser} = props;
  
  useEffect(() => {
    const fetchPost = async () => {
      if (!post) {
        const onePost = await getOnePost(id);
        setPost(onePost);
        if (onePost) {
          const date = `${onePost.createdAt}`
          const replaceDate = new Date(Date.parse(`${date}`));
          const newDate = replaceDate.toLocaleString();
          setPost((prevState) => ({ ...prevState, createdAt: newDate }))
        }
      }
    }
    fetchPost();
  }, [id, post])

  return (
    <div className='post-detail-container'>
      {post ? (
        <>
          <div className='post-detail-content'>
            <div className='post-detail-header'>
              <h2>{post.title}</h2>
              <p>{post.user.username}</p>
              <h6>{post.createdAt}</h6>
            </div>
            <div className='post-detail-body'>
              <p>{post.content}</p>
            </div>
            {currentUser && 
              (post.user.id === currentUser.id)  ? (
                <div className='post-detail-update'>
                  <Link to={`/${id}/edit`} ><h6>Edit Post</h6></Link>
                  <button
                    onClick={() => destroyPost(id)}
                  ><h6>Delete Post</h6></button>
                </div>
              ):("")
            }
          
            {currentUser && (
              <CreateComment
                currentUser={currentUser}
                postId={id}
                setPost={setPost}
              />
            )}
            <div className='post-detail-extra'>
              <h6> {post._count.likes} {post._count.likes === 1 ? ' Like' : ' Likes'}</h6>
              <h6>{post._count.comments}{post._count.comments === 1 ? ' Comment' : ' Comments'}</h6>
            </div>
          </div>
          <div className='post-detail-comments-container'>
            {post.comments.map(comment => (
              <CommentCard
                key={comment.id}
                id={comment.id}
                content={comment.content}
                author={comment.user.username}
                userId={comment.user.id}
                createdAt={comment.createdAt}
                likes={comment._count.likes}
                currentUser={currentUser}
                postId={id}
                setPost={setPost}
              />
            ))}
          </div>
        </>
      ) : (
          <div>
            <h1>Loading...</h1>
          </div>
      )}
    </div>
  );
}

export default PostDetail;