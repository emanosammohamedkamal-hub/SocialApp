 import * as zod from 'zod'
import { regexValidation } from '../assets/regex'

  export const schema=zod.object({
    email:zod.string().nonempty("email is required").regex(regexValidation.emailValidation,"Email is invalid"),
    password:zod.string().nonempty("password is required").regex(regexValidation.passwordValidation,"Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character")

  })
