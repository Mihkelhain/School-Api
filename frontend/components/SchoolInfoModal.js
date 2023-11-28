<template>
  <div id="schoolInfoModal" class="modal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <table class="table table-striped">
            <tr>
              <th>Id</th>
              <td>{{schoolInModal.id}}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td v-if="isEditing || isCreating"><input v-model="modifiedSchool.name"></td>
              <td v-else>{{schoolInModal.name}}</td>
            </tr>
            <tr>
              <th>Director</th>
              <td v-if="isEditing || isCreating"><input v-model="modifiedSchool.director"></td>
              <td v-else>{{schoolInModal.director}}</td>
            </tr>
          </table>
          <!-- Additional input fields for creating schools -->
          <template v-if="isCreating">
            <div>
              <label for="newSchoolName">New School Name:</label>
              <input v-model="newSchoolName" id="newSchoolName">
            </div>
            <div>
              <label for="newSchoolDirector">New School Director:</label>
              <input v-model="newSchoolDirector" id="newSchoolDirector">
            </div>
          </template>
        </div>
        <div class="modal-footer">
          <div class="container">
            <div class="row">
              <template v-if="isEditing || isCreating">
                <div class="col me-auto">
                  <button type="button" class="btn btn-danger" data-bs-target="#confirmationModal" data-bs-toggle="modal"
                    @click="deleteModifiedSchool">Delete</button>
                </div>
                <div class="col-auto">
                  <button type="button" class="btn btn-success mx-2" @click="isEditing ? saveModifiedSchool() : createPostedSchool()">Save</button>
                  <button type="button" class="btn btn-secondary" @click="isEditing ? cancelEditing() : cancelCreating()">Cancel</button>
                </div>
              </template>
              <template v-else>
                <div class="col me-auto"></div>
                <div class="col-auto">
                  <button type="button" class="btn btn-warning mx-2" @click="startEditing">Edit</button>
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
                <div class="col-auto">
                  <button type="button" class="btn btn-success mx-2" @click="startCreating">Create</button>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <confirmation-modal :target="'#schoolInfoModal'" @confirmed="deleteModifiedSchool"></confirmation-modal>
</template>

<script>
import confirmationModal from "./ConfirmationModal.js";

export default {
  template: /*html*/ `
    <!-- Your template code here -->
  `,
  components: {
    confirmationModal
  },
  emits: ["SchoolUpdated", "SchoolDeleted", "SchoolCreated"],
  props: {
    schoolInModal: {}
  },
  data() {
    return {
      isEditing: false,
      isCreating: false,
      modifiedSchool: {},
      newSchoolName: "",
      newSchoolDirector: ""
    };
  },
  methods: {
    // ... other methods

    async createPostedSchool() {
      try {
        const newSchool = {
          name: this.newSchoolName,
          director: this.newSchoolDirector
        };

        const rawResponse = await fetch(this.API_URL + "/Schools", {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newSchool)
        });

        const createdSchool = await rawResponse.json();

        this.$emit("SchoolCreated", createdSchool);
        this.isCreating = false;
      } catch (error) {
        console.error('Error creating school:', error);
      }
    },

    // ... other methods
  }
};
</script>
