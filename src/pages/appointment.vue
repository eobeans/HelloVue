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
                    <BreadcrumbItem @click.native.once="goBackDoctor">doctor</BreadcrumbItem>
                    <BreadcrumbItem>appointment</BreadcrumbItem>
                </Breadcrumb>
                <Card>
                    <Row style="min-height:480px;">
                        <Col span="8" offset="8">
                            <div style="min-height: 200px;">
                                <div style="background:#eee;padding: 20px;margin-top:64px;">
                                    <Card :bordered="false" dis-hover>
                                        <p slot="title">预约订单</p>
                                        <Row style="margin-bottom:18px;">
                                            <Col span="6">流水号：</Col>
                                            <Col span="12">{{$store.state.User.serial}}</Col>
                                        </Row>
                                        <Row style="margin-bottom:18px;">
                                            <Col span="6">患者姓名：</Col>
                                            <Col span="12">{{$store.state.User.userName}}</Col>
                                        </Row>
                                        <Row style="margin-bottom:18px;">
                                            <Col span="6">接诊医生：</Col>
                                            <Col span="12">{{$store.state.User.doctorName}}</Col>
                                        </Row>
                                        <Row style="margin-bottom:18px;">
                                            <Col span="6">排队号：</Col>
                                            <Col span="12">{{$store.state.User.number}}</Col>
                                        </Row>
                                        <Row style="margin-bottom:24px;">
                                            <Col span="6">接诊时间：</Col>
                                            <Col span="12">{{$store.state.User.accessTime}}&nbsp;&nbsp;&nbsp;&nbsp;{{$store.state.User.timeLine}}</Col>
                                        </Row>
                                        
                                        <Row style="margin-bottom:18px;">
                                            <Col span="8" offset="4" style="text-align:center">
                                                <Button  @click.native="comfireAppointment()">确认订单</Button>
                                            </Col>
                                            <Col span="8"  style="text-align:center">
                                                <Button  @click.native="cancelAppointment()">取消订单</Button>
                                            </Col>
                                        </Row>
                                        <Row style="margin-bottom:24px;">
                                            <Col span="16" offset="4" style="text-align:center;font-size:10px">订单将在点击确认订单后下单，若需重新选择医生点击取消订单即可</Col>
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
                order:{
                    userId:'',
                    userName:'',
                    doctorId:'',
                    doctorName:'',
                    serial:'',
                    number:'',
                    appointState:'',
                    appointTime:'',
                    accessTime:'',
                    timeLine:'',
                },
                cancleOrder:{
                    userId:'',
                    doctorId:'',
                    serial:'',
                },
                count:0,
            }
        },
        // mounted:
        //     function(){
        //         let _this = this

        //     },
        methods:{
            goBackDoctor:function(){
                this.$router.push('/doctor')
            },
            goBackHome:function(){
                this.$router.push('/home')
            },
            cancelAppointment(){
                let _this = this
                this.cancleOrder.userId=this.$store.state.User.userId
                this.cancleOrder.doctorId=this.$store.state.User.doctorId
                this.cancleOrder.serial=this.$store.state.User.serial
                this.$http.post('http://localhost:3000/cancelAppointment.json',{cancleOrder:_this.cancleOrder}).then(res=>{
                    if(res.body.code == 0){
                        _this.$Message.info('取消成功')
                    }
                })
            },
            comfireAppointment(){
                let _this = this
                this.order.userId=this.$store.state.User.userId
                this.order.doctorId=this.$store.state.User.doctorId
                this.order.serial=this.$store.state.User.serial
                this.order.number=this.$store.state.User.number
                this.order.appointState=this.$store.state.User.appointState
                this.order.appointTime='2019-'+this.$store.state.User.appointTime
                this.order.accessTime='2019-'+this.$store.state.User.accessTime
                this.order.timeLine=this.$store.state.User.timeLine
                if(this.count == 0){
                    this.$http.post('http://localhost:3000/postAppointment.json',{order:_this.order}).then((res)=>{
                        if(res.body.code == 0){
                            _this.count = res.body.count
                            alert('订单确认成功')
                        }else{
                            alert('你被锁单了,锁单将于：'+res.body.endtime+'  后结束')
                        }
                    },(res)=>{
                        alert('出错误了！')
                    })
                }else{
                    alert('该订单已经提交！')
                }
                
            },
        }
    }
</script>
