import confirmationModal from "./ConfirmationModal.js"
import userForm from "./Users/UserForm.js"
import userDetails from "./Users/UserDetails.js"

export default {
    /*html*/
    template: `
<div id="userInfoModal" class="modal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

            <user-form v-if="isEditing" v-model:id="modifiedUser.id" v-model:name="modifiedUser.name" v-model:group="modifiedUser.group" v-model:password="modifiedUser.password"  ></user-form>
            <user-details v-else :userInModal="userInModal"></user-details>

            </div>
            <div class="modal-footer">
                <template v-if="isEditing">
                    <button type="button" class="btn btn-success" @click="saveModifiedUser">Save</button>
                    <button type="button" class="btn btn-secondary" @click="cancelEditing">Cancel</button>
                </template>
                <template v-else>
                    <button type="button" class="btn btn-warning" @click="startEditing">Edit</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </template>
            </div>
        </div>
    </div>
</div>
    `,

    components: {
        confirmationModal,
        userForm,
        userDetails
    },
    emits: ["UserUpdated" , "UserDeleted"],
    props: {
        userInModal: {}
    },
    data() {
        return {
            isEditing: false,
            modifiedUser: {}
        }
    },
    methods: {
        startEditing() {
            this.modifiedUser = { ...this.userInModal }
            this.isEditing = true
        },
        cancelEditing() {
            this.isEditing = false
        },
        async saveModifiedUser() {
            console.log("Saving:", this.modifiedUser)
            const rawResponse = await fetch(this.API_URL + "/Users/" + this.modifiedUser.id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.modifiedUser)
            });
        
            console.log(rawResponse);
            this.$emit("UserUpdated", this.modifiedUser)
            this.isEditing = false
        },
         async deleteModifiedUser() {
            console.log("Deleting:", this.modifiedUser)
             const rawResponse = await fetch(this.API_URL + "/Users/" + this.modifiedUser.id, {
                 method: 'DELETE',
                 headers: {
                     'Accept': 'application/json',
                    'Content-Type': 'application/json'
                 },
                 body: JSON.stringify(this.modifiedUser)
             });
        
             console.log(rawResponse);
             this.$emit("UserDeleted", this.modifiedUser)
             this.isEditing = false
         }
    }
}