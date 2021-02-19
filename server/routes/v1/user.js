import {
  request,
  summary,
  body,
  tags,
  middlewares,
  path,
  query,
  description,
  orderAll,
} from 'koa-swagger-decorator';
import moment from 'dayjs'
import { v4 } from 'uuid'
import createToken from '../../utils/createToken'
import checkToken from '../../utils/checkToken'
import userController from '../../controller/userController'
import getToken from '../../utils/getToken'
import { SUCCESS } from '../../utils/const'

const tag = tags(['User']);

const postSchema = {
  RoleId: { type: 'string', required: true },
  LoginName: { type: 'string', required: true },
  Name: { type: 'string', required: true },
  PassWord: { type: 'string', required: true },
  BirthDate: { type: 'undefined', required: false },
  Sex: { type: 'number', required: false },
  Phone: { type: 'undefined', required: false },
  Email: { type: 'undefined', required: false },
  CreatedId: { type: 'undefined', required: false },
  CreatedName: { type: 'undefined', required: false },
  CreatedTime: { type: 'undefined', required: false },
  ModifyId: { type: 'undefined', required: false },
  ModifyName: { type: 'undefined', required: false },
  ModifyTime: { type: 'undefined', required: false },
}

const putSchema = {
  RoleId: { type: 'string', required: true },
  LoginName: { type: 'string', required: true },
  Name: { type: 'string', required: true },
  PassWord: { type: 'string', required: true },
  BirthDate: { type: 'undefined', required: false },
  Sex: { type: 'number', required: false },
  Phone: { type: 'undefined', required: false },
  Email: { type: 'undefined', required: false },
  CreatedId: { type: 'undefined', required: false },
  CreatedName: { type: 'undefined', required: false },
  CreatedTime: { type: 'undefined', required: false },
  ModifyId: { type: 'undefined', required: false },
  ModifyName: { type: 'undefined', required: false },
  ModifyTime: { type: 'undefined', required: false },
}

const loginSchema = {
  LoginName: { type: 'string', required: true },
  PassWord: { type: 'string', required: true },
}

@orderAll(1)
export default class UserRouter {
  @request('POST', '/user/login')
  @summary('用户 -- 登录方法')
  @description('用户 -- 登录方法api')
  @tag
  @body(loginSchema)
  static async login(ctx) {
    const result = await userController.login(ctx.validatedBody)
    let response = {
      success: true,
      code: SUCCESS,
      data: '',
      message: '查询成功'
    }
    if (result && result.length > 0) {
      const [resultData] = new Set(result)
      if (resultData.PassWord === ctx.validatedBody.PassWord) {
        response.success = true
        response.data = {
          token: createToken(resultData),
          Id: resultData ? resultData.Id : '',
          Name: resultData ? resultData.Name : '',
        }
      } else {
        response.success = false
        response.message = '密码不正确！'
      }
    } else {
      response.success = false
      response.message = '用户不存在！'
    }
    ctx.body = response
  }

  @request('GET', '/user/{id}')
  @summary('用户 -- 根据Id查询数据')
  @description('用户 -- 根据查询删除数据api')
  @tag
  @middlewares([checkToken])
  @path({ id: { type: 'string', required: true } })
  static async getDataById(ctx) {
    const { id } = ctx.validatedParams
    const result = await userController.getDataById(id)
    ctx.body = {
      code: SUCCESS,
      success: true,
      data: result[0],
      message: '查询成功'
    }
  }

  @request('PUT', '/user/{id}')
  @summary('用户 -- 根据Id更新数据')
  @description('用户 -- 根据Id更新数据api')
  @tag
  @middlewares([checkToken])
  @body(putSchema)
  @path({ id: { type: 'string', required: true } })
  static async putData(ctx) {
    const { id } = ctx.validatedParams
    const token = await getToken(ctx)
    ctx.validatedBody.ModifyId = token.user_id
    ctx.validatedBody.ModifyName = token.user_name
    ctx.validatedBody.ModifyTime = moment().format('YYYY-MM-DD HH:mm:ss')
    const result = await userController.putData(id, ctx.validatedBody)
    ctx.body = {
      code: SUCCESS,
      success: true,
      data: result,
      message: '更新成功'
    };
  }

  @request('DELETE', '/user/{id}')
  @summary('用户 -- 根据Id删除数据')
  @description('用户 -- 根据Id删除数据api')
  @tag
  @middlewares([checkToken])
  @path({ id: { type: 'string', required: true } })
  static async deleteData(ctx) {
    const { id } = ctx.validatedParams
    const result = await userController.deleteData(id)
    ctx.body = {
      code: SUCCESS,
      success: true,
      data: result,
      message: '删除成功'
    }
  }

  @request('GET', '/user')
  @summary('用户 -- 查询数据')
  @description('用户 -- 查询数据api')
  @tag
  @middlewares([checkToken])
  @query({ 
    Name: { type: 'string', required: false, default: '', description: '用户模糊查询' },
    PageIndex: { type: 'number', required: false, default: 1, description: '分页' },
    PageSize: { type: 'number', required: false, default: 10, description: '分页' },
  })
  static async getData(ctx) {
    const data = {
      Name: ctx.query.Name,
      PageIndex: ctx.query.PageIndex,
      PageSize: ctx.query.PageSize
    }
    const result = await userController.getData(data)
    const [count] = result[1]
    ctx.body = {
      success: true,
      code: SUCCESS,
      data: result[0],
      count: count.count,
      message: '查询成功'
    }
  }

  @request('POST', '/user')
  @summary('用户 -- 新增数据')
  @description('用户 -- 新增数据api')
  @tag
  @middlewares([checkToken])
  @body(postSchema)
  static async postData(ctx) {
    const token = await getToken(ctx)
    ctx.validatedBody.CreatedId = token.user_id
    ctx.validatedBody.CreatedName = token.user_name
    ctx.validatedBody.CreatedTime = moment().format('YYYY-MM-DD HH:mm:ss')
    ctx.validatedBody.Id = v4()
    const theSameName = await userController.checkLoginName(ctx.validatedBody.LoginName)
    if (theSameName && theSameName.length > 0) {
      ctx.body = {
        code: SUCCESS,
        success: false,
        data: '',
        message: '已存在该登录名，请重新命名！'
      }
    } else {
      const result = await userController.postData(ctx.validatedBody)
      ctx.body = { 
        code: SUCCESS,
        success: true,
        data: result,
        message: '新增成功'
      }
    }
  }
}
