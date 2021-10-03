<template>
	<div id="layout">
		<Navbar />
		<main class="py-3">
			<Nuxt />
		</main>
		<Footer />
	</div>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api"

import Navbar from "@client/components/Navbar.vue"
import Footer from "@client/components/Footer.vue"

export default defineComponent({ components: { Navbar, Footer } })
</script>

<style lang="scss">
#layout {
	min-height: 100vh;
	display: flex;
	flex-direction: column;

	main {
		position: relative;

		&,
		& > div {
			display: flex;
			flex-direction: column;
			flex: 1;
		}
	}
}
</style>
