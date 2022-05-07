<template>
  <el-dialog title="分配角色" :visible="showRoleDialog" @close="btnCancel">
    <!-- 多选框组 -->
    <el-checkbox-group v-model="roleIds">
      <el-checkbox v-for="item in list" :key="item.id" :label="item.id">
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <!-- 定义footer的插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button type="primary" size="small" @click="btnOK">确定</el-button>
        <el-button size="small" @click="btnCancel">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getRoleList } from '@/api/setting'
import { getUserDetailById } from '@/api/user'
import { assignRoles } from '@/api/employees'
export default {
  props: {
    showRoleDialog: {
      type: Boolean,
      default: false
    },
    userId: {
      // 用户的id当前要处理的
      type: String,
      default: null
      // required: true
    }
  },
  data() {
    return {
      list: [],
      roleIds: [] // 存储当前用户所拥有的的角色id
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const { rows } = await getRoleList({ page: 1, pagesize: 20 })
      // rows是循环记录
      this.list = rows
    },
    // prop传值是异步的，所以不能用this.userId
    async getUserDetailById(id) {
      const { roleIds } = await getUserDetailById(id)
      this.roleIds = roleIds // 赋值本用户的角色
    },
    async btnOK() {
      await assignRoles({ id: this.userId, roleIds: this.roleIds }) // 保存用户角色
      // 关闭弹层
      this.$emit('update:showRoleDialog', false)
      // this.$parent.showRoleDialog = false
    },
    btnCancel() {
      this.roleIds = []
      // 取消
      this.$emit('update:showRoleDialog', false)
    }
  }
}
</script>

<style>

</style>
