export function  calculateAge(date){

    const birthdate= new Date(date) 
    const today=new Date()
     if(birthdate>today){
            return "Invalid date format";

     }
      let age = today.getFullYear() - birthdate.getFullYear();
      const monthDiif=today.getMonth()-birthdate.getMonth()
      if(monthDiif<0 || monthDiif==0&&today.getDate>birthdate.getDate){
             age--
      }
     
    return age
   }