import schoolForm from "../components/School/SchoolForm.js"
import schoolDetails from "../components/School/SchoolDetails.js"
import confirmationModal from "./ConfirmationModal.js"
export default {
    /*html*/
    template: `
<div id="schoolInfoModal" class="modal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <school-form v-if="isEditing" v-model:id="modifiedSchool.id" v-model:name="modifiedSchool.name" v-model:director="modifiedSchool.director" ></school-form>
                <school-details v-else :schoolInModal="schoolInModal"></school-details>
            </div>
            <div class="modal-footer">
            <div class="container">
            <div class="row">
                <template v-if="isEditing">
                    <div class="col me-auto">
                        <button type="button" class="btn btn-danger" data-bs-target="#confirmationModal" data-bs-toggle="modal">Delete</button>
                    </div>
                    <div class="col-auto">
                        <button type="button" class="btn btn-success mx-2" @click="saveModifiedSchool">Save</button>
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
<confirmation-modal :target="'#schoolInfoModal'" @confirmed="deleteModifiedSchool"></confirmation-modal>
    `,
    components: {
        confirmationModal,
        schoolForm,
        schoolDetails
    },
    emits: ["schoolUpdated","SchoolDeleted"],
    props: {
        schoolInModal: {}
    },
    data() {
        return {
            isEditing: false,
            modifiedSchool: {}
        }
    },
    methods: {
        startEditing() {
            this.modifiedSchool = { ...this.schoolInModal }
            this.isEditing = true
        },
        cancelEditing() {
            this.isEditing = false
        },
        async saveModifiedSchool() {
            console.log("Saving:", this.modifiedSchool)
            const rawResponse = await fetch(this.API_URL + "/Schools/" + this.modifiedSchool.id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.modifiedSchool)
            });
            console.log(rawResponse);
            this.$emit("schoolUpdated", this.modifiedSchool)
            this.isEditing = false
        },

        async deleteModifiedSchool() {
            console.log("Saving:", this.modifiedSchool)
            const rawResponse = await fetch(this.API_URL + "/Schools/" + this.modifiedSchool.id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.modifiedSchool)
            });
            console.log(rawResponse);
            this.$emit("SchoolDeleted", this.modifiedSchool)
            this.isEditing = false
        }
    }
}