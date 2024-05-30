const fastify = require('fastify')({ logger: true });
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('@fastify/cors');
const Comment = require('./models/comment');
const Category = require('./models/category'); 


const JWT_SECRET = 'your_jwt_secret_key';

// Enable CORS
fastify.register(cors, { 
  origin: '*' 
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/emailDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define user schema and model
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true }, // 'user', 'admin', or 'author'
});

const User = mongoose.model('User', userSchema);

// Define post schema and model
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String },
});

const Post = mongoose.model('Post', postSchema);

// Signup route
fastify.post('/signup', async (request, reply) => {
  try {
    const { email, password, role } = request.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, role });
    await newUser.save();
    reply.code(201).send({ success: true, message: 'User registered successfully' });
  } catch (error) {
    reply.code(500).send({ success: false, message: 'Error registering user' });
  }
});

// Login route
fastify.post('/login', async (request, reply) => {
  try {
    const { email, password } = request.body;
    const user = await User.findOne({ email });
    if (!user) {
      return reply.code(401).send({ success: false, message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return reply.code(401).send({ success: false, message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    reply.send({ success: true, token, role: user.role }); // Include the role in the response
  } catch (error) {
    reply.code(500).send({ success: false, message: 'Error during login' });
  }
});

// Get all posts
fastify.get('/posts', async (request, reply) => {
  try {
    const posts = await Post.find();
    reply.send({ success: true, posts });
  } catch (error) {
    reply.code(500).send({ success: false, message: 'Error fetching posts' });
  }
});

// Get a single post by ID
fastify.get('/posts/:id', async (request, reply) => {
  try {
    const post = await Post.findById(request.params.id);
    if (post) {
      reply.send({ success: true, post });
    } else {
      reply.code(404).send({ success: false, message: 'Post not found' });
    }
  } catch (error) {
    reply.code(500).send({ success: false, message: 'Error fetching post' });
  }
});

// Create a new post
fastify.post('/posts', async (request, reply) => {
  try {
    const { title, content, image } = request.body;
    const newPost = new Post({ title, content, image });
    await newPost.save();
    reply.code(201).send({ success: true, post: newPost });
  } catch (error) {
    reply.code(500).send({ success: false, message: 'Error creating post' });
  }
});

// Update a post
fastify.put('/posts/:id', async (request, reply) => {
  try {
    const { id } = request.params;
    const { title, content, image } = request.body;

    const updatedPost = await Post.findByIdAndUpdate(id, { title, content, image }, { new: true });

    if (!updatedPost) {
      return reply.code(404).send({ success: false, message: 'Post not found' });
    }

    reply.send({ success: true, post: updatedPost });
  } catch (error) {
    reply.code(500).send({ success: false, message: 'Error updating post' });
  }
});

// Delete a post
fastify.delete('/posts/:id', async (request, reply) => {
  try {
    const { id } = request.params;
    await Post.findByIdAndDelete(id);
    reply.send({ success: true, message: 'Post deleted successfully' });
  } catch (error) {
    reply.code(500).send({ success: false, message: 'Error deleting post' });
  }
});

// Add a comment to a post
fastify.post('/posts/:id/comments', async (request, reply) => {
  try {
    const { id } = request.params;
    const { name, email, comment } = request.body;
    const newComment = new Comment({ postId: id, name, email, comment });
    await newComment.save();
    reply.code(201).send({ success: true, comment: newComment });
  } catch (error) {
    reply.code(500).send({ success: false, message: 'Error adding comment' });
  }
});

// Get all comments for a post
fastify.get('/posts/:id/comments', async (request, reply) => {
  try {
    const { id } = request.params;
    const comments = await Comment.find({ postId: id });
    reply.send({ success: true, comments });
  } catch (error) {
    reply.code(500).send({ success: false, message: 'Error fetching comments' });
  }
});

// Delete a comment
fastify.delete('/comments/:id', async (request, reply) => {
  try {
    const { id } = request.params;
    await Comment.findByIdAndDelete(id);
    reply.send({ success: true, message: 'Comment deleted successfully' });
  } catch (error) {
    reply.code(500).send({ success: false, message: 'Error deleting comment' });
  }
});

// Get all users
fastify.get('/users', async (request, reply) => {
  try {
    const users = await User.find();
    reply.send({ success: true, users });
  } catch (error) {
    reply.code(500).send({ success: false, message: 'Error fetching users' });
  }
});

// Get a single user by ID
fastify.get('/users/:id', async (request, reply) => {
  try {
    const user = await User.findById(request.params.id);
    if (user) {
      reply.send({ success: true, user });
    } else {
      reply.code(404).send({ success: false, message: 'User not found' });
    }
  } catch (error) {
    reply.code(500).send({ success: false, message: 'Error fetching user' });
  }
});

// Update a user
fastify.put('/users/:id', async (request, reply) => {
  try {
    const { id } = request.params;
    const { email, password, role } = request.body;

    const updatedUser = await User.findByIdAndUpdate(id, { email, password, role }, { new: true });

    if (!updatedUser) {
      return reply.code(404).send({ success: false, message: 'User not found' });
    }

    reply.send({ success: true, user: updatedUser });
  } catch (error) {
    reply.code(500).send({ success: false, message: 'Error updating user' });
  }
});

// Delete a user
fastify.delete('/users/:id', async (request, reply) => {
  try {
    const { id } = request.params;
    await User.findByIdAndDelete(id);
    reply.send({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    reply.code(500).send({ success: false, message: 'Error deleting user' });
  }
});

// Create a new category
fastify.post('/categories', async (request, reply) => {
  try {
    const { name } = request.body;
    const newCategory = new Category({ name });
    await newCategory.save();
    reply.code(201).send({ success: true, category: newCategory });
  } catch (error) {
    reply.code(500).send({ success: false, message: 'Error creating category' });
  }
});

// Get all categories
fastify.get('/categories', async (request, reply) => {
  try {
    const categories = await Category.find();
    reply.send({ success: true, categories });
  } catch (error) {
    reply.code(500).send({ success: false, message: 'Error fetching categories' });
  }
});

// Delete a category
fastify.delete('/categories/:id', async (request, reply) => {
  try {
    const { id } = request.params;
    await Category.findByIdAndDelete(id);
    reply.send({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    reply.code(500).send({ success: false, message: 'Error deleting category' });
  }
});


// Start the server
const start = async () => {
  try {
    await fastify.listen(3000);
    console.log('Server is running on port 3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};



start();
