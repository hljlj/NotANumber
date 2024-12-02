const { setupDevPlatform } = require('@cloudflare/next-on-pages/next-dev');
const semiNext = require('@douyinfe/semi-next');

/** @type {import('next').NextConfig} */
const withSemiUI = semiNext({});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['@douyinfe/semi-ui', '@douyinfe/semi-foundation', '@douyinfe/semi-icons'],
  experimental: {
    forceSwcTransforms: true,
    appDir: true,
    esmExternals: 'loose'
  },
  compiler: {
    // 启用 SWC 编译器
    styledComponents: true,
    emotion: true,
  },
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
  webpack: (config, { isServer }) => {
    // 添加 .ts 扩展名到模块解析配置
    config.resolve.extensions = ['.ts', '.tsx', '.js', '.jsx', ...config.resolve.extensions];
    
    // 处理 ESM 模块
    config.resolve.fallback = {
      ...config.resolve.fallback,
      '@mdx-js/react': false,
      '@mdx-js/mdx': false
    };

    // 添加 TypeScript 和 JSX 处理
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['next/babel'],
          },
        },
      ],
    });

    return config;
  },
  async redirects() {
    return [
      {
        source: "/how-arrays-work",
        destination: "https://nan-archive.vercel.app/how-arrays-work",
        permanent: false,
      },
      {
        source: "/debugger",
        destination: "https://nan-archive.vercel.app/debugger",
        permanent: false,
      },
      {
        source: "/sliding-window",
        destination: "https://nan-archive.vercel.app/sliding-window",
        permanent: false,
      },
    ];
  },
};

if (process.env.NODE_ENV === 'development') {
  setupDevPlatform().catch(console.error);
}

module.exports = withSemiUI(nextConfig);
