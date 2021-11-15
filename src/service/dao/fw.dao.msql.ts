import mysql from 'mysql';
import Config from '../_config/index';

let pool: mysql.Pool = null;
let debug = false;
const connParams = {
    //connectionLimit: Config.db.connectionLimit, //important
    host: Config.db.host,
    user: Config.db.user,
    password: Config.db.password,
    database: Config.db.database
};

const getPool = async function () { //获取连接池

    if (!pool) {
        pool = mysql.createPool(connParams);
        debug = Config.db.debug
    }

    return pool;

};


export module DB {

    type ExecSqlResult = { status: boolean, error?: any, data?: any };
    export const execSql = async function (sql: string, sqlParam?: any[]): Promise<ExecSqlResult> {

        try {

            getPool();

            const conn: any = await new Promise<mysql.Connection>((resolve, reject) => {

                pool.getConnection(function (err: any, conn: any) {
                    if (err) { reject(err); } else { resolve(conn); }
                });

            });


            try {
                const qResult = await new Promise((resolve, reject) => {
                    conn.query(sql, sqlParam, function (err: any, result: any) {
                        if (err) { reject(err); } else { resolve(result); }
                    });
                });

                return { data: qResult, status: true };

            } finally {
                if (conn) conn.release();
            }

        } catch (err) {
            console.log(err)
            return { error: err, status: false };
        }

    };


    export const testConnect = async function () { //执行测试SQL

        const that = this;
        const rs: any = await execSql('show tables');
        let _message = "database connect test is ok. \nshow tables:\n";

        if (rs.status) {
            let tables = [];
            for (var i = 0; i < rs.data.length; i++) {
                var obj = rs.data[i];
                for (var key in obj) {
                    tables.push(obj[key]);
                }
            }
            console.log(_message);
            return tables;

        } else {
            _message = "database connect test is failed. \nError:\n" + JSON.stringify(rs.error);
            console.log(_message);
            return rs.error;
        }
    }

}

