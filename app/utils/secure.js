const crypto = require('crypto');

const algorithm = 'aes-256-ctr';
const secretKey = 'vOVH5lebuALsQVHcLc7rdxs01lwHzfr3';
const iv = crypto.randomBytes(16);

function encrypt(text) {
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return {
        password_iv: iv.toString('hex'),
        password_encrypted: encrypted.toString('hex')
    };
}
function decrypt(hash) {
    try {
        const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.password_iv, 'hex'));

        const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.password_encrypted, 'hex')), decipher.final()]);

        return decrpyted.toString();
    } catch (error) {
        console.log("An error occurs");
        console.log(error);
        return "";
    }
}        
exports.encrypt = encrypt;
exports.decrypt = decrypt;
 