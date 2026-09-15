//  function of rety code 

const retryOperation = async(
    operation,
    maxAttempts = 3,
    initialDelay = 1000
)=>{
    let attempts = 1;
    while(attempts <= maxAttempts){
        try {
            return await operation();
        } catch (error) {
         const status = error.response?.status;

           const isRetryable =
        status === 429 ||
        status === 500 ||
        status === 502 ||
        status === 503 ||
        !error.response;

        if(!isRetryable || attempts === maxAttempts){
            throw error
        }

        const delay = initialDelay * 2 ** (attempts - 1);

          console.log(
        `Retrying... attempt ${attempts + 1}/${maxAttempts} after  ${delay}ms`
         );


        await new Promise((resolve) => setTimeout(resolve,delay));

        attempts++;
        }
    }
};

export default retryOperation;