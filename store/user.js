
export default{
    state: {
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
    mutations: {
        setUser (state,id) {
            state.userId = id
        },
        setAppointTime(state,appointTime){
            state.appointTime=appointTime
        },
        setAccessTime(state,accessTime){
            state.accessTime=accessTime
        },
        setDoctor (state,doctorId){
            state.doctorId=doctorId
        },
        setAppointment(state,serial){
            state.serial=serial
        },
        setUserName(state,userName){
            state.userName=userName
        },
        setDoctorName(state,doctorName){
            state.doctorName=doctorName
        },
        setNumber(state,number){
            state.number=number
        },
        setAppointState(state,appointState){
            state.appointState=appointState
        },
        setTimeLine(state,timeLine){
            state.timeLine=timeLine
        },
    }
}