export default {
    /*html*/
    template: `
    <table id="usersSchoolTable" class="table table-striped table-bordered">
    <thead>
    <tr>
        <th>SchoolId</th>
        <th>Director</th>
        <th>UserId</th>
    </tr>
</thead>
<tbody>
    <tr v-for="UserSchool in UserSchools">
        <td @click="getUser(user.id)">{{ UserSchool.SchoolId }}</td>
        <td @click="getUser(user.id)">{{ UserSchool.Director }}</td>
        <td @click="getUser(user.id)">{{ UserSchool.UserId }}</td>
    </tr>
</tbody>
    </table>
    `,
    emits: ["showModal"],
    data() {
        return {
            userSchools: []
        }
    },
    async created() {
        this.userSchools = await (await fetch("http://localhost:8080/userSchools")).json()
    },
    methods: {
        getUser: async function (id) {
            const userInModal = await (await fetch(this.API_URL + "/userSchools/" + id)).json()
            this.$emit("showModal", userInModal)
        }
    }
}