数据字典——把数据定出来

1. banner(banner_table)
  id
  title       标题         varchar(32)
  sub_title   副标题       varchar(16)
  img_src     图片地址     varchar(128) 

2. 文章(article_table)
  id
  author      作者         varchar(16)
  avatar      作者头像     varchar(128)
  title       标题         varchar(32)
  post_time   发布时间(s)  int
  content     内容         text
  thumb_up    赞           int


3. 用户(user_table)
  id
  username    用户名       varchar(32)
  password    密码         varchar(32)
  avatar      用户头像     varchar(128)
