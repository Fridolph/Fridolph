mongoDb

db.collectionName.find()
  .limit(num) // 表示每次读取的条数
  .skip(num)  // 表示每次略过的条数