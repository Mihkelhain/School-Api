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
    <tr v-for="lessons in lessons">
        <td @click="getlessons(lessons.id)">{{ lesson.lessonStart }}</td>
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
        getlessons: async function (id) {
            const lessonsInModal = await (await fetch(this.API_URL + "/lessons/" + id)).json()
            this.$emit("showModal", lessonsInModal)
        }
    }
}