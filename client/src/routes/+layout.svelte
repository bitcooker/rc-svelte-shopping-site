<script>
  import "../app.css";
</script>

<div class="w-screen h-screen flex flex-col">

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

        <a href="/"><h1 class="font-bold">K-Shop</h1></a>

        <nav>
            <a href="/about">About</a>
        </nav>

    </header>

    <div class="
        flex-1
        flex
        flex-col
        px-3
        py-2
        bg-gray-200
        overflow-y-scroll
        min-h-screen
        ">
        <slot />
    </div>

</div>