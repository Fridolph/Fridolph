{
  code: 0,
  data: {
    detail: {
      filename: /\w{5,20}\.(\w{3,5})/,
      md5: /(\w|\d){25}/,
      sha1: /(\w|\d){30}/,
      sha256: /(\w|\d){50}/,
      crc32: /.{8}/
    },
    'typeList|2-20': [{
      virusType: '@ctitle(3, 6)',
      engine: '@name(true)',
      libDate: '@time(yyyy-MM-dd)',
      scanTime: '@time(yyyy-MM-dd HH:mm:ss)'
    }]
  }
}
