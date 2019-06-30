<template>
<div>
    <Filters />
    <table class='table issueList'>
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
            <tr v-for='issue in issueList'>
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
        'issueList'
    ],
    components: {
        Filters
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