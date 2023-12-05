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
        <th>Group</th>
        <td><input :value="group" @input="$emit('update:group',$event.target.value)"></td>
    </tr>
    <tr>
        <th>Password</th>
        <td><input :value="password" @input="$emit('update:password',$event.target.value)"></td>
    </tr>
</table>`,
    props: ["id", "name", "group","password"],
    emits: ["update:name", "update:group","update:password"]
}