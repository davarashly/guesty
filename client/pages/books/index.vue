<template>
	<div id="books-page" class="text-center align-items-center justify-content-center container">
		<nuxt-link class="btn btn-primary mb-5" style="width: 200px" :to="{ name: 'Book-Add' }">Add Book</nuxt-link>

		<div class="row">
			<div class="col-sm-6 col-md-4 col-md-3 mb-4" v-for="book in books">
				<Book :book="book" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, useContext, useFetch } from "@nuxtjs/composition-api"

import IBook from "@/interfaces/Book"
import Book from "@client/components/Book.vue"

export default defineComponent({
	setup() {
		const books = ref<IBook[]>([])

		const { $backendApi } = useContext()

		useFetch(async () => {
			const {
				data: { books: booksList }
			} = await $backendApi.$get("/books")

			books.value = booksList
		})

		return { books }
	},
	components: { Book }
})
</script>

<style lang="scss"></style>

<router>
{
	name: "Books"
}
</router>
