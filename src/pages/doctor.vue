
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
    text-align: center;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
.demo-split{
    height: 340px;
    border: 1px solid #dcdee2;
}
.demo-split-pane{
    padding: 10px;
}
.time{
    font-size: 14px;
    font-weight: bold;
}
.content{
    
}
.contentMargin{
    margin-right:12px;
    margin-top:14px;
}
.active{
    color: #2b85e4;
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
                            <Icon type="ios-navigate"/>
                            预约挂号
                        </MenuItem>
                    </div>
                </Menu>
            </Header>

            <Layout>
                <Sider hide-trigger :style="{background: '#fff',float:'left'}">
                    <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="md-people" />
                                请选择医生
                            </template>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                               <Icon type="md-people" />
                                内科
                            </template>
                            <MenuItem :name="x.doctorId" :key="idx" v-for="(x,idx) in internalMadicine" @click.native="selectDoctor(x.doctorId)">{{x.name}}</MenuItem>
                        </Submenu>
                        <Submenu name="3">
                            <template slot="title">
                                <Icon type="md-people" />
                                外科
                            </template>
                            <MenuItem :name="x.doctorId" :key="idx" v-for="(x,idx) in surgical" @click.native="selectDoctor(x.doctorId)">{{x.name}}</MenuItem>
                        </Submenu>
                        <Submenu name="4">
                            <template slot="title">
                                <Icon type="md-people" />
                                口腔科
                            </template>
                            <MenuItem :name="x.doctorId" :key="idx" v-for="(x,idx) in stomatology" @click.native="selectDoctor(x.doctorId)">{{x.name}}</MenuItem>
                        </Submenu>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '0 24px 24px',float:'left'}">
                    <Breadcrumb :style="{margin: '24px 0'}">
                        <BreadcrumbItem>home</BreadcrumbItem>
                        <BreadcrumbItem>doctor</BreadcrumbItem>
                    </Breadcrumb>
                    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                        <row justify="start">
                            <Col span="6">医生姓名：{{name}}</Col>
                            <Col span="6">职位：{{position}}</Col>
                            <Col span="6">今日号数：{{remain}}</Col>
                        </row>
                        
                        <Divider />
                        <row justify="start">
                            <Col span="3">请选择预约日期：</Col>
                            <Col span="3" @click.native="selectTime(mydate1[0],1)" v-bind:class="{ active: isActive.t1 }">{{mydate1[0]}}</Col>
                            <Col span="3" @click.native="selectTime(mydate1[1],2)" v-bind:class="{ active: isActive.t2 }">{{mydate1[1]}}</Col>
                            <Col span="3" @click.native="selectTime(mydate1[2],3)" v-bind:class="{ active: isActive.t3 }">{{mydate1[2]}}</Col>
                            <Col span="3" @click.native="selectTime(mydate1[3],4)" v-bind:class="{ active: isActive.t4 }">{{mydate1[3]}}</Col>
                            <Col span="3" @click.native="selectTime(mydate1[4],5)" v-bind:class="{ active: isActive.t5 }">{{mydate1[4]}}</Col>
                            <Col span="3" @click.native="selectTime(mydate1[5],6)" v-bind:class="{ active: isActive.t6 }">{{mydate1[5]}}</Col>
                            <Col span="3" @click.native="selectTime(mydate1[6],7)" v-bind:class="{ active: isActive.t7 }">{{mydate1[6]}}</Col>
                        </row>
                        <Divider />
                        <div class="demo-split" style="min-height:416px;">
                            <Split>
                                <div slot="left" class="demo-split-pane">
                                    <Timeline>
                                        <TimelineItem>
                                            <p class="time">请选择上午预约号</p>
                                        </TimelineItem>
                                        <TimelineItem>
                                            <p class="time">8:00--9:00</p>
                                            <Button class="content contentMargin" v-for="(x,index) in List.l01" :key="index" @click.native="postAppointment(x,0,'8:00--9:00')" v-show="x">第{{x}}号</Button>                                            
                                        </TimelineItem>
                                        <TimelineItem>
                                            <p class="time">9:00--10:00</p>
                                            <Button class="content contentMargin" v-for="(x,index) in List.l02" :key="index" @click.native="postAppointment(x,0,'9:00--10:00')" v-if="x">第{{List.l02[index]}}号</Button>
                                        </TimelineItem>
                                        <TimelineItem>
                                            <p class="time">10:00--11:00</p>
                                            <Button class="content contentMargin" v-for="(x,index) in List.l03" :key="index" @click.native="postAppointment(x,0,'10:00--11:00')" v-if="x">第{{List.l03[index]}}号</Button>                                            
                                        </TimelineItem>
                                        <TimelineItem>
                                            <p class="time">11:00-11:30</p>
                                            <Button class="content contentMargin" v-for="(x,index) in List.l04" :key="index" @click.native="postAppointment(x,0,'11:00-11:30')" v-if="x">第{{List.l04[index]}}号</Button>
                                        </TimelineItem>
                                    </Timeline>
                                </div>
                                <div slot="right" class="demo-split-pane">
                                    <Timeline>
                                        <TimelineItem>
                                            <p class="time">请选择上午预约号</p>
                                        </TimelineItem>
                                        <TimelineItem>
                                            <p class="time">14:30--15:15</p>
                                            <Button class="content contentMargin" v-for="(x,index) in List.l11" :key="index" @click.native="postAppointment(x,1,'14:30--15:15')" v-if="x">第{{List.l11[index]}}号</Button>                                            
                                        </TimelineItem>
                                        <TimelineItem>
                                            <p class="time">15:15--16:00</p>
                                            <Button class="content contentMargin" v-for="(x,index) in List.l12" :key="index" @click.native="postAppointment(x,1,'15:15--16:00')" v-if="x">第{{List.l12[index]}}号</Button>
                                        </TimelineItem>
                                        <TimelineItem>
                                            <p class="time">16:00--16:45</p>
                                            <Button class="content contentMargin" v-for="(x,index) in List.l13" :key="index" @click.native="postAppointment(x,1,'16:00--16:45')" v-if="x">第{{List.l13[index]}}号</Button>                                            
                                        </TimelineItem>
                                        <TimelineItem>
                                            <p class="time">16:45-17:30</p>
                                            <Button class="content contentMargin" v-for="(x,index) in List.l14" :key="index" @click.native="postAppointment(x,1,'16:45-17:30')" v-if="x">第{{List.l14[index]}}号</Button>
                                        </TimelineItem>
                                    </Timeline>
                                </div>
                            </Split>
                        </div>

                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>
<script>
    

    export default {
        name:'doctor',
        data(){
            return{
                doctor:[],
                internalMadicine:[],
                surgical:[],
                stomatology:[],
                doctorId:'',
                name:'',
                position:'',
                remain:'',
                mydate1:[],
                List:{
                    l0:[],
                    l1:[],
                    l01:[],
                    l02:[],
                    l03:[],
                    l04:[],
                    l11:[],
                    l12:[],
                    l13:[],
                    l14:[],
                },
                orderNumber:[],
                isActive:{
                    t1:0,
                    t2:0,
                    t3:0,
                    t4:0,
                    t5:0,
                    t6:0,
                    t7:0,
                },
                time:[],
                appointTime:'',
                accessTime:'',
                serial:'',
            }
        },
        mounted:
            function(){
                let _this = this
                this.$http.get('http://localhost:3000/getDoctor.json').then((res)=>{
                    if(res.body.code == 0){
                        _this.doctor=res.body.doctor
                    }
                },(res)=>{
                    console.log('fail to get doctor!')
                }).then(()=>{
                    for (let i=0;i< _this.doctor.length;i++){
                        if( _this.doctor[i].department == '内科'){
                            _this.internalMadicine.push(_this.doctor[i])
                        }else if(_this.doctor[i].department == '外科'){
                            _this.surgical.push(_this.doctor[i])
                        }else if(_this.doctor[i].department == '口腔科'){
                            _this.stomatology.push(_this.doctor[i])
                        }
                    }
                },(res)=>{
                    console.log('fail to select different department!')
                })
                let myDate=new Date()
                let weekday=new Array(14)
                weekday[0]="Sunday"
                weekday[1]="Monday"
                weekday[2]="Tuesday"
                weekday[3]="Wednesday"
                weekday[4]="Thursday"
                weekday[5]="Friday"
                weekday[6]="Saturday"
                weekday[7]="Sunday"
                weekday[8]="Monday"
                weekday[9]="Tuesday"
                weekday[10]="Wednesday"
                weekday[11]="Thursday"
                weekday[12]="Friday"
                weekday[13]="Saturday"
                _this.appointTime=(myDate.getMonth()+1)+'-'+myDate.getDate()
                _this.$store.commit('setAppointTime',_this.appointTime)
                for(let i=0;i<7;i++){
                    if(myDate.getMonth()+1==1||myDate.getMonth()+1==3||myDate.getMonth()+1==5||myDate.getMonth()+1==7||myDate.getMonth()+1==8||myDate.getMonth()+1==10||myDate.getMonth()+1==12){
                        //月份为1，3，5，7，8，10，12月
                        if(myDate.getDate()+i+1>31){
                            _this.mydate1[i]=(myDate.getMonth()+2)+'-'+(myDate.getDate()+i+1-31)+'-'+weekday[myDate.getDay()+1+i]
                        }else{
                            _this.mydate1[i]=(myDate.getMonth()+1)+'-'+(myDate.getDate()+i+1)+'-'+weekday[myDate.getDay()+1+i]
                        }
                    }else if(myDate.getMonth()+1 !=2 ){
                        //不是2月
                        if(myDate.getDate()+i+1>30){
                            _this.mydate1[i]=(myDate.getMonth()+2)+'-'+(myDate.getDate()+i+1-30)+'-'+weekday[myDate.getDay()+1+i]
                        }else{
                            _this.mydate1[i]=(myDate.getMonth()+1)+'-'+(myDate.getDate()+i+1)+'-'+weekday[myDate.getDay()+1+i]
                        }
                    }
                    if(myDate.getFullYear()%4 ==0 && myDate.getFullYear()%100 != 0){
                        //闰年，二月有29天
                        if(myDate.getMonth()+1 == 2){
                            //二月份
                            if(myDate.getDate()+i+1>29){
                                //日期大过29,月份加1，日期减少29
                                _this.mydate1[i]=(myDate.getMonth()+2)+'-'+(myDate.getDate()+i+1-29)+'-'+weekday[myDate.getDay()+1+i]
                            }else{
                                _this.mydate1[i]=(myDate.getMonth()+1)+'-'+(myDate.getDate()+i+1)+'-'+weekday[myDate.getDay()+1+i]
                            }
                        }
                    }else{
                        //不是闰年
                        if(myDate.getMonth()+1 == 2){
                            //二月份
                            if(myDate.getDate()+i+1>28){
                                //日期大过29,月份加1，日期减少28
                                _this.mydate1[i]=(myDate.getMonth()+2)+'-'+(myDate.getDate()+i+1-28)+'-'+weekday[myDate.getDay()+1+i]
                            }else{
                                _this.mydate1[i]=(myDate.getMonth()+1)+'-'+(myDate.getDate()+i+1)+'-'+weekday[myDate.getDay()+1+i]
                            }
                        }
                    }
                }
            },
        methods:{
            selectDoctor(ID){
                let _this=this
                _this.doctorId=ID
                _this.$store.commit('setDoctor',_this.doctorId)
                // alert(_this.$store.state.User.doctorId)
                this.$http.post('http://localhost:3000/selectDoctorById.json',{doctorId:_this.doctorId}).then((res)=>{
                    if(res.body.code == 0){
                        let doctor=res.body.doctor
                        _this.name=doctor.name
                        _this.$store.commit('setDoctorName',doctor.name)
                        _this.position=doctor.position
                        _this.remain=doctor.remain
                    }
                },(res)=>{
                    console.log('fail to get doctor!')
                })
                _this.isActive.t1=0
                _this.isActive.t2=0
                _this.isActive.t3=0
                _this.isActive.t4=0
                _this.isActive.t5=0
                _this.isActive.t6=0
                _this.isActive.t7=0
            },
            postAppointment(num,state,timeLine){
                let myDate=new Date()
                this.serial=this.$store.state.User.userId+myDate.getTime()
                this.$store.commit('setAppointment',this.serial)
                this.$store.commit('setNumber',num)
                this.$store.commit('setAppointState',state)
                this.$store.commit('setTimeLine',timeLine)
                this.$router.push('/appointment')
            },
            selectTime(day,num){
                let _this=this
                let time = day.split('-')
                _this.time=time
                _this.accessTime=_this.time[0]+'-'+_this.time[1]
                _this.$store.commit('setAccessTime',_this.accessTime)
                _this.isActive.t1=0
                _this.isActive.t2=0
                _this.isActive.t3=0
                _this.isActive.t4=0
                _this.isActive.t5=0
                _this.isActive.t6=0
                _this.isActive.t7=0
                if(_this.doctorId == ''){
                    alert('请先选择就诊医生')
                }else{
                    if(num == 4){
                        _this.isActive.t4=1
                    }else if(num == 2){
                        _this.isActive.t2=1
                    }else if(num == 1){
                        _this.isActive.t1=1
                    }else if(num == 3){
                        _this.isActive.t3=1
                    }else if(num == 5){
                        _this.isActive.t5=1
                    }else if(num == 6){
                        _this.isActive.t6=1
                    }else if(num == 7){
                        _this.isActive.t7=1
                    }
                    this.$http.post('http://localhost:3000/selectTime.json',{accessTime:_this.accessTime,doctorId:_this.doctorId}).then(res=>{
                        if(res.body.code == 0){
                            _this.List.l0=[]
                            _this.List.l1=[]
                            _this.List.l01=[]
                            _this.List.l02=[]
                            _this.List.l03=[]
                            _this.List.l04=[]
                            _this.List.l11=[]
                            _this.List.l12=[]
                            _this.List.l13=[]
                            _this.List.l14=[]
                            for (let i=0;i< _this.remain;i++){
                                _this.List.l0.push(i+1)
                                _this.List.l1.push(i+1)
                                if (i<_this.remain/4){
                                    _this.List.l01.push(i+1)
                                    _this.List.l11.push(i+1)
                                }else if(i<_this.remain/2){
                                    _this.List.l02.push(i+1)
                                    _this.List.l12.push(i+1)
                                }else if(i<_this.remain*(3/4)){
                                    _this.List.l03.push(i+1)
                                    _this.List.l13.push(i+1)
                                }else{
                                    _this.List.l04.push(i+1)
                                    _this.List.l14.push(i+1)
                                }
                            }
                            _this.orderNumber=res.body.result
                            // alert(_this.orderNumber.length)
                            if(res.body.codeNum == 0){
                                let len = _this.orderNumber.length
                                for(let i=0;i<len;i++){
                                    if(res.body.result[i].state == 0){
                                        // alert('上午')
                                        if(res.body.result[i].number<_this.remain/4){
                                            _this.List.l01[res.body.result[i].number-1]=0
                                            // alert(_this.List.l01[res.body.result[i].number-1])
                                        }else if(res.body.result[i].number<_this.remain/2){
                                            _this.List.l02[res.body.result[i].number-(_this.remain/4)-1]=0
                                        }else if(res.body.result[i].number<_this.remain*(3/4)){
                                            _this.List.l03[res.body.result[i].number-(_this.remain/2)-1]=0
                                        }else{
                                            _this.List.l04[res.body.result[i].number-_this.remain*(3/4)-1]=0
                                        }
                                    }else{
                                        if(res.body.result[i].number<_this.remain/4){
                                            _this.List.l11[res.body.result[i].number-1]=0
                                        }else if(res.body.result[i].number<_this.remain/2){
                                            _this.List.l12[res.body.result[i].number-(_this.remain/4)-1]=0
                                        }else if(res.body.result[i].number<_this.remain*(3/4)){
                                            _this.List.l13[res.body.result[i].number-(_this.remain/2)-1]=0
                                        }else{
                                            _this.List.l14[res.body.result[i].number-_this.remain*(3/4)-1]=0
                                        }
                                    }
                                }
                            }
                        }
                    },res=>{
                        console.log('fail to get asset!')
                    })
                }
            },
        }
    }
</script>
