const { BlogPosts } = require('../models');

module.exports = {
	homepage: async (req, res) => {
		const blogPosts = await BlogPosts.findAll({ include: ['user'] });

		const posts = blogPosts.map((post) => post.get({ plain: true }));
		console.log(req.session.logged_in);
		res.render('homepage', { posts, logged_in: req.session.logged_in });
	},
	signup: async (req, res) => {
		res.render('signup');
	}
};