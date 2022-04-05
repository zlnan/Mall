<template>
  <div class="spec-preview">
    <img :src="skuImageList[this.currentIndex].imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <img :src="skuImageList[this.currentIndex].imgUrl" ref="big" />
    </div>
    <!-- 蒙版 遮罩 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  data() {
    return {
      currentIndex: 0,
    };
  },
  props: ["skuImageList"],
  mounted() {
    // 全局事件总线获取ImageList传来的索引值
    this.$bus.$on("getIndex", (index) => {
      // 修改当前响应式数据
      this.currentIndex = index;
    });
  },
  methods: {
    handler(event) {
      let mask = this.$refs.mask;
      let big = this.$refs.big;
      let maskLeft = event.offsetX - mask.offsetWidth / 2;
      let maskTop = event.offsetY - mask.offsetHeight / 2;
      // 约束范围
      if (maskLeft <= 0) maskLeft = 0;
      if (maskLeft >= mask.offsetWidth) maskLeft = mask.offsetWidth;
      if (maskTop <= 0) maskTop = 0;
      if (maskTop >= mask.offsetHeight) maskTop = mask.offsetHeight;
      // 修改元素的left top值
      mask.style.left = maskLeft + "px";
      mask.style.top = maskTop + "px";
      big.style.left = -2 * maskLeft + "px";
      big.style.top = -2 * maskTop + "px";
    },
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(119, 247, 119, 0.4);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>
