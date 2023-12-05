import lessonsList from "../components/Lessonlist.js"
import lessonInfoModal from "../components/LessonInfoModal.js"
export default {
    /*html*/
    template: `
    <lessons-list :key="update" @showModal="openModalLesson"></lessons-list>
    <lesson-info-modal @lessonUpdated="updateViewLesson" :lessonInModal="lessonInModal"></lesson-info-modal>
    `,
    components: {
        lessonsList,
        lessonInfoModal
    },
    data() {
        return {
            update: 0,
            lessonInModal: { id: "",lessonStart: "" ,name: "", length: 0 }
        }
    },
    methods: {
        openModalLesson(lesson) {
            this.lessonInModal = lesson
            let lessonInfoModal = new bootstrap.Modal(document.getElementById("lessonInfoModal"))
            lessonInfoModal.show()
        },
        updateViewLesson(lesson) {
            this.update++
            this.lessonInModal = lesson
        }
    } 
}