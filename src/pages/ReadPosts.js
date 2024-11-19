import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import './ReadPosts.css'
import { supabase } from '../client';

const ReadPosts = () => {
    const [posts, setPosts] = useState([]);
    const [sortBy, setSortBy] = useState('time');
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            let query = supabase
                .from('Posts')
                .select('*');
            
            if (searchQuery) {
                query = query.ilike('title', `%${searchQuery}%`);
            }

            const { data } = await query;
            
            if (data) {
                let sortedData = [...data];
                try {
                    sortedData.sort((a, b) => {
                        if (sortBy === 'upvotes') {
                            const aVotes = parseInt(a.upvotes || 0);
                            const bVotes = parseInt(b.upvotes || 0);
                            return bVotes - aVotes;
                        } else {
                            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                        }
                    });
                } catch (error) {
                    console.error('Error sorting posts:', error);
                }
                setPosts(sortedData);
            }
            setLoading(false);
        };
        fetchPosts();
    }, [sortBy, searchQuery]);
    
    const handleUpvote = (updatedPost) => {
        setPosts(posts.map(post => 
            post.id === updatedPost.id ? updatedPost : post
        ));
    };

    return (
        <div className="ReadPosts">
            <div className="controls">
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="sort-controls">
                    <select 
                        value={sortBy} 
                        onChange={(e) => setSortBy(e.target.value)}
                        className="sort-select"
                    >
                        <option value="time">Sort by Time</option>
                        <option value="upvotes">Sort by Upvotes</option>
                    </select>
                    <button 
                        onClick={() => setSortBy('time')} 
                        className="clear-sort"
                    >
                        Clear Sort
                    </button>
                </div>
            </div>
            <div className="posts-grid">
                {loading ? (
                    <div className="loading">Loading posts...</div>
                ) : posts && posts.length > 0 ?
                    posts.map((post) => (
                        <Card 
                            key={post.id}
                            id={post.id}
                            title={post.title}
                            author={post.author}
                            description={post.description}
                            upvotes={post.upvotes || 0}
                            created_at={post.created_at}
                            image={post.image}
                            onUpvote={handleUpvote}
                        />
                    )) : 
                    <h2>{'No Posts Yet 😞'}</h2>
                }
            </div>
        </div>
    )
}

export default ReadPosts;