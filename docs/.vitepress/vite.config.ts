import { defineConfig } from 'vite';

export default defineConfig({
  // 最直接的解决方案：拦截并转换ESM模块导入
  plugins: [
    {
      name: 'fix-default-imports',
      // 在SSR阶段转换导入语句
      transform(code, id) {
        // 针对estree-walker的默认导入进行转换
        if (code.includes('import') && (id.includes('vitepress') || id.includes('.temp'))) {
          return {
            code: code
              // 将默认导入转换为命名空间导入
              .replace(/import\s+(\w+)\s+from\s+['"]estree-walker['"]/g, 'import * as $1 from \'estree-walker\'')
              // 同时处理entities模块
              .replace(/import\s+(\w+)\s+from\s+['"]entities\/lib\/decode\.js['"]/g, 'import * as $1 from \'entities/lib/decode.js\''),
            map: null
          };
        }
        return null;
      }
    }
  ],
  // 确保SSR过程中这些模块被正确处理
  ssr: {
    // 不将这些模块外部化，确保转换生效
    noExternal: ['estree-walker', 'entities']
  }
});