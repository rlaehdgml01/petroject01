module.exports = {
  name: 'web server',
  mode: process.env.NODE_ENV,
  devtool: 'eval',

  entry: {
    app: [`${__dirname}/client/views/index.jsx`]
  },

  module: {
    rules: [{
      test: /\.(js|jsx)?$/,
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-react'],
      }
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.(jpe?g|png|gif|svg|ttf|eot|woff|woff2)$/i,
      use: [{
        loader:'url-loader',
        options:{
          limit:8192,
          fallback:require.resolve('file-loader')
        }
      }]
    }],
  },

  plugins: [],

  output: {
    path: `${__dirname}/client/build`,	// __dirname: webpack.config.js 파일이 위치한 경로
    filename: 'bundle.js'
  },
}