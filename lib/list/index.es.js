import { defineComponent, resolveComponent, openBlock, createElementBlock, createVNode, withCtx, Fragment, renderList, createBlock, unref, createCommentVNode, createElementVNode, toDisplayString, createTextVNode, normalizeClass, resolveDynamicComponent } from "vue";
const toLine = (value) => {
  return value.replace(/(A-Z)g/, "-$1").toLocaleLowerCase();
};
var index_vue_vue_type_style_index_0_scoped_true_lang = /* @__PURE__ */ (() => ".container[data-v-3e369d92]{display:flex;align-items:center;padding:12px 20px;cursor:pointer}.container[data-v-3e369d92]:hover{background:#e6f6ff}.container .avatar[data-v-3e369d92]{flex:1}.container .content[data-v-3e369d92]{flex:3}.container .content .title[data-v-3e369d92]{display:flex;align-items:center;justify-content:space-between}.container .content .time[data-v-3e369d92]{font-size:12px;color:#999;margin-top:4px}.actions[data-v-3e369d92]{height:46px;display:flex;align-items:center;border-top:1px solid #eee}.actions .a-item[data-v-3e369d92]{height:46px;flex:1;display:flex;align-items:center;justify-content:center;cursor:pointer}.actions .a-item .a-icon[data-v-3e369d92]{margin-right:4px;position:relative;top:2px}.border[data-v-3e369d92]{border-right:1px solid #eee}\n")();
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _hoisted_1 = { class: "list-tabs__item" };
const _hoisted_2 = ["onClick"];
const _hoisted_3 = {
  key: 0,
  class: "avatar"
};
const _hoisted_4 = { class: "content" };
const _hoisted_5 = {
  key: 0,
  class: "title"
};
const _hoisted_6 = {
  key: 1,
  class: "time"
};
const _hoisted_7 = {
  key: 2,
  class: "time"
};
const _hoisted_8 = { class: "actions" };
const _hoisted_9 = ["onClick"];
const _hoisted_10 = {
  key: 0,
  class: "a-icon"
};
const _hoisted_11 = { class: "a-text" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  props: {
    list: {
      type: Array,
      required: true
    },
    actions: {
      type: Array,
      default: () => []
    }
  },
  emits: ["clickItem", "clickAction"],
  setup(__props, { emit: emits }) {
    let clickItem = (item, index2) => {
      emits("clickItem", { item, index: index2 });
    };
    let clickAction = (item, index2) => {
      emits("clickAction", { item, index: index2 });
    };
    return (_ctx, _cache) => {
      const _component_el_avatar = resolveComponent("el-avatar");
      const _component_el_tag = resolveComponent("el-tag");
      const _component_el_scrollbar = resolveComponent("el-scrollbar");
      const _component_el_tab_pane = resolveComponent("el-tab-pane");
      const _component_el_tabs = resolveComponent("el-tabs");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(_component_el_tabs, null, {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(__props.list, (item, index2) => {
              return openBlock(), createBlock(_component_el_tab_pane, {
                key: index2,
                label: item.title
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_scrollbar, { "max-height": "200px" }, {
                    default: withCtx(() => [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(item.content, (item1, index1) => {
                        return openBlock(), createElementBlock("div", {
                          class: "container",
                          onClick: ($event) => unref(clickItem)(item1, index1),
                          key: index1
                        }, [
                          item1.avatar ? (openBlock(), createElementBlock("div", _hoisted_3, [
                            createVNode(_component_el_avatar, {
                              size: "small",
                              src: item1.avatar
                            }, null, 8, ["src"])
                          ])) : createCommentVNode("", true),
                          createElementVNode("div", _hoisted_4, [
                            item1.title ? (openBlock(), createElementBlock("div", _hoisted_5, [
                              createElementVNode("div", null, toDisplayString(item1.title), 1),
                              item1.tag ? (openBlock(), createBlock(_component_el_tag, {
                                key: 0,
                                size: "small",
                                type: item1.tagType
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item1.tag), 1)
                                ]),
                                _: 2
                              }, 1032, ["type"])) : createCommentVNode("", true)
                            ])) : createCommentVNode("", true),
                            item1.desc ? (openBlock(), createElementBlock("div", _hoisted_6, toDisplayString(item1.desc), 1)) : createCommentVNode("", true),
                            item1.time ? (openBlock(), createElementBlock("div", _hoisted_7, toDisplayString(item1.time), 1)) : createCommentVNode("", true)
                          ])
                        ], 8, _hoisted_2);
                      }), 128))
                    ]),
                    _: 2
                  }, 1024),
                  createElementVNode("div", _hoisted_8, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(__props.actions, (action, i) => {
                      return openBlock(), createElementBlock("div", {
                        class: normalizeClass(["a-item", { "border": i + 1 !== __props.actions.length }]),
                        key: i,
                        onClick: ($event) => unref(clickAction)(action, i)
                      }, [
                        action.icon ? (openBlock(), createElementBlock("div", _hoisted_10, [
                          (openBlock(), createBlock(resolveDynamicComponent(`el-icon-${unref(toLine)(action.icon)}`)))
                        ])) : createCommentVNode("", true),
                        createElementVNode("div", _hoisted_11, toDisplayString(action.text), 1)
                      ], 10, _hoisted_9);
                    }), 128))
                  ])
                ]),
                _: 2
              }, 1032, ["label"]);
            }), 128))
          ]),
          _: 1
        })
      ]);
    };
  }
});
var list = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3e369d92"]]);
var index = {
  install(app) {
    app.component("m-list", list);
  }
};
export { index as default };
