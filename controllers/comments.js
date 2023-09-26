import Comment from '../models/comment.js';
import User from '../models/user.js';

export async function updateComment(req, res) {
}

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
}
