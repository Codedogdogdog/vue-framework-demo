const path = require('path');
const fs = require("fs");
const { CachedInputFileSystem, ResolverFactory } = require("enhanced-resolve");

const CACHED_DURATION = 60000;
const fileSystem = new CachedInputFileSystem(fs, CACHED_DURATION);
// 解决postcss-import 不支持 webpack alias导致 @import引入错误问题
const resolver = ResolverFactory.createResolver({
  alias: {
    '@': path.resolve(__dirname, 'src'),
  },
  extensions: ['.css'],
  modules: ['src', 'node_modules'],
  useSyncFileSystemCalls: true,
  fileSystem,
});

module.exports = {
  plugins: {
    'postcss-import': {
      resolve(id, basedir) {
        return resolver.resolveSync({}, basedir, id);
      },
    },
    'postcss-url': {},
    // to edit target browsers: use "browserslist" field in package.json
    autoprefixer: {},
  },
}
