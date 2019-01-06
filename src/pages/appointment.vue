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
                                            <Col span="12">123213213213</Col>
                                        </Row>
                                        <Row style="margin-bottom:18px;">
                                            <Col span="6">患者姓名：</Col>
                                            <Col span="12">Mr.Li</Col>
                                        </Row>
                                        <Row style="margin-bottom:18px;">
                                            <Col span="6">接诊医生：</Col>
                                            <Col span="12">礼泽琛</Col>
                                        </Row>
                                        <Row style="margin-bottom:24px;">
                                            <Col span="6">接诊时间：</Col>
                                            <Col span="12">2019-01-19&nbsp;&nbsp;&nbsp;&nbsp;9:00-10:00</Col>
                                        </Row>
                                        <Row style="margin-bottom:18px;">
                                            <Col span="8" offset="8" style="text-align:center">
                                            <span style="border: 1px solid #d7dde4;padding:6px;">取消订单</span>
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
                goValue:''
            }
        },
        methods:{
            goBackDoctor:function(){
                this.$router.push('/doctor')
            },
            goBackHome:function(){
                this.$router.push('/home')
            }
        }
    }
</script>
