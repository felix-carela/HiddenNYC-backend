import Comment from '../models/comment.js';
import User from '../models/user.js';

export async function createComment(req, res) {
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

    res.status(201).json(savedComment);
  } catch (error) {
   
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
export async function deleteComment(req, res) {
  try {
    const { id } = req.params; // assuming you are passing the id of the comment in the request parameters
    if (!id) {
      return res.status(400).json({ message: 'Comment id is required' });
    }

    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    await Comment.findByIdAndDelete(id);
    return res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

export async function updateComment(req, res) {
  try {
    const { id } = req.params; // assuming you are passing the id of the comment in the request parameters
    if (!id) {
      return res.status(400).json({ message: 'Comment id is required' });
    }

    const { text } = req.body; // assuming you want to update the text of the comment
    if (!text) {
      return res.status(400).json({ message: 'Comment text is required' });
    }

    const updatedComment = await Comment.findByIdAndUpdate(id, { text }, { new: true });
    if (!updatedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    return res.status(200).json(updatedComment);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
