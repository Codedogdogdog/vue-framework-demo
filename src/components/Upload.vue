<script>
/**
 * <Upload></Upload>
 * Attributes:
 *  type => 展示的样式类型，可选值: img, file, 默认值: img
 *  max-size => 文件最大大小
 */
import { putObject } from 'plugin/aws';

export default {
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: String,
    type: {
      type: String,
      default: 'img',
    },
    maxSize: Number,
  },
  data() {
    return {
      loading: false,
    };
  },
  render() {
    const types = {
      file: 'upload__file',
      img: 'upload__avatar',
    };
    const config = {
      class: {
        upload: true,
        [types[this.type]]: true,
        'upload-disabled': this.$attrs.disabled,
      },
      attrs: this.$attrs,
      props: {
        action: '',
        'show-file-list': false,
        'http-request': this.upload,
      },
      directives: [
        {
          name: 'loading',
          value: this.loading,
        },
      ],
    };
    let content;
    switch (this.type) {
      case 'file':
        content = (
          <el-button size="small" type="primary">
            选取文件
          </el-button>
        );
        break;

      default:
        if (this.value) {
          content = <img src={this.value} class="avatar" />;
        } else {
          content = <i class="el-icon-plus upload__avatar-icon" />;
        }
        break;
    }
    return <el-upload {...config}>{content}</el-upload>;
  },
  methods: {
    async upload({ file }) {
      if (this.maxSize && file.size > this.maxSize * 1024) {
        return this.$message.error(`File must be less than ${this.maxSize}kb`);
      }
      let file_name = file.name.replace(/(\S+)(\.\w+)$/g, `$1${+new Date()}$2`);
      this.loading = true;
      let { err, data } = await putObject(`h5boss/picture/${file_name}`, file);
      this.loading = false;
      if (err) return console.log(err, err.stack);
      this.$emit('change', `https://funpay-webapp-daily.s3-ap-southeast-1.amazonaws.com/h5boss/picture/${file_name}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.upload {
  width: 180px;

  &__avatar.upload-disabled /deep/ .el-upload:hover {
    border-color: #d9d9d9;
    cursor: not-allowed;
  }
}

.upload__avatar /deep/ .el-upload {
  position: relative;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  overflow: hidden;

  &:hover {
    border-color: #409eff;
  }
}

.upload__avatar-icon {
  width: 178px;
  height: 178px;
  color: #8c939d;
  font-size: 28px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  display: block;
  width: 178px;
  height: 178px;
}
</style>
