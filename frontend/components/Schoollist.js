export default {
    /*html*/
    template: `
    <table id="schoolsTable" class="table table-striped table-bordered">
    <thead>
    <tr>
        <th>Name</th>
        <th>director</th>
    </tr>
</thead>
<tbody>
    <tr v-for="school in schools">
        <td @click="getSchool(school.id)">{{ school.name }}</td>
        <td>{{ school.director }}</td>
    </tr>
</tbody>
    </table>
    `,
    emits: ["showModal"],
    data() {
        return {
            schools: []
        }
    },
    async created() {
        this.schools = await (await fetch("http://localhost:8080/schools")).json()
    },
    methods: {
        getSchool: async function (id) {
            const schoolInModal = await (await fetch(this.API_URL + "/schools/" + id)).json()
            this.$emit("showModal", schoolInModal)
        }
    }
}