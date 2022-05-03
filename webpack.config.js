var path = require('path');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  // "development" will be human readable 
  // "production" will be minified
    mode: "development",
    entry: `${SRC_DIR}/index.js`,
    output: {
      filename: 'bundle.js',
      path: DIST_DIR
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react"
              ],
              plugins: [
                ["@babel/plugin-transform-runtime",
                {
                  "regenerator": true
                }
              ]
            ]
          }
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: 'url-loader',
        },
        devtool: "eval-cheap-module-source-map",
        // [devServer] configuration for the live server including port
        devServer: {
        // [static] config for how what to serve
        static: {
          directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 3000,
      }
    ]
  }
};
