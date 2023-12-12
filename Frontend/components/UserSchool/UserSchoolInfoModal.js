import confirmationModal from "../ConfirmationModal.js"
import userSchoolForm from "./UserSchoolForm"
import userSchoolDetails from "./UserSchoolDetails"

export default {
    /*html*/
    template: `
<div id="userSchoolInfoModal" class="modal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

            <userSchool-form v-if="isEditing" v-model:id="modifiedUserSchool.id" v-model:SchoolId="modifiedUserSchool.SchoolId" v-model:group="modifiedUserSchool.group" v-model:password="modifiedUserSchool.password"  ></userSchool-form>
            <userSchool-details v-else :userSchoolInModal="userSchoolInModal"></userSchool-details>

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
        userSchoolForm,
        userSchoolDetails
    },
    emits: ["UserSchoolUpdated" , "UserSchoolDeleted"],
    props: {
        userSchoolInModal: {}
    },
    data() {
        return {
            isEditing: false,
            modifiedUserSchool: {}
        }
    },
    methods: {
        startEditing() {
            this.modifiedUser = { ...this.userSchoolInModal }
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