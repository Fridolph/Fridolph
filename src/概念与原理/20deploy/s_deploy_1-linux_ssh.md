# Linux、SSH 与运行环境

## 先理解机器，再运行命令

服务器部署至少涉及操作系统、网络、运行时、应用进程和数据目录。先确认发行版及维护周期：历史笔记中的 CentOS 7 已结束常规维护，旧 `yum`、`service`、`chkconfig` 命令不能直接当成所有 Linux 的通用步骤。以下以使用 systemd 的发行版为例，安装软件要查对应发行版文档。

| 问题 | 观察命令 | 如何解释 |
| --- | --- | --- |
| 系统与内核 | `cat /etc/os-release`、`uname -r` | 软件包来源、支持周期及内核版本 |
| CPU 与负载 | `uptime`、`top`、`vmstat 1` | 负载还包含不可中断等待；结合核数、CPU 和 I/O 判断 |
| 内存 | `free -h` | 区分 available、页缓存和应用占用，不能只看 free |
| 磁盘 | `df -h`、`df -i`、`du -sh ./logs` | 空间耗尽与 inode 耗尽是不同问题 |
| 端口 | `ss -lntp` | 监听的是公网地址还是 loopback，进程是否符合预期 |
| 服务 | `systemctl status nginx`、`journalctl -u nginx -n 100` | 同时核对退出原因、时间线和应用日志 |

这些读操作适合排查，但输出仍可能包含业务信息，不要直接粘贴到公开问题中。

## SSH 登录与权限

```bash
# 在个人电脑生成密钥；私钥留在本机，设置口令
ssh-keygen -t ed25519 -C "learning-server"
# 将公钥安装到已有授权的部署账户，首次连接核对主机指纹
ssh-copy-id deploy@example.com
ssh deploy@example.com
```

保持已有会话和云平台恢复入口，再用一个新会话验证密钥登录。确认 sudo 权限、恢复方式后，才考虑禁用密码登录和 root 直登。修改配置后先运行 `sshd -t` 检查；具体服务名可能是 `ssh` 或 `sshd`，按系统核实。

修改默认端口只能减少部分扫描噪声，不能代替密钥认证、补丁和访问控制。云安全组与主机防火墙都要核对；Ubuntu 的 UFW 和其他系统的 firewalld 不应混用教程逐条执行。

## 目录、文件与编辑

- `/etc` 放配置，`/var/log` 放日志；`/tmp` 是临时目录，不是持久化数据目录。
- 应用发布目录可放 `/srv/my-app/releases/<version>`，运行账户只获得必要读写权限。
- `ls -lah`、`pwd`、`less`、`tail -n 100` 用于定位；`cp -a` 可保留必要属性。删除前确认绝对路径，不把 `rm -rf` 写成习惯性修复。
- Vim 最小闭环：`i` 编辑，`Esc` 退出编辑，`:wq` 保存退出，`:q!` 放弃；修改系统配置前保留副本并使用工具校验。
- 文件权限分 owner / group / others；目录的 x 是穿越权限。避免用 `chmod 777` 掩盖账户和目录设计问题。

## 运行环境与排障顺序

Node 版本在仓库中声明，依赖用锁文件安装。交互式 shell 中能使用 nvm，不代表 systemd 服务能找到同一套 Node；服务配置需要明确用户、工作目录、可执行文件和环境来源。

遇到“页面打不开”，按 DNS / TLS → Nginx → 应用监听 → 数据库连接逐层验证。CPU 高、I/O 高、端口没监听、反向代理 502 的原因不同，不要先靠重启碰运气。

**自测：** 为什么 load average 为 2 不一定表示过载？为什么 SSH 新配置必须用新会话验证？为什么服务启动不应依赖个人 shell 的初始化脚本？

> 来源：[个人 Linux / SSH 旧笔记](https://github.com/Fridolph/Fridolph/tree/c3a1eda8e0f7fe08d8ec54e07d07db514cbfc5d7/部署相关知识)；[OpenSSH 手册](https://www.openssh.com/manual.html)；[systemd 文档](https://systemd.io/)；[CentOS Linux EOL](https://www.centos.org/centos-linux-eol/)。
