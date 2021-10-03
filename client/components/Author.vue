<template>
	<div class="card">
		<div class="card-body">
			<h5 class="card-title">{{ author.firstName }}</h5>
			<h6 class="card-subtitle mb-2 text-muted">{{ `${author.firstName} ${author.lastName}` }}</h6>
			<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
			<nuxt-link :to="{ name: 'Author-Edit', query: { id: author._id } }" class="card-link">Edit Author</nuxt-link>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@nuxtjs/composition-api"
import Author from "@/interfaces/Author"

export default defineComponent({
	props: {
		author: Object as PropType<Author>
	}
})
</script>
