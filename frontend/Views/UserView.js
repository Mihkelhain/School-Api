import usersList from "../components/UsersList.js"
import userInfoModal from "../components/UserInfoModal.js"
import newObjectModal from "../components/NewObjectModal.js"
import userForm from "../components/Users/UserForm.js"
export default {
    /*html*/
    template: `
    
    <users-list :key="update" @showModal="openModalUser"></users-list>
    <user-info-modal @userUpdated="updateViewUser" :userInModal="userInModal"></user-info-modal>
    <new-object-modal id="newUserModal" @save="saveNewUser">
        <user-form v-model:name="userInModal.name" v-model:group="userInModal.group" v-model:password="userInModal.password" ></user-form>
        <div class="alert alert-danger" role="alert" v-show="error">{{error}}</div>
    </new-object-modal>
    <button class="btn btn-info" @click="newUser">New User</button>
    `,
    components: {
        usersList,
        userInfoModal,
        newObjectModal,
        userForm
    },
    data() {
        return {
            update: 0,
            userInModal: { id: "", name: "", group: "", password:""},
            newUserModal: {},
            error: ""
        }
    },
    methods: {
        openModalUser(user) {
            this.userInModal = user
            let userInfoModal = new bootstrap.Modal(document.getElementById("userInfoModal"))
            userInfoModal.show()
        },
        newUser() {
            this.error = ""
            this.userInModal = {}
            this.newUserModal = new bootstrap.Modal(document.getElementById("newUserModal"))
            this.newUserModal.show()
        },
        updateViewUser(user) {
            this.update++
            this.userInModal = user
            
        },
        async saveNewUser() {
            console.log("Saving:", this.userInModal)
            const rawResponse = await fetch(this.API_URL + "/users/", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.userInModal)
            });
            if (rawResponse.ok) {
                this.newUserModal.hide()
                this.update++
            }
            else {
                const errorResponse = await rawResponse.json()
                this.error = errorResponse.error
            }
        }
    }
}