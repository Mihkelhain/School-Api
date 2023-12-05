import groupForm from "./Group/GroupForm.js"
import groupDetails from "./Group/GroupDetails.js"
import confirmationModal from "./ConfirmationModal.js"
export default {
    /*html*/
    template: `
<div id="groupInfoModal" class="modal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <group-form v-if="isEditing" v-model:id="modifiedgroup.id" v-model:name="modifiedgroup.name" v-model:studentCount="modifiedgroup.studentCount" ></group-form>
            <group-details v-else :groupInModal="groupInModal"></group-details>
        </div>
        <div class="modal-footer">
            <div class="container">
                <div class="row">
                    <template v-if="isEditing">
                        <div class="col me-auto">
                            <button type="button" class="btn btn-danger" data-bs-target="#confirmationModal" data-bs-toggle="modal">Delete</button>
                        </div>
                        <div class="col-auto">
                            <button type="button" class="btn btn-success mx-2" @click="saveModifiedgroup">Save</button>
                            <button type="button" class="btn btn-secondary" @click="cancelEditing">Cancel</button>
                        </div>
                    </template>
                    <template v-else>
                        <div class="col me-auto"></div>
                        <div class="col-auto">
                            <button type="button" class="btn btn-warning mx-2" @click="startEditing">Edit</button>
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
<confirmation-modal :target="'#groupInfoModal'" @confirmed="deletegroup"></confirmation-modal>
    `,
    components: {
        confirmationModal,
        groupForm,
        groupDetails
    },
    emits: ["groupUpdated"],
    props: {
        groupInModal: {}
    },
    data() {
        return {
            isEditing: false,
            modifiedgroup: {}
        }
    },
    methods: {
        startEditing() {
            this.modifiedgroup = { ...this.groupInModal }
            this.isEditing = true
        },
        cancelEditing() {
            this.isEditing = false
        },
        async saveModifiedgroup() {
            console.log("Saving:", this.modifiedgroup)
            const rawResponse = await fetch(this.API_URL + "/groups/" + this.modifiedgroup.id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.modifiedgroup)
            });
            console.log(rawResponse);
            this.$emit("groupUpdated", this.modifiedgroup)
            this.isEditing = false
        },
        async deletegroup() {
            console.log("Deleting:", this.modifiedgroup)
            const rawResponse = await fetch(this.API_URL + "/groups/" + this.modifiedgroup.id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.modifiedgroup)
            });

            console.log(rawResponse);
            this.$emit("groupUpdated", this.modifiedgroup)
            this.isEditing = false
        }
    }
} 
