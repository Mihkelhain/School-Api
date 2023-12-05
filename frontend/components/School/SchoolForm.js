export default {
    /*html*/
    template: `
    <table class="table table-striped">
    <tr>
        <th>Id</th>
        <td>{{id}}</td>
    </tr>
    <tr>
        <th>Name</th>
        <td><input :value="name" @input="$emit('update:name',$event.target.value)"></td>
    </tr>
    <tr>
        <th>Director</th>
        <td><input :value="director" @input="$emit('update:director',$event.target.value)"></td>
    </tr>
</table>`,
    props: ["id", "name", "director"],
    emits: ["update:name", "update:director",]
}