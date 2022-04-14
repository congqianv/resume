export const cusAjax = ({
  url,
  method = 'GET',
  params = {},
  data = {}
}) => {
  return new Promise((resolve, reject) => {
    method = method.toUpperCase()
    // 处理query参数(拼接到url上)   id=1&xxx=abc
    let queryString = ''
    Object.keys(params).forEach(key => {
      queryString += `${key}=${params[key]}&`
    })
    if (queryString) { // id=1&xxx=abc&
      // 去除最后的&
      queryString = queryString.substring(0, queryString.length - 1)
      // 接到url
      url += '?' + queryString
    }
    // 执行异步ajax请求
    // 第一步，创建对象
    const xhr = new XMLHttpRequest()
    // 第二步，配置请求信息，参数一是请求的类型,参数二是请求的url,
    xhr.open(method, url, true)
    // 发送请求
    if (method === 'GET' || method === 'DELETE') {
      // 第三步，发送请求
      xhr.send()
    } else if (method === 'POST' || method === 'PUT') {
      // 告诉服务器请求体的格式是json
      xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8')
      xhr.send(JSON.stringify(data)) // 发送json格式请求体参数
    }
    // 第四步，绑定状态改变的监听
    xhr.onreadystatechange = function () {
      // 如果请求没有完成, 直接结束
      if (xhr.readyState !== 4) {
        return
      }
      // 如果响应状态码在[200, 300)之间代表成功, 否则失败
      const { status, statusText } = xhr
      // 第五步，获取返回的数据
      if (status >= 200 && status <= 299) { // 如果请求成功了, 调用resolve()
        // 准备结果数据对象response
        const response = {
          data: JSON.parse(xhr.response),
          status,
          statusText
        }
        resolve(response)
      } else { // 如果请求失败了, 调用reject()
        reject(new Error('请求出错' + status))
      }
    }
  })
}