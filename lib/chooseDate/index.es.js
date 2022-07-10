import { defineComponent, ref, watch, resolveComponent, openBlock, createElementBlock, createElementVNode, createVNode, mergeProps, unref, isRef } from "vue";
const _hoisted_1 = { style: { "display": "flex" } };
const _hoisted_2 = { style: { "margin-right": "20px" } };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  props: {
    startPlaceholder: {
      type: String,
      default: "\u8BF7\u9009\u62E9\u5F00\u59CB\u65E5\u671F"
    },
    endPlaceholder: {
      type: String,
      default: "\u8BF7\u9009\u62E9\u7ED3\u675F\u65E5\u671F"
    },
    disableToday: {
      type: Boolean,
      default: true
    }
  },
  emits: ["startChange", "endChange"],
  setup(__props, { emit: emits }) {
    const props = __props;
    let startDate = ref(null);
    let endDate = ref(null);
    let endDateDisabled = ref(true);
    let startDisabledDate = (time) => {
      if (props.disableToday)
        return time.getTime() < Date.now() - 1e3 * 60 * 60 * 24;
    };
    let endDisabledDate = (time) => {
      if (startDate.value) {
        return time.getTime() < startDate.value.getTime() + 1e3 * 60 * 60 * 24;
      }
    };
    watch(() => startDate.value, (val) => {
      if (!val) {
        endDateDisabled.value = true;
        endDate.value = null;
      } else {
        emits("startChange", val);
        endDateDisabled.value = false;
      }
    });
    watch(() => endDate.value, (val) => {
      if (val) {
        emits("endChange", {
          startDate: startDate.value,
          endDate: val
        });
      }
    });
    return (_ctx, _cache) => {
      const _component_el_date_picker = resolveComponent("el-date-picker");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createElementVNode("div", _hoisted_2, [
          createVNode(_component_el_date_picker, mergeProps({
            modelValue: unref(startDate),
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(startDate) ? startDate.value = $event : startDate = $event),
            type: "date",
            placeholder: __props.startPlaceholder,
            disabledDate: unref(startDisabledDate)
          }, _ctx.$attrs.startOptions), null, 16, ["modelValue", "placeholder", "disabledDate"])
        ]),
        createElementVNode("div", null, [
          createVNode(_component_el_date_picker, mergeProps({
            modelValue: unref(endDate),
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => isRef(endDate) ? endDate.value = $event : endDate = $event),
            type: "date",
            placeholder: __props.endPlaceholder,
            disabled: unref(endDateDisabled),
            disabledDate: unref(endDisabledDate)
          }, _ctx.$attrs.endOptions), null, 16, ["modelValue", "placeholder", "disabled", "disabledDate"])
        ])
      ]);
    };
  }
});
var index = {
  install(app) {
    app.component("m-choose-date", _sfc_main);
  }
};
export { index as default };
