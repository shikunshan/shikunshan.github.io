---
lang: zh-CN
title: 页面的标题1
description: 页面的描述1
---
# 快速开始

1. 首先
2. 其次
3. 再次
4. 最后:grinning:

[[toc]]

```ts:no-line-numbers{1,7-9} title=".vuepress/config.ts"
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  title: '你好， VuePress',

  theme: defaultTheme({
    logo: 'https://vuejs.org/images/logo.png',
  }),
})
```

一加一等于： {{ 1 + 1 }}

<span v-for="i in 3"> span: {{ i }} </span>

![SKS Logo](/images/logo.png)