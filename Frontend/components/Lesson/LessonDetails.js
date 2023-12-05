export default {
    /*html*/
    template: `
    <table class="table table-striped">
    <tr>
        <th>Id</th>
        <td>{{lessonInModal.id}}</td>
    </tr>
    <tr>
        <th>lessonStart</th>
        <td>{{lessonInModal.lessonStart}}</td>
    </tr>
    <tr>
        <th>name</th>
        <td>{{lessonInModal.name}}</td>
    </tr>
    <tr>
        <th>length</th>
        <td>{{lessonInModal.length}}</td>
    </tr>
</table>`,
    props: ["lessonInModal"]
}