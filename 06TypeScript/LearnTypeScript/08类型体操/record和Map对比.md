1. Record 是属于一个轻量级的 type 类型,Map 相对 Record 是重量级。
2. Map 不能像 Record 一样直接转换为普通的对象，来应对只有查询的实际问题，只是为了频繁的查询去 new 一个 Map 是一种不必要的浪费。
3. 如果读取数据和显示数据频繁，就应该采用 Record。
4. 如果增删改比较多，那还是使用 Map。
