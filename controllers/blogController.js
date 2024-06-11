const { BlogPosts } = require('../models');

module.exports = {
	add: async (req, res) => {
		const tempData = {
			title: req.body.title,
			content: req.body.content,
			createrId: req.session.user_id
		};
		const blogData = await BlogPosts.create(tempData);
		res.json(blogData);
	}
};