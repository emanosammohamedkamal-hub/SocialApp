
  export function inputProps(label,type,filed){
    return{
       label,
       type,
      isInvalid :!!filed,
      errorMessage:filed?.message  

    }
    
  }