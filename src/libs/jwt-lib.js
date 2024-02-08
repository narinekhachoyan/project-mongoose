import JWT from 'jsonwebtoken';
const { SECRET } = process.env;

export const  sign = async(data) => {
try {
    const token = JWT.sign(data, SECRET,{expiresIn: "15d"});
    return token;
} catch (e) {
    throw new Error(e.message)
}
}

export const verify = async(token) => {
try {
   return JWT.verify(token, SECRET);
    
} catch (e) {
    throw new Error(e.message)
}
}