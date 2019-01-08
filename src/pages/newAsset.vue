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
                        <MenuItem name="1">
                            <Icon type="ios-navigate"></Icon>
                            预约挂号
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Content :style="{padding: '0 50px'}">
                <Breadcrumb :style="{margin: '20px 0'}">
                    <BreadcrumbItem @click.native.once="goBackHome">home</BreadcrumbItem>
                    <BreadcrumbItem @click.native.once="goBackAsset">asset</BreadcrumbItem>
                    <BreadcrumbItem>newAsset</BreadcrumbItem>
                </Breadcrumb>
                <Card>
                    <Row style="min-height:480px;">
                        <Col span="8" offset="8">
                            <div style="min-height: 200px;">
                                <div style="background:#eee;padding: 20px;margin-top:64px;">
                                    <Card :bordered="false" dis-hover>
                                        <p slot="title">新增排班信息</p>
                                        <Row style="margin-bottom:18px;">
                                            <Col span="7" offset="1"><p>医生ID:</p></Col>
                                            <Col span="12">
                                                <Select v-model="doctorId" style="width:200px">
                                                    <Option v-for="item in doctorIdList" :value="item.doctorId" :key="item.doctorId">{{ item.doctorId }}</Option>
                                                </Select>
                                            </Col>
                                        </Row>
                                        <Row style="margin-bottom:18px;">
                                            <Col span="7" offset="1">姓名：</Col>
                                            <Col span="12"><p>{{addAsset.name}}</p></Col>
                                        </Row>
                                        <Row style="margin-bottom:18px;">
                                            <Col span="7" offset="1">科室：</Col>
                                            <Col span="12"><p>{{addAsset.department}}</p></Col>
                                        </Row>
                                        <Row style="margin-bottom:18px;">
                                            <Col span="7" offset="1">工作时间段：</Col>
                                            <Col span="12">
                                                <Select v-model="addAsset.workState" style="width:200px">
                                                    <Option v-for="item in workStateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                                </Select>
                                            </Col>
                                        </Row>
                                        <Row style="margin-bottom:18px;">
                                            <Col span="7" offset="1">工作日期：</Col>
                                            <Col span="12">
                                                <DatePicker type="date" :options="options3" format="yyyy-M-d" placeholder="Select date" style="width: 200px" v-model="addAsset.workTime"></DatePicker>
                                            </Col>
                                        </Row>
                                        <Row style="margin-bottom:24px;">
                                            <Col span="7" offset="1">应接诊号数:</Col>
                                            <Col span="12">
                                                <Input v-model="addAsset.remain" placeholder="请输入今日应接诊号数" style="width: 200px" />
                                            </Col>
                                        </Row>
                                        <Row style="margin-bottom:18px;">
                                            <Col span="8" offset="7" style="text-align:center">
                                                <Button  @click.native="newAsset()">确定增加</Button>
                                            </Col>
                                        </Row>
                                    </Card>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Card>
            </Content>
            <Footer class="layout-footer-center">2018--2018 &copy; 数据库综合实验&nbsp;&nbsp;&nbsp;&nbsp;马勇杰&nbsp;&nbsp;李泽臣&nbsp;&nbsp;徐卓</Footer>
        </Layout>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                addAsset:{
                    name:'',
                    department:'',
                    workState:'',
                    workTime:'',
                    remain:''
                },
                doctorId:'',
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
                doctorIdList:[],
                options3: {
                    disabledDate (date) {
                        return date && date.valueOf() < Date.now() 
                    },
                },
                
            }
        },
        mounted:
            function(){
                let _this = this
                this.$http.get('http://localhost:3000/getDoctorIdList.json').then((res)=>{
                    if(res.body.code == 0){
                        _this.doctorIdList=res.body.doctorIdList
                    }
                },(res)=>{
                    console.log('fail to get doctor!')
                })
            },
        watch: {
            doctorId: function () {
                let _this=this
                this.$http.post('http://localhost:3000/getDoctorById.json',{doctorId:_this.doctorId}).then((res)=>{
                    if(res.body.code == 0){
                        _this.addAsset.name=res.body.name
                        _this.addAsset.department=res.body.department
                        _this.addAsset.remain=res.body.remain
                    }
                },(res)=>{
                    console.log('fail to get doctor!')
                })
            }
        },
        methods:{
            goBackAsset(){
                this.$router.push('/asset')
            },
            goBackHome:function(){
                this.$router.push('/home')
            },
            getworkTime (workTime) {
                const date = new Date(workTime)
                const year = date.getFullYear()
                const month = date.getMonth() + 1
                const day = date.getDate()
                return `${year}-${month}-${day}`
            },
            newAsset(){
                let _this=this
                if(this.doctorId == ''||this.addAsset.workState==''||this.addAsset.workTime==''){
                    alert('请完整填写表单！')
                }else{
                    _this.addAsset.workTime=_this.getworkTime(_this.addAsset.workTime)
                    // alert(_this.addAsset.workTime)
                    this.$http.post('http://localhost:3000/newAsset.json',{doctorId:_this.doctorId,addAsset:_this.addAsset}).then((res)=>{
                        this.$Message.info('添加成功');
                    },(res)=>{
                        console.log('fail to post asset!')
                    })
                }
            },
        }
    }
</script>