const sequelize = require('../config/connection');
const { User, BlogPost, Comment } = require('../models');

const userData = require('../../../Downloads/tech-blog-main/tech-blog-main/seeds/userData.json');
const blogPostData = require('./blogPostData.json');
const CommentData = require('./commentData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force:true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for (const blogPost of blogPostData) {
        await BlogPost.create({
            ...blogPost,
        })
    }

    const comment = await Comment.bulkCreate(CommentData)

    process.exit(0)
};

seedDatabase();
