export default {
    /*html*/
    template: `
    <table id="usersTable" class="table table-striped table-bordered">
        <tr>
            <th>Name</th>
        </tr>
        <tr v-for="user in users">
            <td @click="getUser(user.id)">{{ user.name }}</td>
        </tr>
    </table>
    `,
    emits: ["showModal"],
    data() {
        return {
            users: []
        }
    },
    async created() {
        this.users = await (await fetch("http://localhost:8080/users")).json()
    },
    methods: {
        getUser: async function (id) {
            const userInModal = await (await fetch(this.API_URL + "/Users/" + id)).json()
            this.$emit("showModal", userInModal)
        }
    }
}