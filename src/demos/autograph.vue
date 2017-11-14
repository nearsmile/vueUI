<template>
  <div class="autograph">
    <div id="canvasBox" :style="getHorizontalStyle">
      <div class="setting">
        <span>{{msg}}</span>
        <button @touchstart="clear" @mousedown="clear">清屏</button>
        <button @touchstart="download" @mousedown="download">下载</button>
        <select v-model="degree">
          <option v-for="item in scope" :value="item.value">{{item.title}}</option>
        </select>
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
      msg: 'Just use canvas to draw',
      degree: 90, // 屏幕整体旋转的角度, 可取 -90,90,180等值
      scope: [
        {
          value: 0,
          title: '正常'
        },
        {
          value: 90,
          title: '顺时针旋转90°'
        },
        {
          value: 180,
          title: '顺时针旋转180°'
        },
        {
          value: -90,
          title: '逆时针旋转90°'
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
  padding: 20px;
  font-size: 20px;
  user-select: none;
}
.setting select {
  font-size: 18px;
}
canvas {
  flex: 1;
  cursor: crosshair;
  border: 1px dashed #ddd;
}
</style>
