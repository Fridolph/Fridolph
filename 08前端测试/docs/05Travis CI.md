 相关参考

[阮一峰 - 持续集成服务 Travis CI 教程](http://www.ruanyifeng.com/blog/2017/12/travis_ci_tutorial.html)

---

[构建一个JavaScript和Node.js项目](https://docs.travis-ci.com/user/languages/javascript-with-nodejs/)

# 构建一个JavaScript和Node.js项目

## 入门

1. 登陆Travis CI，将要加入Travis的仓库勾选

2. 然后该仓库里新建一个`.travis.yml`文件

3. 将`.travis.yml`文件添加到git，commit和push中，以触发Travis CI构建

> 在Travis CI中启用存储库之后，Travis仅运行您所提交的提交内容

4. 根据构建命令的返回状态，通过访问Travis CI.com构建状态并选择您的存储库，检查构建状态页以查看构建是否通过或失败

---

指定nodejs版本

```yml
sudo: required
language: node_js
node_js:
  - '8'
script:
  - 'npm run test'
before_script:
  - 'sudo chown root /opt/google/chrome/chrome-sandbox'
  - 'sudo chmod 4755 /opt/google/chrome/chrome-sandbox'
```

* iojs 最新稳定的io.js版本
* lts 最新稳定的node.js版本

有关哪些版本的Node.js可用的更多具体信息位于环境参考页面中：

---
