export default {
    /*html*/
    template: `
    <table id="groupsTable" class="table table-striped table-bordered">
    <thead>
    <tr>
        <th>name</th>
        <th>studentCount</th>
    </tr>
</thead>
<tbody>
    <tr v-for="group in groups">
        <td @click="getgroup(group.id)">{{ group.name }}</td>
        <td>{{ group.studentCount }}</td>
    </tr>
</tbody>
    </table>
    `,
    emits: ["showModal"],
    data() {
        return {
            groups: []
        }
    },
    async created() {
        this.groups = await (await fetch("http://localhost:8080/groups")).json()
    },
    methods: {
        getgroup: async function (id) {
            const groupInModal = await (await fetch(this.API_URL + "/groups/" + id)).json()
            this.$emit("showModal", groupInModal)
        }
    }
}