var mysql = require('promise-mysql');
var info = require('../config');


//get an article by its id
exports.getById = async (id) => {
   try {
       //first connect to the database
       const connection = await mysql.createConnection(info.config);
    
       //TODO validate the user input 
       if(article.title === undefined){
           
       }
       //this is the sql statement to execute
       let sql = `SELECT * FROM articles WHERE id = ${id} `;


       //wait for the async code to finish
       let data = await connection.query(sql);
    
       //wait until connection to db is closed
       await connection.end();
    
       //return the result
       return data;
    
    } catch (error) {
        //if an error occured please log it and throw an exception
        throw new Error(error)
        //ctx.throw(500, 'An Error has occured');
    }
}


exports.getAll = async (page, limit, order)=> {
    try {

        const connection = await mysql.createConnection(info.config);
    
        //this is the sql statement to execute
        let sql = `SELECT * FROM articles
                `;
        let data = await connection.query(sql);
    
            await connection.end();
    
        return data;
    
    } catch (error) {
        if(error.status=== undefined)
            error.status = 500;
        throw error;
        //ctx.throw(500, 'An Error has occured');
    }  
}
exports.add = async (article) => {
    try {
    
        const connection = await mysql.createConnection(info.config);

        if(article.title === undefined){
            throw {message: 'title is required', status:400};
        }
    
    //this is the sql statement to execute
        let sql = `INSERT INTO articles SET ?`;
        let data = await connection.query(sql, article);
    
        await connection.end();
    
        return data;
    
    } catch (error) {
        if(error.status === undefined)
            error.status = 500;
        throw error;
        //ctx.throw(500, 'An Error has occured');
        }
    } 