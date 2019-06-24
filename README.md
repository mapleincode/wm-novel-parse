## wm-novel-parse

中文小说格式化。



> 搞这个的原因，最初是因为老婆想看某部小说，但是苹果手机对 txt 不是很友好，或者说她更想要一个简单 h5 页面直接在线看小说而不是依赖 app。
>
> 这个 module 支持将比较规范化的标题格式化成数据对象。



## Demo

```ts
import parse from 'vm-novel-parse';

const novel = `

第一卷 卷名 第一章 标题A

内容 A

内容 AA

第一卷 第二章 标题B

内容 B

内容 BB
`;

const results = parse(novel);

console.log(results.map(r => r.toJSON()));
// [ { title: '第1卷 卷 名 第1章 标题A', sentences: [ '内容 A', '内容 AA' ] },
//   { title: '第1卷 卷 名 第2章 标题B', sentences: [ '内容 B', '内容 BB' ] } ]
```

