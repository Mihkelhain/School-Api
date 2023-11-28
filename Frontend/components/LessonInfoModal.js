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
                        <th>Name</th>
                        <td v-if="isEditing"><input v-model="modifiedLesson.name"></td>
                        <td v-else>{{lessonInModal.name}}</td>
                    </tr>
                    <tr>
                        <th>group</th>
                        <td v-if="isEditing"><input v-model="modifiedLesson.price"></td>
                        <td v-else>{{lessonInModal.group}}</td>
                    </tr>
                </table>
            </div>
            <div class="modal-footer">
                <template v-if="isEditing">
                    <button type="button" class="btn btn-success" @click="saveModifiedLesson">Save</button>
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
    emits: ["LessonUpdated"],
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
        }
    }
} 