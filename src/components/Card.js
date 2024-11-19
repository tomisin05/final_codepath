import React from 'react'
import { useState } from 'react'
import './Card.css'
import more from './more.png'
import { Link } from 'react-router-dom'
import { supabase } from '../client';

const Card = (props) =>  {

  const handleUpvote = async () => {
    const { data } = await supabase
      .from('Posts')
      .update({ upvotes: (props.upvotes || 0) + 1 })
      .eq('id', props.id)
      .select()
      .single();
    
    if (data) {
      props.onUpvote(data);
    }
  }

  return (
      <div className="Card">
          <Link to={`/post/${props.id}`} className="card-link">
              <h2 className="title">{props.title}</h2>
              <h3 className="author">{"by " + props.author}</h3>
              {props.image && props.image.trim() !== '' && props.image !== 'null' && (
                  <div className="card-image">
                      <img 
                          src={props.image} 
                          alt={props.title}
                          onError={(e) => {
                              console.error('Failed to load image:', props.image);
                              e.target.onerror = null; // Prevent infinite loop
                              e.target.src = 'https://placehold.co/600x400/f8f9fa/6c757d?text=Image+Not+Available';
                          }}
                          loading="lazy" // Add lazy loading for better performance
                      />
                  </div>
              )}
              <div className="card-footer">
                  <span className="upvotes">👍 {props.upvotes}</span>
                  <span className="date">{new Date(props.created_at).toLocaleDateString()}</span>
              </div>
          </Link>
          <div className="card-actions">
              <button onClick={handleUpvote} className="upvote-btn">
                  Upvote
              </button>
              <Link to={`/edit/${props.id}`}>
                  <img className="moreButton" alt="edit button" src={more} />
              </Link>
          </div>
          
      </div>
  );
};

export default Card;