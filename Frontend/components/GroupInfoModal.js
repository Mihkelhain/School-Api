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
                        <td>{{groupInModal.id}}</td>
                    </tr>
                    <tr>
                        <th>Name</th>
                        <td v-if="isEditing"><input v-model="modifiedgroup.name"></td>
                        <td v-else>{{groupInModal.name}}</td>
                    </tr>
                    <tr>
                        <th>studentCount</th>
                        <td v-if="isEditing"><input v-model="modifiedgroup.group"></td>
                        <td v-else>{{groupInModal.group}}</td>
                    </tr>
                </table>
            </div>
            <div class="modal-footer">
                <template v-if="isEditing">
                    <button type="button" class="btn btn-success" @click="saveModifiedgroup">Save</button>
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
        }
    }
} 
