import schoolsList from "../components/Schoollist.js"
import schoolInfoModal from "../components/SchoolInfoModal.js"
import newObjectModal from "../components/NewObjectModal.js"
import schoolForm from "../components/School/SchoolForm.js"
export default {
    /*html*/
    template: `
    
    <schools-list :key="update" @showModal="openModalSchool"></schools-list>
    <school-info-modal @schoolUpdated="updateViewSchool" :schoolInModal="schoolInModal"></school-info-modal>
    <new-object-modal id="newSchoolModal" @save="saveNewSchool">
        <school-form v-model:name="schoolInModal.name" v-model:director="schoolInModal.director"></school-form>
        <div class="alert alert-danger" role="alert" v-show="error">{{error}}</div>
    </new-object-modal>
    <button class="btn btn-info" @click="newSchool">New School</button>
    `,
    components: {
        schoolsList,
        schoolInfoModal,
        schoolForm,
        newObjectModal
    },
    data() {
        return {
            update: 0,
            schoolInModal: { id: "", name: "", director: "" },
            newSchoolModal: {},
            error: ""
        }
    },
    methods: {
        openModalSchool(school) {
            this.schoolInModal = school
            let schoolInfoModal = new bootstrap.Modal(document.getElementById("schoolInfoModal"))
            schoolInfoModal.show()
        },
        newSchool() {
            this.error = ""
            this.schoolInModal = {}
            this.newSchoolModal = new bootstrap.Modal(document.getElementById("newSchoolModal"))
            this.newSchoolModal.show()
        },
        updateViewSchool(school) {
            this.update++
            this.schoolInModal = school
        },
        async saveNewSchool() {
            console.log("Saving:", this.schoolInModal)
            const rawResponse = await fetch(this.API_URL + "/schools/", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.schoolInModal)
            });
            if (rawResponse.ok) {
                this.newSchoolModal.hide()
                this.update++
            }
            else {
                const errorResponse = await rawResponse.json()
                this.error = errorResponse.error
            }
        }
    }
}