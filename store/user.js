
export default{
    state: {
        userId:'',
        doctorId:'',
        serial:'',
        number:'',
        appointState:'',
        appointTime:'',
        accessTime:'',
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
        setAppointment(state,serial,number,appointState){
            state.serial=serial
            state.number=number
            state.appointState=appointState
        }
    }
}