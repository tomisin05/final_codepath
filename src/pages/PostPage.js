import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';
import './PostPage.css';

const PostPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        const fetchPost = async () => {
            const { data: postData } = await supabase
                .from('Posts')
                .select('*')
                .eq('id', id)
                .single();
            setPost(postData);

            const { data: commentsData } = await supabase
                .from('Comments')
                .select('*')
                .eq('post_id', id)
                .order('created_at', { ascending: true });
            setComments(commentsData || []);
        };
        fetchPost();
    }, [id]);

    const handleUpvote = async () => {
        const { data } = await supabase
            .from('Posts')
            .update({ upvotes: (post.upvotes || 0) + 1 })
            .eq('id', id)
            .select()
            .single();
        setPost(data);
    };

    const handleAddComment = async (e) => {
        e.preventDefault();
        const { data } = await supabase
            .from('Comments')
            .insert([
                { post_id: id, content: newComment }
            ])
            .select();
        setComments([...comments, data[0]]);
        setNewComment('');
    };

    if (!post) return <div>Loading...</div>;

    return (
        <div className="post-page">
            <h1>{post.title}</h1>
            <p className="author">by {post.author}</p>
            <p className="description">{post.description}</p>
            {post.image_url && <img src={post.image_url} alt={post.title} />}
            
            <div className="actions">
                <button onClick={handleUpvote}>
                    Upvote ({post.upvotes || 0})
                </button>
            </div>

            <div className="comments-section">
                <h2>Comments</h2>
                <form onSubmit={handleAddComment}>
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                    />
                    <button type="submit">Add Comment</button>
                </form>
                <div className="comments-list">
                    {comments.map((comment) => (
                        <div key={comment.id} className="comment">
                            <p>{comment.content}</p>
                            <span className="comment-date">
                                {new Date(comment.created_at).toLocaleString()}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PostPage;