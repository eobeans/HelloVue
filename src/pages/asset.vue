<style scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
.layout-footer-center{
    text-align: center;
}
</style>
<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                        <Menu-Item name="1">
                            <Icon type="ios-navigate"></Icon>
                            预约挂号
                        </Menu-Item>
                    </div>
                </Menu>
            </Header>
            <Content :style="{padding: '0 50px',minHeight: '280px',}">
                <Breadcrumb :style="{margin: '20px 0'}">
                    <BreadcrumbItem @click.native.once="goBackHome">home</BreadcrumbItem>
                    <BreadcrumbItem>asset</BreadcrumbItem>
                </Breadcrumb>
                <row justify="start">
                    <Col span="3" offset="18">
                        <Button type="primary" @click.native.prevent="goToNewAsset">增加新排班</Button>
                    </Col>
                    <Col span="3">
                        <Input suffix="ios-search" placeholder="请输入工号/姓名/科室" style="width: auto" />
                    </Col>
                </row>
                <Divider />
                <Table :columns="columns" :data="data">
                    <template slot-scope="{ row }" slot="doctorId">
                        <span>{{ row.doctorId }}</span>
                    </template>
                    <template slot-scope="{ row }" slot="name">
                        <span>{{ row.name }}</span>
                    </template>

                    <template slot-scope="{ row }" slot="department">
                        <span>{{ row.department }}</span>
                    </template>

                    <template slot-scope="{ row, index }" slot="workState">
                        <Select v-model="editWorkState" style="width:200px" v-if="editIndex === index">
                            <Option v-for="item in workStateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        <span v-else>{{ row.workState }}</span>
                    </template>

                    <template slot-scope="{ row, index }" slot="workTime">
                        <!-- <Input type="text" v-model="editWorkTime" v-if="editIndex === index" /> -->
                        <DatePicker type="date" :options="options3" format="yyyy-M-d" placeholder="Select date" style="width: 200px" v-model="editWorkTime" v-if="editIndex === index"></DatePicker>
                        <span v-else>{{ row.workTime }}</span>
                    </template>

                    <template slot-scope="{ row, index }" slot="remain">
                        <Input type="text" v-model="editRemain" v-if="editIndex === index" />
                        <span v-else>{{ row.remain }}</span>
                    </template>

                    <template slot-scope="{ row, index }" slot="action">
                        <div v-if="editIndex === index">
                            <Button @click="handleSave(index)">保存</Button>
                            <Button @click="editIndex = -1">取消</Button>
                        </div>
                        <div v-else>
                            <Button @click="handleEdit(row, index)">修改</Button>
                            <Button @click="handleDeleate(row, index)" type="dashed" style="margin-left:10px;">删除</Button>
                        </div>
                    </template>
                </Table>
            </Content>
            <Footer class="layout-footer-center">2018--2018 &copy; 数据库综合实验&nbsp;&nbsp;&nbsp;&nbsp;马勇杰&nbsp;&nbsp;李泽臣&nbsp;&nbsp;徐卓</Footer>
        </Layout>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                columns: [
                    {
                        title: '医生Id',
                        slot: 'doctorId'
                    },
                    {
                        title: '姓名',
                        slot: 'name'
                    },
                    {
                        title: '科室',
                        slot: 'department'
                    },
                    {
                        title: '工作时间段',
                        slot: 'workState'
                    },
                    {
                        title: '工作日期',
                        slot: 'workTime'
                    },
                    {
                        title: '应接诊数',
                        slot: 'remain'
                    },
                    {
                        title: '操作',
                        slot: 'action'
                    }
                ],
                data: [
                    {
                        doctorId:'00010001',
                        name: '王小明',
                        department:'内科',
                        workState:'全天',
                        workTime: '2019-1-1',
                        remain: '20'
                    },
                    {
                        doctorId:'00010001',
                        name: '王小明',
                        department:'内科',
                        workState:'全天',
                        workTime: '2019-1-1',
                        remain: '20'
                    },
                    {
                        doctorId:'00010001',
                        name: '王小明',
                        department:'内科',
                        workState:'全天',
                        workTime: '2019-1-1',
                        remain: '20'
                    },
                    {
                        doctorId:'00010001',
                        name: '王小明',
                        department:'内科',
                        workState:'全天',
                        workTime: '2019-1-1',
                        remain: '20'
                    }
                ],
                editIndex: -1,  // 当前聚焦的输入框的行数
                editRemain: '',  // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
                editWorkTime: '',  // 第三列输入框
                editWorkState:'',
                modal: false,
                options3: {
                    disabledDate (date) {
                        return date && date.valueOf() < Date.now() 
                    },
                },
                workStateList:[
                    {
                        value: '0',
                        label: '休息'
                    },
                    {
                        value: '1',
                        label: '全天'
                    },
                    {
                        value: '2',
                        label: '上午'
                    },
                    {
                        value: '3',
                        label: '下午'
                    },
                ],

            }
        },
        methods:{
            goBackHome:function(){
                this.$router.push('/home')
            },
            handleEdit (row, index) {
                this.editWorkTime = row.workTime
                this.editWorkState = row.workState
                this.editRemain = row.remain
                this.editIndex = index
            },
            handleSave (index) {
                let _this = this
                if(this.editWorkState == 0){
                    this.data[index].workState = '休息'
                }else if(this.editWorkState == 1){
                    this.data[index].workState = '全天'
                }else if(this.editWorkState == 2){
                    this.data[index].workState = '上午'
                }else if(this.editWorkState == 3){
                    this.data[index].workState = '下午'
                }
                this.data[index].workTime = this.getworkTime(this.editWorkTime)
                this.data[index].remain = this.editRemain
                this.editIndex = -1
            },
            time(date){
                this.editWorkTime=date
            },
            getworkTime (workTime) {
                const date = new Date(workTime)
                const year = date.getFullYear()
                const month = date.getMonth() + 1
                const day = date.getDate()
                return `${year}-${month}-${day}`
            },
            goToNewAsset(){
                this.$router.push('/newAsset')
            }
        }
    }
</script>
