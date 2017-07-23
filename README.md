# biohub-frontend

> FrontEnd of Biohub

---
master: ![master status](https://api.travis-ci.org/USTC-Software2017-frontend/Biohub-frontend.svg?branch=master)
dev: ![dev status](https://api.travis-ci.org/USTC-Software2017-frontend/Biohub-frontend.svg?branch=dev)

## 分支说明
|分支名称|分支作用|
|:-:|:-:|
|master|稳定分支，只有在某个特定完成度或者版本更迭才推送上去|
|dev|开发分支，开发主要在这个分支进行|
|dev-2|不确定的，还需要进一步讨论的操作暂时存放在这个分支|

## Build Setup

``` bash
# 安装依赖
# 在开发过程中可能经常发生，所以在pull后可以马上运行一次
npm install

# 编译项目，在每次pull后要运行一次
npm run build

# 在localhost:8080上运行开发测试
npm run dev

# 单元测试
npm run unit

# 终端测试
npm run e2e

# 运行所有测试
npm test

# 代码静态分析（风格与语法）
npm run lint
```

代码风格为`javascript standard`, 请去公告中查看
