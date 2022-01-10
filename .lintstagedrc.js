module.exports = {
	// Linting Staged Files
	'*.+(js|jsx|ts|tsx|css|less|scss|graphql|gql|html|json|md|markdown|mdown|mkdn|mdx|ts|tsx|vue|yaml|yml)':
		['prettier --write'],
	'*.+(js|jsx|ts|tsx)': ["eslint --fix'"],
	'*.+(css|scss|sass|less)': ['stylelint --fix'],
};
