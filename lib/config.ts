export const BASE_URL = "https://nan.fyi";

// 路由配置
export const routes = {
    // 文章相关路由
    posts: {
      // 文章列表页（首页）
      list: '/',
      // 文章详情页
      detail: (slug: string) => `/${slug}`,
    }
  } as const;
  
  export type Routes = typeof routes;