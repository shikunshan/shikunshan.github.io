import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  bundler: viteBundler(),

  theme: defaultTheme({
    navbar: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide' },
    ],

    sidebar: [
      {
        text: '首页',
        collapsible: true,
        children: [
          '/',             
          '/contributing', 
        ],
      },
      {
        text: '测试',
        collapsible: true,
        children: [
          '/test/getting-started', 
          '/test/go-deeper',      
          '/test/',  
        ],
      },
      {
        text: '学习笔记',
        collapsible: true,
        children: [
          '/学习笔记/Markdown语法', 
          '/学习笔记/Java连接MySQL',      
          '/学习笔记/为什么使用Maven',  
        ],
      },
      {
        text: '每日记录',
        collapsible: true,
        children: [
          '/每日记录/模板',
          '/每日记录/2026.5.8', 
          '/每日记录/2026-05-09', 
          '/每日记录/2026-05-10', 
          '/每日记录/2026-05-11', 
        ],
      },
      {
        text: '哲学思考',
        collapsible: true,
        children: [
          '/哲学思考/活着',
          '/哲学思考/克制欲望',
          '/哲学思考/健康生活',
        ],
      },
    ],

  }),
})