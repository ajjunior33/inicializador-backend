export default {
	jwt: {
		secret: process.env.HASH_APP,
		expiresIn: process.env.HASH_TIME ?? '30d',
	},
};
