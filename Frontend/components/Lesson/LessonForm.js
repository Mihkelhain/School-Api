export default {
    /*html*/
    template: `
    <table class="table table-striped">
    <tr>
        <th>Id</th>
        <td>{{id}}</td>
    </tr>
    <tr>
        <th>lessonStart</th>
        <td><input :value="lessonStart" @input="$emit('update:lessonStart',$event.target.value)"></td>
    </tr>
    <tr>
        <th>name</th>
        <td><input :value="name" @input="$emit('update:name',$event.target.value)"></td>
    </tr>
    <tr>
        <th>length</th>
        <td><input :value="length" @input="$emit('update:length',$event.target.value)"></td>
    </tr>
</table>`,
    props: ["id", "lessonStart", "name", "length"],
    emits: ["update:lessonStart", "update:name", "update:length"]
}