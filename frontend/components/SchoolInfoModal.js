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
                <table class="table table-striped">
                    <tr>
                        <th>Id</th>
                        <td>{{schoolInModal.id}}</td>
                    </tr>
                    <tr>
                        <th>Name</th>
                        <td v-if="isEditing"><input v-model="modifiedSchool.name"></td>
                        <td v-else>{{schoolInModal.name}}</td>
                    </tr>
                    <tr>
                        <th>director</th>
                        <td v-if="isEditing"><input v-model="modifiedSchool.price"></td>
                        <td v-else>{{schoolInModal.director}}</td>
                    </tr>
                </table>
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
<confirmation-modal :target="'#schoolInfoModal'" @confirmed="deleteGame"></confirmation-modal>
    `,
    components: {
        confirmationModal
    },
    emits: ["SchoolUpdated"],
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
            this.$emit("SchoolUpdated", this.modifiedSchool)
            this.isEditing = false
        },
        deleteGame() {
            console.log("DELETE confirmed");
        }
    }
}