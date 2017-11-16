<template>
  <div class="autograph">
    <div id="canvasBox" :style="getHorizontalStyle">
      <div class="setting">
        <span class="title">{{ msg }}</span>
        <button class="btn-clear" @touchstart="clear" @mousedown="clear">清屏</button>
        <button @touchstart="download" @mousedown="download">下载</button>
        <ul>
          <li class="list-item" v-for="(item, index) in scope" :key="index" @click="degree = item.value">
            {{ item.title }}
          </li>
        </ul>
      </div>
      <canvas></canvas>
    </div>
  </div>
</template>

<script>
import Draw from '../../vpclub/components/autograph/draw';

export default {
  name: 'canvas',
  data() {
    return {
      msg: '手写签名组件',
      degree: 0, // 屏幕整体旋转的角度, 可取 -90,90,180等值
      scope: [
        {
          value: 0,
          title: '正常'
        },
        {
          value: 90,
          title: '左旋'
        },
        {
          value: 180,
          title: '倒置'
        },
        {
          value: -90,
          title: '右旋'
        }
      ]
    };
  },
  components: {
    Draw
  },
  mounted() {
    this.canvasBox = document.getElementById('canvasBox');
    this.initCanvas();
  },
  computed: {
    getHorizontalStyle() {
      const d = document;
      const w = window.innerWidth || d.documentElement.clientWidth || d.body.clientWidth;
      const h = window.innerHeight || d.documentElement.clientHeight || d.body.clientHeight;
      let length = (h - w) / 2;
      let width = w;
      let height = h;

      switch (this.degree) {
        case -90:
          length = -length;
        case 90:
          width = h;
          height = w;
          break;
        default:
          length = 0;
      }
      if (this.canvasBox) {
        this.canvasBox.removeChild(document.querySelector('canvas'));
        this.canvasBox.appendChild(document.createElement('canvas'));
        setTimeout(() => {
          this.initCanvas();
        }, 200);
      }
      return {
        transform: `rotate(${this.degree}deg) translate(${length}px,${length}px)`,
        width: `${width}px`,
        height: `${height}px`,
        transformOrigin: 'center center'
      };
    },
  },
  methods: {
    initCanvas() {
      const canvas = document.querySelector('canvas');
      this.draw = new Draw(canvas, -this.degree);
    },
    clear() {
      this.draw.clear();
    },
    download() {
      this.draw.downloadPNGImage(this.draw.getPNGImage());
    },
    upload() {
      const image = this.draw.getPNGImage();
      const blob = this.draw.dataURLtoBlob(image);

      const url = '';
      const successCallback = (response) => {
        console.log(response);
      };
      const failureCallback = (error) => {
        console.log(error);
      };
      this.draw.upload(blob, url, successCallback, failureCallback);
    },
  },
};

</script>

<style>

.autograph {
  position: relative;
}

#canvasBox {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.setting {
  background-color: #f5f5f5;
  font-size: 18px;
}

.title {
  padding: 0 5%;
  font-size: 20px;
}

.setting button {
  float: right;
  width: 25%;
  font-size: 18px;
}

.btn-clear {
  color: #fff;
  background-color: rgb(112, 22, 22);
}

canvas {
  flex: 1;
  cursor: crosshair;
  border: 1px dashed rgb(184, 144, 144);
}

.list-item {
  float: left;
  width: 25%;
  padding: 2%;
  text-align: center;
}

</style>
