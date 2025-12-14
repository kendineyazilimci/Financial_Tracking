const User = require('../models/users');

const addUser = async (id, name, surname, email, password) => {
    try {
        const newUser = await User.create({
            userId: id,               // Şemada userId -> Parametreden gelen id
            userName: name,           // Şemada userName -> Parametreden gelen name
            userSurname: surname,     // Şemada userSurname -> Parametreden gelen surname
            userEmail: email,         // Şemada userEmail -> Parametreden gelen email
            userPassword: password,   // Şemada userPassword -> Parametreden gelen password
            userJoinDate: new Date()
        });

        console.log('Kullanıcı eklendi:', newUser.userName);
        return newUser;
    } catch (error) {
        console.error('Kullanıcı eklenirken hata:', error.message);
    }
};

const getUser = async (id) => {
    try {
        const user = await User.findOne({ userId: id });
        if (user) {
            console.log(`Kullanıcı bulundu: ${user.userName}`);
        } else {
            console.log('Kullanıcı bulunamadı.');
        }
        return user;
    } catch (error) {
        console.error('Hata:', error.message);
    }
}

module.exports = {
    addUser,
    getUser
};