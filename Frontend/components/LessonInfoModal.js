import lessonForm from "./Lesson/LessonForm.js"
import lessonDetails from "./Lesson/LessonDetails.js"
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
            <lesson-form v-if="isEditing" v-model:id="modifiedlesson.id" v-model:lessonStart="modifiedlesson.lessonStart" v-model:name="modifiedlesson.name" v-model:length="modifiedlesson.length" ></lesson-form>
            <lesson-details v-else :lessonInModal="lessonInModal"></lesson-details>
        </div>
        <div class="modal-footer">
            <div class="container">
                <div class="row">
                    <template v-if="isEditing">
                        <div class="col me-auto">
                            <button type="button" class="btn btn-danger" data-bs-target="#confirmationModal" data-bs-toggle="modal">Delete</button>
                        </div>
                        <div class="col-auto">
                            <button type="button" class="btn btn-success mx-2" @click="saveModifiedlesson">Save</button>
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
<confirmation-modal :target="'#lessonInfoModal'" @confirmed="deletelesson"></confirmation-modal>
    `,
    components: {
        confirmationModal,
        lessonForm,
        lessonDetails
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
