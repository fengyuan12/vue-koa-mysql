import Koa from 'koa'
import path from 'path'
import bodyBody from 'koa-body'
import koaStatic from 'koa-static'
import router from './routes/index'
import { PORT } from './config/app'

const app = new Koa()

app.use(bodyBody({
  multipart: true
}))
app.use(router.routes())
app.use(router.allowedMethods())
app.use(koaStatic(
  path.join(__dirname, 'public')
))
app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}.`);
})