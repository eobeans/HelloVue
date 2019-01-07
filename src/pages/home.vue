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
                        <div style="min-height: 390px;">
                            <form :model="loginForm" style="margin-top:160px;margin-left:410px;">
                                <input type="text" name="username" class="inputText" v-model="loginForm.username" placeholder="用户" autocomplete="on">
                                <input type="password" name="password" class="inputText" v-model="loginForm.password" placeholder="密码" autocomplete="on">
                                <span @click.stop.prevent.self="handleLogin" style="margin-left:12px;">Login</span>
                                <span @click.stop.prevent.self="register" style="margin-left:18px;">Register</span>
                            </form>
                        </div>
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
            list:[
                {name: 'oringe'}
            ],
            loginForm: {
                username: '',
                password: '',
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
        handleLogin() {
            let _this = this
            this.$http.post('http://localhost:3000/postUser',{loginForm:_this.loginForm}).then((res)=>{
                if(res.body.code == 0){
                    _this.$store.commit('setUser',res.body.userId)
                    _this.$store.commit('setUserName',res.body.username)
                    this.$router.push('/doctor')
                }else{
                    alert('账号密码错误！')
                }
            },(res)=>{
                alert('出错误了！')
            })
        },
        register(){
            this.$router.push('/register')
        }

    }

    
}
</script>

