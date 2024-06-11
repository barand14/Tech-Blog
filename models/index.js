const BlogPosts = require('./BlogPosts');
const User = require('./Users');

User.hasMany(BlogPosts, {
	foreignKey: 'createrId',
	onDelete: 'CASCADE'
});

BlogPosts.belongsTo(User, {
	foreignKey: 'createrId'
});

module.exports = { BlogPosts, User };