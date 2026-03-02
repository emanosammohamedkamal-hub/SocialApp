import axios from "axios"
 
class ApiServices{



    async signup(registerData){

       const {data}= await axios.post("https://route-posts.routemisr.com/users/signup",registerData)
       return data.data
    }

    
}

export const apiServices=new ApiServices()