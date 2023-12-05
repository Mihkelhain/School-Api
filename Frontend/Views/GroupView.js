import groupList from "../components/Grouplist.js"
import groupInfoModal from "../components/GroupInfoModal.js"
import newObjectModal from "../components/NewObjectModal.js"
import groupForm from "../components/Group/GroupForm.js"
export default {
    /*html*/
    template: `
    <button class="btn btn-secondary" @click="newGroup">New Group</button>
    <group-list :key="update" @showModal="openModalGroup"></group-list>
    <group-info-modal @groupUpdated="updateViewGroup" :groupInModal="groupInModal"></group-info-modal>
    <new-object-modal id="newGroupModal" @save="saveNewGroup">
        <group-form v-model:groupStart="groupInModal.groupStart" v-model:name="groupInModal.name" v-model:length="groupInModal.length" ></group-form>
        <div class="alert alert-danger" role="alert" v-show="error">{{error}}</div>
    </new-object-modal>
    `,
    components: {
        groupList,
        groupInfoModal,
        newObjectModal,
        groupForm
    },
    data() {
        return {
            update: 0,
            groupInModal: { id: "", name: "", studentCount: 0 },
            newGroupModal: {},
            error: ""
        }
    },
    methods: {
        openModalGroup(group) {
            this.groupInModal = group
            let groupInfoModal = new bootstrap.Modal(document.getElementById("groupInfoModal"))
            groupInfoModal.show()
        },
        newGroup() {
            this.error = ""
            this.groupInModal = {}
            this.newGroupModal = new bootstrap.Modal(document.getElementById("newGroupModal"))
            this.newGroupModal.show()
        },
        updateViewGroup(group) {
            this.update++
            this.groupInModal = group
        },
        async saveNewGroup() {
            console.log("Saving:", this.groupInModal)
            const rawResponse = await fetch(this.API_URL + "/groups/", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.groupInModal)
            });
            if (rawResponse.ok) {
                this.newGroupModal.hide()
                this.update++
            }
            else {
                const errorResponse = await rawResponse.json()
                this.error = errorResponse.error
            }
        }
    }
}