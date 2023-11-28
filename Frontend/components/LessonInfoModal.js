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
                        <th>lessonStart</th>
                        <td v-if="isEditing"><input v-model="modifiedLesson.lessonStart"></td>
                        <td v-else>{{lessonInModal.lessonStart}}</td>
                    </tr>
                    <tr>
                        <th>Name</th>
                        <td v-if="isEditing"><input v-model="modifiedLesson.name"></td>
                        <td v-else>{{lessonInModal.name}}</td>
                    </tr>
                    <tr>
                        <th>length</th>
                        <td v-if="isEditing"><input v-model="modifiedLesson.length"></td>
                        <td v-else>{{lessonInModal.length}}</td>
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
                        <button type="button" class="btn btn-success mx-2" @click="saveModifiedLesson">Save</button>
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
<confirmation-modal :target="'#lessonInfoModal'" @confirmed="deleteModifiedLesson"></confirmation-modal>
    `,
    components: {
        confirmationModal
    },
    emits: ["LessonUpdated"],
    emits: ["LessonDeleted"],
    props: {
        lessonInModal: {}
    },
    data() {
        return {
            isEditing: false,
            modifiedLesson: {}
        }
    },
    methods: {
        startEditing() {
            this.modifiedLesson = { ...this.lessonInModal }
            this.isEditing = true
        },
        cancelEditing() {
            this.isEditing = false
        },
        async saveModifiedLesson() {
            console.log("Saving:", this.modifiedLesson)
            const rawResponse = await fetch(this.API_URL + "/Lessons/" + this.modifiedLesson.id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.modifiedLesson)
            });
            console.log(rawResponse);
            this.$emit("LessonUpdated", this.modifiedLesson)
            this.isEditing = false
        },
        async deleteModifiedLesson() {
            console.log("Saving:", this.modifiedLesson)
            const rawResponse = await fetch(this.API_URL + "/Lessons/" + this.modifiedLesson.id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.modifiedLesson)
            });
            console.log(rawResponse);
            this.$emit("LessonDeleted", this.modifiedLesson)
            this.isEditing = false
        }
    }
}