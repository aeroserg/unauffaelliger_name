<script lang="ts">
  import { onMount, afterUpdate } from 'svelte';

  let selectedCurrency1 = 'usd';
  let selectedCurrency2 = 'eur';
  let exchangeRate = null;
  let inputAmount1, inputAmount2; 

  onMount(async () => {
    const response = await fetch(`https://open.er-api.com/v6/latest/${selectedCurrency1}`);
    const data = await response.json();
    exchangeRate = data.rates;
  });

  let rate1, rate2;

  function calculateConvertedAmounts1() {
    if (exchangeRate) {
      rate1 = exchangeRate[selectedCurrency1];     
      inputAmount1 = +(inputAmount2 * rate2 / rate1).toFixed(2);
    }
  }
  function calculateConvertedAmounts2() {
    if (exchangeRate) {   
      rate2 = exchangeRate[selectedCurrency2];
      inputAmount2 = +(inputAmount1 * rate1 / rate2).toFixed(2);
    }
  }

  function handleChange1(event) {
    selectedCurrency1 = event.target.value;
    calculateConvertedAmounts1();
  }

  function handleChange2(event) {
    selectedCurrency2 = event.target.value;
    calculateConvertedAmounts2();
  }

  function handleInputChange1(event) {
    inputAmount1 = parseFloat(event.target.value);
    calculateConvertedAmounts2();
  }

  function handleInputChange2(event) {
    inputAmount2 = parseFloat(event.target.value);
    calculateConvertedAmounts1();
  }
</script>

<div class="b-form-row">
  <select class="b-select-control" bind:value="{selectedCurrency2}" on:change="{handleChange2}">
    {#if exchangeRate}
      {#each Object.keys(exchangeRate) as currency (currency)}
        <option value="{currency}">{currency}</option>
      {/each}
    {/if}
  </select>  
  <input class="b-input-control" type="number" bind:value="{inputAmount1}" on:input="{handleInputChange1}" min="0" step="0.01">
</div>

<div class="b-form-row">
  <select class="b-select-control" bind:value="{selectedCurrency1}" on:change="{handleChange1}">
    {#if exchangeRate}
      {#each Object.keys(exchangeRate) as currency (currency)}
        <option value="{currency}">{currency}</option>
      {/each}
    {/if}
  </select>
  <input class="b-input-control" type="number" bind:value="{inputAmount2}" on:input="{handleInputChange2}" min="0" step="0.01">
</div>

