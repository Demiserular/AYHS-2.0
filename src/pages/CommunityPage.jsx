import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSearch, FaHeart, FaComment, FaShare, FaFilter,
  FaPlus, FaTags, FaUserCircle
} from 'react-icons/fa';
import communityService from '../services/communityService';
import './CommunityPage.css';

const CommunityPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    mealType: '',
    cuisine: '',
    dietType: ''
  });
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [trendingTags, setTrendingTags] = useState([]);
  const [newPost, setNewPost] = useState({
    title: '',
    description: '',
    mealType: '',
    cuisine: '',
    dietType: '',
    ingredients: []
  });

  useEffect(() => {
    fetchPosts();
    fetchTrendingTags();
  }, [filters]);

  const fetchPosts = async () => {
    try {
      const result = await communityService.getPosts(filters);
      if (result.success) {
        setPosts(result.posts);
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError('Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  const fetchTrendingTags = async () => {
    const result = await communityService.getTrendingTags();
    if (result.success) {
      setTrendingTags(result.tags);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    const result = await communityService.searchPosts(searchQuery);
    if (result.success) {
      setPosts(result.posts);
    }
    setLoading(false);
  };

  const handleCreatePost = async () => {
    if (!newPost.title || !newPost.description) {
      setError('Please fill in all required fields');
      return;
    }

    const result = await communityService.createPost(newPost);
    if (result.success) {
      setPosts([result.post, ...posts]);
      setShowCreatePost(false);
      setNewPost({
        title: '',
        description: '',
        mealType: '',
        cuisine: '',
        dietType: '',
        ingredients: []
      });
    } else {
      setError(result.error);
    }
  };

  const handleLike = async (postId) => {
    const result = await communityService.likePost(postId);
    if (result.success) {
      setPosts(posts.map(post =>
        post.id === postId ? { ...post, likes: result.likes } : post
      ));
    }
  };

  const handleComment = async (postId, comment) => {
    const result = await communityService.addComment(postId, comment);
    if (result.success) {
      setPosts(posts.map(post =>
        post.id === postId ? { ...post, comments: [...post.comments, result.comment] } : post
      ));
    }
  };

  return (
    <div className="community-page">
      <motion.div 
        className="community-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>Community Kitchen</h1>
        <p>Share and discover healthy meal ideas from the community</p>
      </motion.div>

      <div className="community-actions">
        <div className="search-bar">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for meal ideas..."
          />
          <button onClick={handleSearch}>
            <FaSearch />
          </button>
        </div>

        <button 
          className="create-post-button"
          onClick={() => setShowCreatePost(true)}
        >
          <FaPlus /> Share Your Meal
        </button>
      </div>

      <div className="community-content">
        <div className="filters-sidebar">
          <h3><FaFilter /> Filters</h3>
          <select
            value={filters.mealType}
            onChange={(e) => setFilters({ ...filters, mealType: e.target.value })}
          >
            <option value="">All Meal Types</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="snacks">Snacks</option>
          </select>

          <select
            value={filters.dietType}
            onChange={(e) => setFilters({ ...filters, dietType: e.target.value })}
          >
            <option value="">All Diet Types</option>
            <option value="veg">Vegetarian</option>
            <option value="non-veg">Non-Vegetarian</option>
            <option value="vegan">Vegan</option>
          </select>

          <div className="trending-tags">
            <h3><FaTags /> Trending</h3>
            <div className="tags-list">
              {trendingTags.map(tag => (
                <span key={tag.name} className="tag">
                  #{tag.name}
                  <small>{tag.count}</small>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="posts-container">
          {loading ? (
            <div className="loading">Loading posts...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            <AnimatePresence>
              {posts.map(post => (
                <motion.div
                  key={post.id}
                  className="post-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="post-header">
                    <div className="user-info">
                      <FaUserCircle className="avatar" />
                      <span>{post.userName}</span>
                    </div>
                    <span className="timestamp">
                      {new Date(post.timestamp).toLocaleDateString()}
                    </span>
                  </div>

                  <h3>{post.title}</h3>
                  <p>{post.description}</p>

                  {post.image && (
                    <img src={post.image} alt={post.title} className="post-image" />
                  )}

                  <div className="ingredients">
                    <strong>Ingredients:</strong>
                    <div className="ingredients-list">
                      {post.ingredients.map((ingredient, index) => (
                        <span key={index} className="ingredient-tag">
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="post-actions">
                    <button onClick={() => handleLike(post.id)}>
                      <FaHeart /> {post.likes}
                    </button>
                    <button>
                      <FaComment /> {post.comments.length}
                    </button>
                    <button>
                      <FaShare />
                    </button>
                  </div>

                  <div className="comments-section">
                    {post.comments.map(comment => (
                      <div key={comment.id} className="comment">
                        <strong>{comment.userName}</strong>
                        <p>{comment.text}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showCreatePost && (
          <motion.div
            className="create-post-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="modal-content">
              <h2>Share Your Meal</h2>
              <input
                type="text"
                placeholder="Title"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              />
              <textarea
                placeholder="Description"
                value={newPost.description}
                onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
              />
              <select
                value={newPost.mealType}
                onChange={(e) => setNewPost({ ...newPost, mealType: e.target.value })}
              >
                <option value="">Select Meal Type</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snacks">Snacks</option>
              </select>
              <input
                type="text"
                placeholder="Ingredients (comma-separated)"
                onChange={(e) => setNewPost({ 
                  ...newPost, 
                  ingredients: e.target.value.split(',').map(i => i.trim()) 
                })}
              />
              <div className="modal-actions">
                <button onClick={() => setShowCreatePost(false)}>Cancel</button>
                <button onClick={handleCreatePost}>Share</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CommunityPage; 