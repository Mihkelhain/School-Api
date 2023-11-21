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
                <template v-if="isEditing">
                    <button type="button" class="btn btn-success" @click="saveModifiedSchool">Save</button>
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
        }
    }
}