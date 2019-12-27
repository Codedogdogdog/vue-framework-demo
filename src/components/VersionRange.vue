<template>
  <div class="version">
    <Select
      :data="version.list"
      class="version-select"
      v-model="version.start"
      :disabled-method="start_disabled"
      :placeholder="startPlaceholder"
      clearable
    >
    </Select>

    <span class="sep">{{ $t('to') }}</span>

    <Select
      :data="version.list"
      class="version-select"
      v-model="version.end"
      :disabled-method="end_disabled"
      :placeholder="endPlaceholder"
      clearable
    >
    </Select>
  </div>
</template>

<script>
/**
 * <VersionRange></VersionRange>
 * Attributes:
 *  platform => 设置平台, Android 为 1, 默认值 1
 *  start-version => 起始版本
 *  end-version => 结束版本
 *  start-placeholder => 起始占位符
 *  end-placeholder => 结束占位符
 */
import Select from 'public/components/Select';

import api from 'plugin/api';

let version_back = {}; // 缓存版本

export default {
  props: {
    platform: Number,
    startVersion: [Number, String],
    endVersion: [Number, String],
    startPlaceholder: {
      type: String,
      default: function() {
        return this.$t('placeholder.all');
      },
    },
    endPlaceholder: {
      type: String,
      default: function() {
        return this.$t('placeholder.all');
      },
    },
  },
  data() {
    return {
      api: apigClientFactory.newClient(),
      version: {
        list: [],
        start: this.startVersion,
        end: this.endVersion,
      },
    };
  },
  watch: {
    startVersion(val) {
      this.version.start = val;
    },
    endVersion(val) {
      this.version.end = val;
    },
    'version.start'(val) {
      this.$emit('update:startVersion', val);
    },
    'version.end'(val) {
      this.$emit('update:endVersion', val);
    },
  },
  created() {
    const { platform } = this;
    if (version_back && version_back[platform]) {
      return (this.version.list = version_back[platform]);
    }
    this.get_version(platform);
  },
  methods: {
    async get_version(platform = 1) {
      let { success, data, resultMessage } = await api.appVersionConfigGet();
      if (success) {
        const versions = data.map(item => {
          return {
            value: item.versionCode,
            label: item.versionName,
          };
        });
        version_back[platform] = versions;
        this.version.list = versions;
      } else {
        this.$message.error(resultMessage || this.$t('msg_error'));
      }
    },
    start_disabled(item) {
      if (this.version.end) return item.value > this.version.end;
    },
    end_disabled(item) {
      return item.value < this.version.start;
    },
  },
  components: {
    Select,
  },
};
</script>

<style lang="scss" scoped>
.version {
  display: inline-block;

  &-select {
    width: 140px;
  }

  .sep {
    margin: 0 10px;
  }
}
</style>
