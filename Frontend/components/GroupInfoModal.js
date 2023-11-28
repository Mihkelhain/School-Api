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
                <table class="table table-striped">
                    <tr>
                        <th>Id</th>
                        <td>{{GroupInModal.id}}</td>
                    </tr>
                    <tr>
                        <th>Name</th>
                        <td v-if="isEditing"><input v-model="modifiedGroup.name"></td>
                        <td v-else>{{GroupInModal.name}}</td>
                    </tr>
                    <tr>
                        <th>director</th>saveModifiedGroup
                        <td v-if="isEditing"><input v-model="modifiedGroup.price"></td>
                        <td v-else>{{GroupInModal.director}}</td>
                    </tr>
                </table>
            </div>
            <div class="modal-footer">modifiedGroup
                <template v-if="isEditing">
                    <button type="button" class="btn btn-success" @click="saveModifiedGroup">Save</button>
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
        GroupInModal: {}
    },
    data() {
        return {
            isEditing: false,
            modifiedGroup: {}
        }
    },
    methods: {
        startEditing() {
            this.modifiedGroup = { ...this.GroupInModal }
            this.isEditing = true
        },
        cancelEditing() {
            this.isEditing = false
        },
        async saveModifiedGroup() {
            console.log("Saving:", this.modifiedGroup)
            const rawResponse = await fetch(this.API_URL + "/Groups/" + this.modifiedGroup.id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.modifiedGroup)
            });
            console.log(rawResponse);
            this.$emit("SchoolUpdated", this.modifiedGroup)
            this.isEditing = false
        }
    }
} 