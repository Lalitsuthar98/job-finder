// skillMatching  logic and function  

export const matchSkills = (userSkills = [] , jobSkills =[])=>{
    if(!userSkills.length || !jobSkills.length){
        return {
            matchedSkills:[],
            score:0,
        }
    }

    const jobSkillSet = new Set(jobSkills);

    const matchedSkills =  userSkills.filter((skill)=>
       jobSkillSet.has(skill)
    );
    
    const score = matchedSkills.length/userSkills.length;

    return {
        matchedSkills,
        score
    };
};

