import confirmationModal from "./ConfirmationModal.js"
export default {
    /*html*/
    template: `
<div id="lessonInfoModal" class="modal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <table class="table table-striped">
                <tr>
                    <th>Id</th>
                    <td>{{lessonInModal.id}}</td>
                    </tr>
                        <tr>
                        <th>lesson Start</th>
                            <td v-if="isEditing"><input v-model="modifiedlesson.lessonStart"></td>
                            <td v-else>{{lessonInModal.lessonStart}}</td>
                        </tr>
                        <tr>
                            <th>Name</th>
                            <td v-if="isEditing"><input v-model="modifiedlesson.name"></td>
                            <td v-else>{{lessonInModal.name}}</td>
                        </tr>
                        <tr>
                            <th>length</th>
                            <td v-if="isEditing"><input v-model="modifiedlesson.length"></td>
                            <td v-else>{{lessonInModal.length}}</td>
                        </tr>
                </table>
            </div>
            <div class="modal-footer">
                <template v-if="isEditing">
                <div class="col me-auto">
                                <button type="button" class="btn btn-danger" data-bs-target="#confirmationModal" data-bs-toggle="modal">Delete</button>
                            </div>
                    <button type="button" class="btn btn-success" @click="saveModifiedlesson">Save</button>
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
<confirmation-modal :target="'#lessonInfoModal'" @confirmed="deletelesson"></confirmation-modal>
    `,
    components: {
        confirmationModal
    },
    emits: ["lessonUpdated"],
    props: {
        lessonInModal: {}
    },
    data() {
        return {
            isEditing: false,
            modifiedlesson: {}
        }
    },
    methods: {
        startEditing() {
            this.modifiedlesson = { ...this.lessonInModal }
            this.isEditing = true
        },
        cancelEditing() {
            this.isEditing = false
        },
        async saveModifiedlesson() {
            console.log("Saving:", this.modifiedlesson)
            const rawResponse = await fetch(this.API_URL + "/lessons/" + this.modifiedlesson.id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.modifiedlesson)
            });
            console.log(rawResponse);
            this.$emit("lessonUpdated", this.modifiedlesson)
            this.isEditing = false
        },
        async deletelesson() {
           console.log("Deleting:", this.modifiedlesson)
            const rawResponse = await fetch(this.API_URL + "/lessons/" + this.modifiedlesson.id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                   'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.modifiedlesson)
            });
       
            console.log(rawResponse);
            this.$emit("lessonUpdated", this.modifiedlesson)
            this.isEditing = false
        }
    }
} 
