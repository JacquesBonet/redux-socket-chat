var path=require('path');
var webpack=require('webpack');

var ROOT_PATH=path.resolve(__dirname);
var APP_PATH=path.resolve(ROOT_PATH,'public/App');
var Build_PATH=path.resolve(ROOT_PATH,'public/build/static');

module.exports={
	entry:{
		app:path.resolve(APP_PATH,'index.jsx'),
		vendors:['react','react-dom']
	},
	output:{
		path:Build_PATH,
		filename:'bundle.js',
		publicPath: 'static/'
	},
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
					"presets":['react','es2015','stage-0']
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
	plugins: [
		//把入口文件里面的数组打包成verdors.js
    	new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
	]
};
