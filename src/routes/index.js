import Index from '@/views/Index'
import Blog from '@/views/Blog'


// 懒加载需要react的lazy和suspend

const routes = [
  {
    path: '/',
    exact: true,
    component: Index
  },
  {
    path: '/blog',
    exact: true,
    component: Blog
  }
]

export default routes