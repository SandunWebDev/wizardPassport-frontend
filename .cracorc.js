// Since CreateReactApp 4.0, Dev Server (npm start) failed when ever their is ESLint Error. So temporally using 'CRACO' to override this. (Use npm run start-craco)
// Related Links:
//      github.com/facebook/create-react-app/issues/9887#issuecomment-742171239
//      https://github.com/gsoft-inc/craco/

module.exports = {
	webpack: {
		configure: (webpackConfig, { env, paths }) => {
			const EXCLUDED_PLUGINS = ['ESLintWebpackPlugin'];
			webpackConfig.plugins = webpackConfig.plugins.filter(
				(plugin) => !EXCLUDED_PLUGINS.includes(plugin.constructor.name),
			);
			return webpackConfig;
		},
	},
};
