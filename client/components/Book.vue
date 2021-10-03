<template>
	<div class="card">
		<div class="card-body">
			<h5 class="card-title">{{ book.bookName }}</h5>
			<h6 class="card-subtitle mb-2 text-muted">{{ `${book.author.firstName} ${book.author.lastName}` }}</h6>
			<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
			<nuxt-link :to="{ name: 'Book-Edit', query: { id: book._id } }" class="card-link">Edit Book</nuxt-link>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@nuxtjs/composition-api"
import Book from "@/interfaces/Book"

export default defineComponent({
	props: {
		book: Object as PropType<Book>
	}
})
</script>
