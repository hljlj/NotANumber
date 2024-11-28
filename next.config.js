/** @type {import('next').NextConfig} */
const withSemiUI = require('@douyinfe/semi-next').default({});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['@douyinfe/semi-ui', '@douyinfe/semi-foundation', '@douyinfe/semi-icons'],
  experimental: {
    forceSwcTransforms: true,
    appDir: true,
    esmExternals: 'loose'
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

module.exports = withSemiUI(nextConfig);
