const fs = require('fs');

const User = {
    fileName: './src/database/users.json',

    create: function (userData) {
        let allUsers = this.getUsers();
        let newUser = {
            id: this.generateId(),
            ...userData
        }
        allUsers.push(newUser);
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, ' '));
        return newUser;
    },

    update: function (userData){

    },
    
    // Gera id para os cadastros
    generateId: function (){
        let allUsers = this.getUsers();
        let lastUser = allUsers.pop();
        if (lastUser){
            return lastUser.id + 1;
        }
        return 1;
    },

    // Exibe todos os usuários
    getUsers: function () {
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
    },

    // Exibe o usuário pelo id
    findUserById: function (id) {
        let allUsers = this.getUsers();
        let userFound = allUsers.find(user => user.id === parseInt(id));
        return userFound;
    },

    // Exibe usuário por campo recebendo o campo e o valor
    findUserByField: function (field, value) {
        let allUsers = this.getUsers();
        let userFound = allUsers.find(user => user[field] === value);
        return userFound;
    },

    delete: function (id){
        let allUsers = this.getUsers();
        let userFound = allUsers.find(user => user === parseInt(id));
        allUsers.splice(userFound, 1);
    }
}

module.exports = User;