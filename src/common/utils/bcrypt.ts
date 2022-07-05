import * as bcrypt from 'bcrypt';

const hashPassword = (password: string) => {
    return bcrypt.hash(password, 8);
};
const comparePassword = (password: string, hash: string) : Promise<boolean> => {
    return bcrypt.compare(password, hash);
};

export { hashPassword, comparePassword };
