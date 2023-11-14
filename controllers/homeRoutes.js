const { BlogPost, User, Comment } = require('../../../Downloads/tech-blog-main/tech-blog-main/models')
const router = require('express').Router();
// home page
router.get('/', async (req, res) => {
  try {
    // get all posts and join with user data
    const blogPostData = await BlogPost.findAll({
      include: User,
      order: [['date_created', 'DESC']],
    });
    // serialize data 
    const blogPosts = blogPostData.map((post) => post.get({ plain: true }));
    // render data with homepage view
    res.render('homepage', {
      blogPosts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err)
  }
});

//specific post with comments
router.get('/post/:id', async (req, res) => {
  try {
    // Fetch the blog post with user and comment data 
    const blogPostData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          include: User,
        },
        {
          model: User,
        },
      ],
    });
    // serialize dtaa
    const blogPost = blogPostData.get({ plain: true });

    // check if the logged in user is the owner of the comment
    const commentsData = await Comment.findAll({
      where: {
        blog_post_id: req.params.id,
      },
      include: User,
    });

    // add boolean value to each comment to see if the user made them
    // serialze comment array
    const comments = commentsData.map((comment) => {
      const isOwner = comment.user_id === req.session.user_id;
      return {
        ...comment.get({ plain: true }),
        isOwner,
      };
    });
    // render blog posts, comments, and blogPost view 
    res.render('blogpost', {
      blogPost,
      comments,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// login page
router.get('/login', async (req, res) => {
// redirect if user is loggged in
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  // display login view if user is not logged in
  res.render('login');
})

module.exports = router;