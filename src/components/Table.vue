<script>
export default {
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
  },
  render() {
    const { columns } = this;
    const table_props = {
      ref: 'table',
      class: 'table',
      props: Object.assign(
        {
          border: true,
          stripe: true,
          'header-row-class-name': 'table__header',
        },
        this.$attrs,
      ),
      on: this.$listeners,
    };
    let table_columns = [];
    columns.reduce((pre, col, index) => {
      if (!col.vif || (typeof col.vif === 'function' && col.vif(col, index))) {
        const { slot, render } = col;
        const column_props = {
          props: Object.assign({ key: index }, col),
        };
        if (render) column_props.scopedSlots = { default: render };
        else if (slot) column_props.slot = slot;
        pre.push(<el-table-column {...column_props} />);
      }
      return pre;
    }, table_columns);
    return <el-table {...table_props}>{table_columns}</el-table>;
  },
};
</script>

<style lang="scss">
.table {
  width: 100%;
  font-size: 12px;

  &__header {
    th {
      height: 40px;
      padding: 2px;
      background: #f8f8f9;
    }
  }
}
</style>
