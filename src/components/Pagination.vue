<template>
  <div class="pagination" v-if="total">
    <el-pagination
      :layout="layout"
      :page-size="pageSize"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      v-on="$listeners"
      @size-change="sizeChange"
    >
    </el-pagination>
  </div>
</template>

<script>
/**
 * <Pagination></Pagination>
 * Attributes:
 *  current-page => 当前页
 *  total => 总数
 * Event:
 *  current-change => 当前页 改变触发
 *  size-change => 当前页大小 改变触发
 */
export default {
  name: 'Pagination',
  props: {
    pageSize: {
      type: Number,
      default: 20,
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 40, 60, 100];
      },
    },
    total: {
      type: Number,
      default: 0,
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper',
    },
  },
  data() {
    return {};
  },
  methods: {
    sizeChange() {
      console.log('sizeChange');
    },
  },
  computed: {},
};
</script>
<style lang="scss">
.pagination {
  padding: 20px 0;
  text-align: right;
}
</style>
