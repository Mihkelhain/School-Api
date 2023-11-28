import LessonsList from "../components/Lessonlist.js"
import LessonInfoModal from "../components/LessonInfoModal.js"
export default {
    /*html*/
    template: `
    <Lessons-list :key="update" @showModal="openModalLesson"></Lessons-list>
    <Lesson-info-modal @LessonUpdated="updateViewLesson" :LessonInModal="LessonInModal"></Lesson-info-modal>
    `,
    components: {
        LessonsList,
        LessonInfoModal
    },
    data() {
        return {
            update: 0,
            LessonInModal: { id: "",lessonStart: "" ,name: "", length: "" }
        }
    },
    methods: {
        openModalLesson(Lesson) {
            this.LessonInModal = Lesson
            let LessonInfoModal = new bootstrap.Modal(document.getElementById("LessonInfoModal"))
            LessonInfoModal.show()
        },
        updateViewLesson(Lesson) {
            this.update++
            this.LessonInModal = Lesson
        }
    } 
}