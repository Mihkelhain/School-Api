import usersList from "../components/UsersList.js"
import userInfoModal from "../components/UserInfoModal.js"
export default {
    /*html*/
    template: `
    <users-list :key="update" @showModal="openModalUser"></users-list>
    <user-info-modal @userUpdated="updateViewUser" :userInModal="userInModal"></user-info-modal>
    `,
    components: {
        usersList,
        userInfoModal
    },
    data() {
        return {
            update: 0,
            userInModal: { id: "", name: "", group: ""}
        }
    },
    methods: {
        openModalUser(user) {
            this.userInModal = user
            let userInfoModal = new bootstrap.Modal(document.getElementById("userInfoModal"))
            userInfoModal.show()
        },
        updateViewUser(user) {
            this.update++
            this.userInModal = user
        }
    }
}