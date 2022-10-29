const path = require('path');

module.exports = {
  entry: './src/app.ts',
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          },
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /\.m?js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']    
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../assets/www/js')
  },
  plugins: [
  ],
  devtool: 'cheap-module-source-map',
  //mode: "development",
  optimization: {
    // We no not want to minimize our code.
    minimize: false
  },
  devServer: {
    disableHostCheck: true,
    historyApiFallback: {
      index: "",
      verbose: true,
      disableDotRule: true
    }
  }
};
