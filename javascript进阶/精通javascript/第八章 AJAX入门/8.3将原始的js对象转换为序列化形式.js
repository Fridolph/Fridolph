// 一个包含键-值对的简单对象
{
  name: "John",
  last: 'Resig',
  city: 'Cambridge',
  zip: 02140
}

// 序列化形式
name=John&last=Resig&city=Cambridge&zip=02140

// 另一组包含多个值的数据
[
  { name: 'name', value: 'John' },
  { name: 'last', value: 'Resig' },
  { name: 'lang', value: 'JavaScript' },
  { name: 'lang', value: 'Perl' },
  { name: 'lang', value: 'Java' }
]

// 以上数据的序列化形式
name=John&last=Resig&lang=JavaScript&lang=Perl&lang=Java

// 最后来查找一批输入元素
[
  document.getElementById('name'),
  document.getElementById('last'),
  document.getElementById('username'),
  document.getElementById('password')
]

// 将其序列化成字符串
name=John&last=Resig&username=Jeresig&password=test