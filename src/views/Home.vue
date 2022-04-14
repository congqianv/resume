<template>
  <div class="home"></div>
</template>

<script>
// @ is an alias to /src
import { cusAjax } from '@/utils/ajax'

export default {
  name: 'Home',

  async mounted () {
    const testGet = await cusAjax({
      url: 'https://www.fastmock.site/mock/98c4f9e3184977a4309892f705fb3350/mock/test',
    })
    const testPost = await cusAjax({
      url: 'https://www.fastmock.site/mock/98c4f9e3184977a4309892f705fb3350/mock/login',
      method: 'POST',
      data: {
        username: 'admin',
        password: 123456
      }
    })
    console.log(testGet)
    console.log(testPost)
  }
}
</script>
