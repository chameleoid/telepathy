import path from 'path';
import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const configCallback = (env: {[key: string]: string}, argv: webpack.Configuration): webpack.Configuration => {
  const mode = argv.mode || 'development';
  console.log('running webpack with mode:', mode);

  const config: webpack.Configuration = {
    mode,

    entry: {
      'telepathy': './src/telepathy.ts',
    },

    output: {
      filename: mode === 'production' ? '[name].min.js' : '[name].js',
      path: path.resolve(__dirname, 'dist'),
      library: 'telepathy',
    },

    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },

    module: {
      rules: [{
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      }],
    },
  };

  if (mode === 'development') {
    config.devtool = 'inline-source-map';
  }

  return config;
};

export default configCallback;
