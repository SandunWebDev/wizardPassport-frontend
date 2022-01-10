module.exports = {
	'*.+(js|jsx|css|less|scss|graphql|gql|html|json|md|markdown|mdown|mkdn|mdx|ts|tsx|vue|yaml|yml)':
		['prettier --write'],
	'*.+(js|jsx)': ["eslint --fix'"],
	'*.+(css|scss|sass|less)': ['stylelint --fix'],
};
