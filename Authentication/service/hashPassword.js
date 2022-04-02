const bcrypt = require('bcrypt')
const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
}

const comperePasswords = async (password, hashPassword) => {
    console.log(await bcrypt.compare(password, hashPassword));
    console.log(password);
    console.log(hashPassword);
    return await bcrypt.compare(password, hashPassword);
}

module.exports = { hashPassword, comperePasswords };