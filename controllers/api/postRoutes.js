const router = require('express').Router();
const { BlogPost } = require('../../models');
// verify user is logged in helper function
const withAuth = require("../../utils/auth");

// create blog post
router.post('/', withAuth, async (req, res) => {
    // create new BlogPost with logged in users id
    try {
        const blogPostData = await BlogPost.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(blogPostData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// delete a blog post
router.delete('/:id', withAuth, async (req, res) => {
    // locate target post via url id and logged in user id
    try {
        const blogPostData = await BlogPost.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            }
        });
        // verify id
        if (!blogPostData) {
            res.status(404).json({ message: 'No blog post found with this id!' });
            return;
        }
        res.status(200).json(blogPostData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// update a blog post
router.put('/:id', withAuth, async (req, res) => {
    // locate target post via url id and logged in user id
    // update blog post content and date
    try {
        const blogPostData = await BlogPost.update({
            ...req.body,
            date_updated: new Date(),
        },
            {
                where: {
                    id: req.params.id,
                    user_id: req.session.user_id,
                }
            });
        // verify id
        if (!blogPostData) {
            res.status(404).json({ message: 'No blog post found with this id!' });
            return;
        }
        res.status(200).json(blogPostData);
    } catch (err) {
        res.status(400).json(err)
    }
})

module.exports = router;