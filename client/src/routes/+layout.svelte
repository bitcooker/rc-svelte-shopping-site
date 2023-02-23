<script lang="ts">
    import "../app.css";

    export let drawerIsOpen: Boolean = false;

</script>

<div class="
    fixed
    w-screen
    h-screen
    flex
    flex-col
    ">

    <header class="
        flex-10
        shrink-0
        sticky
        top-0
        shadow
        z-50
        bg-gray-400
        flex
        justify-between
        align-center
        px-3
        py-1
        ">

        <button on:click={() => drawerIsOpen = !drawerIsOpen}>Menu</button>

        <a href="/"><h1 class="font-bold">K-Shop</h1></a>

        <a href="/about">About</a>

    </header>

    <div class={`
        flex-1
        flex
        flex-col
        px-3
        py-2
        bg-gray-200
        overflow-y-${drawerIsOpen ? 'hidden' : 'scroll'}
        min-h-screen
        `}>
        <slot />
    </div>

</div>

{#if drawerIsOpen}
    <div class="
        fixed
        z-100
        inset-0
        flex
        w-screen
    ">
        <nav class="
            flex-10
            h-screen
            flex
            flex-col
            bg-gray-600
        ">
            <a href="/about">About</a>
            <a href="/categories">Categories</a>
        </nav>

        <div class="
            flex-1
            bg-transparent
        " on:click={() => drawerIsOpen = false}></div>
    </div>
{/if}