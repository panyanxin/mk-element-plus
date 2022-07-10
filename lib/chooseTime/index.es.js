import { defineComponent, ref, watch, resolveComponent, openBlock, createElementBlock, createElementVNode, createVNode, mergeProps, unref, isRef } from "vue";
const _hoisted_1 = { style: { "display": "flex" } };
const _hoisted_2 = { style: { "margin-right": "20px" } };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  props: {
    startPlaceholder: {
      type: String,
      default: "\u8BF7\u9009\u62E9\u5F00\u59CB\u65F6\u95F4"
    },
    endPlaceholder: {
      type: String,
      default: "\u8BF7\u9009\u62E9\u7ED3\u675F\u65F6\u95F4"
    },
    startTimeStart: {
      type: String,
      default: "08:00"
    },
    startStep: {
      type: String,
      default: "00:30"
    },
    startTimeEnd: {
      type: String,
      default: "24:00"
    },
    endTimeStart: {
      type: String,
      default: "08:00"
    },
    endStep: {
      type: String,
      default: "00:30"
    },
    endTimeEnd: {
      type: String,
      default: "24:00"
    }
  },
  emits: ["startChange", "endChange"],
  setup(__props, { emit: emits }) {
    let startTime = ref("");
    let endTime = ref("");
    let endTimeDisabled = ref(true);
    watch(() => startTime.value, (val) => {
      if (val === "") {
        endTime.value = "";
        endTimeDisabled.value = true;
      } else {
        endTimeDisabled.value = false;
        emits("startChange", val);
      }
    });
    watch(() => endTime.value, (val) => {
      if (val !== "") {
        emits("endChange", {
          startTime: startTime.value,
          endTime: val
        });
      }
    });
    return (_ctx, _cache) => {
      const _component_el_time_select = resolveComponent("el-time-select");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createElementVNode("div", _hoisted_2, [
          createVNode(_component_el_time_select, mergeProps({
            modelValue: unref(startTime),
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(startTime) ? startTime.value = $event : startTime = $event),
            placeholder: __props.startPlaceholder,
            start: __props.startTimeStart,
            step: __props.startStep,
            end: __props.startTimeEnd
          }, _ctx.$attrs.startOptions), null, 16, ["modelValue", "placeholder", "start", "step", "end"])
        ]),
        createElementVNode("div", null, [
          createVNode(_component_el_time_select, mergeProps({
            modelValue: unref(endTime),
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => isRef(endTime) ? endTime.value = $event : endTime = $event),
            "min-time": unref(startTime),
            placeholder: __props.endPlaceholder,
            start: __props.endTimeStart,
            step: __props.endStep,
            end: __props.endTimeEnd,
            disabled: unref(endTimeDisabled)
          }, _ctx.$attrs.endOptions), null, 16, ["modelValue", "min-time", "placeholder", "start", "step", "end", "disabled"])
        ])
      ]);
    };
  }
});
var index = {
  install(app) {
    app.component("m-choose-time", _sfc_main);
  }
};
export { index as default };
