export default {
    /*html*/
    template: `
    <table id="lessonsTable" class="table table-striped table-bordered">
        <thead>
            <tr>
                <th>lessonStart</th>
                <th>name</th>
                <th>length</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="lesson in lessons">
                <td @click="getlesson(lesson.id)">{{ lesson.lessonStart }}</td>
                <td>{{ lesson.name }}</td>
                <td>{{ lesson.length }}</td>
            </tr>
        </tbody>
    </table>
    `,
    emits: ["showModal"],
    data() {
        return {
            lessons: []
        }
    },
    async created() {
        this.lessons = await (await fetch("http://localhost:8080/lessons")).json()
    },
    methods: {
        getlesson: async function (id) {
            const lessonInModal = await (await fetch(this.API_URL + "/lessons/" + id)).json()
            this.$emit("showModal", lessonInModal)
        }
    }
}