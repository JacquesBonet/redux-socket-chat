var path=require('path');
var webpack=require('webpack');

var ROOT_PATH=path.resolve(__dirname);
var APP_PATH=path.resolve(ROOT_PATH,'public/App');
var Build_PATH=path.resolve(ROOT_PATH,'public/build/');

module.exports={
	entry: [
	   'webpack-hot-middleware/client',
       'webpack/hot/only-dev-server',
	   path.resolve(APP_PATH,'index.jsx')
	],
	output:{
		path:Build_PATH,
		filename:'bundle.js',
		publicPath: '/static/'
	},
	devtool:'eval-source-map',
	module:{
		perLoaders:[
			{
				test:/\.jsx?$/,
				include:APP_PATH,
				loader:'jshint'
			}
		],
		loaders:[
			{
				test:/\.jsx?$/,
				loader:'babel',
				include:APP_PATH,
				query:{
					"presets":['react','es2015','stage-0'],
					"env": {
					   "development": {
					   		"presets": ["react-hmre"]
				    	}
					}
				}			
			},
			{
				test:/\.scss$/,
				loaders:['style','css','sass']
			},
			{
		        test: /\.css$/,
		        loaders: ['style', 'css'],
		        include: APP_PATH
		    }
		]
	},
	jshint: {
	  "esnext": true
	},
	plugins: [
	  new webpack.optimize.OccurenceOrderPlugin(),
	  new webpack.HotModuleReplacementPlugin(),
	  new webpack.NoErrorsPlugin()
  ]
};
