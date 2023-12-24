// class DateUtil {
// 	static dateUtil = new DateUtil()
// 	private constructor() {}
// 	formatDate() {}
// 	getHours() {}
// 	getMinutes() {}
// 	getSeconds() {}
// }

// const dateUtil1 = DateUtil.dateUtil
// const dateUtil2 = DateUtil.dateUtil
// console.log(dateUtil1 === dateUtil2) // true
// dateUtil1.formatDate()

// const dateUtil = DateUtil.dateUtil
// export default dateUtil


class DateUtil {
	static dateUtil: DateUtil
  static getInstance() {
    if (this.dateUtil) {
      this.dateUtil = new DateUtil()
    }
    return this.dateUtil
  }
	private constructor() {}
	formatDate() {}
	getHours() {}
	getMinutes() {}
	getSeconds() {}
}

const dateUtil1 = DateUtil.getInstance()
const dateUtil2 = DateUtil.getInstance()
console.log(dateUtil1 === dateUtil2) // true
dateUtil1.formatDate()

const dateUtil = DateUtil.getInstance()
export default dateUtil
