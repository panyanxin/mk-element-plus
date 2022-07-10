import { defineComponent, ref, onMounted, resolveComponent, openBlock, createBlock, mergeProps, unref } from "vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  props: {
    percentage: {
      type: Number,
      required: true
    },
    isAnimate: {
      type: Boolean,
      default: false
    },
    time: {
      type: Number,
      default: 1500
    }
  },
  setup(__props) {
    const props = __props;
    let p = ref(0);
    onMounted(() => {
      if (props.isAnimate) {
        let t = Math.ceil(props.time / props.percentage);
        let timer = setInterval(() => {
          p.value += 1;
          if (p.value >= props.percentage) {
            p.value = props.percentage;
            clearInterval(timer);
          }
        }, t);
      }
    });
    return (_ctx, _cache) => {
      const _component_el_progress = resolveComponent("el-progress");
      return openBlock(), createBlock(_component_el_progress, mergeProps({ percentage: unref(p) }, _ctx.$attrs), null, 16, ["percentage"]);
    };
  }
});
var index = {
  install(app) {
    app.component("m-progress", _sfc_main);
  }
};
export { index as default };
