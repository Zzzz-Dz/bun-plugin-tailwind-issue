import { Elysia } from "elysia";
import { staticPlugin } from "@elysiajs/static";

const bun_port = process.env.bun_port;
const elysia_port = +bun_port + 1;

const app = new Elysia({
  systemRouter: true,
  prefix: "/api",
})
  .onError(({ code, error, set }) => {
    if (code === "NOT_FOUND") {
      set.status = 404;
      return new Response("路径不存在");
    }

    return error;
  })
  .use(staticPlugin({ assets: "public", prefix: "/public" }))
  .get("/", () => {
    return { code: 200, msg: "ok", data: "hello zzz" };
  })
  .listen(elysia_port);

import dashboard from "../public/dashboard.html";
import { serve } from "bun";
serve({
  port: bun_port,
  routes: {
    "/": dashboard,
    "/api/*": async (req) => {
      const fetchMethod = req.method;
      const fetchURL = new URL(req.url);

      const data = fetchMethod === "POST" && (await req.body.json());

      try {
        const response = await fetch(
          `http://127.0.0.1:${elysia_port}${fetchURL.pathname}${fetchURL.search}`,
          { method: fetchMethod, ...(data && { body: data }) }
        );

        if (!response.ok) {
          const error = new Error(`请求错误: ${response.statusText}`);
          error.status = response.status;
          throw error;
        }

        const datas = await response.json();

        return Response.json(datas);
      } catch (e) {
        console.error(e);
        return new Response(e.message, {
          status: e.status,
          statusText: e.message,
        });
      }
    },
  },
  development: true,
  async fetch(req) {
    return new Response("hello world");
  },
});

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
