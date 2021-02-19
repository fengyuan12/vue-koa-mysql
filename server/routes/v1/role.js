import {
  request,
  summary,
  body,
  tags,
  middlewares,
  path,
  description,
  orderAll,
} from 'koa-swagger-decorator'
import { v4 } from 'uuid'
import checkToken from '../../utils/checkToken'
import roleController from '../../controller/roleController'
import { SUCCESS } from '../../utils/const'

const tag = tags(['Role']);

const postSchema = {
  CreatedTime: { type: 'string', required: true },
  CreatedId: { type: 'string', required: true },
  Name: { type: 'string', required: true },
  Code: { type: 'string', required: true },
  Remark: { type: 'string', required: true },
}

const putSchema = {
  CreatedTime: { type: 'string', required: true },
  CreatedId: { type: 'string', required: true },
  Name: { type: 'string', required: true },
  Code: { type: 'string', required: true },
  Remark: { type: 'string', required: true },
}

@orderAll(2) 
export default class RoleRouter {
  @request('GET', '/role/{id}')
  @summary('角色 -- 根据Id查询数据')
  @description('角色 -- 根据查询删除数据api')
  @tag
  @middlewares([checkToken])
  @path({ id: { type: 'string', required: true } })
  static async getDataById(ctx) {
    const { id } = ctx.validatedParams
    const result = await roleController.getDataById(id)
    ctx.body = {
      code: SUCCESS,
      success: true,
      data: result,
      message: '查询成功'
    }
  }

  @request('PUT', '/role/{id}')
  @summary('角色 -- 根据Id更新数据')
  @description('角色 -- 根据Id更新数据api')
  @tag
  @middlewares([checkToken])
  @body(putSchema)
  @path({ id: { type: 'string', required: true } })
  static async login(ctx) {
    const { id } = ctx.validatedParams
    const result = await roleController.putData(id, ctx.validatedBody)
    ctx.body = {
      code: SUCCESS,
      success: true,
      data: result,
      message: '更新成功'
    };
  }

  @request('DELETE', '/role/{id}')
  @summary('角色 -- 根据Id删除数据')
  @description('角色 -- 根据Id删除数据api')
  @tag
  @middlewares([checkToken])
  @path({ id: { type: 'string', required: true } })
  static async deleteData(ctx) {
    const { id } = ctx.validatedParams
    const result = await roleController.deleteData(id)
    ctx.body = {
      code: SUCCESS,
      success: true,
      data: result,
      message: '删除成功'
    }
  }

  @request('GET', '/role')
  @summary('角色 -- 查询数据')
  @description('角色 -- 查询数据api')
  @tag
  @middlewares([checkToken])
  static async getData(ctx) {
    const result = await roleController.getData('1=1')
    ctx.body = {
      code: SUCCESS,
      success: true,
      data: result,
      message: '查询成功'
    }
  }

  @request('POST', '/role')
  @summary('角色 -- 新增数据')
  @description('角色 -- 新增数据api')
  @tag
  @middlewares([checkToken])
  @body(postSchema)
  static async postData(ctx) {
    ctx.validatedBody.Id = v4()
    const result = await roleController.postData(ctx.validatedBody)
    ctx.body = { 
      code: SUCCESS,
      success: true,
      data: result,
      message: '新增成功'
    }
  }
}
