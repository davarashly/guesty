<template>
	<div id="books-page" style="max-width: 500px" class="text-center justify-content-center container">
		<div class="row">
			<div class="col">
				<form @submit.prevent="submit" class="d-flex flex-column justify-content-center align-items-center">
					<label class="form-label align-self-start">Name of the Book</label>
					<input type="text" v-model="newBook.bookName" class="form-control mb-3" />
					<label class="form-label align-self-start">ISBN</label>
					<input type="text" v-model="newBook.isbn" class="form-control mb-3" />
					<label class="form-label align-self-start">Author ID</label>
					<input type="text" v-model="newBook.author" class="form-control mb-3" />

					<input type="submit" class="btn btn-primary w-50" value="Save" />
				</form>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, useContext, useFetch, useRoute } from "@nuxtjs/composition-api"

import IBook from "@/interfaces/Book"
import Book from "@client/components/Book.vue"

export default defineComponent({
	setup() {
		const route = useRoute()

		const id = route.value.query.id

		const book = ref<IBook>()

		const { $backendApi } = useContext()

		const newBook = ref<Partial<IBook>>({
			bookName: "",
			isbn: "",
			author: ""
		})

		useFetch(async () => {
			const {
				data: { book: fetchedBook }
			} = await $backendApi.$get(`/books/${id}`)

			book.value = fetchedBook
			newBook.value = { ...fetchedBook, author: fetchedBook.author._id }
		})

		const submit = async () => {
			const res = await $backendApi.$put(`/books/${id}`, { book: newBook.value })

			console.log(res)
		}

		return { book, newBook, submit }
	},
	components: { Book }
})
</script>

<style lang="scss"></style>

<router>
{
	name: "Book-Edit"
}
</router>