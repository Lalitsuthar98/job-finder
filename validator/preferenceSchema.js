import * as z from "zod" 

const preferenceBodySchema = z.object({
    
    skills:z
    .array(
        z.string()
        .trim()
        .min(1,"skills cannot be")
    )

})