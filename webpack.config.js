module.exports = {
  mode: 'development',
  entry: {
    musicPlayer: './music-player-service/client/src/index.jsx',
    sidebar: './sidebar-views/client/src/index.jsx'
  },
  module: {
    rules: [{
      test: /\.jsx$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      }
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/client/dist'
  }
}