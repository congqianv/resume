<template>
  <div class="home">
    <div class="top">
      <img src="@/assets/bg.png" alt class="top-bg" />
      <nav class="top-nav flex-row">
        <div
          class="top-nav_item"
          :class="{ 'top-nav_item_active': item.id === currentNav }"
          v-for="item in navList"
          :key="item.id"
        >{{ item.label }}</div>
      </nav>
      <img src="@/assets/logo.png" alt class="top-logo" />
    </div>

    <div class="top-small">
      <img src="@/assets/logo.png" alt class="top-logo" />
    </div>

    <div class="characters">
      <div class="characters-title">CHARACTER</div>

      <div class="characters-inner">
        <div class="characters-item" v-for="item in 6" :key="item">
          <img src="@/assets/img-1.jpg" alt class="characters-item_img" />
        </div>
      </div>
    </div>

    <div class="mask">
      <img src="@/assets/scape.png" alt class="rotate-img" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { cusAjax } from '@/utils/ajax'

export default {
  name: 'Home',

  data: () => {
    return {
      navList: [
        { id: 1, label: 'HOME' },
        { id: 2, label: 'NEWS' },
        { id: 3, label: 'WEAPONS' },
        { id: 4, label: 'MAP' },
        { id: 5, label: 'CHARACTERS' },
        { id: 6, label: 'WALLPAPER' },
      ],
      currentNav: 5
    }
  },

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
  },

  methods: {
    // 获取navList
    async getNavList () {
      const res = await cusAjax({
        url: 'MOCKNAVLIST',
        method: 'GET'
      })
      this.navList = res.list
    },

    // 获取人物列表
    async getCharacters () {
      const res = await cusAjax({
        url: 'MOCKCHARACTERLIST',
        method: 'GET'
      })
      this.characterList = res.list
    },
  }
}
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  overflow: auto;
  padding-bottom: 0.3rem;
  --primary-color: #e89b38;
  --background-color: #1e2328;
  background: var(--background-color);
}

.flex-row {
  display: flex;
  align-items: center;
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.top {
  position: relative;
  z-index: 1;
  width: 100%;
  height: fit-content;
  min-height: 2.6rem;
  padding: 0.3rem 0.4rem 0 0.4rem;

  &-bg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 2.6rem;
  }

  &-nav {
    position: relative;
    color: #ddd;
    font-weight: bold;
    font-size: 0.2rem;
    padding: 0.1rem 0;
    border-radius: 0.06rem;
    border-left: 0.1rem solid var(--primary-color);
    border-right: 0.1rem solid var(--primary-color);
    background: rgba(255, 255, 255, 0.1);

    &_item {
      margin: 0 0.3rem;
      cursor: pointer;
      &:hover {
        color: var(--primary-color);
      }

      &_active {
        color: var(--primary-color);
      }
    }
  }

  &-logo {
    width: 2.7rem;
    height: 0.68rem;
    margin: 0.6rem 1.5rem;
  }

  &-small {
    position: sticky;
    top: 0;
    left: 0;
    z-index: 2;
    border-left: 0.2rem solid var(--primary-color);
    padding: 0.2rem 0.3rem;
    background: #111;
    width: 100%;
    height: fit-content;

    .top-logo {
      margin: 0;
    }
  }
}

.characters {
  margin-top: 1rem;

  &-title {
    text-align: center;
    color: #ddd;
    background: rgba(255, 255, 255, 0.3);
    width: fit-content;
    height: fit-content;
    padding: 0.2rem 0.3rem;
    border-radius: 0.2rem;
    margin: 0 auto;
    font-size: 0.3rem;
  }

  &-inner {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin-top: 1rem;
    padding: 0 2rem;
    gap: 1rem;
  }

  &-item {
    &_img {
      width: 100%;
      height: 100%;
    }
  }
}

.mask {
  .flex-center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  background: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;

  .rotate-img {
    width: 8rem;
    height: 5.28rem;
    transform: rotate(-90deg);
    animation: rotateTip 1s ease infinite alternate;
    transform-origin: center;
  }
}

@keyframes rotateTip {
  from {
    transform: rotate(-90deg);
  }
  to {
    transform: rotate(0);
  }
}
/* 判断横竖屏 */
@media all and (orientation: landscape) {
  .mask {
    display: none;
  }
}
@media all and (orientation: portrait) {
  .mask {
    display: flex;
  }
}

/* 超小屏幕（手机，小于 768px） */
@media (max-width: 768px) {
  .top {
    display: none;
  }

  .characters-inner {
    grid-template-columns: repeat(1, 1fr);
  }
}

/* 小屏幕（平板，大于等于 768px） */
@media (min-width: 768px) {
  .top {
    display: none;
  }
  .characters-inner {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 中等屏幕（桌面显示器，大于等于 1025px */
@media (min-width: 1025px) {
  .top {
    display: block;
    &-small {
      display: none;
    }
  }
  .characters-inner {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>