module.exports = function (permissionItems) {
    return (request, response, next) => {
        if (permissionItems && permissionItems.length > 0) {
            //write authorization code here.
        } else
            next();
        
    };
}
