const router = require("express").Router();
const {
    getUsers,
    getOneUserById,
    createNewUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require("../../controllers/userController");

router.route("/").get(getUsers).post(createNewUser);
router.route("/:userId").get(getOneUserById).put(updateUser).delete(deleteUser);
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

module.exports = router;