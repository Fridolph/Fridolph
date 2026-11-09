# 开发与部署

把“本地能运行”延伸到“可交付、可观测、可恢复”。本模块整理 Linux、Git、Nginx、Node 进程与容器，把历史操作笔记重写为可解释的学习路径。

## 建议顺序

1. [Linux、SSH 与运行环境](./s_deploy_1-linux_ssh)：认识服务器、权限和排障入口。
2. [Git 工作区与团队协作](./s_deploy_2-git)：理解提交、分支、集成和回退。
3. [Nginx、反向代理与 HTTPS](./s_deploy_3-nginx)：区分静态资源与 API 入口。
4. [Node 进程管理与优雅停机](./s_deploy_4-node_process)：处理重启、信号与连接清理。
5. [发布、验证与回滚](./s_deploy_5-release)：让每一次上线都有可核对的版本。
6. [Docker 与部署边界](./s_deploy_6-docker)：从镜像、容器走向持久化和运行约束。

## 用一个项目串起来

以 NestJS + PostgreSQL 为例：Nginx 负责公网入口和 TLS，NestJS 监听内网端口，通过连接池访问数据库。应用、数据库和发布工具的生命周期各不相同；应用下线要释放自己的数据库连接，不应顺手停止共享数据库服务。

实践时记录：应用版本、运行环境、入口地址、健康检查、日志位置、回滚步骤。后续 Docker / Nginx 知识统一在这里扩展，业务框架中的部署示例通过链接关联。

> 来源：个人旧笔记 [部署相关知识](https://github.com/Fridolph/Fridolph/tree/c3a1eda8e0f7fe08d8ec54e07d07db514cbfc5d7/部署相关知识) 与 [Git 学习](https://github.com/Fridolph/Fridolph/tree/c3a1eda8e0f7fe08d8ec54e07d07db514cbfc5d7/工程构建相关/git学习)，经过归并、纠错与补充。历史服务器账户、旧版安装步骤和展示素材保留在源仓库，不作为当前操作指引。
