import lessonList from "../components/Lessonlist.js"
import lessonInfoModal from "../components/lessonInfoModal.js"
import newObjectModal from "../components/NewObjectModal.js"
import lessonForm from "../components/Lesson/LessonForm.js"
export default {
    /*html*/
    template: `
    <button class="btn btn-secondary" @click="newLesson">New Lesson</button>
    <lesson-list :key="update" @showModal="openModalLesson"></lesson-list>
    <lesson-info-modal @lessonUpdated="updateViewLesson" :lessonInModal="lessonInModal"></lesson-info-modal>
    <new-object-modal id="newLessonModal" @save="saveNewLesson">
        <lesson-form v-model:lessonStart="lessonInModal.lessonStart" v-model:name="lessonInModal.name" v-model:length="lessonInModal.length" ></lesson-form>
        <div class="alert alert-danger" role="alert" v-show="error">{{error}}</div>
    </new-object-modal>
    `,
    components: {
        lessonList,
        lessonInfoModal,
        newObjectModal,
        lessonForm
    },
    data() {
        return {
            update: 0,
            lessonInModal: { id: "", lessonStart: "", name: "", length: 0 },
            newLessonModal: {},
            error: ""
        }
    },
    methods: {
        openModalLesson(lesson) {
            this.lessonInModal = lesson
            let lessonInfoModal = new bootstrap.Modal(document.getElementById("lessonInfoModal"))
            lessonInfoModal.show()
        },
        newLesson() {
            this.error = ""
            this.lessonInModal = {}
            this.newLessonModal = new bootstrap.Modal(document.getElementById("newLessonModal"))
            this.newLessonModal.show()
        },
        updateViewLesson(lesson) {
            this.update++
            this.lessonInModal = lesson
        },
        async saveNewLesson() {
            console.log("Saving:", this.lessonInModal)
            const rawResponse = await fetch(this.API_URL + "/lessons/", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.lessonInModal)
            });
            if (rawResponse.ok) {
                this.newLessonModal.hide()
                this.update++
            }
            else {
                const errorResponse = await rawResponse.json()
                this.error = errorResponse.error
            }
        }
    }
}