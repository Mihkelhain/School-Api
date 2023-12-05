export default {
    /*html*/
    template: `
    <table class="table table-striped">
    <tr>
        <th>Id</th>
        <td>{{groupInModal.id}}</td>
    </tr>
    <tr>
        <th>Name</th>
        <td>{{groupInModal.name}}</td>
    </tr>
    <tr>
        <th>studentCount</th>
        <td>{{groupInModal.studentCount}}</td>
    </tr>
</table>`,
    props: ["groupInModal"]
}