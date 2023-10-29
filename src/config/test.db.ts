import {Sequelize} from 'sequelize';

const testDbconnection = new Sequelize('api','postgres','Bmtuser@123',{
    host: '127.0.0.1',
    dialect: 'postgres',
});



testDbconnection.authenticate()
.then(() => {
    console.log('authentication successful');

}).catch((err)=>{
    console.log(err);
});



export default testDbconnection;