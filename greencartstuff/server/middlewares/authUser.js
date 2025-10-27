 import jwt from 'jsonwebtoken';

const authUser = async (req, res, next)=>{
    const {token} = req.cookies;

    if(!token){
        return res.json({ success: false, message: 'Not Authorized'});
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
        if(tokenDecode.id){
            req.body.userId = tokenDecode.id;
        }else{

        }
        next();

    } catch (error) {
        return res.json({ success: false, message: 'Not Authorized'});
    }
}

export default authUser;

// const authUser = (req, res, next) => {
//   const token = req.cookies?.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);
//   console.log("authUser middleware running");
//   console.log("Token received:", token);

//   if (!token) {
//     console.log("No token found");
//     return res.json({ success: false, message: 'Not Authorized' });
//   }

//   try {
//     const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("Token decoded:", tokenDecode);
//     if (tokenDecode.id) {
//       req.userId = tokenDecode.id; // <-- FIXED
//       req.user = tokenDecode;
//     }
//     next();
//   } catch (error) {
//     console.log("JWT verification error:", error.message);
//     return res.json({ success: false, message: 'Not Authorized' });
//   }
// };

// export default authUser;