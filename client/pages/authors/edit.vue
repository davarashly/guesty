<template>
	<div id="authors-page" style="max-width: 500px" class="text-center justify-content-center container">
		<div class="row">
			<div class="col">
				<form @submit.prevent="submit" class="d-flex flex-column justify-content-center align-items-center">
					<label class="form-label align-self-start">First Name</label>
					<input type="text" v-model="newAuthor.firstName" class="form-control mb-3" />
					<label class="form-label align-self-start">Last Name</label>
					<input type="text" v-model="newAuthor.lastName" class="form-control mb-3" />

					<input type="submit" class="btn btn-primary w-50" value="Save" />
				</form>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, useContext, useFetch, useRoute } from "@nuxtjs/composition-api"

import IAuthor from "@/interfaces/Author"
import Author from "@client/components/Author.vue"

export default defineComponent({
	setup() {
		const route = useRoute()

		const id = route.value.query.id

		const author = ref<IAuthor>()

		const { $backendApi } = useContext()

		const newAuthor = ref<Partial<IAuthor>>({
			firstName: "",
			lastName: ""
		})

		useFetch(async () => {
			const {
				data: { author: fetchedAuthor }
			} = await $backendApi.$get(`/authors/${id}`)

			author.value = fetchedAuthor
			newAuthor.value = fetchedAuthor
		})

		const submit = async () => {
			const res = await $backendApi.$put(`/authors/${id}`, { author: newAuthor.value })

			console.log(res)
		}

		return { author, newAuthor, submit }
	},
	components: { Author }
})
</script>

<style lang="scss"></style>

<router>
{
	name: "Author-Edit"
}
</router>
