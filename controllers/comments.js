import Comment from '../models/comment.js';
import User from '../models/user.js';
import Event from '../models/event.js';

export async function createComment(req, res) {
  console.log("This is the body: ", req.body);
  try {
    const { authorId, content, postId } = req.body;
    const user = await User.findById(authorId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newComment = new Comment({
      author: authorId,
      content,
      post: postId
    });
    const savedComment = await newComment.save();

    // Find the corresponding event and push the comment's _id into its comments array
    const event = await Event.findById(postId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    event.comments.push(savedComment._id);
    await event.save();

    res.status(201).json(savedComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export async function deleteComment(req, res) {
  try {
    const userId = req.params.id; // Assuming you have the user ID in req.params
    const commentId = req.body.commentId; // Assuming you pass the comment ID in req.body

    if (!userId || !commentId) {
      return res.status(400).json({ message: 'User ID and Comment ID are required' });
    }

    // Check if the provided user ID is valid
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the comment by ID and check if it exists
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check if the comment belongs to the specified user
    if (comment.author.toString() !== userId) {
      return res.status(403).json({ message: 'Comment does not belong to this user' });
    }

    // Delete the comment
    await Comment.findByIdAndDelete(commentId);

    return res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

export async function updateComment(req, res) {
  console.log("This is the body: ", req.body);
  console.log("This is the params: ", req.params);
  try {
    const userId = req.params; // assuming you are passing the id of the comment in the request parameters
    const { commentId, text } = req.body; // Assuming you have a 'userId' field in the request body
    console.log("This is commentId: ", commentId);
    console.log("This is text: ", text);

    if (!commentId) {
      return res.status(400).json({ message: 'Comment id is required' });
    }
    if (!text) {
      return res.status(400).json({ message: 'Comment text is required' });
    }

    // Find the comment by ID
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    console.log("This is comment author: ", comment.author.toString());
    console.log("This is userId: ", userId.id);
    // Check if the userId matches the author of the comment
    if (comment.author.toString() !== userId.id) {
      return res.status(403).json({ message: 'Permission denied' });
    }

    // Update the comment's content
    comment.content = text;
    const updatedComment = await comment.save();

    return res.status(200).json(updatedComment);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
