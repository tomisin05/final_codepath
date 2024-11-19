import React from 'react';
import './CreatePost.css'
import { useState } from 'react';
import { supabase } from '../client';




const CreatePost = () => {

    const [post, setPost] = useState({title: "", author: "", description: "", image_url: ""})

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const createPost = async (event) => {
        event.preventDefault();
      
        await supabase
          .from('Posts')
          .insert({title: post.title, author: post.author, description: post.description, image_url: post.image_url})
          .select();
      
        window.location = "/";
      }
      
    return (
        <div>
            <form>
                <label for="title">Title</label> <br />
                <input type="text" id="title" name="title" onChange={handleChange} /><br />
                <br/>

                <label for="author">Author</label><br />
                <input type="text" id="author" name="author" onChange={handleChange} /><br />
                <br/>

                <label for="description">Description</label><br />
                <textarea type="text" name="description" rows="5" cols="50" id="description" onChange={handleChange}>
                </textarea>
                <br/>
                <label for="image_url">Image URL</label><br />
                <input type="url" id="image_url" name="image_url" onChange={handleChange} /><br />
                <br/>

                <input type="submit" value="Submit" onClick={createPost} />
            </form>
        </div>
    )
}

export default CreatePost