<template>
  <div class="comment-section">
    <label>Oceń przepis: <Ratings></Ratings></label>
    <div class="add-comment">
      <div class="row m-0" v-if="isLogged()">
        <div class="col-3 user-image">
          <img src="../assets/images/profile_pic.jpg" alt="user" class="img-fluid" />
        </div>
        <div class="col-8 p-0">
          <Input
            v-model="commentData.content"
            tag="textarea"
            name="comment"
            id="comment"
            label="Treść komentarza"
            class="comment"
          >
          </Input>
          <Button @click="addComment">Dodaj komentarz</Button>
        </div>
      </div>
      <div class="row m-0" v-else>
        <router-link to="/login" class="w-100 text-center">Zaloguj się aby dodać komentarz</router-link>
        <hr />
      </div>
    </div>
    <div class="comment-list">
      <div v-for="(comment, index) in comments" :key="index" class="row m-0">
        <div class="col-3 user-image">
          <img :src="comment.user.avatar.url" alt="avatar" class="img-fluid" />
        </div>
        <div class="col-8 p-0">
          <h3>{{ comment.user.name }}</h3>
          <i
            class="edit-comment fas fa-edit"
            v-if="$store.state.user.name === comment.user.name"
            @click="toogleEdit(comment.id)"
          >
          </i>
          <div v-if="editCommentField !== comment.id">
            <span>{{ comment.content }}</span>
          </div>
          <div v-else>
            <Input
              v-model="comment.content"
              tag="textarea"
              name="comment"
              label="Edytuj komentarz"
              class="comment"
              :innerText="comment.content"
            >
            </Input>
            <Button @click="editComment(comment)">Zaktualizuj</Button>
          </div>
        </div>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import Input from "./CreateRecipe/Input";
import Button from "./Button";
import axios from "../utils/axios";
import Ratings from "./Ratings";

export default {
  name: "Comments",
  data() {
    return {
      comments: [],
      commentData: {
        content: null,
      },
      editCommentField: 0,
    };
  },
  components: { Ratings, Button, Input },
  mounted() {
    this.getComments();
  },
  methods: {
    isLogged: function () {
      return this.$auth.isLogged;
    },
    getComments: function () {
      axios
        .get("/recipes/" + this.$route.params.slug + "/comments")
        .then((response) => (this.comments = response.data.data));
    },
    addComment: async function () {
      try {
        await axios.post("/recipes/" + this.$route.params.slug + "/comments", this.commentData, {
          headers: {
            Authorization: `Bearer ` + this.$store.state.token,
          },
        });
        this.getComments();
        console.log("Ok!");
      } catch (error) {
        console.log(error);
      }
    },
    toogleEdit: function (id) {
      this.editCommentField = this.editCommentField === 0 ? id : this.editCommentField === id ? 0 : id;
    },
    editComment: async function (comment) {
      try {
        await axios.post(
          "/recipes/" + this.$route.params.slug + "/comments/" + comment.id + "?_method=PUT",
          { content: comment.content },
          {
            headers: {
              Authorization: `Bearer ` + this.$store.state.token,
            },
          }
        );
        this.editCommentField = 0;
        this.getComments();
        console.log("Ok!");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss">
.comment-section {
  margin-top: 45px;
  padding: 30px 0;
  background-color: white;
  box-shadow: var(--std-shadow);

  .user-image {
    padding: 0;
    width: 100px;
    text-align: center;

    img {
      max-width: 50%;
      object-fit: cover;
      border-radius: 50%;
    }
  }

  .text-input {
    margin-bottom: 0;
  }

  .comment .input__field {
    height: 80px;
  }

  .comment-list {
    text-align: left;
    margin-top: 70px;

    h3 {
      text-align: left;
    }

    .edit-comment {
      position: absolute;
      top: 10px;
      right: 0;
      color: var(--color-blue);
    }
  }
}
</style>
