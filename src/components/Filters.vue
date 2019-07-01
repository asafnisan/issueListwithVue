<template>
<div class='box filters'>
    <!-- Placeholder box for filters -->
    <div class='container'>
      <label class='label'>Confidence</label>
      <div class='select'>
        <select v-model='confidence' @change='handleChange'>
          <option v-for='value in filterValuesWithAll.confidence'>{{value}}</option>
        </select>
      </div>
    </div>
    <div class='container'>
      <label class='label'>Name</label>
      <div class='select'>
        <select v-model='name' @change='handleChange'>
          <option v-for='value in filterValuesWithAll.name'>{{value}}</option>
        </select>
      </div>
    </div>
    <div class='container'>
      <label class='label'>Severity</label>
      <div class='select'>
        <select v-model='severity' @change='handleChange'>
          <option v-for='value in filterValuesWithAll.severity'>{{value}}</option>
        </select>
      </div>
    </div>
</div>
</template>

<script>
import 'bulma/css/bulma.css';

export default {
  name: 'Filters',
  props: [ 'filterValues' ],
  data() {
    return {
      confidence: 'All',
      name: 'All',
      severity: 'All',
    }
  },
  methods: {
    handleChange(e) {
      const selectedFilterValues = {
        confidence: this.confidence,
        name: this.name,
        severity: this.severity,
      }
      EventBus.$emit('selectFilter', selectedFilterValues);
    }
  },
  computed: {
    filterValuesWithAll() {
      return {
        confidence: this.$props.filterValues.confidence.concat('All').reverse(),
        name: this.$props.filterValues.name.concat('All').reverse(),
        severity: this.$props.filterValues.severity.concat('All').reverse(),
      }
    }
  },
  created() {
    const selectedFilterValues = {
      confidence: this.confidence,
      name: this.name,
      severity: this.severity,
    }
    EventBus.$emit('selectFilter', selectedFilterValues);
  }
}
</script>

<style>
.filters {
  width: 800px;
  height: 120px;
  margin-left: auto;
  margin-right: auto;
}

.dropdown {
  margin-right: 25px;
}
.container {
  display: inline-block;
  margin-right: 10px;
  margin-left: 10px;
}
</style>