import schoolsList from "../components/Schoollist.js"
import schoolInfoModal from "../components/SchoolInfoModal.js"
export default {
    /*html*/
    template: `
    <schools-list :key="update" @showModal="openModalSchool"></schools-list>
    <school-info-modal @schoolUpdated="updateViewSchool" :schoolInModal="schoolInModal"></school-info-modal>
    `,
    components: {
        schoolsList,
        schoolInfoModal
    },
    data() {
        return {
            update: 0,
            schoolInModal: { id: "", name: "", director: "" }
        }
    },
    methods: {
        openModalSchool(school) {
            this.schoolInModal = school
            let schoolInfoModal = new bootstrap.Modal(document.getElementById("schoolInfoModal"))
            schoolInfoModal.show()
        },
        updateViewSchool(school) {
            this.update++
            this.schoolInModal = school
        }
    }
}