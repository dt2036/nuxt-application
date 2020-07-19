class Authorization {

    constructor() {

    }

    static async invoke(permissionItems,request) {
        return true;
    }
}

module.exports.Authorization = Authorization;