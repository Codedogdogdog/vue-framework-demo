<template>
  <el-select v-model="selected" v-bind="$attrs" v-on="$listeners">
    <el-option
      v-for="item of data"
      :key="item[props['value']]"
      :value="item[props['value']]"
      :label="item[props['label']]"
      :disabled="disabled(item)"
    >
    </el-option>
  </el-select>
</template>

<script>
/**
 * <Select></Select>
 * Attributes:
 *  data  => 显示的数据
 *  props => 数据的属性名，默认值: { label, value, disabled }
 * Events:
 *  disabled-method => disabled的计算方法
 */
export default {
  props: {
    value: [String, Number],
    data: {
      type: Array,
      default: () => [],
    },
    props: {
      type: Object,
      default: () => {
        return {
          label: 'label',
          value: 'value',
          disabled: 'disabled',
        };
      },
    },
    disabledMethod: Function,
  },
  data() {
    return {
      selected: this.value,
    };
  },
  watch: {
    value(val) {
      this.selected = val;
    },
    selected(val) {
      this.$emit('change', val);
    },
  },
  methods: {
    disabled(item) {
      if (item[this.props['disabled']]) return item[this.props['disabled']];
      if (this.disabledMethod) return this.disabledMethod(item);
      return false;
    },
  },
};
</script>
