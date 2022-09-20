<template>
  <div class="manage">
    <el-dialog
      :title="operateType === 'add' ? '新增用户' :'更新用户'"
      :visible.sync="isShow"
    >
      <common-form
        :formLabel="opertateFormLabel"
        :form="operateForm"
        :inline="true"
        ref="form"
      ></common-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
      <!-- 新增按钮 -->
      <el-button type="primary" @click="addUser">+ 新增</el-button>
      <!-- 搜索框和按钮 -->
      <el-form :inline="true" :model="searchFrom" class="inputContainer">
        <el-form-item class="input" label="">
          <el-input v-model="searchFrom.keyword" :placeholder="'请输入'"></el-input>
        </el-form-item>
        <el-form-item class="search" label="">
          <el-button type="primary" @click="getList(searchFrom.keyword)">搜索</el-button>
        </el-form-item>
      </el-form>
      <!-- <common-form
        :formLabel="formLabel"
        :form="searchFrom"
        :inline="true"
        ref="form"
      >
        <el-button type="primary" @click="getList">搜索</el-button>
      </common-form> -->
    </div>
    <common-table
    :tableData="tableData"
    :tableLabel="tableLabel"
    :config="config"
    @changePage="getList(searchFrom.keyword)"
    @edit="editUser"
    @del="delUser"
    ></common-table>
  </div>
</template>

<script>
import CommonForm from '../../components/CommonForm.vue'
import CommonTable from '../../components/CommonTable.vue'
import {getUser} from '../../../api/data'

export default {
  name: "User",
  components:{
    CommonForm,
    CommonTable
  },
  data() {
    return {
      operateType:'add',
      isShow:false,
      opertateFormLabel:[
        {
            model: 'name',
            label: '姓名',
            type: 'input'
        },
        {
            model: 'age',
            label: '年龄',
            type: 'input'
        },
        {
            model: 'sex',
            label: '性别',
            type: 'select',
            opts: [
                {
                    label: '男',
                    value: 1
                },
                {
                    label: '女',
                    value: 0
                }
            ]
        },
        {
            model: 'birth',
            label: '出生日期',
            type: 'date'
        },
        {
            model: 'addr',
            label: '地址',
            type: 'input'
        }
      ],
      operateForm:{
        name: '',
        addr: '',
        age: '',
        birth:'',
        sex:''
      },
      formLabel:[
        {
          model:"keyword",
          label: '',
          type:'input'
        }
      ],
      searchFrom:{
        keyword:''
      },
      tableData:[],
      tableLabel:[
        {
          prop:'name',
          label:'姓名'
        },
        {
          prop:'age',
          label:'年龄'
        },
        {
          prop:'sexLabel',
          label:'性别'
        },
        {
          prop:'birth',
          label:'出生日期',
          width:200
        },
        {
          prop:'addr',
          label:'地址',
          width:320
        },
      ],
      config:{
        page:1,
        prop:30
      }
    };
  },
  methods:{
    confirm() {
      if(this.operateType === 'eddit'){
        this.$http.post('/user/edit',this.operateForm).then(res => {
          console.log(res)
          this.isShow = false
          this.getList()
        })
      }else{
        this.$http.post('/user/add',this.operateForm).then(res => {
          console.log(res)
          this.isShow = false
          this.getList()
        })
      }
    },
    addUser(){
      this.isShow = true
      this.operateType = 'add'
      this.operateForm = {
        name: '',
        addr: '',
        age: '',
        birth:'',
        sex:''
      }

    },
    editUser(row){
      this.operateType = 'edit'
      this.isShow = true
      this.operateForm = row
    },
    delUser(row){
      this.$confirm("此操作将永久删除该组件，是否继续？","提示",{
        confirmButtonText: "确认",
        cancelButtonText:"取消",
        type:"warning"
      }).then(() => {
        const id = row.id
        this.$http.post("/user/del",{
          params:{id}
        }).then(() => {
          this.$message({
            type:'success',
            message:'删除成功'
          })
          this.getList()
        })
      })
    },
    // ({data:res})
    getList(name = ''){
      this.config.loading = true
      name ? (this.config.page = 1) : ''
      getUser({
        page: this.config.page,
        name
      }).then( ({data:res}) => {
        this.tableData = res.list.map(item => {
          item.sexLabel = item.sex ===0 ? '女' : '男'
          return item
        })
        this.config.total = res.count
        this.config.loading = false
      })
    }
  },
  created(){
    this.getList()
  }
};
</script>

<style lang="less" scoped>
.manage-header {
  display:flex;
  justify-content: space-between;
  align-items:center;
}
.inputContainer{
  width: 280px;
  display:flex;
  justify-content: space-between;
  align-items:center;
  .input {
    margin: auto auto;
  }
  .search {
    margin: auto auto;
  }
}
</style>