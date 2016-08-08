//允许你减少集合中的匹配元素的过滤器， 
//只剩下那些与给定的选择器匹配的部分。
//在这种情况下，查询删除了任何没（:not）有（:has）包含class为“selected”（.selected）的子节点。


// .filter(":not(:has(.selected))");