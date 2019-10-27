'use strict';

var mysql = require('promise-mysql');
var bcrypt = require('bycryptjs');

var info = require('../config');

exports.getById = async(id) => {
    try{
        const connection = await mysql.createConnection(info,config);

        let sql = 'SELECT * FROM users WHERE id = ${id} ';
        
        let data = await connection.query(sql);

        await connection.end();

        return data;

    } catch(error){
        if (error.status === undefined)
            error.status = 500;
        throw error;
    }
}

exports.findOne = async (authData, callback) => {
    try {
        const connection = await mysql.createConnection(info.config);
            let sql = 'SELECT * FROM users WHERE email = \'${authData.email}\'';
        let data = await connection.query(sql);

        await connection.end();

        if(data.length > 0){
            let pass = bcrypt.compareSync(authData.password, data[0].pwd);

            if(pass)
                callback(null, data[0]);
            else
                callback(null, false);
        }
        else{
            callback(null,false);
        }
    }catch (error) {
        if (error.status === undefined)
                error.status = 500;
        callback(error);
    }
}

exports.add = async (user) =>{
    try{
        if(user.email === undefined){
            throw {message: 'email is required', status:400};
        }
        if(user.password === undefined){
            throw {message:'password is required', status:400};
        }
        else{
            if(user.password.length < 6){
                throw{message:'password must be more than 6 characters long', status:400};
            }
        }
        if (user.passwordConfirmation === undefined){
            throw{message:'password confirmation is required', status: 400};
        }
        else{
            if (user.password !== user.passwordConfirmation){
                throw{message:'passwords don\'t match', status:400};
            }
        }
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\ [[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zAZ]{2,}))$/; 
        if(!re.test(String(user.email).toLowerCase()))
            throw {message:'invalid email adress format', status:400};
       
    
        let sql = 'SELECT email from Users WHERE email = \'${user.email}\' ';

        const connection = await mysql.createConnection(info.config);
        let data = await connection.query(sql);
        
        if(data.length){
            await connection.end();
            throw {message:'email address already in use', status:400};
        }
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(user.password, salt);

        let userData = {
            email: user.email,
            pwd: hash,
            forename: user.forename,
            surname: user.surname,
            created: new Date()
        }
                sql = 'INSERT INTO users SET ?';

                data = await connection.query(sql, userData);

                         await connection.end();
                
                return data;
            
            }   catch (error) {
                    if(error.status === undefined)
                        error.status = 500;
                    throw error;
            }
}