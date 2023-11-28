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
                <table class="table table-striped">
                    <tr>
                        <th>Id</th>
                        <td>{{userInModal.id}}</td>
                    </tr>
                    <tr>
                        <th>Name</th>
                        <td v-if="isEditing"><input v-model="modifiedUser.name"></td>
                        <td v-else>{{userInModal.name}}</td>
                    </tr>
                    <tr>
                        <th>Group</th>
                        <td v-if="isEditing"><input v-model="modifiedUser.group"></td>
                        <td v-else>{{userInModal.group}}</td>
                    </tr>
                </table>
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
    emits: ["UserUpdated"],
    emits: ["UserDeleted"],
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
        // async deleteModifiedUser() {
        //     console.log("Deleting:", this.modifiedUser)
        //     const rawResponse = await fetch(this.API_URL + "/Users/" + this.modifiedUser.id, {
        //         method: 'DELETE',
        //         headers: {
        //             'Accept': 'application/json',
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(this.modifiedUser)
        //     });
        
        //     console.log(rawResponse);
        //     this.$emit("UserDeleted", this.modifiedUser)
        //     this.isEditing = false
        // }
    }
}