import Comment from '../models/comment.js';
import User from '../models/user.js';

export async function getCommentById(req, res) {
  try {
    const commentId = req.params.id;

    // Find the comment by ID in the database
    const comment = await Comment.findById(commentId);

    if (!comment) {
      // If the comment is not found, send a 404 (Not Found) response
      return res.status(404).json({ message: 'Comment not found' });
    }

    // If the comment is found, send a JSON response with the comment data
    res.status(200).json(comment);
  } catch (error) {
  
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export async function createComment(req, res) {
  try {
    const { authorId, content, postId } = req.body;

    // Find the user by ID in the database
    const user = await User.findById(authorId);

    if (!user) {
      // If the user is not found, send a 404 (Not Found) response
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new comment instance
    const newComment = new Comment({
      author: authorId,
      content,
      post: postId
    });

    // Save the comment to the database
    const savedComment = await newComment.save();

    res.status(201).json(savedComment);
  } catch (error) {
   
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
