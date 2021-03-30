const isProduction = process.env.NODE_ENV === 'production'
const isDevelopment = !isProduction

//TODO: redefine config
const CONFIG = {
  isProduction,
  isDevelopment,
  // 路由 basename
  baseURL: '/',
  // 网页标题
  title: 'Hanu EMS',
  http: {
    baseURL: ''
  },
}

export default CONFIG
