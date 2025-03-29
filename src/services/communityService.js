// Mock database for community posts (in a real app, this would be a backend service)
let posts = [
  {
    id: 1,
    userId: 'user1',
    userName: 'Priya Sharma',
    title: 'Healthy Breakfast Thali',
    description: 'A nutritious breakfast thali with sprouts, poha, and fruits',
    mealType: 'breakfast',
    cuisine: 'Indian',
    dietType: 'veg',
    ingredients: ['sprouts', 'poha', 'fruits', 'yogurt'],
    image: 'https://example.com/breakfast-thali.jpg',
    likes: 24,
    comments: [
      { id: 1, userId: 'user2', userName: 'Rahul', text: 'Looks delicious!', timestamp: '2024-03-06T10:30:00Z' }
    ],
    timestamp: '2024-03-06T08:00:00Z'
  },
  {
    id: 2,
    userId: 'user3',
    userName: 'Amit Patel',
    title: 'High Protein Lunch',
    description: 'Quinoa bowl with paneer tikka and roasted vegetables',
    mealType: 'lunch',
    cuisine: 'Fusion',
    dietType: 'veg',
    ingredients: ['quinoa', 'paneer', 'bell peppers', 'broccoli'],
    image: 'https://example.com/quinoa-bowl.jpg',
    likes: 18,
    comments: [],
    timestamp: '2024-03-06T09:15:00Z'
  }
];

class CommunityService {
  async getPosts(filters = {}) {
    try {
      // In a real app, this would be an API call
      let filteredPosts = [...posts];

      if (filters.mealType) {
        filteredPosts = filteredPosts.filter(post => post.mealType === filters.mealType);
      }
      if (filters.cuisine) {
        filteredPosts = filteredPosts.filter(post => post.cuisine === filters.cuisine);
      }
      if (filters.dietType) {
        filteredPosts = filteredPosts.filter(post => post.dietType === filters.dietType);
      }

      return {
        success: true,
        posts: filteredPosts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch posts'
      };
    }
  }

  async createPost(postData) {
    try {
      const newPost = {
        id: posts.length + 1,
        userId: 'currentUser', // In a real app, this would come from auth
        userName: 'Current User', // In a real app, this would come from auth
        likes: 0,
        comments: [],
        timestamp: new Date().toISOString(),
        ...postData
      };

      posts.unshift(newPost);

      return {
        success: true,
        post: newPost
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to create post'
      };
    }
  }

  async likePost(postId) {
    try {
      const post = posts.find(p => p.id === postId);
      if (post) {
        post.likes += 1;
        return {
          success: true,
          likes: post.likes
        };
      }
      return {
        success: false,
        error: 'Post not found'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to like post'
      };
    }
  }

  async addComment(postId, comment) {
    try {
      const post = posts.find(p => p.id === postId);
      if (post) {
        const newComment = {
          id: post.comments.length + 1,
          userId: 'currentUser', // In a real app, this would come from auth
          userName: 'Current User', // In a real app, this would come from auth
          text: comment,
          timestamp: new Date().toISOString()
        };
        post.comments.push(newComment);
        return {
          success: true,
          comment: newComment
        };
      }
      return {
        success: false,
        error: 'Post not found'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to add comment'
      };
    }
  }

  async searchPosts(query) {
    try {
      const searchResults = posts.filter(post =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.description.toLowerCase().includes(query.toLowerCase()) ||
        post.ingredients.some(ingredient => 
          ingredient.toLowerCase().includes(query.toLowerCase())
        )
      );

      return {
        success: true,
        posts: searchResults
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to search posts'
      };
    }
  }

  async getTrendingTags() {
    return {
      success: true,
      tags: [
        { name: 'HealthyBreakfast', count: 128 },
        { name: 'ProteinRich', count: 95 },
        { name: 'QuickMeals', count: 82 },
        { name: 'DiabeticFriendly', count: 76 },
        { name: 'WeightLoss', count: 64 }
      ]
    };
  }
}

export default new CommunityService(); 