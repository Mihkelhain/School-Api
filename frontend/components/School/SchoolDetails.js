export default {
    /*html*/
    template: `
    <table class="table table-striped">
    <tr>
        <th>Id</th>
        <td>{{schoolInModal.id}}</td>
    </tr>
    <tr>
        <th>Name</th>
        <td>{{schoolInModal.name}}</td>
    </tr>
    <tr>
        <th>Price</th>
        <td>{{schoolInModal.director}}</td>
    </tr>
</table>`,
    props: ["schoolInModal"]
}