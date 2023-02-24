<script lang="ts">
    export let name: string;
    export let price: number;
    export let categories: string[] = [];
    export let sizes: string[] = [""];
    export let image_url: string;

    export let category_options: string[] = ["men", "women", "kids", "outdoor"];

    export function handleAddSize() {
        sizes.push("");
        sizes = sizes;
    }

    export function handleAddCategory(element: any) {        
        if (element.selected && !categories.includes(element.value)) {
            categories.push(String(element.value));
        } else {
            categories.splice(categories.indexOf(element.value), 1);
        }
        categories = categories;
    }

    import axios from 'axios';
    export async function handleSubmit() {
        try {
            await axios.post(`http://localhost:3000/api/product`, {
                name: name,
                price: price,
                categories: categories,
                sizes: sizes,
                image_url: image_url
            });
        } catch (err) {
            return console.error(err);
        }
    }
</script>

<h1>Manager Page</h1>

<h2>Add new product</h2>
<form on:submit|preventDefault={() => handleSubmit()}>
    <fieldset>
        <legend>Product Info</legend>
        
        <label for="name">Name</label>
        <input id="name" bind:value={name} type="text" required />

        <label for="price">Price</label>
        <input id="price" bind:value={price} type="number" step=0.01 min=0 required />

        <label for="categories">Categories</label>
        <select id="categories" multiple required>
            {#each category_options as category_option}
            <option value={category_option} on:click={(e) => handleAddCategory(e.target)}>{category_option}</option>
            {/each}
        </select>

        <label for="sizes">Sizes</label>
            {#each sizes as size}
            <input id="sizes" type="text" bind:value={size} size=1 />
            {/each}
        <button type="button" on:click={() => handleAddSize()}>Add size</button>

        <label for="image_url">Image URL</label>
        <input id="image_url" type="url" />

    </fieldset>
    <button type="submit">Submit</button>
</form>

{categories}