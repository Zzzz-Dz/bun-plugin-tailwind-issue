import tailwindPlugin from "bun-plugin-tailwind";

await Bun.build({
  entrypoints: ["./server/index.js"], // 文件入口
  compile: {
    target: "bun-windows-x64",
  },
  outfile: "./my-app",
  plugins: [tailwindPlugin], // 要在捆绑过程中使用的插件列表,可以使用打包器
});
