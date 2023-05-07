import {defineConfig} from "vite";
import vue from '@vitejs/plugin-vue';
import styleImport, { VantResolve } from 'vite-plugin-style-import';

export default defineConfig({
  plugins: [
    vue(),
    styleImport({
      resolves: [VantResolve()],
      //增加的代码
      libs: [
        {
          libraryName: 'vant',
          esModule: true,
          resolveStyle: name => `../es/${name}/style`
        }
      ]
    }),
  ],
  server: {
    port: 3000,
  }
})