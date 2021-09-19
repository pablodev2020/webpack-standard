const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");

// const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

/* seguir con clase 11-manejo de imagenes */

module.exports = {

  mode: 'production',
  optimization:{
    minimizer: [new OptimizeCssAssetsPlugin()]
  },
//   entry: './src/index.js',
  output: {
    filename: 'main-[contenthash].js',
    // path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  
//   devServer: {
//     contentBase: path.join(__dirname, 'dist'),
//     port: 3000,
//     open: true,
//   },
    module:
            {        
            rules:[
                    {
                        test: /\.m?js$/,
                        exclude: /node_modules/,
                        use: {
                        loader: "babel-loader",
                        options: {
                        presets: ['@babel/preset-env']
                        }
                        }
                    },
                    {
                        test:/\.html$/i,
                        use: [
                                {
                                    loader:'html-loader',
                                    options:{minimize:false}
                                }
                            ],        
                    },
                    {
                        test: /\.css$/i,
                        exclude:/styles\.css$/i,            // excluir css global:
                        use: ['style-loader', 'css-loader'],
                    },
                    // para css global:
                    {    
                        test: /styles\.css$/i,
                        // exclude: /node_modules/,
                        use: [MiniCssExtractPlugin.loader, 'css-loader'],
                    },

                        //css optimizacion:
                //     {
                //         test: /.s?css$/,
                //         use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
                //       },

                {
                  test: /\.(png|svg|jpg|jpeg|gif)$/i,
                  type: 'asset/resource',
                  generator: {
                  filename: 'assets/images/[name][ext]',//'assets/images/[hash][ext][query]'es otra opcion
                  },
                },

                // {
                //   test: /\.(png|svg|jpg|gif)$/,
                //   // type: 'asset/resource',
                //   use: [
                //     {
                //       loader: 'file-loader',
                //       options: {
                //         esModule: false,
                //         name: 'assets/[name].[ext]'
                //       },
                //     },
                //   ],
                // },
                 ],
                //optimizacion css
                // optimization: {
                //     minimizer: [
                //       // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
                //       // `...`,
                //       new CssMinimizerPlugin(),
                //     ],
                //   },        
            },
            
    plugins: [
        new HtmlWebpackPlugin(
                {
                template: './src/index.html',
                filename: 'index.html',
                inject: 'body',
                }
        ),
        // para css global (styles.css en este caso):
        new MiniCssExtractPlugin(
            {
            filename:'[name].[contenthash].css',  // [name] - indica que deje el mismo nombre
            ignoreOrder:false
            }
        ),
        new MinifyPlugin()  //
    ],
};