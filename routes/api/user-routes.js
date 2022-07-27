const router = require('express').Router();
const {
    getUsers,
    getOneUserById,
    createNewUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/user-controller');

router.route('/').get(getUsers).post(createNewUser);
router.route('/:userid').get(getOneUserById).put(updateUser).delete(deleteUser);
router.route('/:userId/friends/friendId').post(addFriend).delete(deleteFriend);

module.exports = router;