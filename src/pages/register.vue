<template>
    <div>
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
                <Content :style="{padding: '0 50px'}">
                    <Card>
                        <Row style="min-height:480px;">
                            <Col span="8" offset="8">
                                <div style="min-height: 200px;">
                                    <div style="background:#eee;padding: 20px;">
                                        <Card :bordered="false" dis-hover>
                                            <p slot="title">注册信息</p>
                                            <Row style="margin-bottom:18px;">
                                                <Col span="6">姓名：</Col>
                                                <Col span="12">
                                                    <Input v-model="registerForm.name" placeholder="请输入真实姓名" style="width: 200px" />
                                                </Col>
                                            </Row>
                                            <Row style="margin-bottom:18px;">
                                                <Col span="6">性别：</Col>
                                                <Col span="12">
                                                    <Select v-model="registerForm.sex" style="width:200px">
                                                        <Option v-for="item in sexList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                                    </Select>
                                                </Col>
                                            </Row>
                                            <Row style="margin-bottom:18px;">
                                                <Col span="6">年龄：</Col>
                                                <Col span="12">
                                                    <Input v-model="registerForm.age" placeholder="请输入真实年龄" style="width: 200px" />
                                                </Col>
                                            </Row>
                                            <Row style="margin-bottom:24px;">
                                                <Col span="6">住址：</Col>
                                                <Col span="12">
                                                    <Input v-model="registerForm.adress" placeholder="请输入详细地址" style="width: 200px" />
                                                </Col>
                                            </Row>
                                            <Row style="margin-bottom:24px;">
                                                <Col span="6">手机号：</Col>
                                                <Col span="12">
                                                    <Input v-model="registerForm.phoneNumber" placeholder="请输入手机号" style="width: 200px" />
                                                </Col>
                                            </Row>
                                            <Row style="margin-bottom:24px;">
                                                <Col span="6">身份证号：</Col>
                                                <Col span="12">
                                                    <Input v-model="registerForm.idCard" placeholder="请输入身份证号" style="width: 200px" />
                                                </Col>
                                            </Row>
                                            <Row style="margin-bottom:24px;">
                                                <Col span="6">登入账号名：</Col>
                                                <Col span="12">
                                                    <Input v-model="registerForm.userName" placeholder="请输入登入账号" style="width: 200px" />
                                                </Col>
                                            </Row>
                                            <Row style="margin-bottom:24px;">
                                                <Col span="6">密码：</Col>
                                                <Col span="12">
                                                    <Input v-model="registerForm.passWord" placeholder="请输入密码" style="width: 200px" />
                                                </Col>
                                            </Row>
                                            <Row style="margin-bottom:18px;">
                                                <Col span="8" offset="7" style="text-align:center" @click.native="register">
                                                    <span style="border: 1px solid #d7dde4;padding:6px;">注册</span>
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
    </div>
</template>

<style scoped>
.inputText{
    width: 200px;
    margin: 5px;
}
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


<script>
export default {

    name:'home',
    data(){
        return{
            sexList:[
                {
                    value: '0',
                    label: '女'
                },
                {
                    value: '1',
                    label: '男'
                },
            ],
            registerForm:{
                name:'',
                age:'',
                idCard:'',
                phoneNumber:'',
                adress:'',
                userName: '',
                passWord: '',
                sex:'',
            },
        }
    },
    mounted:
        function(){
            let _this = this
            this.$http.get('http://localhost:3000/getList.json').then((res)=>{
                if(res.body.code == 0){
                    _this.list = res.body.list
                }
            },(res)=>{
                console.log('fail to get message!')
            })
        },
    methods:{
        register(){
            let _this=this
            if (_this.registerForm.name == ''||_this.registerForm.age == ''||_this.registerForm.idCard == ''||_this.registerForm.phoneNumber == ''||_this.registerForm.adress == ''||_this.registerForm.userName == ''||_this.registerForm.passWord == ''||_this.registerForm.sex == ''){
                alert('请完整输入表单信息')
            }else if (_this.registerForm.idCard.length != 18){
                alert('请输入符合规定的身份证号')
            }else if (_this.registerForm.phoneNumber.length != 11 || !/^[0-9]+$/.test(_this.registerForm.phoneNumber)){
                alert('请输入符合规定的手机号')
            }else if (!/^[0-9]+$/.test(_this.registerForm.age)){
                alert('年龄输出有误，请重新输入')
            }else{
                _this.$http.post('http://localhost:3000/postRegisterForm.json',{registerForm:_this.registerForm}).then((res)=>{
                    if(res.body.code == 0){
                        alert('注册成功，请重新登入')
                        this.$router.push('/home')
                    }
                },(res)=>{
                    console.log('fail to register!')
                })
            }
        }
    }

    
}
</script>

