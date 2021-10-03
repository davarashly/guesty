<template>
	<div id="books-page" class="text-center align-items-center justify-content-center container">
		<nuxt-link class="btn btn-primary mb-5" style="width: 200px" :to="{ name: 'Author-Add' }">Add Author</nuxt-link>
		<div class="row">
			<div class="col-sm-6 col-md-4 col-md-3 mb-4" v-for="author in authors">
				<Author :author="author" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, useContext, useFetch } from "@nuxtjs/composition-api"

import IAuthor from "@/interfaces/Author"
import Author from "@client/components/Author.vue"

export default defineComponent({
	setup() {
		const authors = ref<IAuthor[]>([])

		const { $backendApi } = useContext()

		useFetch(async () => {
			const {
				data: { authors: authorsList }
			} = await $backendApi.$get("/authors")

			authors.value = authorsList
		})

		return { authors }
	},
	components: { Author }
})
</script>

<style lang="scss"></style>

<router>
{
	name: "Authors"
}
</router>
