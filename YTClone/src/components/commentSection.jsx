import { useState } from 'react';
import axios from 'axios';

function CommentsSection(prop) {
  const { video } = prop;
  const [newComment, setNewComment] = useState(''); // State to store the new comment
  const [comments, setComments] = useState(video.comments || []); // State to store the comments
  const [editingCommentIndex, setEditingCommentIndex] = useState(null); // State to store the index of the comment being edited
  const [editingCommentText, setEditingCommentText] = useState(''); // State to store the text of the comment being edited
  const username = localStorage.getItem('username') || 'Anonymous'; // Get the username from localStorage

  // Function to handle comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim() === '') return;

    const newCommentObj = {
      user: username,
      text: newComment,
      videoId: video._id, // Include the video ID
    };

    try {
      const response = await axios.post('http://localhost:9000/comment', newCommentObj);
      setComments(response.data.comments);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  // Function to handle comment editing
  const handleEditComment = (index) => {
    setEditingCommentIndex(index);
    setEditingCommentText(comments[index].text);
  };

  // Function to save edited comment
  const handleSaveEdit = (index) => {
    const updatedComments = [...comments];
    updatedComments[index].text = editingCommentText;
    setComments(updatedComments);
    setEditingCommentIndex(null);
    setEditingCommentText('');
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-2">Comments</h3> {/* Comments section title */}
      
      <div className="comments-section">
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="comment mb-2"> {/* Comment container */}
              <p className="font-semibold">{comment.user}</p> {/* Comment user */}
              
              {comment.user === username ? (
                editingCommentIndex === index ? (
                  <div>
                    <textarea
                      value={editingCommentText}
                      onChange={(e) => setEditingCommentText(e.target.value)}
                      className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                      rows="2"
                    ></textarea> {/* Textarea for editing comment */}
                    
                    <button
                      onClick={() => handleSaveEdit(index)}
                      className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Save
                    </button> {/* Save button for edited comment */}
                  </div>
                ) : (
                  <div>
                    <p>{comment.text}</p> {/* Comment text */}
                    
                    <button
                      onClick={() => handleEditComment(index)}
                      className="mt-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                    >
                      Edit
                    </button> {/* Edit button for comment */}
                  </div>
                )
              ) : (
                <p>{comment.text}</p>
              )}
            </div>
          ))
        ) : (
          <p>No comments yet.</p> 
        )}
      </div>
      
      <form onSubmit={handleCommentSubmit} className="mt-4"> {/* Form for adding new comment */}
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          placeholder="Add a comment..."
          rows="3"
          required
        ></textarea> {/* Textarea for new comment */}
        
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Comment
        </button> {/* Button to submit new comment */}
      </form>
    </div>
  );
}

export default CommentsSection;