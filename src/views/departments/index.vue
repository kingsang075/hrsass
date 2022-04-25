<template>
  <div v-loading="loading" class="dashboard-container">
    <div class="app-container">
      <!-- 组织架构内容 -->
      <el-card class="tree-card">
        <!-- 放置结构内容 -->
        <tree-tools :tree-node="company" :is-root="true" @addDepts="addDepts" />
        <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
          <tree-tools slot-scope=" { data } " :tree-node="data" @addDepts="addDepts" @editDepts="editDepts" @delDepts="getDepartments" />
        </el-tree>
      </el-card>
    </div>
    <!-- 放置新弹层组件 -->
    <add-dept ref="addDept" :show-dialog.sync="showDialog" :tree-node="node" @addDepts="getDepartments" />
  </div>
</template>

<script>
import TreeTools from './components/tree-tools'
import AddDept from './components/add-dept'
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils'
export default {
  components: {
    TreeTools, AddDept
  },
  data() {
    return {
      company: { name: '芭娜娜教育科技有限公司', manager: '负责人', id: '' }, // 头部数据结构
      departs: [],
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      },
      showDialog: false, // 显示窗体
      node: null, // 记录当前点击的节点
      loading: false // 当前的控制显示弹层
    }
  },
  computed: {
    showTitle() {
      return this.formData.id ? '编辑部门' : '新增子部门'
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      this.loading = true
      const result = await getDepartments()
      this.departs = tranListToTreeData(result.depts, '') // 转化为树形结构
      this.loading = false
    },
    // node当前点击的部门
    addDepts(node) {
      this.showDialog = true
      this.node = node
    },
    // 编辑部门
    editDepts(node) {
      this.showDialog = true
      this.node = node
      // 在这里调用获取部门详情的方法
      this.$refs.addDept.getDepartDetail(node.id)
    }
  }
}
</script>

<style scoped>
.tree-card {
  padding: 30px  140px;
  font-size:14px;
}
</style>
