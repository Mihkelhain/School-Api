import GroupsList from "../components/Grouplist.js"
import GroupInfoModal from "../components/GroupInfoModal.js"
export default {
    /*html*/
    template: `
    <Groups-list :key="update" @showModal="openModalGroup"></Groups-list>
    <group-info-modal @groupUpdated="updateViewGroup" :groupInModal="groupInModal"></group-info-modal>
    `,
    components: {
        GroupsList,
        GroupInfoModal
    },
    data() {
        return {
            update: 0,
            groupInModal: { id: "", name: "", studentCount: ""}
        }
    },
    methods: {
        openModalGroup(group) {
            this.groupInModal = group
            let GroupInfoModal = new bootstrap.Modal(document.getElementById("groupInfoModal"))
            GroupInfoModal.show()
        },
        updateViewGroup(group) {
            this.update++
            this.groupInModal = group
        }
    }
} 