<template>
<div>
    <Filters :filterValues='filterValues'/>
    <table class='table issueList' v-if='filteredIssueList.length !== 0'>
        <thead>
            <th>Confidence</th>
            <th>Host</th>
            <th>Location</th>
            <th>Name</th>
            <th>Path</th>
            <th>Serial Number</th>
            <th>Severity</th>
            <th>Type</th>
        </thead>
        <tbody>
            <tr v-for='issue in filteredIssueList'>
                <td>{{issue.confidence}}</td>
                <td>{{issue.host}}</td>
                <td>{{issue.location}}</td>
                <td>{{issue.name}}</td>
                <td>{{issue.path}}</td>
                <td>{{issue.serialNumber}}</td>
                <td>{{issue.severity}}</td>
                <td>{{issue.type}}</td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<script>
import 'bulma/css/bulma.css'
import Filters from './Filters.vue'

export default {
    name: 'IssueList',
    props: [
        'issueList',
        'filterValues',
    ],
    data() {
        return {
            selectedFilterValues: {
                confidence: '',
                severity: '',
                name: '',
            }
        }
    },
    components: {
        Filters
    },
    created() {
        EventBus.$on('selectFilter', (e) => {
            console.log('here is e!', e)
            this.selectedFilterValues = e;
        })
    },
    computed: {
        filteredIssueList() {
            const filteredList = this.$props.issueList.filter((issue) => {
                if(this.selectedFilterValues.confidence === 'All') return true;
                return issue.confidence === this.selectedFilterValues.confidence
            }).filter((issue) => {
                if(this.selectedFilterValues.name === 'All') return true;
                return issue.name === this.selectedFilterValues.name;
            }).filter((issue) => {
                if(this.selectedFilterValues.severity === 'All') return true;
                return issue.severity === this.selectedFilterValues.severity;
            });
            console.log('here is the filteredList:', filteredList)
            return filteredList
        }
    }
}
</script>

<style scoped>
.issueList {
    margin-top: 75px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 250px;
}
</style>