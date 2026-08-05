import rateLimit from "../config/upstash.js"

const rateLimiter = async (req,res,next) => {
    try {
        const {success} = await rateLimit.limit("my-rate-limit")

        if(!success) {
            return res.status(429).json({message:"Too many Request!!"})
        }

        next();
    } catch(error) {
        console.log("Rate Limit Error!!", error)
        next(error)

    }
}

export default rateLimiter