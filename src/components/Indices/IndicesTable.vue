<template>
  <div>
    <div class="inline-block px-3 pull-right" style="width: 250px;">
      <v-text-field append-icon="search"
                    label="Filter"
                    v-model="filter"></v-text-field>
    </div>
    <v-data-table :rows-per-page-items="[10, 25, 100]"
                  :headers="headers"
                  :items="indices"
                  :custom-sort="sortIndices"
                  :search="filter"
                  :loading="loading">
      <template slot="items" slot-scope="props">
        <td>{{props.item.index}}</td>
        <td>{{props.item.health}}</td>
        <td>{{props.item.status}}</td>
        <td>{{props.item.uuid}}</td>
        <td class="text-xs-right">{{props.item.pri}}</td>
        <td class="text-xs-right">{{props.item.rep}}</td>
        <td class="text-xs-right">{{props.item['docs.count']}}</td>
        <td class="text-xs-right">{{props.item['store.size']}}</td>
        <td class="text-xs-right">{{props.item['pri.store.size']}}</td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  export default {
    props: {
      indices: {
        default: () => []
      },
      loading: {
        default: false
      }
    },
    data () {
      return {
        headers: [
          {text: 'Name', value: 'index'},
          {text: 'Health', value: 'health'},
          {text: 'Status', value: 'status'},
          {text: 'UUID', value: 'uuid'},
          {text: 'Pri', value: 'pri', align: 'right'},
          {text: 'Rep', value: 'rep', align: 'right'},
          {text: 'Docs', value: 'docs.count', align: 'right'},
          {text: 'Store size', value: 'store.size', align: 'right'},
          {text: 'Pri Store size', value: 'pri.store.size', align: 'right'}
        ],
        filter: ''
      }
    },
    methods: {
      sortIndices (items, index, isDescending) {
        const NUMBER_KIND_VALUES = ['pri', 'rep', 'docs.count', 'store.size', 'pri.store.size']
        return items.sort((a, b) => {
          let valA = a[index]
          let valB = b[index]

          // Parse the values to float because string sorting does not work right here.
          if (NUMBER_KIND_VALUES.includes(index)) {
            valA = parseFloat(a[index])
            valB = parseFloat(b[index])
          }

          if (valA < valB) {
            return isDescending ? 1 : -1
          } else if (valA > valB) {
            return isDescending ? -1 : 1
          } else {
            return 0
          }
        })
      }
    }
  }
</script>