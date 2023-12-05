export default {
    /*html*/
    template: `
    <table class="table table-striped">
    <tr>
        <th>Id</th>
        <td>{{id}}</td>
    </tr>
    <tr>
        <th>name</th>
        <td><input :value="name" @input="$emit('update:name',$event.target.value)"></td>
    </tr>
    <tr>
        <th>studentCount</th>
        <td><input :value="studentCount" @input="$emit('update:studentCount',$event.target.value)"></td>
    </tr>
</table>`,
    props: ["id", "name", "studentCount"],
    emits: ["update:name", "update:studentCount"]
}