var path = require("path");
var HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  entry:{
    app: ["@babel/polyfill",path.resolve(__dirname, "src/Main.js")],
    //user: path.resolve(__dirname, "src/user.js"),
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: '[name].js'
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options:{
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["@babel/plugin-proposal-class-properties","@babel/plugin-transform-runtime"]
          }
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  }, 
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    compress: true,
    port: 9000
  },
  plugins:[
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new HtmlWebPackPlugin({
      filename:'./index.html',
      template: "./public/index.html",
    })/* ,
    new HtmlWebPackPlugin({
      filename:'./user.html',
      template: "./public/user.html",
    }) */
  ]
};