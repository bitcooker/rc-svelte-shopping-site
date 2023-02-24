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
        w-screen
        flex
    " on:click={() => drawerIsOpen = false} on:keydown={() => drawerIsOpen = false}>
        <div class="
            flex-10
            h-screen
            flex
            flex-col
            bg-gray-400
            shadow
        ">
            <div class="
                flex-10
                border-b
                border-gray-300
                px-2
                py-1
            ">
                My Account
            </div>
        
            <nav class="
                flex-1
                px-4
                py-2
                flex
                flex-col
            ">
                <a href="/womens">Women's</a>
                <a href="/mens">Men's</a>
                <a href="/outdoor">Outdoor</a>
                <a href="/home">Home</a>
            </nav>
        </div>

        <div class="
            flex-1
            bg-black
            bg-opacity-50
        "></div>
    </div>
{/if}