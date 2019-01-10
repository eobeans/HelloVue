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
                            用户个人中心
                        </Menu-Item>
                    </div>
                </Menu>
            </Header>
            <Content :style="{padding: '0 50px',minHeight: '280px',}">
                <Breadcrumb :style="{margin: '20px 0'}">
                    <BreadcrumbItem @click.native.once="goBackHome">home</BreadcrumbItem>
                    <BreadcrumbItem>user</BreadcrumbItem>
                </Breadcrumb>
                <row justify="start">
                    <Col span="3" offset="18">
                        <span style="font-size:14px;">{{$store.state.User.userName}}</span>
                    </Col>
                </row>
                <Divider />
                <Table :columns="columns" :data="data">
                    <template slot-scope="{ row }" slot="serial">
                        <span>{{ row.serial }}</span>
                    </template>

                    <template slot-scope="{ row }" slot="number">
                        <span>{{ row.number }}</span>
                    </template>

                    <template slot-scope="{ row }" slot="name">
                        <span>{{ row.name }}</span>
                    </template>

                    <template slot-scope="{ row }" slot="appointTime">
                        <span>{{ row.appointTime }}</span>
                    </template>

                    <template slot-scope="{ row }" slot="accessTime">
                        <span>{{ row.accessTime }}</span>
                    </template>

                    <template slot-scope="{ row }" slot="timeLine">
                        <span>{{ row.timeLine }}</span>
                    </template>

                    <template slot-scope="{ row, index }" slot="action">
                        <div>
                            <Button @click="handleDeleate(row, index)" type="dashed">取消</Button>
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
                        title: '流水号',
                        slot: 'serial'
                    },
                    {
                        title: '号数',
                        slot: 'number'
                    },
                    {
                        title: '接诊医生',
                        slot: 'name'
                    },
                    {
                        title: '下单时间',
                        slot: 'appointTime'
                    },
                    {
                        title: '接诊时间',
                        slot: 'accessTime',
                    },
                    {
                        title: '时间段',
                        slot: 'timeLine'
                    },
                    {
                        title: '操作',
                        slot: 'action'
                    }
                ],
                data: [],
                allData:[],
                serial:''
            }
        },
        mounted:
            function(){
                let _this=this
                this.$http.post('http://localhost:3000/selectOrderByUserId.json',{userId:_this.$store.state.User.userId}).then((res)=>{
                    if(res.body.code == 0){
                        _this.allData=res.body.data
                        _this.data=_this.allData
                        let len = _this.data.length
                        for(let i = 0;i<len;i++){
                            _this.data[i].appointTime=_this.getworkTime(_this.data[i].appointTime)
                            _this.data[i].accessTime=_this.getworkTime(_this.data[i].accessTime)
                        }
                    }else{
                        _this.$Message.info('无此信息')
                    }
                },(res)=>{
                    alert('出错误了！')
                })
            },
        methods:{
            goBackHome:function(){
                this.$router.push('/home')
            },
            // handleEdit (row, index) {
            //     this.editname =  row.name
            //     this.editWorkTime = row.workTime
            //     this.editWorkState = row.workState
            //     this.editRemain = row.remain
            //     this.editIndex = index
            // },
            handleDeleate(row,index){
                let _this = this
                //以下是deleteAsset
                this.serial=row.serial
                this.$http.post('http://localhost:3000/cancelOrderByserial.json',{serial:_this.serial}).then((res)=>{
                    if(res.body.code==0){
                         _this.$Message.info('订单已取消')
                        _this.data.splice(index, 1)
                    }else{
                        _this.$Message.info('订单已取消失败')
                    }
                })
            },
            getworkTime (workTime) {
                const date = new Date(workTime)
                const year = date.getFullYear()
                const month = date.getMonth() + 1
                const day = date.getDate()
                // const hour = date.getHours()
                // const minutes=date.getMinutes()
                // const seconds = date.getSeconds() 
                return `${year}-${month}-${day}`
            },
        }
    }
</script>
