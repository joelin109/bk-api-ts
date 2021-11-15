const Config ={

    db: {
        connectionLimit: 100, //important
        host: 'localhost',
        port: "3306",
        user: 'root',
        password: 'joelin502',
        database: 'de_web',
        debug: false
    },
    redis: {
        "host": "test.bstcine.com",
        "port": "6379",
        "ttl": 60 * 60    //Session的有效期为30天 60 * 60 * 24 * 30
    }
};

export default Config;