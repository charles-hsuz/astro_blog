
function MakeUpZero(n) {
  return n > 9 ? n + "" : "0" + n
}

export function PostsPublicTime(t) {
  const D = new Date(t);
  return `${D.getFullYear()}-${D.getMonth() + 1}-${D.getDate() - 1} ${MakeUpZero(D.getHours())}:${MakeUpZero(D.getMinutes())}:${MakeUpZero(D.getSeconds())}`
}

export function TimeFormat(t){
  const data = new Date(t)
  return data.toLocaleDateString()
}