## 总结

想让源文件加入构建流程中被webpack控制，配置entry

想自定义输出文件位置和名称，配置output

想自定义寻找依赖模块的策略，配置resolve

想自定义解析和转换文件的策略，配置module，通常是配置module rules里面的Loader

弱其他大部分需求可能通过Plugin去实现，则配置plugin

