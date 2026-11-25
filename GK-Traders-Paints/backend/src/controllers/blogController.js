const BlogPost = require('../models/BlogPost');

exports.getAllPosts = async (req, res, next) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category && category !== 'All') {
      query.category = { $regex: new RegExp(`^${category}$`, 'i') };
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    const posts = await BlogPost.find(query).sort({ publishedAt: -1 });
    res.json({ success: true, count: posts.length, data: posts });
  } catch (error) {
    next(error);
  }
};

exports.getPostBySlug = async (req, res, next) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug });
    if (!post) {
      return res.status(404).json({ success: false, message: 'Blog article not found' });
    }

    const relatedPosts = await BlogPost.find({
      _id: { $ne: post._id },
      category: post.category,
    }).limit(3);

    res.json({ success: true, data: post, relatedPosts });
  } catch (error) {
    next(error);
  }
};
