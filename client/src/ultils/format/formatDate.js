export const date2str = (x, y)=>{
  var z = {
      M: x.getMonth() + 1,
      d: x.getDate(),
      h: x.getHours(),
      m: x.getMinutes(),
      s: x.getSeconds()
  };
  y = y.replace(/(M+|d+|h+|m+|s+)/g, function(v) {
      return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1))).slice(-2)
  });

  return y.replace(/(y+)/g, function(v) {
      return x.getFullYear().toString().slice(-v.length)
  });
}

export const date2date = (x,y)=>{
    let strings = x.split('/');
    return strings[2] + '-' 
    + (strings[0].length>1 ? strings[0] : '0'+strings[0]) + '-'
    +(strings[1].length>1?strings[1]:'0'+strings[1])

}