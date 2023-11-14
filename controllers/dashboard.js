const { BlogPost, User, Comment } = require('../../../Downloads/tech-blog-main/tech-blog-main/models');
const withAuth = require('../../../Downloads/tech-blog-main/tech-blog-main/utils/auth');
const router = require('express').Router();

// user dashboard
router.get('/', withAuth, async (req, res) => {
  // fetch all posts made by user including user data
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: BlogPost, include: [User] }],
    });
    // serialzie user data
    const user = userData.get({ plain: true });
    // display all user posts and render dashboard view
    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err)
  }
});

// user post
router.get('/:id', withAuth, async (req, res) => {
  // fetch specific blog post with user and comment data
  try {
    const userPostData = await BlogPost.findByPk(req.params.id, {
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
    // serialize post data
    const userPost = userPostData.get({ plain: true });
    // render user post and edit view
    res.render('edit', {
      ...userPost,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  };
});

module.exports = router;