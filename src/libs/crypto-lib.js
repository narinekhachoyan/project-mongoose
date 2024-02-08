import bcrypt from 'bcrypt';

export const compare = async (password, userParams) => {
    return await bcrypt.compare(password, userParams.password);
}

export const makeHash = async (password) => {
    return await bcrypt.hash(password, 10);
}