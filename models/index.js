const User = require('./User');
const BlogPost = require('../../../../OneDrive/Tech_Blog/models/BlogPost');
const Comment = require('../../../../OneDrive/Tech_Blog/models/Comment');
// user has many blogposts through the user_id blog post column
User.hasMany(BlogPost, {
    foreignKey: 'user_id',
});
// blog posts belongs to a user through the user_id blog post column
BlogPost.belongsTo(User, {
    foreignKey: 'user_id'
});
// user has many comments through the user_id comment column
User.hasMany(Comment, {
    foreignKey: 'user_id',
});
// comments belong to user through the user_id comment column
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});
// blog post has many comments through blog_post_id comment column 
BlogPost.hasMany(Comment, {
    foreignKey: 'blog_post_id'
});
// comments belong to blogposts through blog_post_id comment column 
Comment.belongsTo(BlogPost, {
    foreignKey: 'blog_post_id',
});

// export tables with relationships
module.exports = { User, BlogPost, Comment };