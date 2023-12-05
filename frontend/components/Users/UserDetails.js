export default {
    /*html*/
    template: `
    <table class="table table-striped">
    <tr>
        <th>Id</th>
        <td>{{userInModal.id}}</td>
    </tr>
    <tr>
        <th>Name</th>
        <td>{{userInModal.name}}</td>
    </tr>
    <tr>
        <th>Group</th>
        <td>{{userInModal.group}}</td>
    </tr>
    <tr>
        <th>Password</th>
        <td>{{userInModal.password}}</td>
    </tr>
</table>`,
    props: ["userInModal"]
}