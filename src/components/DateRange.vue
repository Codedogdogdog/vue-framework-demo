<template>
  <div>
    <el-date-picker v-model="date1" type="datetime" v-bind="$attrs" v-on="$listeners"> </el-date-picker>
    <span class="separator">{{ 'to' }}</span>
    <el-date-picker v-model="date2" type="datetime" v-bind="$attrs" v-on="$listeners"> </el-date-picker>
  </div>
</template>

<script>
/**
 * <DateRange></DateRange>
 * Attributes:
 *  start-date => 起始日期
 *  end-date => 结束日期
 *  start-placeholder => 起始占位符
 *  end-placeholder => 结束占位符
 */
export default {
  props: {
    startDate: [String, Date, Number],
    endDate: [String, Date, Number],
    startPlaceholder: String,
    endPlaceholder: String,
  },
  data() {
    return {
      date1: this.startDate,
      date2: this.endDate,
    };
  },
  watch: {
    startDate(val) {
      this.date1 = val;
    },
    endDate(val) {
      this.date2 = val;
    },
    date1(val) {
      this.$emit('update:startDate', val);
    },
    date2(val) {
      this.$emit('update:endDate', val);
    },
  },
};
</script>

<style lang="scss" scoped>
.separator {
  display: inline-block;
  width: 20px;
  text-align: center;
}
</style>
