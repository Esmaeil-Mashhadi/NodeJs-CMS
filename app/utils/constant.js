module.exports ={
    MONGOID_PATERN: /^[0-9a-fA-F]{24}$/,
    ROLES: Object.freeze({
        USER:'USER',
        AMDIN:"AMDIN",
        WRITTER:"WRITTER",
        TEACHER:'TEACHER',
        SUPPLIER:'SUPPLIER'
    }),

    PERMISSIONS:Object.freeze({
        USER:['profile'],
        ADMIN: ['all'],
        SUPER_ADMIN : ['all'],
        CONTENT_MANAGER: ['blog' , 'course' , 'product' , 'category'],
        TEACHER : ['course' , 'blog'],
        SUPPLIER : ['product'],
        All : 'all'
    }),



    ACCESS_TOKEN_SECRET_KEY :"9350E8F889B8406571D0FC8FD7819BD2429E873F70E2D944ACD3B13CB6D3248E",
    REFRESH_TOKEN_SECRET_KEY:"137B2E419CB1814F69CDC74BC5B694AA2ACFE47A1E6FB4E81122B2F4FEE35CA9"
}

