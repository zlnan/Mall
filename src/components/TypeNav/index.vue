<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 三级联动 -->
        <!-- 过渡动画 必须带有v-show|v-if 外面套<transition> -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <!-- 利用事件委派+编程式导航 实现路由跳转与传递参数 -->
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex == index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <span
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</span
                  >
                </h3>
                <!-- 二级、三级分类 -->
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="(c2, index) in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <span
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</span
                        >
                      </dt>
                      <dd>
                        <em
                          v-for="(c3, index) in c2.categoryChild"
                          :key="c3.categoryId"
                        >
                          <span
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</span
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="javascript:void(0)">服装城</a>
        <a href="javascript:void(0)">美妆馆</a>
        <a href="javascript:void(0)">尚品汇超市</a>
        <a href="javascript:void(0)">全球购</a>
        <a href="javascript:void(0)">闪购</a>
        <a href="javascript:void(0)">团购</a>
        <a href="javascript:void(0)">有趣</a>
        <a href="javascript:void(0)">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 按需引入lodash
import throttle from "lodash/throttle";

export default {
  name: "TypeNav",
  data() {
    return {
      // 存储用户鼠标移到哪个一级分类
      currentIndex: -1,
      show: true,
    };
  },
  // 组件挂载完毕 可以向服务器发请求
  mounted() {
    // 当组件挂载完毕  让show属性变为false
    // 如果不是home组件  将typenav隐藏
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  computed: {
    ...mapState({
      // 右侧需要一个函数 当使用计算属性时 会立即执行一次
      // 注入一个参数state 其实即为大仓库中的数据
      categoryList: (state) => state.home.categoryList,
    }),
  },
  methods: {
    // 鼠标进入修改响应式数据currentIndex属性
    // changeIndex(index) {
    //   // index：鼠标移上某个一级分类的元素的索引值
    //   this.currentIndex = index;
    // },
    changeIndex: throttle(function (index) {
      // index：鼠标移上某个一级分类的元素的索引值
      this.currentIndex = index;
    }, 20),
    // 进行路由的跳转
    goSearch(event) {
      // 编程式导航+事件委派
      // 事件委派 存在的问题：1 确定点击一定是a标签 2 如何获取参数【1、2、3级分类的名字、id】
      // 问题1 把子节点中的a标签 加上自定义属性data-categoryName 其余字节点没有
      let { categoryname, category1id, category2id, category3id } =
        event.target.dataset;
      if (categoryname) {
        //整理路由跳转的参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };

        // 问题2 区分一级、二级、三级分类
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        //  如果路由跳转时 带有params参数 一起传递
        // params是个空对象 没必要判断
        // if (this.$route.params) {
        location.params = this.$route.params;
        // 整理完参数
        location.query = query;
        //路由跳转
        this.$router.push(location);
        // }
      }
    },
    // 当鼠标移入 让商品分类列表展示
    enterShow() {
      this.show = true;
    },
    // 当鼠标移开 让商品分类列表隐藏
    leaveShow() {
      // 鼠标移到‘商品全部分类’ 背景颜色还存在 直到离开整个大盒子才消失
      this.currentIndex = -1;
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            span {
              color: #333;
              cursor: pointer;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              span {
                cursor: pointer;
              }

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        .cur {
          background-color: #ccc;
        }
      }
    }

    // 过渡动画的样式
    // 过渡动画开始状态 进入
    .sort-enter,
    .sort-leave-to {
      height: 0;
    }
    // 过渡动画结束状态
    .sort-enter-to,
    .sort-leave {
      height: 461px;
    }
    // 动画时间 速率
    .sort-enter-active,
    .sort-leave-active {
      transition: all 0.3s linear;
    }
  }
}
</style>
