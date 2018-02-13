import { resolve } from 'path'
import { BannerPlugin } from 'webpack' // eslint-disable-line import/no-extraneous-dependencies
import merge from 'webpack-merge' // eslint-disable-line import/no-extraneous-dependencies
import ReloadServerPlugin from 'reload-server-webpack-plugin' // eslint-disable-line import/no-extraneous-dependencies
import {
  PRODUCTION,
  outputPath,
  eslintRule,
  babelRule,
  vueRule,
  stats,
  nodeExternals,
  definePlugin,
} from './base'

const graphql = {
  target: 'node',
  entry: './index',
  output: {
    path: outputPath,
    filename: 'graphql.js',
  },
  module: {
    rules: [
      // eslintRule,
      babelRule,
      vueRule,
    ],
  },
  resolve: {
    alias: { _: resolve('core') },
  },
  stats,
  externals: nodeExternals,
  plugins: [
    definePlugin,
  ],
}

export default !PRODUCTION ? merge(graphql, {
  devtool: 'inline-source-map',
  plugins: [
    new BannerPlugin({
      raw: true,
      banner: 'import "source-map-support/register"',
    }),
    new ReloadServerPlugin({
      script: 'build/graphql.js',
    }),
  ],
}) : merge(graphql, {
  plugins: [],
})
