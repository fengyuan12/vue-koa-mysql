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
} from 'koa-swagger-decorator'
import moment from 'dayjs'
import { v4 } from 'uuid'
import getToken from '../../utils/getToken'
import checkToken from '../../utils/checkToken'
import noticeController from '../../controller/noticeController'
import { SUCCESS } from '../../utils/const'

const tag = tags(['Notice']);

const postSchema = {
  Date: { type: 'string', required: true },
  Title: { type: 'string', required: true },
  Content: { type: 'string', required: true },
  CreatedId: { type: 'undefined', required: false },
  CreatedName: { type: 'undefined', required: false },
  CreatedTime: { type: 'undefined', required: false },
  ModifyId: { type: 'undefined', required: false },
  ModifyName: { type: 'undefined', required: false },
  ModifyTime: { type: 'undefined', required: false },
}

const putSchema = {
  Date: { type: 'string', required: true },
  Title: { type: 'string', required: true },
  Content: { type: 'string', required: true },
  CreatedId: { type: 'undefined', required: false },
  CreatedName: { type: 'undefined', required: false },
  CreatedTime: { type: 'undefined', required: false },
  ModifyId: { type: 'undefined', required: false },
  ModifyName: { type: 'undefined', required: false },
  ModifyTime: { type: 'undefined', required: false },
}

@orderAll(3) 
export default class NoticeRouter {
  @request('GET', '/notice/{id}')
  @summary('公告 -- 根据Id查询数据')
  @description('公告 -- 根据查询删除数据api')
  @tag
  @middlewares([checkToken])
  @path({ id: { type: 'string', required: true } })
  static async getDataById(ctx) {
    const { id } = ctx.validatedParams
    const result = await noticeController.getDataById(id)
    const responseData = result.map(item => {
      return {
        Id: item.Id,
        Date: moment(item.Date).format('YYYY-MM-DD HH:mm:ss'),
        Title: item.Title,
        Content: item.Content,
        CreatedTime: moment(item.CreatedTime).format('YYYY-MM-DD HH:mm:ss'),
        CreatedId: item.CreatedId,
        CreatedName: item.CreatedName,
        ModifyTime: moment(item.ModifyTime).format('YYYY-MM-DD HH:mm:ss'),
        ModifyId: item.ModifyId,
        ModifyName: item.ModifyName
      }
    })
    ctx.body = {
      code: SUCCESS,
      success: true,
      data: responseData[0],
      message: '查询成功'
    }
  }

  @request('PUT', '/notice/{id}')
  @summary('公告 -- 根据Id更新数据')
  @description('公告 -- 根据Id更新数据api')
  @tag
  @middlewares([checkToken])
  @body(putSchema)
  @path({ id: { type: 'string', required: true } })
  static async login(ctx) {
    const { id } = ctx.validatedParams
    const token = await getToken(ctx)
    ctx.validatedBody.ModifyId = token.user_id
    ctx.validatedBody.ModifyName = token.user_name
    ctx.validatedBody.ModifyTime = moment().format('YYYY-MM-DD HH:mm:ss')
    const result = await noticeController.putData(id, ctx.validatedBody)
    ctx.body = {
      code: SUCCESS,
      success: true,
      data: result,
      message: '更新成功'
    };
  }

  @request('DELETE', '/notice/{id}')
  @summary('公告 -- 根据Id删除数据')
  @description('公告 -- 根据Id删除数据api')
  @tag
  @middlewares([checkToken])
  @path({ id: { type: 'string', required: true } })
  static async deleteData(ctx) {
    const { id } = ctx.validatedParams
    const result = await noticeController.deleteData(id)
    ctx.body = {
      code: SUCCESS,
      success: true,
      data: result,
      message: '删除成功'
    }
  }

  @request('GET', '/notice')
  @summary('公告 -- 查询数据')
  @description('公告 -- 查询数据api')
  @tag
  @middlewares([checkToken])
  @query({ 
    StartDate: { type: 'string', required: true, default: '', description: '开始日期' },
    EndDate: { type: 'string', required: true, default: '', description: '结束日期' },
    Title: { type: 'string', required: false, default: '', description: '用户模糊查询' },
    PageIndex: { type: 'number', required: false, default: 1, description: '分页' },
    PageSize: { type: 'number', required: false, default: 10, description: '分页' },
  })
  static async getData(ctx) {
    const data = {
      StartDate: ctx.query.StartDate,
      EndDate: ctx.query.EndDate,
      Title: ctx.query.Title,
      PageIndex: ctx.query.PageIndex,
      PageSize: ctx.query.PageSize
    }
    const result = await noticeController.getData(data)
    const responseData = result[0].map(item => {
      return {
        Id: item.Id,
        Date: moment(item.Date).format('YYYY-MM-DD HH:mm:ss'),
        Title: item.Title,
        Content: item.Content,
        CreatedTime: moment(item.CreatedTime).format('YYYY-MM-DD HH:mm:ss'),
        CreatedId: item.CreatedId,
        CreatedName: item.CreatedName,
        ModifyTime: moment(item.ModifyTime).format('YYYY-MM-DD HH:mm:ss'),
        ModifyId: item.ModifyId,
        ModifyName: item.ModifyName
      }
    })
    const [count] = result[1]
    ctx.body = {
      code: SUCCESS,
      success: true,
      data: responseData,
      count: count.count,
      message: '查询成功'
    }
  }

  @request('POST', '/notice')
  @summary('公告 -- 新增数据')
  @description('公告 -- 新增数据api')
  @tag
  @middlewares([checkToken])
  @body(postSchema)
  static async postData(ctx) {
    const token = await getToken(ctx)
    ctx.validatedBody.CreatedId = token.user_id
    ctx.validatedBody.CreatedName = token.user_name
    ctx.validatedBody.CreatedTime = moment().format('YYYY-MM-DD HH:mm:ss')
    ctx.validatedBody.Id = v4()
    const result = await noticeController.postData(ctx.validatedBody)
    ctx.body = { 
      code: SUCCESS,
      success: true,
      data: result,
      message: '新增成功'
    }
  }
}
