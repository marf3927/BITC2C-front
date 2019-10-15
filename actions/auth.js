const checkSignInStatus = reqDataObj => ({
    type: 'checkSignInStatus',
    id: reqDataObj.id
});
module.exports = {
    checkSignInStatus
};