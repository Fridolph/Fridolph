function toDou(n){
  return n<10?'0'+n:''+n;
}

module.exports={
  time2date: function (timestamp){
    var oDate=new Date();
    oDate.setTime(timestamp*1000);

    return oDate.getFullYear()+'-'+toDou(oDate.getMonth()+1)+'-'+toDou(oDate.getDate())+' '+toDou(oDate.getHours())+':'+toDou(oDate.getMinutes())+':'+toDou(oDate.getSeconds());
  }
};
