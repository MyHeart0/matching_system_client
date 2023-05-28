import {defineConfig} from "vite";
import vue from '@vitejs/plugin-vue';
import styleImport, { VantResolve } from 'vite-plugin-style-import';
import dns from 'dns';
dns.setDefaultResultOrder('verbatim')

export default defineConfig({
  plugins: [
    vue(),
    styleImport( {
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
    // host: 'localhost',
    port: 3000,


  },


})